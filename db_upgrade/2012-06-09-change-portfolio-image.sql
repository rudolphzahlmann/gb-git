BEGIN;
ALTER TABLE "portfolio_image"
 ADD COLUMN "sort_key" smallint CHECK ("sort_key" >= 0) NOT NULL DEFAULT 0;
ALTER TABLE "portfolio_image"
 ALTER COLUMN "sort_key" DROP DEFAULT;
ALTER TABLE "portfolio_image"
 RENAME COLUMN "file" TO "image";
COMMIT;
