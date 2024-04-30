/*
  Warnings:

  - The primary key for the `Card` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Card` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CardToDeck" DROP CONSTRAINT "_CardToDeck_A_fkey";

-- AlterTable
ALTER TABLE "Card" DROP CONSTRAINT "Card_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Card_pkey" PRIMARY KEY ("name");

-- AlterTable
ALTER TABLE "_CardToDeck" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_CardToDeck" ADD CONSTRAINT "_CardToDeck_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("name") ON DELETE CASCADE ON UPDATE CASCADE;
