import { build } from 'esbuild';
await build({ entryPoints: ['src/trail/client.ts'], outfile: 'src/trail/client.bundle.js', bundle: true, minify: true, format: 'esm', target: 'es2022', legalComments: 'eof' });
