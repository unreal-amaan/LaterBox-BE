/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SavedLinkToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SavedLinkToTag" DROP CONSTRAINT "_SavedLinkToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_SavedLinkToTag" DROP CONSTRAINT "_SavedLinkToTag_B_fkey";

-- AlterTable
ALTER TABLE "SavedLink" ADD COLUMN     "tags" TEXT[];

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_SavedLinkToTag";
