import * as THREE from 'three';
import { destinations } from '../data/profile';
import { projects } from '../data/projects';

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const canvas = $<HTMLCanvasElement>('world');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const keys = new Set<string>();
let active = true;
let moved = false;
let route: THREE.Vector2[] = [];
let routeName = '';
let nearby = '';
let elapsed = 0;
let randomSeed = 9427;
function random() { randomSeed = (randomSeed * 16807) % 2147483647; return (randomSeed - 1) / 2147483646; }

const trailhead = {x:0,z:35};
const approach = [[trailhead.x,trailhead.z],[2,29]];
const stops = {
  about: { x: -20, z: 5, ...destinations.about },
  projects: { x: 16, z: 1, ...destinations.projects },
  summit: { x: -1, z: -29, ...destinations.summit },
  contact: { x: -6, z: 24, ...destinations.contact },
};
type StopId = keyof typeof stops;
const branches = {
  about: [...approach, [0, 20], [-2, 15], [-8, 13], [-12, 8], [-20, 5]],
  projects: [...approach, [0, 20], [2, 14], [8, 10], [12, 6], [16, 1]],
  summit: [...approach, [0, 20], [2, 14], [8, 10], [10, 4], [5, -4], [3, -12], [-3, -19], [-1, -29]],
  contact: [...approach, [0, 20], [-2, 22], [-6, 24]],
} satisfies Record<StopId, number[][]>;
const curves = Object.fromEntries(Object.entries(branches).map(([id, points]) => [id, new THREE.CatmullRomCurve3(points.map(([x, z]) => new THREE.Vector3(x, 0, z)), false, 'catmullrom', .25)])) as Record<StopId, THREE.CatmullRomCurve3>;
const paths = Object.values(curves).flatMap(curve => curve.getPoints(140).map(p => new THREE.Vector2(p.x, p.z)));
function pathDistance(x: number, z: number) {
  let d = z > trailhead.z ? (x-trailhead.x)**2 : Infinity;
  for (const p of paths) d = Math.min(d, (p.x - x) ** 2 + (p.y - z) ** 2);
  return Math.sqrt(d);
}
function lakeDistance(x: number, z: number) {
  const u = (x - 29) / 14, v = (z + 14) / 19;
  const a = Math.atan2(v, u);
  // Broad coves and small outcrops break the ellipse into a natural shoreline.
  return Math.hypot(u, v) * (1 + .065 * Math.sin(a * 3 + .8) + .025 * Math.cos(a * 7));
}
function height(x: number, z: number) {
  const base = 1.5 + .65 * Math.sin(x * .13) * Math.cos(z * .15) + .3 * Math.sin(z * .28 + x * .13);
  const north = Math.max(0, (-z - 5) / 35);
  const hill = .9*Math.exp(-((x+14)**2+(z-36)**2)/80) + 1.55*Math.exp(-((x-19)**2+(z-24)**2)/170) + 1.7*Math.exp(-((x+28)**2+(z+7)**2)/155) + 3.6*Math.exp(-((x-28)**2+(z-33)**2)/140) + north * 6 + Math.exp(-((x + 6) ** 2 + (z + 27) ** 2) / 180) * 2;
  const l = lakeDistance(x, z);
  const lake = THREE.MathUtils.smoothstep(l, .83, 1.23);
  return (base + hill) * lake - (1 - lake) * 1.1;
}
function islandContains(x: number, z: number) { return (Math.abs(x) / 48) ** 4 + (Math.abs(z + 11) / 53) ** 4 < 1; }
function walkable(x: number, z: number) {
  if (!islandContains(x, z) || x < -43 || x > 43 || z < -36 || z > 37 || lakeDistance(x, z) < 1.07) return false;
  // The cabin and workshop occupy real space; the entry markers stay outside.
  if (Math.abs(x + 25) < 2.9 && Math.abs(z) < 2.9) return false;
  if (Math.abs(x - 16.5) < 3.7 && Math.abs(z + 9) < 3.25) return false;
  return true;
}

function boot() {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;
  renderer.setClearColor('#f3efde');
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#f3efde');
  const overviewCamera = new THREE.OrthographicCamera(-75, 75, 50, -50, .1, 300);
  const walkingCamera = new THREE.PerspectiveCamera(64, innerWidth / innerHeight, .1, 300);
  let overview = false;
  let camera: THREE.PerspectiveCamera | THREE.OrthographicCamera = walkingCamera;
  scene.add(new THREE.HemisphereLight('#bad1e2', '#4b6e60', 1.2));
  const sun = new THREE.DirectionalLight('#ffe4b5', 2.8);
  sun.position.set(-35,38,45); sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -65, right: 65, top: 65, bottom: -65, near: 1, far: 160 });
  sun.shadow.bias = -.001; scene.add(sun);
  const materials = new Map<string, THREE.MeshLambertMaterial>();
  function material(color: string) {
    if (!materials.has(color)) materials.set(color, new THREE.MeshLambertMaterial({ color, flatShading: true }));
    return materials.get(color)!;
  }
  const cube = new THREE.BoxGeometry(1, 1, 1);
  function box(parent: THREE.Object3D, x: number, y: number, z: number, w: number, h: number, d: number, color: string) {
    const mesh = new THREE.Mesh(cube, material(color)); mesh.position.set(x, y, z); mesh.scale.set(w, h, d); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
  }
  function groundBox(x: number, z: number, w: number, h: number, d: number, color: string, offset = 0) { return box(scene, x, height(x, z) + h / 2 + offset, z, w, h, d, color); }

  // A finite, hand-composed alpine diorama. Stepped grass caps, a warm earth
  // seam and a stone cutaway make the playable geography feel like one object.
  function terrainColor(x:number,z:number){
    let color='#7ba962';
    if(lakeDistance(x,z)<1.16)color='#c4bd98';
    return new THREE.Color(color).multiplyScalar(.94+.05*THREE.MathUtils.smoothstep(x,-34,-7)+.055*Math.sin(x*.15+z*.055)*Math.cos(z*.11));
  }
  const cells: {x:number;z:number;y:number;color:THREE.Color;bottom:number}[] = [];
  const cell = 1.5;
  for (let z = -64; z <= 42; z += cell) for (let x = -48; x <= 48; x += cell) {
    if (!islandContains(x,z)) continue;
    const y = Math.round(height(x,z) * 4) / 4;
    const c=terrainColor(x,z);
    cells.push({x,z,y,color:c,bottom:-3 + Math.round(Math.sin(x * .17) * Math.cos(z * .13)) * .25});
  }
  const groundPositions:number[]=[],groundColors:number[]=[],groundNormals:number[]=[];
  const earth = new THREE.InstancedMesh(cube, material('#927d60'), cells.length);
  const stone = new THREE.InstancedMesh(cube, material('#a6aaa0'), cells.length);
  const cellTransform = new THREE.Object3D();
  cells.forEach((c,i) => {
    const corners=[[-.5,-.5],[.5,-.5],[-.5,.5],[.5,.5]].map(([dx,dz]) => [c.x+dx*cell,height(c.x+dx*cell,c.z+dz*cell),c.z+dz*cell]);
    const low=Math.min(...corners.map(p=>p[1]));
    for(const index of [0,2,1,1,2,3]){
      const p=corners[index];groundPositions.push(...p);groundColors.push(c.color.r,c.color.g,c.color.b);
      const normal=new THREE.Vector3(height(p[0]-.2,p[2])-height(p[0]+.2,p[2]),.4,height(p[0],p[2]-.2)-height(p[0],p[2]+.2)).normalize();groundNormals.push(normal.x,normal.y,normal.z);
    }
    cellTransform.position.set(c.x,low-.5,c.z);cellTransform.scale.set(cell+.025,.85,cell+.025);cellTransform.updateMatrix();earth.setMatrixAt(i,cellTransform.matrix);
    const top=low-.9,h=top-c.bottom;
    cellTransform.position.y=c.bottom+h/2;cellTransform.scale.y=h;cellTransform.updateMatrix();stone.setMatrixAt(i,cellTransform.matrix);
  });
  const groundGeometry=new THREE.BufferGeometry();
  groundGeometry.setAttribute('position',new THREE.Float32BufferAttribute(groundPositions,3));
  groundGeometry.setAttribute('color',new THREE.Float32BufferAttribute(groundColors,3));
  groundGeometry.setAttribute('normal',new THREE.Float32BufferAttribute(groundNormals,3));
  const terrainMesh=new THREE.Mesh(groundGeometry,new THREE.MeshLambertMaterial({vertexColors:true}));
  terrainMesh.receiveShadow=true;earth.receiveShadow=true;stone.receiveShadow=true;
  scene.add(terrainMesh,earth,stone);
  const islandShadow = new THREE.Mesh(new THREE.CircleGeometry(1,64),new THREE.MeshBasicMaterial({color:'#6f8c7b',transparent:true,opacity:.12,depthWrite:false}));
  islandShadow.rotation.x=-Math.PI/2;islandShadow.scale.set(53,57,1);islandShadow.position.set(1,-4.5,-10);scene.add(islandShadow);

  // Blue alpine water with hand-placed glints and a visibly different shoreline.
  const water = new THREE.Mesh(new THREE.CircleGeometry(1, 64), new THREE.MeshLambertMaterial({ color: '#43adaf', transparent: true, opacity: .97 }));
  water.rotation.x = -Math.PI / 2; water.scale.set(15.8, 21.4, 1); water.position.set(29, .16, -14); scene.add(water);
  const glints: THREE.Mesh[] = [];
  for (let i = 0; i < 20; i++) {
    const x = 17 + random() * 24, z = -30 + random() * 32;
    if (lakeDistance(x, z) > .88) continue;
    const glint = box(scene, x, .19, z, .9 + random() * 2, .025, .06, i % 3 ? '#a7d9d1' : '#e3f1d9'); glints.push(glint);
  }

  // Authored block terraces keep the skyline in the same voxel language as
  // the walker, cabins and clouds. Broad shoulders climb into broken crowns.
  function ridge(x: number, z: number, width: number, tall: number, profile: number[], tint: string, snow: boolean, options:{parent?:THREE.Object3D;constrain?:boolean;unit?:number;base?:number}={}) {
    const blocks: { x: number; y: number; z: number; w: number; h: number; d: number; color: THREE.Color; snow?:boolean }[] = [];
    const unit = options.unit ?? 1.5, columns = Math.ceil(width / unit), depth = unit * 2.1, base = options.base ?? height(x,z);
    for (let i = 0; i < columns; i++) {
      const t = i / (columns - 1) * (profile.length - 1);
      const index = Math.min(profile.length - 2, Math.floor(t));
      const summit = THREE.MathUtils.lerp(profile[index], profile[index + 1], t - index) * tall;
      for (let shelf = 0; shelf < 11; shelf++) {
        const strength = [.055,.12,.23,.37,.53,.69,.83,.94,1,.92,.74][shelf];
        const h = Math.max(unit, Math.round(summit * strength / unit) * unit);
        const xx = x + (i - columns / 2) * unit;
        const zz = z - shelf * depth + Math.round(Math.sin(i * .41) * 2) * 1.3;
        if (options.constrain !== false && !islandContains(xx,zz)) continue;
        const color = new THREE.Color(tint).multiplyScalar([.94, 1.03, .98, 1.07][(i + shelf) % 4]);
        const cap = snow && h > tall * .55 && shelf > 0 ? Math.max(unit,Math.round((h-tall*.55)/unit)*unit) : 0;
        blocks.push({x:xx,y:base+(h-cap)/2,z:zz,w:unit+.035,h:h-cap,d:depth+.04,color});
        if (cap) blocks.push({x:xx,y:base+h-cap/2,z:zz,w:unit+.065,h:cap,d:depth+.08,color:new THREE.Color(shelf === 2 ? '#f8ffff' : '#dceef5'),snow:true});
      }
    }
    const transform = new THREE.Object3D();
    for(const isSnow of [false,true]){
      const selected=blocks.filter(b=>Boolean(b.snow)===isSnow);
      if(!selected.length)continue;
      const surface=isSnow?new THREE.MeshLambertMaterial({color:'#ffffff',emissive:'#607b86',emissiveIntensity:.4,flatShading:true}):material('#ffffff');
      const mesh=new THREE.InstancedMesh(cube,surface,selected.length);
      selected.forEach((b,i)=>{transform.position.set(b.x,b.y,b.z);transform.scale.set(b.w,b.h,b.d);transform.updateMatrix();mesh.setMatrixAt(i,transform.matrix);mesh.setColorAt(i,b.color);});
      (options.parent??scene).add(mesh);
    }
  }
  ridge(-10, -36, 65, 28, [.12,.2,.25,.3,.36,.42,.58,.68,1,.78,.65,.48,.35,.28,.2], '#889fa1', true);
  ridge(28, -34, 28, 19, [.15,.37,.3,.55,.64,.59,.86,1,.86,.59,.47,.5,.22], '#96a58f', true);

  // The walking view continues naturally beyond the bounded playable area.
  // Its meadow, far forest and snowy skyline disappear in the map overview.
  const walkingBackdrop=new THREE.Group();scene.add(walkingBackdrop);
  function backdropHeight(x:number,z:number){
    const boundary=(Math.abs(x)/48)**4+(Math.abs(z+11)/53)**4;
    const distant=2.3+.9*Math.sin(x*.035)*Math.cos(z*.04)+Math.max(0,-z-35)*.035;
    return THREE.MathUtils.lerp(height(x,z),distant,THREE.MathUtils.smoothstep(boundary,.95,2.8));
  }
  const outsidePositions:number[]=[],outsideColors:number[]=[],outsideNormals:number[]=[];
  for(let z=-184;z<=74;z+=3)for(let x=-180;x<=180;x+=3){
    if((Math.abs(x)/48)**4+(Math.abs(z+11)/53)**4<.78)continue;
    const c=terrainColor(x,z);
    for(const [dx,dz] of [[-1.5,-1.5],[-1.5,1.5],[1.5,-1.5],[1.5,-1.5],[-1.5,1.5],[1.5,1.5]]){
      const xx=x+dx,zz=z+dz;
      outsidePositions.push(xx,backdropHeight(xx,zz)-.25,zz);outsideColors.push(c.r,c.g,c.b);
      const n=new THREE.Vector3(backdropHeight(xx-.2,zz)-backdropHeight(xx+.2,zz),.4,backdropHeight(xx,zz-.2)-backdropHeight(xx,zz+.2)).normalize();outsideNormals.push(n.x,n.y,n.z);
    }
  }
  const outsideGeometry=new THREE.BufferGeometry();outsideGeometry.setAttribute('position',new THREE.Float32BufferAttribute(outsidePositions,3));outsideGeometry.setAttribute('color',new THREE.Float32BufferAttribute(outsideColors,3));outsideGeometry.setAttribute('normal',new THREE.Float32BufferAttribute(outsideNormals,3));
  const outsideMeadow=new THREE.Mesh(outsideGeometry,new THREE.MeshLambertMaterial({vertexColors:true}));outsideMeadow.receiveShadow=true;walkingBackdrop.add(outsideMeadow);
  ridge(-24,-91,110,64,[.12,.2,.31,.28,.48,.41,.72,.56,.51,1,.87,.66,.74,.5,.61,.35,.4,.21,.15],'#9bb4bb',true,{parent:walkingBackdrop,constrain:false,unit:1.4,base:5});
  ridge(59,-79,64,51,[.1,.22,.38,.29,.56,.7,.64,1,.82,.63,.4,.48,.2,.1],'#8ea7af',true,{parent:walkingBackdrop,constrain:false,unit:1.4,base:5});
  const farTrees:{x:number;z:number;s:number}[]=[];
  for(let i=0;i<330;i++){
    const x=-134+random()*94,z=-133+random()*166;
    if(islandContains(x,z)||x>-45&&z>-64)continue;
    farTrees.push({x,z,s:1.0+random()*1.3});
  }
  const farTrunks=new THREE.InstancedMesh(cube,material('#75664f'),farTrees.length);
  const pineGeometry=new THREE.ConeGeometry(1,1,4);
  const farCrowns=new THREE.InstancedMesh(pineGeometry,material('#ffffff'),farTrees.length*3);
  const treeTransform=new THREE.Object3D();
  farTrees.forEach((t,i)=>{
    const y=backdropHeight(t.x,t.z);treeTransform.position.set(t.x,y+2*t.s,t.z);treeTransform.scale.set(.35*t.s,4*t.s,.35*t.s);treeTransform.updateMatrix();farTrunks.setMatrixAt(i,treeTransform.matrix);
    for(let layer=0;layer<3;layer++){
      const w=(1.8-layer*.36)*t.s;treeTransform.position.set(t.x,y+(2.6+layer*1.27)*t.s,t.z);treeTransform.scale.set(w,3.2*t.s,w);treeTransform.rotation.set(0,Math.PI/4+(i%3)*.13,0);treeTransform.updateMatrix();farCrowns.setMatrixAt(i*3+layer,treeTransform.matrix);farCrowns.setColorAt(i*3+layer,new THREE.Color(['#3e6958','#4d785f','#426c55'][i%3]));
    }
  });walkingBackdrop.add(farTrunks,farCrowns);
  const walkingSky=new THREE.Color('#c5dfe0'),mapSky=new THREE.Color('#f3efde');
  const walkingFog=new THREE.Fog('#c5dfe0',95,230);
  scene.background=walkingSky;scene.fog=walkingFog;earth.visible=stone.visible=islandShadow.visible=false;

  // Continuous ribbons keep hiking paths at a deliberate width. Their
  // elevation follows the same ground function used by walking and raycasts.
  function trailRibbon(curve:THREE.CatmullRomCurve3,parent:THREE.Object3D,outside=false){
    const points=curve.getPoints(240),vertices:number[]=[],normals:number[]=[];
    const edges=points.map((p,i)=>{
      const before=points[Math.max(0,i-1)],after=points[Math.min(points.length-1,i+1)];
      const dx=after.x-before.x,dz=after.z-before.z,length=Math.hypot(dx,dz)||1;
      return [-1,1].map(side=>{const x=p.x-dz/length*1.4*side,z=p.z+dx/length*1.4*side;return new THREE.Vector3(x,(outside?backdropHeight(x,z):height(x,z))+.055,z);});
    });
    for(let i=0;i<edges.length-1;i++)for(const p of [edges[i][0],edges[i][1],edges[i+1][0],edges[i][1],edges[i+1][1],edges[i+1][0]]){
      vertices.push(p.x,p.y,p.z);
      const ground=outside?backdropHeight:height;
      const normal=new THREE.Vector3(ground(p.x-.2,p.z)-ground(p.x+.2,p.z),.4,ground(p.x,p.z-.2)-ground(p.x,p.z+.2)).normalize();normals.push(normal.x,normal.y,normal.z);
    }
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geometry.setAttribute('normal',new THREE.Float32BufferAttribute(normals,3));
    const mesh=new THREE.Mesh(geometry,new THREE.MeshLambertMaterial({color:'#e1bf7f',polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1,side:THREE.DoubleSide}));mesh.receiveShadow=true;parent.add(mesh);
  }
  for(const curve of Object.values(curves))trailRibbon(curve,scene);
  trailRibbon(new THREE.CatmullRomCurve3([new THREE.Vector3(0,0,35),new THREE.Vector3(0,0,50),new THREE.Vector3(0,0,74)]),walkingBackdrop,true);

  // Spruce forest drawn efficiently with instancing; keep paths clear.
  const treePoints: { x: number; z: number; s: number }[] = [];
  for (let i = 0; i < 180; i++) {
    const x = -47 + random() * 88, z = -41 + random() * 77;
    const isForest = x < -12;
    if (!islandContains(x,z)) continue;
    if (!isForest && random() > .07) continue;
    // Distinct groves leave the meadow and route junction deliberately open.
    if (isForest && z > -7 && x > -34) continue;
    if (isForest && Math.sin(x * .21 + z * .12) < -.3) continue;
    if ((x > -28 && x < -12 && z > 0 && z < 19) || (x > 12 && x < 24 && z > -10 && z < 7) || (z > 14 && x > -9 && x < 15) || pathDistance(x, z) < 2.9 || lakeDistance(x, z) < 1.18 || Math.hypot(x + 23, z - 2) < 8.8 || Math.hypot(x - 16.5, z + 9) < 8 || Math.hypot(x - 1, z - 24) < 5) continue;
    treePoints.push({ x, z, s: .55 + random() * .85 });
  }
  treePoints.push({x:-13,z:37,s:1.25},{x:-20,z:31,s:1.05},{x:22,z:35,s:1.25},{x:27,z:21,s:1.1},{x:33,z:29,s:1.0});
  const trunks = new THREE.InstancedMesh(cube, material('#735d45'), treePoints.length);
  const leafGeo = pineGeometry;
  const leaves = new THREE.InstancedMesh(leafGeo, material('#ffffff'), treePoints.length * 3);
  const shadow = new THREE.InstancedMesh(new THREE.CircleGeometry(1, 7), new THREE.MeshBasicMaterial({ color: '#254c37', transparent: true, opacity: .13, depthWrite: false }), treePoints.length);
  const dummy = new THREE.Object3D();
  treePoints.forEach(({ x, z, s }, i) => {
    const y = height(x, z);
    dummy.position.set(x, y + 1.9 * s, z); dummy.rotation.set(0, 0, 0); dummy.scale.set(.3 * s, 3.8 * s, .3 * s); dummy.updateMatrix(); trunks.setMatrixAt(i, dummy.matrix);
    const species=i%3,slender=[1,.83,1.08][species],rise=[1,1.1,.94][species];
    for(let layer=0;layer<3;layer++){
      const w=(1.85-layer*.38)*slender*s;
      dummy.position.set(x,y+(2.65+layer*1.27*rise)*s,z);dummy.scale.set(w,3.2*s,w);dummy.rotation.set(0,Math.PI/4+(i%4)*.11,0);dummy.updateMatrix();leaves.setMatrixAt(i*3+layer,dummy.matrix);
      const foliage=new THREE.Color(['#386653','#46795a','#578957','#4a7859'][i%4]).multiplyScalar(.96+layer*.035);
      leaves.setColorAt(i*3+layer,foliage);
    }
    dummy.position.set(x + 1, y + .07, z + .5); dummy.rotation.set(-Math.PI / 2, 0, 0); dummy.scale.set(1.9 * s, 1.2 * s, 1); dummy.updateMatrix(); shadow.setMatrixAt(i, dummy.matrix);
  }); trunks.castShadow = true; leaves.castShadow = true; scene.add(trunks, leaves, shadow);

  // Meadow flowers, trail rocks, and shoreline boulders.
  const flowers: { x: number; y: number; z: number; color: string; size: number }[] = [];
  for (let i = 0; i < 75; i++) {
    const patch = [[-12, 23], [-15, -6], [19, 1], [7, -19], [-30, 17], [17, -4]][i % 6];
    const angle = random() * Math.PI * 2, radius = Math.sqrt(random()) * 1.35;
    const x = patch[0] + Math.cos(angle) * radius, z = patch[1] + Math.sin(angle) * radius;
    if (!islandContains(x,z) || pathDistance(x, z) < 1.9 || lakeDistance(x, z) < 1.18) continue;
    flowers.push({ x, y: height(x, z), z, color: ['#e8d89c', '#e9ede0', '#e9ede0'][i % 3], size: .09 + random() * .12 });
  }
  const blossom = new THREE.InstancedMesh(cube, material('#ffffff'), flowers.length);
  flowers.forEach((f, i) => { dummy.position.set(f.x, f.y + .15, f.z); dummy.rotation.set(0, 0, 0); dummy.scale.set(f.size, .18, f.size); dummy.updateMatrix(); blossom.setMatrixAt(i, dummy.matrix); blossom.setColorAt(i, new THREE.Color(f.color)); }); scene.add(blossom);
  // Small authored rock outcrops sit at the shore and forest edge.
  for(const [x,z,size] of [[20,2,1.1],[21.4,2.8,.55],[19.1,3,.42],[-16,8,.65],[-17,8.8,.32],[-5.7,28,.4]]){
    const rock=new THREE.Group();rock.position.set(x,height(x,z),z);scene.add(rock);
    box(rock,0,size*.34,0,size*1.3,size*.68,size,'#9da995');
    box(rock,-size*.16,size*.74,-size*.1,size*.8,size*.23,size*.65,'#acb49e');
  }

  // Authored landmarks: a timber cabin, lakeside workshop, lookout and canvas camp.
  // Stepped gables share the mountain terraces' square silhouette.
  function gable(parent: THREE.Object3D, x: number, y: number, z: number, w: number, h: number, d: number, color: string) {
    const group = new THREE.Group(); group.position.set(x,y,z); parent.add(group);
    const count = Math.max(5, Math.round(w / .42)), step = w / count;
    for (let i = 0; i < count; i++) {
      const xx = -w / 2 + step * (i + .5);
      const hh = Math.max(.14, Math.ceil((1 - Math.abs(xx) / (w / 2)) * h / .28) * .28);
      box(group,xx,hh/2,0,step+.025,hh,d,color);
    }
    return group;
  }
  function cabin(x: number, z: number, workshop: boolean) {
    const g = new THREE.Group(); g.position.set(x, height(x, z), z); scene.add(g);
    const wall = workshop ? '#d7c89f' : '#b57c4b', timber = workshop ? '#747e6a' : '#704b36';
    box(g, 0, .15, .7, 6.4, .3, 6.3, '#a9a58b');
    box(g, 0, 2.1, 0, 4.9, 3.8, 4.3, wall);
    for (let i = 0; i < 9; i++) box(g, 0, .55 + i * .39, 2.17, 4.95, .055, .08, timber);
    for (const xx of [-2.42, 2.42]) box(g, xx, 2.15, .03, .24, 3.9, 4.42, timber);
    gable(g, 0, 4, 0, 6.2, 2.3, 5.5, workshop ? '#36726b' : '#704d3d');
    box(g, 0, 4.02, 2.8, 6.3, .18, .17, timber);
    box(g, -.85, 1.55, 2.2, 1.15, 2.5, .12, '#33483c');
    box(g, -.45, 1.45, 2.29, .12, .12, .08, '#d5b76c');
    for (const xx of [.8, 1.8]) {
      box(g, xx, 2.25, 2.22, .78, 1.1, .12, '#edcd85');
      box(g, xx, 2.25, 2.3, .075, 1.14, .08, timber);
      box(g, xx, 2.25, 2.3, .82, .075, .08, timber);
    }
    box(g, 1.35, 1.5, 2.5, 2.2, .25, .55, '#68533a');
    for (let i = 0; i < 6; i++) box(g, .45 + i * .34, 1.8, 2.55, .19, .42, .22, i % 2 ? '#5d8450' : '#819958');
    box(g, 1.5, 5.2, -.9, .75, 2.4, .75, '#9b9d8e');
    box(g, 1.5, 6.44, -.9, 1, .2, 1, '#777f75');
    // Deep porch, two posts, deliberate front steps and a bench.
    box(g, 0, .45, 3, 5.7, .3, 2.4, '#ad9167');
    for (const xx of [-2.6, 2.6]) box(g, xx, 2.1, 3.8, .2, 3.5, .2, timber);
    box(g, 0, 3.85, 3.4, 5.9, .2, 1.7, workshop ? '#417c70' : '#805b42');
    box(g, -.85, .25, 4.35, 2.1, .25, .7, '#c4b088');
    box(g, 1.6, .95, 3.25, 1.7, .18, .65, '#72583d');
    for (const xx of [.95, 2.2]) box(g, xx, .65, 3.25, .14, .55, .4, timber);
    g.scale.setScalar(workshop ? 1.5 : 1.4);
    return g;
  }
  // Srikar's UT Austin connection gives this stop a personal landmark.
  // The stepped limestone shaft and four-sided clock crown reference the Tower.
  const tower=new THREE.Group();tower.position.set(-25,height(-25,0),0);tower.scale.set(1,.8,1);scene.add(tower);
  for(const [w,h,y] of [[11,.3,.15],[9,.4,.5],[7,.45,.925]])box(tower,0,y,0,w,h,w,'#c7b98f');
  box(tower,0,1.5,0,5.6,1.8,5.6,'#d1bd8e');
  box(tower,0,8.7,0,4.3,13.2,4.3,'#d8c69a');
  // Narrow vertical stone fins and darker window recesses establish its height.
  for(const side of [-1,1]){
    box(tower,side*1.8,8.7,2.19,.25,13,.16,'#bca77d');
    box(tower,2.19,8.7,side*1.8,.16,13,.25,'#bca77d');
  }
  for(let row=0;row<6;row++)for(const xx of [-.9,.9]){
    box(tower,xx,4+row*1.65,2.17,.32,.85,.06,'#8a8c76');
    box(tower,2.17,4+row*1.65,xx,.06,.85,.32,'#8a8c76');
  }
  box(tower,0,15.4,0,5.1,.5,5.1,'#b8a47c');
  box(tower,0,17.65,0,4.9,4.1,4.9,'#dfcda0');
  function towerClock(rotation:number){
    const clock=new THREE.Group();clock.position.y=17.7;clock.rotation.y=rotation;tower.add(clock);
    box(clock,0,0,2.49,2.9,2.9,.1,'#ad9769');
    box(clock,0,0,2.56,2.56,2.56,.1,'#f2e6bd');
    for(const [xx,yy,w,h] of [[0,1.03,.13,.3],[0,-1.03,.13,.3],[-1.03,0,.3,.13],[1.03,0,.3,.13]])box(clock,xx,yy,2.63,w,h,.06,'#645c43');
    const hour=box(clock,-.28,.22,2.7,.16,.85,.07,'#645c43');hour.rotation.z=.9;
    const minute=box(clock,.35,.35,2.71,.12,1.1,.07,'#645c43');minute.rotation.z=-.78;
    box(clock,0,0,2.74,.2,.2,.08,'#645c43');
  }
  for(const rotation of [0,Math.PI/2,Math.PI,-Math.PI/2])towerClock(rotation);
  box(tower,0,19.95,0,5.4,.5,5.4,'#bca879');
  box(tower,0,20.6,0,4.2,.8,4.2,'#d6bf8d');
  box(tower,0,21.3,0,3.2,.65,3.2,'#d9c695');
  for(const xx of [-1.75,1.75])for(const zz of [-1.75,1.75])box(tower,xx,21.25,zz,.5,1.7,.5,'#c8b27f');
  box(tower,0,2.05,2.86,1.5,2.3,.1,'#665d45');
  cabin(16.5,-9,true);
  // An open workbench at the lakeside project studio.
  const benchY=height(13,-3);
  box(scene,13,benchY+1,-3,3.5,.25,1.4,'#bc9965');
  for(const xx of [11.6,14.4])box(scene,xx,benchY+.5,-3,.2,1,.9,'#6d6550');
  box(scene,13,benchY+1.65,-3.3,1.1,1.1,.15,'#354f4a');
  box(scene,13,benchY+1.62,-3.2,.85,.72,.06,'#9dc3b2');
  box(scene,13,benchY+1.16,-2.8,1.5,.07,.5,'#53665b');
  // The project trail meets a short timber approach to the workshop porch.
  for(let i=0;i<8;i++)groundBox(16,-.2-i*.45,2.5,.12,.39,'#b8a178',.015);
  // Campus paving joins the walking trail to the tower's stone plinth.
  for(let i=0;i<5;i++)groundBox(-20.8-i*.65,4.7-i*.22,.6,.1,1.05,'#c8bc93',.01);

  // Dock planks and a single small rowboat make the lake a destination.
  for (let i = 0; i < 16; i++) box(scene, 18.8 + i * .45, 1, -7.8, .4, .22, 2.2, '#bba17a');
  for (const xx of [21, 25.3]) for (const zz of [-8.75, -6.85]) box(scene, xx, .7, zz, .18, 2.2, .18, '#786347');
  const boat = new THREE.Group(); boat.position.set(25.2, .45, -10.3); boat.rotation.y = -.25; scene.add(boat);
  box(boat, 0, .08, 0, 1.1, .18, 2.8, '#a6653e');
  for (const xx of [-.56, .56]) box(boat, xx, .36, 0, .13, .5, 2.9, '#b57c49');
  for (const zz of [-.7, .65]) box(boat, 0, .5, zz, 1.1, .12, .27, '#d4b37b');
  // The high lookout has a distinct red trail marker and viewing telescope.
  const sy = height(-1, -29);
  for (let i = 0; i < 12; i++) box(scene, -3.75 + i * .5, sy + .16, -30, .45, .2, 4, '#b49e76');
  for (const x of [-3.8, -1, 2]) box(scene, x, sy + .9, -32, .18, 1.8, .18, '#76634a');
  box(scene, -1, sy + 1.4, -32, 5.8, .14, .14, '#76634a');
  box(scene, -.8, sy + 1.1, -30.5, .16, 2.1, .16, '#57726a');
  const telescope = box(scene, -.8, sy + 2.1, -30.5, .4, .45, 1.5, '#465e58'); telescope.rotation.x = -.25;
  box(scene, 2.5, sy + 2.8, -30.7, .12, 5.6, .12, '#d4c6a1');
  box(scene, 3.2, sy + 4.7, -30.7, 1.4, .85, .12, '#b76143');
  // A canvas A-frame has broad lit fabric planes and a real triangular entry.
  const tent=new THREE.Group();tent.position.set(-7,height(-7,29),29);tent.rotation.y=.2;tent.scale.setScalar(.8);scene.add(tent);
  box(tent,0,.08,0,4.8,.12,4.3,'#9c956c');
  const tentVertices=[
    -2.2,.2,-1.9,0,2.8,-1.9,0,2.8,1.9,-2.2,.2,-1.9,0,2.8,1.9,-2.2,.2,1.9,
    2.2,.2,-1.9,2.2,.2,1.9,0,2.8,1.9,2.2,.2,-1.9,0,2.8,1.9,0,2.8,-1.9,
    -2.2,.2,-1.9,2.2,.2,-1.9,0,2.8,-1.9,
    -2.2,.2,1.9,0,2.8,1.9,2.2,.2,1.9,
  ];
  const canvasGeometry=new THREE.BufferGeometry();canvasGeometry.setAttribute('position',new THREE.Float32BufferAttribute(tentVertices,3));canvasGeometry.computeVertexNormals();
  const canvasMesh=new THREE.Mesh(canvasGeometry,new THREE.MeshLambertMaterial({color:'#d17d3e',flatShading:true,side:THREE.DoubleSide}));canvasMesh.castShadow=true;canvasMesh.receiveShadow=true;tent.add(canvasMesh);
  const openingGeometry=new THREE.BufferGeometry();openingGeometry.setAttribute('position',new THREE.Float32BufferAttribute([-1.3,.23,1.915,1.3,.23,1.915,0,2.32,1.915],3));openingGeometry.computeVertexNormals();
  tent.add(new THREE.Mesh(openingGeometry,new THREE.MeshBasicMaterial({color:'#273f36',side:THREE.DoubleSide})));
  box(tent,0,2.82,0,.08,.08,4,'#e0c392');
  for(const xx of [-2.85,2.85]){
    box(tent,xx,.18,2.3,.12,.36,.12,'#756045');
    const rope=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(xx,0,2.3),new THREE.Vector3(xx<0?-2.2:2.2,.5,1.9)]);tent.add(new THREE.Line(rope,new THREE.LineBasicMaterial({color:'#d7c091'})));
  }
  const bedroll=new THREE.Mesh(new THREE.CylinderGeometry(.29,.29,1.7,8),material('#426f62'));bedroll.rotation.z=Math.PI/2;bedroll.position.set(-1.1,.38,2.6);bedroll.castShadow=true;tent.add(bedroll);
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; groundBox(-3 + Math.cos(a) * .9, 26 + Math.sin(a) * .9, .45, .3, .4, '#90917b'); }
  const flame = groundBox(-3, 26, .32, .6, .32, '#e3a751');
  groundBox(-3, 28, 2.5, .35, .5, '#8b7250');
  groundBox(-5, 25, .45, .45, 2.4, '#83694c');


  // A warm gold mailbox makes the fireside contact stop recognizable.
  const mailY=height(-7.5,24);
  box(scene,-7.5,mailY+.8,24,.22,1.6,.22,'#806747');
  box(scene,-7.5,mailY+1.7,24,1.3,.85,.9,'#ce9c42');
  box(scene,-7.5,mailY+1.72,24.47,1.1,.67,.06,'#b58137');
  box(scene,-7.5,mailY+1.95,24.51,.55,.09,.04,'#69543a');
  box(scene,-6.8,mailY+2.15,24,.1,.85,.1,'#c36b44');
  box(scene,-6.6,mailY+2.5,24,.45,.18,.1,'#c36b44');

  // Dimensional wayfinding belongs to the scene. The bitmap lettering uses
  // our own five-by-seven glyphs, so it stays crisp without a browser font.
  const glyphs:Record<string,string[]>={
    A:['01110','10001','10001','11111','10001','10001','10001'],
    B:['11110','10001','10001','11110','10001','10001','11110'],
    C:['01111','10000','10000','10000','10000','10000','01111'],
    E:['11111','10000','10000','11110','10000','10000','11111'],
    I:['11111','00100','00100','00100','00100','00100','11111'],
    J:['00111','00010','00010','00010','10010','10010','01100'],
    L:['10000','10000','10000','10000','10000','10000','11111'],
    N:['10001','11001','11001','10101','10011','10011','10001'],
    O:['01110','10001','10001','10001','10001','10001','01110'],
    P:['11110','10001','10001','11110','10000','10000','10000'],
    R:['11110','10001','10001','11110','10100','10010','10001'],
    S:['01111','10000','10000','01110','00001','00001','11110'],
    T:['11111','00100','00100','00100','00100','00100','00100'],
    U:['10001','10001','10001','10001','10001','10001','01110'],
    V:['10001','10001','10001','10001','10001','01010','00100'],
  };
  const signs={} as Record<StopId,{group:THREE.Group;width:number;height:number}>;
  for(const [key,label] of Object.entries({about:'ABOUT',projects:'PROJECTS',summit:'TRAVEL',contact:'CONTACT'})){
    const id=key as StopId,stop=stops[id],w=id==='contact'?2.9:label.length*.65+1.2,h=id==='contact'?1.3:2.3;
    const sign=new THREE.Group();sign.position.set(stop.x,height(stop.x,stop.z),stop.z);sign.rotation.y=Math.atan2(38,75);scene.add(sign);
    box(sign,0,1.4,0,.28,2.8,.28,'#8c6b44');
    box(sign,0,3.0,0,w,h,.44,'#997448');
    box(sign,0,3.0,-.25,w-.3,h-.3,.15,'#775a3c');
    const bitmap=document.createElement('canvas');bitmap.width=label.length*6+5;bitmap.height=13;
    const ink=bitmap.getContext('2d')!;ink.fillStyle=id==='contact'?'#c9b982':'#eddfb4';ink.fillRect(0,0,bitmap.width,bitmap.height);ink.fillStyle='#355246';
    for(let i=0;i<label.length;i++)glyphs[label[i]].forEach((row,y)=>[...row].forEach((pixel,x)=>{if(pixel==='1')ink.fillRect(3+i*6+x,3+y,1,1);}));
    const texture=new THREE.CanvasTexture(bitmap);texture.magFilter=THREE.NearestFilter;texture.minFilter=THREE.NearestFilter;texture.generateMipmaps=false;texture.colorSpace=THREE.SRGBColorSpace;
    const face=new THREE.Mesh(new THREE.PlaneGeometry(w-.45,h-.45),new THREE.MeshBasicMaterial({map:texture,toneMapped:false}));face.position.set(0,3.0,.235);sign.add(face);
    for(const xx of [-w/2+.35,w/2-.35])box(sign,xx,3.0,.25,.12,.12,.06,'#786348');
    signs[id]={group:sign,width:w,height:h};
  }
  const campusPlaque=document.createElement('canvas');campusPlaque.width=59;campusPlaque.height=11;
  const plaqueInk=campusPlaque.getContext('2d')!;plaqueInk.fillStyle='#ddc28b';plaqueInk.fillRect(0,0,59,11);plaqueInk.fillStyle='#654a2d';
  for(const [i,char]of [...'UT AUSTIN'].entries())if(char!==' ')glyphs[char].forEach((row,y)=>[...row].forEach((pixel,x)=>{if(pixel==='1')plaqueInk.fillRect(3+i*6+x,2+y,1,1);}));
  const plaqueTexture=new THREE.CanvasTexture(campusPlaque);plaqueTexture.magFilter=plaqueTexture.minFilter=THREE.NearestFilter;plaqueTexture.generateMipmaps=false;plaqueTexture.colorSpace=THREE.SRGBColorSpace;
  const campusName=new THREE.Mesh(new THREE.PlaneGeometry(6.8,1.05),new THREE.MeshBasicMaterial({map:plaqueTexture,toneMapped:false}));campusName.position.set(0,.75,5.57);tower.add(campusName);
  document.body.classList.add('physical-signs');

  // Pixel boy with articulated limbs, hair, boots, and a rust-orange backpack.
  const player = new THREE.Group(); player.rotation.y=Math.PI; scene.add(player); player.position.set(trailhead.x,height(trailhead.x,trailhead.z),trailhead.z);
  const body = new THREE.Group(); body.scale.setScalar(3.0); player.add(body);
  box(body, 0, 1.16, 0, .66, .69, .4, '#b8583d'); box(body, 0, 1.78, 0, .55, .56, .48, '#c4916b');
  box(body, 0, 2.04, -.02, .59, .2, .52, '#524137'); box(body, 0, 1.85, -.24, .58, .28, .08, '#524137'); box(body, -.23, 1.88, .19, .12, .2, .09, '#524137');
  box(body, -.14, 1.78, .245, .055, .06, .025, '#302e25'); box(body, .14, 1.78, .245, .055, .06, .025, '#302e25');
  box(body, 0, 1.17, -.31, .53, .56, .26, '#e1ae4d'); box(body, 0, 1.21, -.46, .34, .23, .08, '#f1c966');
  const leftLeg = new THREE.Group(), rightLeg = new THREE.Group(), leftArm = new THREE.Group(), rightArm = new THREE.Group();
  leftLeg.position.set(-.19, .84, 0); rightLeg.position.set(.19, .84, 0); leftArm.position.set(-.43, 1.42, 0); rightArm.position.set(.43, 1.42, 0); body.add(leftLeg, rightLeg, leftArm, rightArm);
  [leftLeg, rightLeg].forEach(g => { box(g, 0, -.32, 0, .24, .6, .28, '#364f6b'); box(g, 0, -.65, .06, .27, .19, .4, '#524939'); });
  [leftArm, rightArm].forEach(g => { box(g, 0, -.19, 0, .22, .4, .3, '#b8583d'); box(g, 0, -.46, 0, .19, .17, .23, '#c4916b'); });
  const playerShadow = new THREE.Mesh(new THREE.CircleGeometry(1.15, 12), new THREE.MeshBasicMaterial({ color: '#283f2c', transparent: true, opacity: .24, depthWrite: false })); playerShadow.rotation.x = -Math.PI / 2; scene.add(playerShadow);

  const projected = new THREE.Vector3();
  const pins = [...document.querySelectorAll<HTMLButtonElement>('[data-pin]')];
  const map = $<HTMLCanvasElement>('map'); const mapCtx = map.getContext('2d')!;
  const panel = $<HTMLDialogElement>('panel'), guide = $<HTMLDialogElement>('guide');
  let width = innerWidth, viewHeight = innerHeight;
  let cameraTarget = new THREE.Vector3(trailhead.x,height(trailhead.x,trailhead.z),trailhead.z);
  let frame = 0;
  function resize() {
    width = innerWidth; viewHeight = innerHeight;
    const pixelScale = width < 700 ? 1.5 : 1.6;
    renderer.setSize(Math.ceil(width / pixelScale), Math.ceil(viewHeight / pixelScale), false);
    const span = width < 700 ? 72 : 104;
    const aspect = width / viewHeight;
    overviewCamera.left=-span*aspect/2;overviewCamera.right=span*aspect/2;overviewCamera.top=span/2;overviewCamera.bottom=-span/2;overviewCamera.updateProjectionMatrix();
    walkingCamera.aspect=aspect;walkingCamera.fov=width<700?68:58;walkingCamera.updateProjectionMatrix();
  }
  addEventListener('resize', resize); resize();
  const visited = new Set<string>();
  try {
    const saved = JSON.parse(sessionStorage.getItem('srikar-trail-position') || 'null');
    if (saved && Number.isFinite(saved.x) && Number.isFinite(saved.z) && walkable(saved.x, saved.z)) {
      player.position.set(saved.x, height(saved.x, saved.z) + .13, saved.z);
      cameraTarget.copy(player.position);
      for (const id of saved.visited || []) if (id in stops) visited.add(id);
      moved = true; $('intro').classList.add('hidden');
    }
  } catch { /* Walking also works when browser storage is unavailable. */ }
  addEventListener('pagehide', () => {
    try { sessionStorage.setItem('srikar-trail-position', JSON.stringify({ x: player.position.x, z: player.position.z, visited: [...visited] })); } catch { /* Storage is optional. */ }
  });
  function openStop(id: StopId) {
    const s = stops[id]; visited.add(id); keys.clear(); route = [];
    $('panel-kicker').textContent = s.label; $('panel-title').textContent = s.title; $('panel-text').textContent = s.description; $('panel-note').textContent = s.note; $('panel-note').hidden = !s.note;
    const projectPanel = $('panel-projects');
    projectPanel.replaceChildren();
    projectPanel.hidden = id !== 'projects';
    if (id === 'projects') {
      const list = document.createElement('ul');
      for (const project of projects.filter(item => item.featured)) {
        const item = document.createElement('li');
        const projectLink = document.createElement('a');
        projectLink.href = `/work/${project.id}`;
        projectLink.textContent = project.title;
        const summary = document.createElement('p');
        summary.textContent = project.summary;
        item.append(projectLink, summary); list.append(item);
      }
      projectPanel.append(list);
    }
    const link = $<HTMLAnchorElement>('panel-link'); link.hidden = !s.link; link.href = s.link || '#'; link.textContent = s.linkText;
    if (!panel.open) panel.showModal();
  }
  function dismissIntro() { if (!moved) { moved = true; $('intro').classList.add('hidden'); } }
  function go(id: StopId) {
    if (!(id in stops)) return;
    panel.close(); guide.close(); dismissIntro(); keys.clear();
    if (Math.hypot(player.position.x - stops[id].x, player.position.z - stops[id].z) < 3.5) { openStop(id); return; }
    // Follow the connected path network via its nearest sampled point.
    const destination = curves[id].getPoints(100).map(p => new THREE.Vector2(p.x, p.z));
    let best = { id: 'contact' as StopId, index: 0, distance: Infinity };
    const all = Object.entries(curves).map(([key, curve]) => ({ id: key as StopId, points: curve.getPoints(100) }));
    for (const branch of all) branch.points.forEach((p, index) => { const distance = Math.hypot(p.x - player.position.x, p.z - player.position.z); if (distance < best.distance) best = { id: branch.id, index, distance }; });
    if (best.id === id) route = destination.slice(best.index);
    else {
      const current = all.find(b => b.id === best.id)!;
      const back = current.points.slice(0, best.index + 1).reverse().map(p => new THREE.Vector2(p.x, p.z));
      // Shared path points allow a shorter turn onto the other trail.
      let joinA = back.length - 1, joinB = 0;
      outer: for (let a = 0; a < back.length; a++) for (let b = destination.length - 1; b >= 0; b--) if (back[a].distanceTo(destination[b]) < .8) { joinA = a; joinB = b; break outer; }
      route = [...back.slice(0, joinA + 1), ...destination.slice(joinB)];
    }
    routeName = id; $('status').textContent = `Following the trail to ${stops[id].label.toLowerCase()} · Esc to stop`;
  }
  document.querySelectorAll<HTMLButtonElement>('[data-go]').forEach(b => b.addEventListener('click', () => go(b.dataset.go as StopId)));
  document.querySelectorAll<HTMLButtonElement>('dialog .close').forEach(b => b.addEventListener('click', () => b.closest('dialog')?.close()));
  for (const dialog of [panel, guide]) dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  $('map-toggle').addEventListener('click', () => { overview = !overview; camera = overview ? overviewCamera : walkingCamera; walkingBackdrop.visible=!overview; earth.visible=stone.visible=islandShadow.visible=overview;scene.background=overview?mapSky:walkingSky;scene.fog=overview?null:walkingFog; const mapPanel = $('minimap'); mapPanel.hidden = !overview; $('map-toggle').setAttribute('aria-expanded', String(overview)); $('map-toggle').textContent = overview ? 'Walk' : 'Map'; });
  $('map-button').addEventListener('click', () => { keys.clear(); guide.showModal(); });
  $('reset').addEventListener('click', () => { guide.close(); routeName = ''; route = []; keys.clear(); player.position.set(trailhead.x,height(trailhead.x,trailhead.z),trailhead.z); player.rotation.y=Math.PI; cameraTarget.copy(player.position); $('status').textContent = ''; });
  $('interact').addEventListener('click', () => { if (nearby) openStop(nearby as StopId); });
  const movementKeys = ['w', 'a', 's', 'd', 'arrowup', 'arrowleft', 'arrowdown', 'arrowright', 'shift'];
  addEventListener('keydown', e => {
    const k = e.key.toLowerCase();
    if (k === 'escape') { route = []; routeName = ''; keys.clear(); $('status').textContent = ''; return; }
    if (panel.open || guide.open || (e.target instanceof HTMLElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName))) return;
    if (movementKeys.includes(k)) { e.preventDefault(); keys.add(k); route = []; routeName = ''; $('status').textContent = ''; dismissIntro(); }
    if (k === 'e' && nearby) openStop(nearby as StopId);
  });
  addEventListener('keyup', e => keys.delete(e.key.toLowerCase()));
  addEventListener('blur', () => keys.clear());
  document.addEventListener('visibilitychange', () => { active = !document.hidden; keys.clear(); });
  document.querySelectorAll<HTMLButtonElement>('[data-key]').forEach(b => {
    b.addEventListener('pointerdown', e => { e.preventDefault(); b.setPointerCapture(e.pointerId); keys.add(b.dataset.key!.toLowerCase()); route = []; dismissIntro(); });
    const up = () => keys.delete(b.dataset.key!.toLowerCase()); b.addEventListener('pointerup', up); b.addEventListener('pointercancel', up); b.addEventListener('lostpointercapture', up);
  });
  const raycaster = new THREE.Raycaster();
  canvas.addEventListener('pointerdown', e => {
    if (panel.open || guide.open) return;
    canvas.focus({ preventScroll: true });
    raycaster.setFromCamera(new THREE.Vector2(e.clientX / width * 2 - 1, -e.clientY / viewHeight * 2 + 1), camera);
    const hit = raycaster.intersectObject(terrainMesh)[0];
    if (hit && walkable(hit.point.x, hit.point.z)) {
      route = [new THREE.Vector2(hit.point.x, hit.point.z)]; routeName = ''; dismissIntro(); $('status').textContent = 'Walking there · Esc to stop';
    }
  });

  function drawMap() {
    const ctx = mapCtx, sx = (x: number) => 140 + x * 2.65, sz = (z: number) => 124 + z * 2.65;
    ctx.clearRect(0, 0, 280, 260); ctx.fillStyle = '#dce5cf'; ctx.fillRect(0, 0, 280, 260);
    ctx.fillStyle = '#9baf92'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(112, 0); ctx.lineTo(98, 110); ctx.lineTo(118, 175); ctx.lineTo(60, 260); ctx.lineTo(0, 260); ctx.fill();
    ctx.fillStyle = '#92c5c3'; ctx.beginPath(); ctx.ellipse(sx(29), sz(-14), 37, 50, -.1, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#b2bda3'; ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(100 + i * 18, 35); ctx.lineTo(115 + i * 18, 8); ctx.lineTo(133 + i * 18, 35); ctx.stroke(); }
    ctx.strokeStyle = '#faf2d6'; ctx.lineWidth = 4; ctx.lineJoin = 'round';
    Object.values(curves).forEach(c => { ctx.beginPath(); c.getPoints(60).forEach((p, i) => i ? ctx.lineTo(sx(p.x), sz(p.z)) : ctx.moveTo(sx(p.x), sz(p.z))); ctx.stroke(); });
    Object.entries(stops).forEach(([id, s]) => { ctx.fillStyle = visited.has(id) ? '#4e795c' : '#9e7650'; ctx.fillRect(sx(s.x) - 3, sz(s.z) - 3, 6, 6); });
    ctx.fillStyle = '#b75c35'; ctx.strokeStyle = '#fffdf0'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(sx(player.position.x), sz(player.position.z), 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  }
  let last = performance.now();
  function animate(now: number) {
    requestAnimationFrame(animate);
    const dt = Math.min((now - last) / 1000, .05); last = now;
    if (!active) return;
    elapsed += dt;
    const direction = new THREE.Vector2();
    if (!panel.open && !guide.open) {
      const horizontal = Number(keys.has('d') || keys.has('arrowright')) - Number(keys.has('a') || keys.has('arrowleft'));
      const vertical = Number(keys.has('s') || keys.has('arrowdown')) - Number(keys.has('w') || keys.has('arrowup'));
      // Screen-relative movement matches the fixed three-quarter camera.
      const yaw=overview?Math.atan2(38,75):0;
      direction.set(horizontal*Math.cos(yaw)+vertical*Math.sin(yaw),-horizontal*Math.sin(yaw)+vertical*Math.cos(yaw));
      if (!direction.lengthSq() && route.length) {
        while (route.length && route[0].distanceTo(new THREE.Vector2(player.position.x, player.position.z)) < .45) route.shift();
        if (route.length) direction.copy(route[0]).sub(new THREE.Vector2(player.position.x, player.position.z));
        else { const arrived = routeName; routeName = ''; $('status').textContent = ''; if (arrived) openStop(arrived as StopId); }
      }
    }
    let walking = false;
    if (direction.lengthSq() > .0001) {
      direction.normalize(); const speed = keys.has('shift') ? 9 : 5.5;
      const nx = player.position.x + direction.x * speed * dt, nz = player.position.z + direction.y * speed * dt;
      if (walkable(nx, nz)) { player.position.x = nx; player.position.z = nz; walking = true; }
      else {
        if (walkable(nx, player.position.z)) { player.position.x = nx; walking = true; }
        if (walkable(player.position.x, nz)) { player.position.z = nz; walking = true; }
        if (route.length) { route = []; routeName = ''; $('status').textContent = 'That way is blocked. Try a signpost to follow the trail.'; }
      }
      if(walking){const targetAngle=Math.atan2(direction.x,direction.y);const turn=Math.atan2(Math.sin(targetAngle-player.rotation.y),Math.cos(targetAngle-player.rotation.y));player.rotation.y+=turn*(1-Math.exp(-dt*13));}
    }
    player.position.y = height(player.position.x, player.position.z) - .22;
    const step = walking ? Math.sin(elapsed * (keys.has('shift') ? 15 : 11)) * .55 : 0;
    leftLeg.rotation.x = step; rightLeg.rotation.x = -step; leftArm.rotation.x = -step * .7; rightArm.rotation.x = step * .7;
    body.position.y = walking ? Math.abs(Math.sin(elapsed * 11)) * .08 : 0;
    playerShadow.position.set(player.position.x, height(player.position.x, player.position.z) + .035, player.position.z);
    const follow = 1 - Math.exp(-dt * (reducedMotion ? 14 : 4)); cameraTarget.lerp(player.position, follow);
    const centerX = width < 700 ? cameraTarget.x : -5 + cameraTarget.x * .15;
    const centerZ = width < 700 ? cameraTarget.z - 8 : -10 + (cameraTarget.z - trailhead.z) * .12;
    if(overview){
      camera.position.set(centerX+38,64,centerZ+75);
      camera.lookAt(centerX,2,centerZ);
    } else {
      camera.position.set(cameraTarget.x,cameraTarget.y+11.5,cameraTarget.z+25);
      camera.lookAt(cameraTarget.x,cameraTarget.y+8,cameraTarget.z-12);
    }
    if (!reducedMotion) {
      glints.forEach((g, i) => { g.scale.x = .6 + Math.sin(elapsed * .6 + i * .7) * .3; });
      flame.scale.y = .5 + Math.sin(elapsed * 7) * .1;
    }
    let closest = '', closestDistance = 3.5;
    Object.entries(stops).forEach(([id, stop]) => { const d = Math.hypot(stop.x - player.position.x, stop.z - player.position.z); if (d < closestDistance) { closestDistance = d; closest = id; } });
    nearby = closest;
    const interact = $<HTMLButtonElement>('interact'); interact.hidden = !nearby || panel.open || guide.open;
    if (nearby) {
      interact.textContent = `E · ${stops[nearby as StopId].linkText}`;
      projected.copy(player.position).project(camera);
      interact.style.left = `${Math.max(110, Math.min(width - 110, (projected.x * .5 + .5) * width))}px`;
      interact.style.top = `${Math.min(viewHeight - 160, (-projected.y * .5 + .5) * viewHeight + 24)}px`;
    }
    $('location').textContent = nearby ? stops[nearby as StopId].region : player.position.x < -10 ? 'Forest trail' : player.position.z < -14 ? 'High meadows' : player.position.x > 10 ? 'Lakeside workshop' : 'Base camp';
    pins.forEach(pin => {
      const id=pin.dataset.pin as StopId,sign=signs[id];
      const corners=[[-sign.width/2,3.0-sign.height/2],[sign.width/2,3.0-sign.height/2],[-sign.width/2,3.0+sign.height/2],[sign.width/2,3.0+sign.height/2]].map(([x,y])=>sign.group.localToWorld(new THREE.Vector3(x,y,.25)).project(camera));
      const xs=corners.map(p=>(p.x*.5+.5)*width),ys=corners.map(p=>(-p.y*.5+.5)*viewHeight);
      const left=Math.min(...xs),right=Math.max(...xs),top=Math.min(...ys),bottom=Math.max(...ys);
      const px=(left+right)/2,py=(top+bottom)/2;
      pin.style.width=`${Math.ceil(right-left+8)}px`;pin.style.height=`${Math.max(44,Math.ceil(bottom-top+8))}px`;pin.style.padding='0';
      pin.style.transform=`translate(${Math.round(px)}px,${Math.round(py)}px) translate(-50%,-50%)`;
      pin.hidden=id===nearby||corners[0].z>1||right<0||left>width||bottom<85||top>viewHeight-65;
      pin.classList.toggle('near',id===nearby);
    });
    if (frame++ % 4 === 0) drawMap();
    renderer.render(scene, camera);
  }
  requestAnimationFrame(animate);
  $('loading').classList.add('done');
  // Debug readout supports meaningful movement and routing checks without exposing internals in the UI.
  Object.defineProperty(window, '__trailState', { get: () => ({ x: player.position.x, z: player.position.z, nearby, walkingRoute: route.length, visited: [...visited], heading:player.rotation.y, overview, view:overview?'map':'walk', webgl: true }) });
  renderer.domElement.addEventListener('webglcontextlost', e => { e.preventDefault(); document.body.classList.add('no-webgl'); $('loading').classList.add('done'); });
}
try { boot(); } catch (error) {
  console.error('Trail world could not start', error); document.body.classList.add('no-webgl'); $('loading').classList.add('done');
}
