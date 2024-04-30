/*
  Warnings:

  - The primary key for the `Commander` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Commander` table. All the data in the column will be lost.
  - You are about to drop the column `commanderId` on the `Deck` table. All the data in the column will be lost.
  - Added the required column `commanderName` to the `Deck` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Deck" DROP CONSTRAINT "Deck_commanderId_fkey";

-- AlterTable
ALTER TABLE "Commander" DROP CONSTRAINT "Commander_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Commander_pkey" PRIMARY KEY ("name");

-- AlterTable
ALTER TABLE "Deck" DROP COLUMN "commanderId",
ADD COLUMN     "commanderName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Deck" ADD CONSTRAINT "Deck_commanderName_fkey" FOREIGN KEY ("commanderName") REFERENCES "Commander"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
