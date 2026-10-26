/**
 * SignBridge veritabanı entegrasyonunda kullanılacak tablo ve sütun adları.
 * Bu dosya gerçek bir veritabanı bağlantısı kurmaz; frontend ile ekipteki
 * PostgreSQL/Supabase şemasının aynı adlandırmayı kullanmasını sağlar.
 */
export const databaseSchema = Object.freeze({
  users: [
    "id",
    "first_name",
    "last_name",
    "phone",
    "email",
    "user_role",
    "password_hash",
    "avatar_data",
    "avatar_url",
    "terms_accepted",
    "created_at"
  ],
  user_preferences: [
    "id",
    "user_id",
    "theme",
    "font_size",
    "font_family",
    "playback_speed",
    "updated_at"
  ],
  user_favorites: [
    "id",
    "user_id",
    "video_id",
    "created_at"
  ],
  sign_videos: [
    "id",
    "word",
    "letter",
    "description",
    "category",
    "is_quick_phrase",
    "video_data",
    "video_mime_type",
    "video_url",
    "created_at"
  ],
  app_themes: [
    "id",
    "theme_name",
    "description"
  ]
});
