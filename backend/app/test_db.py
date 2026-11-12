from sqlalchemy import text
from app.database import engine

query = text("""
    SELECT
        column_name,
        is_nullable,
        column_default
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'users'
    ORDER BY ordinal_position;
""")

with engine.connect() as connection:
    result = connection.execute(query)

    for row in result:
        print(
            f"{row.column_name} | "
            f"Nullable: {row.is_nullable} | "
            f"Default: {row.column_default}"
        )