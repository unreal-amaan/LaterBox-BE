/*
  Warnings:

  - Made the column `note` on table `SavedLink` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SavedLink" ALTER COLUMN "note" SET NOT NULL,
ALTER COLUMN "note" SET DEFAULT '';
