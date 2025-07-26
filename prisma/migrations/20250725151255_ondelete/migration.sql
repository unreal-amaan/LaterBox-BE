-- DropForeignKey
ALTER TABLE "SavedLink" DROP CONSTRAINT "SavedLink_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "SavedLink" ADD CONSTRAINT "SavedLink_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
