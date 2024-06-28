/*
  Warnings:

  - Made the column `writer` on table `board` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `board` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `board` required. This step will fail if there are existing NULL values in that column.
  - Made the column `writer` on table `reply` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `reply` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "board" ALTER COLUMN "writer" SET NOT NULL,
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "content" SET NOT NULL;

-- AlterTable
ALTER TABLE "reply" ALTER COLUMN "writer" SET NOT NULL,
ALTER COLUMN "content" SET NOT NULL;
