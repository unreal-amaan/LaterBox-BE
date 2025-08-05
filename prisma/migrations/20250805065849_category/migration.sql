/*
  Warnings:

  - A unique constraint covering the columns `[shareLink]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "shareLink" TEXT,
ALTER COLUMN "created_at" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_shareLink_key" ON "Category"("shareLink");
