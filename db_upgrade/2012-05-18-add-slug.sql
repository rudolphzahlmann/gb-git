ALTER TABLE "portfolio_project" ADD COLUMN "slug" varchar(50) UNIQUE;
UPDATE "portfolio_project" SET "slug" = "title";
ALTER TABLE "portfolio_project" ALTER COLUMN "slug" SET NOT NULL;
