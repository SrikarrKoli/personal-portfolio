-- EmDash 1.3.1 baseline schema (90 core migrations)
PRAGMA defer_foreign_keys = ON;
DROP TABLE IF EXISTS "_emdash_404_log";
DROP TABLE IF EXISTS "_emdash_api_tokens";
DROP TABLE IF EXISTS "_emdash_authorization_codes";
DROP TABLE IF EXISTS "_emdash_block_type_versions";
DROP TABLE IF EXISTS "_emdash_block_types";
DROP TABLE IF EXISTS "_emdash_byline_field_group_values";
DROP TABLE IF EXISTS "_emdash_byline_field_values";
DROP TABLE IF EXISTS "_emdash_byline_fields";
DROP TABLE IF EXISTS "_emdash_bylines";
DROP TABLE IF EXISTS "_emdash_collections";
DROP TABLE IF EXISTS "_emdash_comment_reactions";
DROP TABLE IF EXISTS "_emdash_comments";
DROP TABLE IF EXISTS "_emdash_content_bylines";
DROP TABLE IF EXISTS "_emdash_content_references";
DROP TABLE IF EXISTS "_emdash_cron_tasks";
DROP TABLE IF EXISTS "_emdash_device_codes";
DROP TABLE IF EXISTS "_emdash_entry_locks";
DROP TABLE IF EXISTS "_emdash_fields";
DROP TABLE IF EXISTS "_emdash_media_upload_attempts";
DROP TABLE IF EXISTS "_emdash_media_usage";
DROP TABLE IF EXISTS "_emdash_media_usage_activation";
DROP TABLE IF EXISTS "_emdash_media_usage_cleanup";
DROP TABLE IF EXISTS "_emdash_media_usage_cleanup_fence";
DROP TABLE IF EXISTS "_emdash_media_usage_collection_deletions";
DROP TABLE IF EXISTS "_emdash_media_usage_generation_writes";
DROP TABLE IF EXISTS "_emdash_media_usage_index_status";
DROP TABLE IF EXISTS "_emdash_media_usage_reconciliations";
DROP TABLE IF EXISTS "_emdash_media_usage_sources";
DROP TABLE IF EXISTS "_emdash_media_usage_work";
DROP TABLE IF EXISTS "_emdash_menu_items";
DROP TABLE IF EXISTS "_emdash_menus";
DROP TABLE IF EXISTS "_emdash_migrations";
DROP TABLE IF EXISTS "_emdash_migrations_lock";
DROP TABLE IF EXISTS "_emdash_oauth_clients";
DROP TABLE IF EXISTS "_emdash_oauth_tokens";
DROP TABLE IF EXISTS "_emdash_rate_limits";
DROP TABLE IF EXISTS "_emdash_redirect_artifacts";
DROP TABLE IF EXISTS "_emdash_redirect_generation_artifacts";
DROP TABLE IF EXISTS "_emdash_redirect_state";
DROP TABLE IF EXISTS "_emdash_redirect_write_lock";
DROP TABLE IF EXISTS "_emdash_redirects";
DROP TABLE IF EXISTS "_emdash_relations";
DROP TABLE IF EXISTS "_emdash_revision_prune_queue";
DROP TABLE IF EXISTS "_emdash_sections";
DROP TABLE IF EXISTS "_emdash_seo";
DROP TABLE IF EXISTS "_emdash_taxonomy_def_groups";
DROP TABLE IF EXISTS "_emdash_taxonomy_defs";
DROP TABLE IF EXISTS "_emdash_transfer_approvals";
DROP TABLE IF EXISTS "_emdash_transfer_identity_map";
DROP TABLE IF EXISTS "_emdash_transfer_media_blobs";
DROP TABLE IF EXISTS "_emdash_transfer_operations";
DROP TABLE IF EXISTS "_emdash_transfer_package_index";
DROP TABLE IF EXISTS "_emdash_transfer_staged_files";
DROP TABLE IF EXISTS "_emdash_widget_areas";
DROP TABLE IF EXISTS "_emdash_widgets";
DROP TABLE IF EXISTS "_plugin_indexes";
DROP TABLE IF EXISTS "_plugin_state";
DROP TABLE IF EXISTS "_plugin_storage";
DROP TABLE IF EXISTS "allowed_domains";
DROP TABLE IF EXISTS "audit_logs";
DROP TABLE IF EXISTS "auth_challenges";
DROP TABLE IF EXISTS "auth_tokens";
DROP TABLE IF EXISTS "content_taxonomies";
DROP TABLE IF EXISTS "credentials";
DROP TABLE IF EXISTS "media";
DROP TABLE IF EXISTS "media_folders";
DROP TABLE IF EXISTS "oauth_accounts";
DROP TABLE IF EXISTS "options";
DROP TABLE IF EXISTS "revisions";
DROP TABLE IF EXISTS "taxonomies";
DROP TABLE IF EXISTS "users";

CREATE TABLE IF NOT EXISTS "_emdash_migrations" ("name" varchar(255) not null primary key, "timestamp" varchar(255) not null);
INSERT INTO _emdash_migrations VALUES('001_initial','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('002_media_status','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('003_schema_registry','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('004_plugins','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('005_menus','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('006_taxonomy_defs','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('007_widgets','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('008_auth','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('009_user_disabled','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('011_sections','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('012_search','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('013_scheduled_publishing','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('014_draft_revisions','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('015_indexes','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('016_api_tokens','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('017_authorization_codes','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('018_seo','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('019_i18n','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('020_collection_url_pattern','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('021_remove_section_categories','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('022_marketplace_plugin_state','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('023_plugin_metadata','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('024_media_placeholders','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('025_oauth_clients','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('026_cron_tasks','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('027_comments','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('028_drop_author_url','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('029_redirects','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('030_widen_scheduled_index','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('031_bylines','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('032_rate_limits','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('033_optimize_content_indexes','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('034_published_at_index','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('035_bounded_404_log','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('036_i18n_menus_and_taxonomies','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('037_credential_algorithm','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('038_registry_plugin_state','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('039_fix_fts5_triggers','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('040_byline_i18n','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('041_content_locale_list_index','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('042_byline_fields','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('043_content_references','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('044_comment_reactions','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('045_taxonomy_parent_group','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('046_media_usage_index','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('047_restore_taxonomy_parent_index','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('048_restore_content_taxonomies_term_index','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('049_taxonomies_name_locale_index','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('050_media_usage_index_status','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('051_content_taxonomies_denorm','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('052_media_usage_read_index','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('053_plugin_mcp_tools','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('054_media_upload_attempts','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('055_content_translation_group_locale_index','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('056_taxonomy_term_sort_order','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('057_collection_hidden','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('058_collection_sort_order','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('059_revision_prune_queue','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('060_collection_admin_config','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('061_media_usage_cleanup','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('062_media_usage_cleanup_fence','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('063_media_usage_incremental_work','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('064_fts_plain_text','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('065_media_usage_collection_deletion','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('066_media_usage_reconciliation','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('067_indexed_content_fields','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('068_content_taxonomy_entry_groups','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('069_collection_title_date_fields','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('070_collection_routable','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('071_restore_content_bylines_table','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('072_media_folders','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('073_media_focal_point','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('074_content_deleted_scheduled_index','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('075_entry_edit_locks','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('076_collection_nav_group','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('077_plugin_storage_revisions','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('078_menu_item_translation_groups','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('079_datetime_normalization','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('080_content_translation_locale_unique','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('081_redirect_write_guards','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('082_taxonomy_translation_locale_unique','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('083_block_types','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('084_site_transfer','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('085_taxonomy_def_groups','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('086_relations_structural','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('087_reference_field_relations','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('088_cron_oneshot_utc','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('089_auto_seed_completion','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('090_redirect_enable_loop_guard','2026-06-16T00:00:00.000Z');
INSERT INTO _emdash_migrations VALUES('091_redirect_artifacts','2026-06-16T00:00:00.000Z');
CREATE TABLE IF NOT EXISTS "_emdash_migrations_lock" ("id" varchar(255) not null primary key, "is_locked" integer default 0 not null);
INSERT INTO _emdash_migrations_lock VALUES('migration_lock',0);
CREATE TABLE IF NOT EXISTS "revisions" ("id" text primary key, "collection" text not null, "entry_id" text not null, "data" text not null, "author_id" text, "created_at" text default (datetime('now')));
CREATE TABLE IF NOT EXISTS "media" ("id" text primary key, "filename" text not null, "mime_type" text not null, "size" integer, "width" integer, "height" integer, "alt" text, "caption" text, "storage_key" text not null, "content_hash" text, "created_at" text default (datetime('now')), "author_id" text, "status" text default 'ready' not null, blurhash TEXT, dominant_color TEXT, "folder_id" text references "media_folders" ("id") on delete set null, "focal_x" real, "focal_y" real);
CREATE TABLE IF NOT EXISTS "options" ("name" text primary key, "value" text not null, "revision" text default '0' not null);
INSERT INTO options VALUES('byline_fields_version','0','0');
CREATE TABLE IF NOT EXISTS "audit_logs" ("id" text primary key, "timestamp" text default (datetime('now')), "actor_id" text, "actor_ip" text, "action" text not null, "resource_type" text, "resource_id" text, "details" text, "status" text);
CREATE TABLE IF NOT EXISTS "_emdash_collections" ("id" text primary key, "slug" text not null unique, "label" text not null, "label_singular" text, "description" text, "icon" text, "supports" text, "source" text, "created_at" text default (datetime('now')), "updated_at" text default (datetime('now')), "search_config" text, has_seo INTEGER NOT NULL DEFAULT 0, url_pattern TEXT, "comments_enabled" integer default 0, "comments_moderation" text default 'first_time', "comments_closed_after_days" integer default 90, "comments_auto_approve_users" integer default 1, "hidden" integer default 0 not null, "sort_order" integer, "admin_config" text, title_field TEXT, date_field TEXT, "routable" integer default 1 not null, "edit_locking" integer default 1 not null, "nav_group" text);
CREATE TABLE IF NOT EXISTS "_emdash_fields" ("id" text primary key, "collection_id" text not null, "slug" text not null, "label" text not null, "type" text not null, "column_type" text not null, "required" integer default 0, "unique" integer default 0, "default_value" text, "validation" text, "widget" text, "options" text, "sort_order" integer default 0, "created_at" text default (datetime('now')), "searchable" integer default 0, translatable INTEGER NOT NULL DEFAULT 1, "indexed" integer default 0 not null, constraint "fields_collection_fk" foreign key ("collection_id") references "_emdash_collections" ("id") on delete cascade);
CREATE TABLE IF NOT EXISTS "_plugin_storage" ("plugin_id" text not null, "collection" text not null, "id" text not null, "data" text not null, "created_at" text default (datetime('now')), "updated_at" text default (datetime('now')), "revision" text default '0' not null, constraint "pk_plugin_storage" primary key ("plugin_id", "collection", "id"));
CREATE TABLE IF NOT EXISTS "_plugin_state" ("plugin_id" text primary key, "version" text not null, "status" text default 'installed' not null, "installed_at" text default (datetime('now')), "activated_at" text, "deactivated_at" text, "data" text, source TEXT NOT NULL DEFAULT 'config', marketplace_version TEXT, display_name TEXT, description TEXT, registry_publisher_did TEXT, registry_slug TEXT, "mcp_tools_enabled" integer default 0 not null, "mcp_tools_consent" text);
CREATE TABLE IF NOT EXISTS "_plugin_indexes" ("plugin_id" text not null, "collection" text not null, "index_name" text not null, "fields" text not null, "created_at" text default (datetime('now')), constraint "pk_plugin_indexes" primary key ("plugin_id", "collection", "index_name"));
CREATE TABLE IF NOT EXISTS "_emdash_widget_areas" ("id" text primary key, "name" text not null unique, "label" text not null, "description" text, "created_at" text default CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS "_emdash_widgets" ("id" text primary key, "area_id" text not null references "_emdash_widget_areas" ("id") on delete cascade, "sort_order" integer default 0 not null, "type" text not null, "title" text, "content" text, "menu_name" text, "component_id" text, "component_props" text, "created_at" text default CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS "users" ("id" text primary key, "email" text not null unique, "name" text, "avatar_url" text, "role" integer default 10 not null, "email_verified" integer default 0 not null, "data" text, "created_at" text default (datetime('now')), "updated_at" text default (datetime('now')), disabled INTEGER NOT NULL DEFAULT 0);
CREATE TABLE IF NOT EXISTS "credentials" ("id" text primary key, "user_id" text not null, "public_key" blob not null, "counter" integer default 0 not null, "device_type" text not null, "backed_up" integer default 0 not null, "transports" text, "name" text, "created_at" text default (datetime('now')), "last_used_at" text default (datetime('now')), "algorithm" integer default -7 not null, constraint "credentials_user_fk" foreign key ("user_id") references "users" ("id") on delete cascade);
CREATE TABLE IF NOT EXISTS "auth_tokens" ("hash" text primary key, "user_id" text, "email" text, "type" text not null, "role" integer, "invited_by" text, "expires_at" text not null, "created_at" text default (datetime('now')), constraint "auth_tokens_user_fk" foreign key ("user_id") references "users" ("id") on delete cascade, constraint "auth_tokens_invited_by_fk" foreign key ("invited_by") references "users" ("id") on delete set null);
CREATE TABLE IF NOT EXISTS "oauth_accounts" ("provider" text not null, "provider_account_id" text not null, "user_id" text not null, "created_at" text default (datetime('now')), constraint "oauth_accounts_pk" primary key ("provider", "provider_account_id"), constraint "oauth_accounts_user_fk" foreign key ("user_id") references "users" ("id") on delete cascade);
CREATE TABLE IF NOT EXISTS "allowed_domains" ("domain" text primary key, "default_role" integer default 20 not null, "enabled" integer default 1 not null, "created_at" text default (datetime('now')));
CREATE TABLE IF NOT EXISTS "auth_challenges" ("challenge" text primary key, "type" text not null, "user_id" text, "data" text, "expires_at" text not null, "created_at" text default (datetime('now')));
CREATE TABLE IF NOT EXISTS "_emdash_sections" ("id" text primary key, "slug" text not null unique, "title" text not null, "description" text, "keywords" text, "content" text not null, "preview_media_id" text, "source" text default 'user' not null, "theme_id" text, "created_at" text default CURRENT_TIMESTAMP, "updated_at" text default CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS "_emdash_api_tokens" ("id" text primary key, "name" text not null, "token_hash" text not null unique, "prefix" text not null, "user_id" text not null, "scopes" text not null, "expires_at" text, "last_used_at" text, "created_at" text default (datetime('now')), constraint "api_tokens_user_fk" foreign key ("user_id") references "users" ("id") on delete cascade);
CREATE TABLE IF NOT EXISTS "_emdash_oauth_tokens" ("token_hash" text primary key, "token_type" text not null, "user_id" text not null, "scopes" text not null, "client_type" text default 'cli' not null, "expires_at" text not null, "refresh_token_hash" text, "created_at" text default (datetime('now')), "client_id" text, constraint "oauth_tokens_user_fk" foreign key ("user_id") references "users" ("id") on delete cascade);
CREATE TABLE IF NOT EXISTS "_emdash_device_codes" ("device_code" text primary key, "user_code" text not null unique, "scopes" text not null, "user_id" text, "status" text default 'pending' not null, "expires_at" text not null, "interval" integer default 5 not null, "created_at" text default (datetime('now')), "last_polled_at" text);
CREATE TABLE IF NOT EXISTS "_emdash_authorization_codes" ("code_hash" text primary key, "client_id" text not null, "redirect_uri" text not null, "user_id" text not null, "scopes" text not null, "code_challenge" text not null, "code_challenge_method" text default 'S256' not null, "resource" text, "expires_at" text not null, "created_at" text default (datetime('now')), constraint "auth_codes_user_fk" foreign key ("user_id") references "users" ("id") on delete cascade);
CREATE TABLE IF NOT EXISTS "_emdash_seo" ("collection" text not null, "content_id" text not null, "seo_title" text, "seo_description" text, "seo_image" text, "seo_canonical" text, "seo_no_index" integer default 0 not null, "created_at" text default (datetime('now')) not null, "updated_at" text default (datetime('now')) not null, constraint "_emdash_seo_pk" primary key ("collection", "content_id"));
CREATE TABLE IF NOT EXISTS "_emdash_oauth_clients" ("id" text primary key, "name" text not null, "redirect_uris" text not null, "scopes" text, "created_at" text default (datetime('now')), "updated_at" text default (datetime('now')));
CREATE TABLE IF NOT EXISTS "_emdash_cron_tasks" ("id" text primary key, "plugin_id" text not null, "task_name" text not null, "schedule" text not null, "is_oneshot" integer default 0 not null, "data" text, "next_run_at" text not null, "last_run_at" text, "status" text default 'idle' not null, "locked_at" text, "enabled" integer default 1 not null, "created_at" text default (datetime('now')), constraint "uq_cron_tasks_plugin_task" unique ("plugin_id", "task_name"));
CREATE TABLE IF NOT EXISTS "_emdash_comments" ("id" text primary key, "collection" text not null, "content_id" text not null, "parent_id" text references "_emdash_comments" ("id") on delete cascade, "author_name" text not null, "author_email" text not null, "author_user_id" text references "users" ("id") on delete set null, "body" text not null, "status" text default 'pending' not null, "ip_hash" text, "user_agent" text, "moderation_metadata" text, "created_at" text default (datetime('now')), "updated_at" text default (datetime('now')));
CREATE TABLE IF NOT EXISTS "_emdash_redirects" ("id" text primary key, "source" text not null, "destination" text not null, "type" integer default 301 not null, "is_pattern" integer default 0 not null, "enabled" integer default 1 not null, "hits" integer default 0 not null, "last_hit_at" text, "group_name" text, "auto" integer default 0 not null, "created_at" text default (datetime('now')), "updated_at" text default (datetime('now')), "config_revision" text default '0' not null, "source_guard" integer default 0 not null, "write_generation" integer default 0 not null);
CREATE TABLE IF NOT EXISTS "_emdash_404_log" ("id" text primary key, "path" text not null, "referrer" text, "user_agent" text, "ip" text, "created_at" text default (datetime('now')), "hits" integer default 1 not null, "last_seen_at" text);
CREATE TABLE IF NOT EXISTS "_emdash_rate_limits" ("key" text not null, "window" text not null, "count" integer default 1 not null, constraint "pk_rate_limits" primary key ("key", "window"));
CREATE TABLE IF NOT EXISTS "content_taxonomies" ("collection" text not null, "entry_id" text not null, "taxonomy_id" text not null, "status" TEXT, "scheduled_at" TEXT, "deleted_at" TEXT, "locale" TEXT, "published_at" TEXT, "created_at" TEXT, constraint "content_taxonomies_pk" primary key ("collection", "entry_id", "taxonomy_id"));
CREATE TABLE IF NOT EXISTS "_emdash_menu_items" ("id" text primary key, "menu_id" text not null, "parent_id" text, "sort_order" integer default 0 not null, "type" text not null, "reference_collection" text, "reference_id" text, "custom_url" text, "label" text not null, "title_attr" text, "target" text, "css_classes" text, "created_at" text default (datetime('now')), "locale" text default 'en' not null, "translation_group" text);
CREATE TABLE IF NOT EXISTS "_emdash_menus" ("id" text primary key, "name" text not null, "label" text not null, "created_at" text default (datetime('now')), "updated_at" text default (datetime('now')), "locale" text default 'en' not null, "translation_group" text, constraint "_emdash_menus_name_locale_unique" unique ("name", "locale"));
CREATE TABLE IF NOT EXISTS "taxonomies" ("id" text primary key, "name" text not null, "slug" text not null, "label" text not null, "parent_id" text, "data" text, "locale" text default 'en' not null, "translation_group" text, "sort_order" integer default 0 not null, constraint "taxonomies_name_slug_locale_unique" unique ("name", "slug", "locale"), constraint "taxonomies_parent_fk" foreign key ("parent_id") references "taxonomies" ("id") on delete set null);
CREATE TABLE IF NOT EXISTS "_emdash_taxonomy_defs" ("id" text primary key, "name" text not null, "label" text not null, "label_singular" text, "hierarchical" integer default 0, "collections" text, "created_at" text default (datetime('now')), "locale" text default 'en' not null, "translation_group" text, constraint "_emdash_taxonomy_defs_name_locale_unique" unique ("name", "locale"));
INSERT INTO _emdash_taxonomy_defs VALUES('taxdef_category','category','Categories','Category',1,'["posts"]','2026-10-23 02:37:11','en','taxdef_category');
INSERT INTO _emdash_taxonomy_defs VALUES('taxdef_tag','tag','Tags','Tag',0,'["posts"]','2026-10-23 02:37:11','en','taxdef_tag');
CREATE TABLE IF NOT EXISTS "_emdash_content_bylines" ("id" text primary key, "collection_slug" text not null, "content_id" text not null, "byline_id" text not null, "sort_order" integer default 0 not null, "role_label" text, "created_at" text default (datetime('now')), constraint "content_bylines_unique" unique ("collection_slug", "content_id", "byline_id"));
CREATE TABLE IF NOT EXISTS "_emdash_bylines" ("id" text primary key, "slug" text not null, "display_name" text not null, "bio" text, "avatar_media_id" text references "media" ("id") on delete set null, "website_url" text, "user_id" text references "users" ("id") on delete set null, "is_guest" integer default 0 not null, "created_at" text default (datetime('now')), "updated_at" text default (datetime('now')), "locale" text default 'en' not null, "translation_group" text, constraint "_emdash_bylines_slug_locale_unique" unique ("slug", "locale"));
CREATE TABLE IF NOT EXISTS "_emdash_byline_fields" ("id" text primary key, "slug" text not null unique, "label" text not null, "type" text not null, "required" integer default 0 not null, "translatable" integer default 1 not null, "validation" text, "sort_order" integer default 0 not null, "created_at" text default (datetime('now')), "updated_at" text default (datetime('now')));
CREATE TABLE IF NOT EXISTS "_emdash_byline_field_values" ("byline_id" text not null references "_emdash_bylines" ("id") on delete cascade, "field_id" text not null references "_emdash_byline_fields" ("id") on delete cascade, "value" text, "created_at" text default (datetime('now')), "updated_at" text default (datetime('now')), constraint "_emdash_byline_field_values_pk" primary key ("byline_id", "field_id"));
CREATE TABLE IF NOT EXISTS "_emdash_byline_field_group_values" ("translation_group" text not null, "field_id" text not null references "_emdash_byline_fields" ("id") on delete cascade, "value" text, "created_at" text default (datetime('now')), "updated_at" text default (datetime('now')), constraint "_emdash_byline_field_group_values_pk" primary key ("translation_group", "field_id"));
CREATE TABLE IF NOT EXISTS "_emdash_content_references" ("id" text primary key, "relation_id" text not null, "parent_group" text not null, "child_group" text not null, "sort_order" integer default 0 not null, "created_at" text default (datetime('now')), constraint "content_references_unique" unique ("relation_id", "parent_group", "child_group"));
CREATE TABLE IF NOT EXISTS "_emdash_comment_reactions" ("id" text primary key, "comment_id" text not null references "_emdash_comments" ("id") on delete cascade, "reaction" text default 'like' not null, "voter_hash" text not null, "created_at" text default (datetime('now')));
CREATE TABLE IF NOT EXISTS "_emdash_media_usage_sources" ("source_key" text primary key, "source_type" text not null, "collection_slug" text, "content_id" text, "source_variant" text not null, "locale" text, "translation_group" text, "content_slug" text, "content_title" text, "content_status" text, "content_scheduled_at" text, "content_deleted_at" text, "revision_id" text, "current_generation" text not null, "schema_version" integer default 1 not null, "indexed_at" text default (datetime('now')) not null, "created_at" text default (datetime('now')), "updated_at" text default (datetime('now')), "source_updated_at" text, "source_version" integer, "source_fingerprint" text, "source_completeness" text default 'unknown' not null, "last_attempted_at" text, "last_error_code" text, "collection_id" text, "identity_version" integer);
CREATE TABLE IF NOT EXISTS "_emdash_media_usage" ("id" text primary key, "source_key" text not null, "generation" text not null, "field_slug" text not null, "field_path" text not null, "occurrence_index" integer default 0 not null, "reference_type" text not null, "media_id" text, "provider" text default 'local' not null, "provider_asset_id" text not null, "media_kind" text, "mime_type" text, "created_at" text default (datetime('now')), "cleanup_lease_token" text);
CREATE TABLE IF NOT EXISTS "_emdash_media_usage_index_status" ("adapter_id" text not null, "scope_type" text not null, "scope_key" text not null, "status" text not null, "schema_version" integer default 1 not null, "started_at" text, "completed_at" text, "cursor" text, "indexed_source_count" integer default 0 not null, "failed_source_count" integer default 0 not null, "last_error_code" text, "updated_at" text default (datetime('now')) not null, "collection_id" text, "change_epoch" bigint default 0 not null, "reconciliation_required" integer default 0 not null, "last_incremental_success_at" text, "capture_state" text, constraint "_emdash_media_usage_index_status_pk" primary key ("adapter_id", "scope_type", "scope_key"));
CREATE TABLE IF NOT EXISTS "_emdash_media_upload_attempts" ("storage_key" text primary key, "media_id" text not null, "status" text default 'active' not null, "created_at" text default (datetime('now')) not null, "updated_at" text default (datetime('now')) not null);
CREATE TABLE IF NOT EXISTS "_emdash_revision_prune_queue" ("collection" text not null, "entry_id" text not null, "revision_id" text not null, constraint "revision_prune_queue_pk" primary key ("collection", "entry_id"));
CREATE TABLE IF NOT EXISTS "_emdash_media_usage_cleanup" ("task_key" text primary key, "lease_token" text, "lease_expires_at" text, "next_eligible_at" text not null, "cursor_created_at" text, "cursor_id" text, "scan_before_at" text, "consecutive_failures" integer default 0 not null, "last_started_at" text, "last_completed_at" text, "last_candidate_count" integer default 0 not null, "last_deleted_orphans" integer default 0 not null, "last_deleted_stale" integer default 0 not null, "last_deleted_abandoned" integer default 0 not null, "last_deleted_write_leases" integer default 0 not null, "last_backlog_lower_bound" integer default 0 not null, "last_scan_has_more" integer default 0 not null, "last_duration_ms" integer default 0 not null, "last_error_code" text, "updated_at" text default (datetime('now')) not null);
INSERT INTO _emdash_media_usage_cleanup VALUES('projection_gc',NULL,NULL,'1970-01-01T00:00:00.000Z',NULL,NULL,NULL,0,NULL,NULL,0,0,0,0,0,0,0,0,NULL,'2026-10-23 02:37:11');
CREATE TABLE IF NOT EXISTS "_emdash_media_usage_generation_writes" ("source_key" text not null, "generation" text not null, "lease_token" text primary key, "expires_at" text not null, "created_at" text default (datetime('now')) not null, constraint "_emdash_media_usage_generation_writes_source_generation" unique ("source_key", "generation"));
CREATE TABLE IF NOT EXISTS "_emdash_media_usage_cleanup_fence" ("task_key" text primary key, "generation_floor" text not null, "updated_at" text default (datetime('now')) not null);
CREATE TABLE IF NOT EXISTS "_emdash_media_usage_activation" ("task_key" text primary key, "state" text default 'expanded' not null, "runtime_generation" integer default 1 not null, "collection_cursor" text, "drain_confirmed_at" text, "lease_token" text, "lease_expires_at" text, "attempt_count" integer default 0 not null, "last_attempted_at" text, "last_error_code" text, "activated_at" text, "created_at" text default (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) not null, "updated_at" text default (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) not null, "media_usage_maintenance_turn" integer default 2 not null);
INSERT INTO _emdash_media_usage_activation VALUES('incremental_capture','expanded',1,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,'2026-10-23T02:37:11.880Z','2026-10-23T02:37:11.880Z',2);
CREATE TABLE IF NOT EXISTS "_emdash_media_usage_work" ("collection_id" text not null, "collection_slug" text not null, "content_id" text not null, "change_epoch" bigint not null, "work_version" bigint default 1 not null, "state" text default 'pending' not null, "attempt_count" integer default 0 not null, "next_attempt_at" text not null, "lease_token" text, "lease_expires_at" text, "last_attempted_at" text, "last_error_code" text, "created_at" text default (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) not null, "updated_at" text default (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) not null, constraint "_emdash_media_usage_work_pk" primary key ("collection_id", "content_id"));
CREATE TABLE IF NOT EXISTS "_emdash_media_usage_collection_deletions" ("collection_id" text not null primary key, "collection_slug" text not null unique, "force_delete" integer not null, "state" text default 'pending' not null, "phase" text default 'fence' not null, "work_cursor" text, "source_key" text, "occurrence_cursor" text, "attempt_count" integer default 0 not null, "next_attempt_at" text not null, "lease_token" text, "lease_expires_at" text, "last_error_code" text, "created_at" text default (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) not null, "updated_at" text default (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) not null);
CREATE TABLE IF NOT EXISTS "_emdash_media_usage_reconciliations" ("collection_id" text not null primary key, "collection_slug" text not null, "run_token" text not null, "target_epoch" bigint, "field_fingerprint" text, "state" text default 'pending' not null, "phase" text default 'scan' not null, "scan_cursor" text, "scan_upper_id" text, "source_cursor" text, "source_upper_key" text, "attempt_count" integer default 0 not null, "next_attempt_at" text not null, "lease_token" text, "lease_expires_at" text, "last_error_code" text, "created_at" text default (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) not null, "updated_at" text default (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) not null);
CREATE TABLE IF NOT EXISTS "media_folders" ("id" text primary key, "name" text not null, "name_key" text not null unique);
CREATE TABLE IF NOT EXISTS "_emdash_entry_locks" ("collection" text not null, "entry_id" text not null, "user_id" text not null references "users" ("id") on delete cascade, "token" text not null, "acquired_at" text not null, "expires_at" text not null, constraint "pk_emdash_entry_locks" primary key ("collection", "entry_id"));
CREATE TABLE IF NOT EXISTS "_emdash_redirect_write_lock" ("id" integer primary key, "token" text not null, "expires_at" integer not null, "generation" integer not null);
INSERT INTO _emdash_redirect_write_lock VALUES(1,'',0,0);
CREATE TABLE IF NOT EXISTS "_emdash_block_types" ("id" text primary key, "slug" text not null unique, "label" text not null, "description" text, "icon" text, "category" text, "current_version" integer default 1 not null, "source" text default 'user' not null, "created_at" text default (datetime('now')) not null, "updated_at" text default (datetime('now')) not null);
CREATE TABLE IF NOT EXISTS "_emdash_block_type_versions" ("id" text primary key, "block_type_id" text not null, "version" integer not null, "fields" text not null, "fingerprint" text not null, "created_at" text default (datetime('now')) not null, "updated_at" text default (datetime('now')) not null, constraint "block_type_versions_type_fk" foreign key ("block_type_id") references "_emdash_block_types" ("id") on delete cascade);
CREATE TABLE IF NOT EXISTS "_emdash_transfer_operations" ("id" text primary key, "kind" text not null, "state" text not null, "stage" text, "cursor" text, "progress" text, "options" text, "idempotency_key" text, "package_digest" text, "plan_digest" text, "origin_site_id" text, "staging_secret" text not null, "receipt" text, "error_code" text, "error_detail" text, "write_epoch" integer default 0 not null, "attempt_count" integer default 0 not null, "lease_token" text, "lease_expires_at" text, "runtime_generation" integer default 1 not null, "cancel_requested_at" text, "mutation_started_at" text, "created_by" text not null, "created_at" text default (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) not null, "updated_at" text default (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) not null, "completed_at" text, "expires_at" text, "staging_collected_at" text);
CREATE TABLE IF NOT EXISTS "_emdash_transfer_identity_map" ("origin_site_id" text not null, "entity_kind" text not null, "portable_id" text not null, "target_id" text not null, "operation_id" text not null, "created_at" text default (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) not null, constraint "_emdash_transfer_identity_map_pk" primary key ("operation_id", "entity_kind", "portable_id"));
CREATE TABLE IF NOT EXISTS "_emdash_transfer_staged_files" ("operation_id" text not null references "_emdash_transfer_operations" ("id") on delete cascade, "path" text not null, "bytes" bigint not null, "sha256" text not null, "state" text default 'declared' not null, "verified_at" text, "logical_sha256" text, constraint "_emdash_transfer_staged_files_pk" primary key ("operation_id", "path"));
CREATE TABLE IF NOT EXISTS "_emdash_transfer_package_index" ("operation_id" text not null references "_emdash_transfer_operations" ("id") on delete cascade, "kind" text not null, "id" text not null, "group_id" text, "parent_id" text, "name_key" text, "depth" integer default 0 not null, constraint "_emdash_transfer_package_index_pk" primary key ("operation_id", "kind", "id"));
CREATE TABLE IF NOT EXISTS "_emdash_transfer_media_blobs" ("operation_id" text not null references "_emdash_transfer_operations" ("id") on delete cascade, "media_id" text not null, "sha256" text not null, "bytes" bigint not null, constraint "_emdash_transfer_media_blobs_pk" primary key ("operation_id", "media_id"));
CREATE TABLE IF NOT EXISTS "_emdash_transfer_approvals" ("id" text primary key, "status" text default 'pending' not null, "action" text not null, "user_id" text not null, "requested_by_token_id" text, "approved_by" text, "operation_id" text, "params_digest" text, "package_digest" text, "plan_digest" text, "expires_at" text not null, "created_at" text default (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) not null, "decided_at" text, "consumed_at" text);
CREATE TABLE IF NOT EXISTS "_emdash_taxonomy_def_groups" ("id" text primary key, "name" text not null, "hierarchical" integer default 0 not null, "collections" text default '[]' not null, "created_at" text default (datetime('now')), constraint "_emdash_taxonomy_def_groups_name_unique" unique ("name"));
INSERT INTO _emdash_taxonomy_def_groups VALUES('taxdef_category','category',1,'["posts"]','2026-10-23 02:37:11');
INSERT INTO _emdash_taxonomy_def_groups VALUES('taxdef_tag','tag',0,'["posts"]','2026-10-23 02:37:11');
CREATE TABLE IF NOT EXISTS "_emdash_relations" ("id" text primary key, "slug" text not null, "parent_collection" text not null, "child_collection" text not null, "parent_label" text not null, "child_label" text not null, "parent_label_singular" text, "child_label_singular" text, "max_children_per_parent" integer, "max_parents_per_child" integer, "created_at" text default (datetime('now')), "updated_at" text default (datetime('now')), constraint "_emdash_relations_slug_unique" unique ("slug"));
CREATE TABLE IF NOT EXISTS "_emdash_redirect_state" ("id" integer primary key, "revision" integer default 0 not null, "generation" text, "generation_revision" integer default -1 not null, "repair_expires_at" integer default 0 not null);
INSERT INTO _emdash_redirect_state VALUES(1,0,NULL,-1,0);
CREATE TABLE IF NOT EXISTS "_emdash_redirect_artifacts" ("digest" text primary key, "kind" text not null, "payload" text not null);
CREATE TABLE IF NOT EXISTS "_emdash_redirect_generation_artifacts" ("generation" text not null, "position" integer not null, "digest" text not null, constraint "pk_emdash_redirect_generation_artifacts" primary key ("generation", "position"));
CREATE TRIGGER emdash_media_usage_fence_source_generation_insert
		BEFORE INSERT ON _emdash_media_usage_sources
		WHEN EXISTS (
			SELECT 1
			FROM _emdash_media_usage_cleanup_fence AS fence
			WHERE fence.task_key = 'projection_gc'
				AND NEW.current_generation <= fence.generation_floor
		) AND NOT EXISTS (
			SELECT 1
			FROM _emdash_media_usage_generation_writes AS writer
			WHERE writer.source_key = NEW.source_key
				AND writer.generation = NEW.current_generation
				AND writer.expires_at > strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
		)
		BEGIN
			SELECT RAISE(IGNORE);
		END;
CREATE TRIGGER emdash_media_usage_fence_source_generation_update
		BEFORE UPDATE OF current_generation ON _emdash_media_usage_sources
		WHEN NEW.current_generation <> OLD.current_generation
			AND EXISTS (
				SELECT 1
				FROM _emdash_media_usage_cleanup_fence AS fence
				WHERE fence.task_key = 'projection_gc'
					AND NEW.current_generation <= fence.generation_floor
			) AND NOT EXISTS (
				SELECT 1
				FROM _emdash_media_usage_generation_writes AS writer
				WHERE writer.source_key = NEW.source_key
					AND writer.generation = NEW.current_generation
					AND writer.expires_at > strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
			)
		BEGIN
			SELECT RAISE(IGNORE);
		END;
CREATE TRIGGER emdash_media_usage_record_cleanup_fence
		BEFORE DELETE ON _emdash_media_usage
		WHEN OLD.cleanup_lease_token IS NOT NULL AND EXISTS (
			SELECT 1
			FROM _emdash_media_usage_cleanup AS cleanup
			WHERE cleanup.task_key = 'projection_gc'
				AND cleanup.lease_token = OLD.cleanup_lease_token
		)
		BEGIN
			INSERT INTO _emdash_media_usage_cleanup_fence (
				task_key,
				generation_floor,
				updated_at
			)
			VALUES ('projection_gc', OLD.generation, strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
			ON CONFLICT (task_key) DO UPDATE SET
				generation_floor = CASE
					WHEN excluded.generation_floor > _emdash_media_usage_cleanup_fence.generation_floor
					THEN excluded.generation_floor
					ELSE _emdash_media_usage_cleanup_fence.generation_floor
				END,
				updated_at = excluded.updated_at;
		END;
CREATE TRIGGER "emdash_options_revision_insert"
				AFTER INSERT ON "options"
				WHEN NEW.revision = '0'
				BEGIN
					UPDATE "options" SET revision = lower(hex(randomblob(16)))
					WHERE "name" = "NEW"."name" AND revision = NEW.revision;
				END;
CREATE TRIGGER "emdash_options_revision_update"
				AFTER UPDATE ON "options"
				WHEN NEW.revision = '0' OR NEW.revision = OLD.revision
				BEGIN
					UPDATE "options" SET revision = lower(hex(randomblob(16)))
					WHERE "name" = "NEW"."name" AND revision = NEW.revision;
				END;
CREATE TRIGGER "emdash__plugin_storage_revision_insert"
				AFTER INSERT ON "_plugin_storage"
				WHEN NEW.revision = '0'
				BEGIN
					UPDATE "_plugin_storage" SET revision = lower(hex(randomblob(16)))
					WHERE "plugin_id" = "NEW"."plugin_id" AND "collection" = "NEW"."collection" AND "id" = "NEW"."id" AND revision = NEW.revision;
				END;
CREATE TRIGGER "emdash__plugin_storage_revision_update"
				AFTER UPDATE ON "_plugin_storage"
				WHEN NEW.revision = '0' OR NEW.revision = OLD.revision
				BEGIN
					UPDATE "_plugin_storage" SET revision = lower(hex(randomblob(16)))
					WHERE "plugin_id" = "NEW"."plugin_id" AND "collection" = "NEW"."collection" AND "id" = "NEW"."id" AND revision = NEW.revision;
				END;
CREATE TRIGGER emdash_redirect_fence_insert
			BEFORE INSERT ON _emdash_redirects
			WHEN NEW.write_generation <> 0 AND NOT EXISTS (
				SELECT 1 FROM _emdash_redirect_write_lock
				WHERE id = 1 AND token <> '' AND generation = NEW.write_generation
			)
			BEGIN
				SELECT RAISE(ABORT, 'redirect write lease expired');
			END;
CREATE TRIGGER emdash_redirect_fence_update
			BEFORE UPDATE OF source, destination, enabled, is_pattern, type, group_name ON _emdash_redirects
			WHEN NEW.write_generation <> OLD.write_generation
			AND NEW.write_generation <> 0 AND NOT EXISTS (
				SELECT 1 FROM _emdash_redirect_write_lock
				WHERE id = 1 AND token <> '' AND generation = NEW.write_generation
			)
			BEGIN
				SELECT RAISE(ABORT, 'redirect write lease expired');
			END;
CREATE TRIGGER emdash_redirect_loop_insert
			BEFORE INSERT ON _emdash_redirects
			WHEN NEW.enabled = 1 AND NEW.destination <> ''
			BEGIN
				SELECT RAISE(ABORT, 'redirect loop') WHERE EXISTS (
					WITH RECURSIVE chain(source, destination) AS (
						SELECT source, destination FROM _emdash_redirects
						WHERE source = NEW.destination AND enabled = 1
						UNION
						SELECT redirect.source, redirect.destination
						FROM _emdash_redirects AS redirect
						JOIN chain ON redirect.source = chain.destination
						WHERE redirect.enabled = 1
					)
					SELECT 1 FROM chain WHERE destination = NEW.source
				);
			END;
CREATE TRIGGER emdash_redirect_loop_update
			BEFORE UPDATE OF source, destination ON _emdash_redirects
			WHEN NEW.enabled = 1 AND NEW.destination <> ''
			BEGIN
				SELECT RAISE(ABORT, 'redirect loop') WHERE EXISTS (
					WITH RECURSIVE chain(source, destination) AS (
						SELECT source, destination FROM _emdash_redirects
						WHERE source = NEW.destination AND enabled = 1 AND id <> NEW.id
						UNION
						SELECT redirect.source, redirect.destination
						FROM _emdash_redirects AS redirect
						JOIN chain ON redirect.source = chain.destination
						WHERE redirect.enabled = 1 AND redirect.id <> NEW.id
					)
					SELECT 1 FROM chain WHERE destination = NEW.source
				);
			END;
CREATE TRIGGER emdash_redirect_guard_insert
			AFTER INSERT ON _emdash_redirects
			WHEN NEW.source_guard = 0
			BEGIN
				UPDATE _emdash_redirects SET source_guard = 1 WHERE id = NEW.id;
			END;
CREATE TRIGGER emdash_redirect_guard_update
			AFTER UPDATE OF source ON _emdash_redirects
			WHEN NEW.source_guard = 0 AND NEW.source <> OLD.source
			BEGIN
				UPDATE _emdash_redirects SET source_guard = 1 WHERE id = NEW.id;
			END;
CREATE TRIGGER emdash_redirect_revision_update
			AFTER UPDATE OF source, destination, enabled, is_pattern, type, group_name ON _emdash_redirects
			WHEN NEW.config_revision = OLD.config_revision AND (
				NEW.source IS NOT OLD.source OR
				NEW.destination IS NOT OLD.destination OR
				NEW.enabled IS NOT OLD.enabled OR
				NEW.is_pattern IS NOT OLD.is_pattern OR
				NEW.type IS NOT OLD.type OR
				NEW.group_name IS NOT OLD.group_name
			)
			BEGIN
				UPDATE _emdash_redirects
				SET config_revision = lower(hex(randomblob(16)))
				WHERE id = NEW.id;
			END;
CREATE TRIGGER emdash_redirect_loop_enable
		BEFORE UPDATE OF enabled ON _emdash_redirects
		WHEN NEW.enabled = 1 AND OLD.enabled IS NOT 1 AND NEW.destination <> ''
		BEGIN
			SELECT RAISE(ABORT, 'redirect loop') WHERE EXISTS (
				WITH RECURSIVE chain(source, destination) AS (
					SELECT source, destination FROM _emdash_redirects
					WHERE source = NEW.destination AND enabled = 1 AND id <> NEW.id
					UNION
					SELECT redirect.source, redirect.destination
					FROM _emdash_redirects AS redirect
					JOIN chain ON redirect.source = chain.destination
					WHERE redirect.enabled = 1 AND redirect.id <> NEW.id
				)
				SELECT 1 FROM chain WHERE destination = NEW.source
			);
		END;
CREATE TRIGGER emdash_redirect_state_revision_insert
		AFTER INSERT ON _emdash_redirects
		WHEN NEW.enabled = 1
		BEGIN
			UPDATE _emdash_redirect_state SET revision = revision + 1 WHERE id = 1;
		END;
CREATE TRIGGER emdash_redirect_state_revision_delete
		AFTER DELETE ON _emdash_redirects
		WHEN OLD.enabled = 1
		BEGIN
			UPDATE _emdash_redirect_state SET revision = revision + 1 WHERE id = 1;
		END;
CREATE TRIGGER emdash_redirect_state_revision_update
		AFTER UPDATE OF source, destination, enabled, is_pattern, type, created_at ON _emdash_redirects
		WHEN (NEW.enabled = 1 OR OLD.enabled = 1) AND (
			NEW.source IS NOT OLD.source OR
			NEW.destination IS NOT OLD.destination OR
			NEW.enabled IS NOT OLD.enabled OR
			NEW.is_pattern IS NOT OLD.is_pattern OR
			NEW.type IS NOT OLD.type OR
			NEW.created_at IS NOT OLD.created_at
		)
		BEGIN
			UPDATE _emdash_redirect_state SET revision = revision + 1 WHERE id = 1;
		END;
CREATE INDEX "idx_revisions_entry" on "revisions" ("collection", "entry_id");
CREATE INDEX "idx_media_content_hash" on "media" ("content_hash");
CREATE INDEX "idx_audit_actor" on "audit_logs" ("actor_id");
CREATE INDEX "idx_audit_action" on "audit_logs" ("action");
CREATE INDEX "idx_audit_timestamp" on "audit_logs" ("timestamp");
CREATE INDEX "idx_media_status" on "media" ("status");
CREATE UNIQUE INDEX "idx_fields_collection_slug" on "_emdash_fields" ("collection_id", "slug");
CREATE INDEX "idx_fields_collection" on "_emdash_fields" ("collection_id");
CREATE INDEX "idx_fields_sort" on "_emdash_fields" ("collection_id", "sort_order");
CREATE INDEX "idx_plugin_storage_list" on "_plugin_storage" ("plugin_id", "collection", "created_at");
CREATE INDEX "idx_widgets_area" on "_emdash_widgets" ("area_id", "sort_order");
CREATE INDEX "idx_users_email" on "users" ("email");
CREATE INDEX "idx_credentials_user" on "credentials" ("user_id");
CREATE INDEX "idx_auth_tokens_email" on "auth_tokens" ("email");
CREATE INDEX "idx_oauth_accounts_user" on "oauth_accounts" ("user_id");
CREATE INDEX "idx_auth_challenges_expires" on "auth_challenges" ("expires_at");
CREATE INDEX "idx_users_disabled" on "users" ("disabled");
CREATE INDEX "idx_sections_source" on "_emdash_sections" ("source");
CREATE INDEX "idx_media_mime_type" on "media" ("mime_type");
CREATE INDEX "idx_media_filename" on "media" ("filename");
CREATE INDEX "idx_media_created_at" on "media" ("created_at");
CREATE INDEX "idx_audit_resource" on "audit_logs" ("resource_type", "resource_id");
CREATE INDEX "idx_api_tokens_token_hash" on "_emdash_api_tokens" ("token_hash");
CREATE INDEX "idx_api_tokens_user_id" on "_emdash_api_tokens" ("user_id");
CREATE INDEX "idx_oauth_tokens_user_id" on "_emdash_oauth_tokens" ("user_id");
CREATE INDEX "idx_oauth_tokens_expires" on "_emdash_oauth_tokens" ("expires_at");
CREATE INDEX "idx_auth_codes_expires" on "_emdash_authorization_codes" ("expires_at");
CREATE INDEX idx_emdash_seo_collection
		ON _emdash_seo (collection)
	;
CREATE INDEX idx_plugin_state_source
		ON _plugin_state (source)
		WHERE source = 'marketplace'
	;
CREATE INDEX "idx_cron_tasks_due" on "_emdash_cron_tasks" ("enabled", "status", "next_run_at");
CREATE INDEX "idx_cron_tasks_plugin" on "_emdash_cron_tasks" ("plugin_id");
CREATE INDEX "idx_comments_content" on "_emdash_comments" ("collection", "content_id", "status");
CREATE INDEX "idx_comments_parent" on "_emdash_comments" ("parent_id");
CREATE INDEX "idx_comments_status" on "_emdash_comments" ("status", "created_at");
CREATE INDEX "idx_comments_author_email" on "_emdash_comments" ("author_email");
CREATE INDEX "idx_comments_author_user" on "_emdash_comments" ("author_user_id");
CREATE INDEX "idx_redirects_source" on "_emdash_redirects" ("source");
CREATE INDEX "idx_redirects_enabled" on "_emdash_redirects" ("enabled");
CREATE INDEX "idx_redirects_group" on "_emdash_redirects" ("group_name");
CREATE INDEX "idx_404_log_created" on "_emdash_404_log" ("created_at");
CREATE INDEX "idx_rate_limits_window" on "_emdash_rate_limits" ("window");
CREATE INDEX idx_comments_pending
		ON _emdash_comments (id)
		WHERE status = 'pending'
	;
CREATE INDEX idx_comments_approved
		ON _emdash_comments (id)
		WHERE status = 'approved'
	;
CREATE INDEX idx_comments_spam
		ON _emdash_comments (id)
		WHERE status = 'spam'
	;
CREATE INDEX idx_comments_trash
		ON _emdash_comments (id)
		WHERE status = 'trash'
	;
CREATE UNIQUE INDEX "idx_404_log_path_unique" on "_emdash_404_log" ("path");
CREATE INDEX "idx_404_log_last_seen" on "_emdash_404_log" ("last_seen_at");
CREATE INDEX idx_content_taxonomies_term ON content_taxonomies(taxonomy_id);
CREATE INDEX "idx_menu_items_menu" on "_emdash_menu_items" ("menu_id", "sort_order");
CREATE INDEX "idx_menu_items_parent" on "_emdash_menu_items" ("parent_id");
CREATE INDEX "idx__emdash_menu_items_locale" on "_emdash_menu_items" ("locale");
CREATE INDEX "idx__emdash_menu_items_translation_group" on "_emdash_menu_items" ("translation_group");
CREATE INDEX "idx__emdash_menus_locale" on "_emdash_menus" ("locale");
CREATE INDEX "idx__emdash_menus_translation_group" on "_emdash_menus" ("translation_group");
CREATE INDEX "idx_taxonomies_locale" on "taxonomies" ("locale");
CREATE INDEX "idx_taxonomies_translation_group" on "taxonomies" ("translation_group");
CREATE INDEX "idx_taxonomies_parent" on "taxonomies" ("parent_id");
CREATE INDEX "idx__emdash_taxonomy_defs_locale" on "_emdash_taxonomy_defs" ("locale");
CREATE INDEX "idx__emdash_taxonomy_defs_translation_group" on "_emdash_taxonomy_defs" ("translation_group");
CREATE INDEX idx_plugin_state_registry
			ON _plugin_state (source)
			WHERE source = 'registry'
		;
CREATE INDEX "idx_content_bylines_content" on "_emdash_content_bylines" ("collection_slug", "content_id", "sort_order");
CREATE INDEX "idx_content_bylines_byline" on "_emdash_content_bylines" ("byline_id");
CREATE INDEX "idx_bylines_slug" on "_emdash_bylines" ("slug");
CREATE INDEX "idx_bylines_display_name" on "_emdash_bylines" ("display_name");
CREATE UNIQUE INDEX "idx_bylines_user_id_locale_unique"
		ON "_emdash_bylines" (user_id, locale)
		WHERE user_id IS NOT NULL
	;
CREATE INDEX "idx__emdash_bylines_locale" on "_emdash_bylines" ("locale");
CREATE INDEX "idx__emdash_bylines_translation_group" on "_emdash_bylines" ("translation_group");
CREATE UNIQUE INDEX "idx_bylines_group_locale_unique"
		ON "_emdash_bylines" (translation_group, locale)
		WHERE translation_group IS NOT NULL
	;
CREATE INDEX "idx__emdash_byline_fields_sort_order" on "_emdash_byline_fields" ("sort_order");
CREATE INDEX "idx__emdash_byline_field_values_byline" on "_emdash_byline_field_values" ("byline_id");
CREATE INDEX "idx__emdash_byline_field_values_field" on "_emdash_byline_field_values" ("field_id");
CREATE INDEX "idx__emdash_byline_field_group_values_group" on "_emdash_byline_field_group_values" ("translation_group");
CREATE INDEX "idx__emdash_byline_field_group_values_field" on "_emdash_byline_field_group_values" ("field_id");
CREATE INDEX "idx__emdash_content_references_parent" on "_emdash_content_references" ("parent_group", "relation_id", "sort_order");
CREATE INDEX "idx__emdash_content_references_child" on "_emdash_content_references" ("child_group", "relation_id");
CREATE INDEX "idx__emdash_content_references_relation" on "_emdash_content_references" ("relation_id");
CREATE UNIQUE INDEX "idx_comment_reactions_unique" on "_emdash_comment_reactions" ("comment_id", "voter_hash", "reaction");
CREATE INDEX "idx_comment_reactions_comment" on "_emdash_comment_reactions" ("comment_id");
CREATE INDEX "idx_comment_reactions_voter" on "_emdash_comment_reactions" ("voter_hash", "created_at");
CREATE INDEX "idx__emdash_media_usage_sources_content" on "_emdash_media_usage_sources" ("source_type", "collection_slug", "content_id");
CREATE INDEX "idx__emdash_media_usage_sources_variant" on "_emdash_media_usage_sources" ("source_type", "source_variant");
CREATE INDEX "idx__emdash_media_usage_sources_locale" on "_emdash_media_usage_sources" ("collection_slug", "locale");
CREATE INDEX "idx__emdash_media_usage_sources_deleted" on "_emdash_media_usage_sources" ("content_deleted_at");
CREATE INDEX "idx__emdash_media_usage_sources_translation_group" on "_emdash_media_usage_sources" ("collection_slug", "translation_group");
CREATE UNIQUE INDEX "idx__emdash_media_usage_unique_occurrence" on "_emdash_media_usage" ("source_key", "generation", "field_path", "occurrence_index");
CREATE INDEX "idx__emdash_media_usage_provider_asset" on "_emdash_media_usage" ("provider", "provider_asset_id");
CREATE INDEX "idx__emdash_media_usage_source_generation" on "_emdash_media_usage" ("source_key", "generation");
CREATE INDEX "idx_taxonomies_name_locale" on "taxonomies" ("name", "locale");
CREATE INDEX "idx__emdash_media_usage_sources_completeness" on "_emdash_media_usage_sources" ("source_type", "collection_slug", "source_completeness");
CREATE INDEX "idx__emdash_media_usage_sources_fingerprint" on "_emdash_media_usage_sources" ("source_fingerprint");
CREATE INDEX "idx__emdash_media_usage_index_status_status" on "_emdash_media_usage_index_status" ("adapter_id", "status");
CREATE INDEX "idx__emdash_media_usage_media_source_generation" on "_emdash_media_usage" ("media_id", "source_key", "generation");
CREATE INDEX "idx_media_upload_attempts_media_id" on "_emdash_media_upload_attempts" ("media_id");
CREATE INDEX "idx_media_upload_attempts_status_created_at" on "_emdash_media_upload_attempts" ("status", "created_at");
CREATE INDEX "idx_media_storage_key" on "media" ("storage_key");
CREATE INDEX "idx_revision_prune_queue_revision_id" on "_emdash_revision_prune_queue" ("revision_id");
CREATE INDEX "idx__emdash_media_usage_cleanup_scan" on "_emdash_media_usage" ("created_at", "id", "source_key", "generation");
CREATE INDEX "idx__emdash_media_usage_generation_writes_expiry" on "_emdash_media_usage_generation_writes" ("expires_at", "lease_token");
CREATE INDEX "idx__emdash_media_usage_work_due" on "_emdash_media_usage_work" ("state", "next_attempt_at", "updated_at", "collection_id", "content_id");
CREATE INDEX "idx__emdash_media_usage_work_lease" on "_emdash_media_usage_work" ("state", "lease_expires_at", "collection_id", "content_id");
CREATE INDEX "idx__emdash_media_usage_work_operator" on "_emdash_media_usage_work" ("collection_id", "state", "updated_at", "content_id");
CREATE UNIQUE INDEX "idx__emdash_media_usage_status_collection" on "_emdash_media_usage_index_status" ("adapter_id", "scope_type", "collection_id");
CREATE INDEX "idx__emdash_media_usage_sources_identity" on "_emdash_media_usage_sources" ("source_type", "collection_id", "content_id", "source_variant");
CREATE INDEX "idx__emdash_media_usage_collection_deletions_due" on "_emdash_media_usage_collection_deletions" ("state", "next_attempt_at", "updated_at", "collection_id");
CREATE INDEX "idx__emdash_media_usage_collection_deletions_lease" on "_emdash_media_usage_collection_deletions" ("state", "lease_expires_at", "updated_at", "collection_id");
CREATE INDEX "idx__emdash_media_usage_collection_deletions_operator" on "_emdash_media_usage_collection_deletions" ("state", "updated_at", "collection_id");
CREATE INDEX "idx__emdash_media_usage_sources_collection_cursor" on "_emdash_media_usage_sources" ("source_type", "collection_id", "source_key");
CREATE INDEX "idx__emdash_media_usage_source_cursor" on "_emdash_media_usage" ("source_key", "id");
CREATE INDEX "idx__emdash_media_usage_reconciliations_due" on "_emdash_media_usage_reconciliations" ("state", "next_attempt_at", "updated_at", "collection_id");
CREATE INDEX "idx__emdash_media_usage_reconciliations_lease" on "_emdash_media_usage_reconciliations" ("state", "lease_expires_at", "updated_at", "collection_id");
CREATE INDEX "idx__emdash_media_usage_reconciliations_failed" on "_emdash_media_usage_reconciliations" ("state", "updated_at", "collection_id");
CREATE INDEX "idx__emdash_media_usage_status_reconciliation" on "_emdash_media_usage_index_status" ("adapter_id", "scope_type", "capture_state", "reconciliation_required", "collection_id");
CREATE INDEX "idx_content_taxonomies_group_lookup" on "content_taxonomies" ("taxonomy_id", "collection", "entry_id");
CREATE INDEX "idx_media_folder_id" on "media" ("folder_id");
CREATE INDEX "idx_emdash_entry_locks_user_id" on "_emdash_entry_locks" ("user_id");
CREATE UNIQUE INDEX idx_redirects_managed_source
		ON _emdash_redirects (source)
		WHERE source_guard = 1
	;
CREATE UNIQUE INDEX "idx_taxonomies_translation_group_locale_unique"
		ON taxonomies (translation_group, locale)
		WHERE translation_group IS NOT NULL
	;
CREATE UNIQUE INDEX "idx_block_type_versions_type_version" on "_emdash_block_type_versions" ("block_type_id", "version");
CREATE INDEX "idx_block_type_versions_type" on "_emdash_block_type_versions" ("block_type_id");
CREATE UNIQUE INDEX "idx__emdash_transfer_operations_idempotency" on "_emdash_transfer_operations" ("created_by", "kind", "idempotency_key");
CREATE UNIQUE INDEX idx__emdash_transfer_operations_active_import
		ON _emdash_transfer_operations (kind)
		WHERE kind = 'import'
			AND (
				state IN ('uploading', 'analyzing', 'planned', 'running', 'verifying')
				OR (state IN ('failed', 'cancelled') AND mutation_started_at IS NOT NULL)
			)
	;
CREATE INDEX "idx__emdash_transfer_operations_kind_state" on "_emdash_transfer_operations" ("kind", "state", "created_at");
CREATE INDEX "idx__emdash_transfer_operations_expires" on "_emdash_transfer_operations" ("state", "expires_at");
CREATE INDEX "idx__emdash_transfer_operations_uncollected" on "_emdash_transfer_operations" ("staging_collected_at", "state", "updated_at");
CREATE INDEX "idx__emdash_transfer_operations_created_by" on "_emdash_transfer_operations" ("created_by");
CREATE INDEX "idx__emdash_transfer_identity_map_target" on "_emdash_transfer_identity_map" ("operation_id", "entity_kind", "target_id");
CREATE INDEX "idx__emdash_transfer_identity_map_origin" on "_emdash_transfer_identity_map" ("origin_site_id", "entity_kind", "portable_id");
CREATE INDEX "idx__emdash_transfer_staged_files_state" on "_emdash_transfer_staged_files" ("operation_id", "state", "path");
CREATE INDEX "idx__emdash_transfer_package_index_group" on "_emdash_transfer_package_index" ("operation_id", "kind", "group_id");
CREATE INDEX "idx__emdash_transfer_package_index_name" on "_emdash_transfer_package_index" ("operation_id", "kind", "name_key");
CREATE INDEX "idx__emdash_transfer_package_index_parent" on "_emdash_transfer_package_index" ("operation_id", "kind", "parent_id");
CREATE INDEX "idx__emdash_transfer_media_blobs_sha256" on "_emdash_transfer_media_blobs" ("operation_id", "sha256");
CREATE INDEX "idx__emdash_transfer_approvals_user_status" on "_emdash_transfer_approvals" ("user_id", "status", "created_at");
CREATE INDEX "idx__emdash_transfer_approvals_status_created" on "_emdash_transfer_approvals" ("status", "created_at", "id");
CREATE INDEX "idx__emdash_transfer_approvals_operation" on "_emdash_transfer_approvals" ("operation_id");
CREATE INDEX "idx__emdash_relations_parent_collection" on "_emdash_relations" ("parent_collection");
CREATE INDEX "idx__emdash_relations_child_collection" on "_emdash_relations" ("child_collection");
CREATE INDEX "idx_emdash_redirect_generation_artifacts_digest" on "_emdash_redirect_generation_artifacts" ("digest");
