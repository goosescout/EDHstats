/*
  Warnings:

  - The primary key for the `Deck` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tournamentSize` on the `Deck` table. All the data in the column will be lost.
  - You are about to drop the column `tournamentTID` on the `Deck` table. All the data in the column will be lost.
  - The primary key for the `Tournament` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `TID` on the `Tournament` table. All the data in the column will be lost.
  - Added the required column `tournamentId` to the `Deck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tournamentSize` to the `Tournament` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Deck" DROP CONSTRAINT "Deck_tournamentTID_fkey";

-- DropForeignKey
ALTER TABLE "_CardToDeck" DROP CONSTRAINT "_CardToDeck_B_fkey";

-- AlterTable
ALTER TABLE "Deck" DROP CONSTRAINT "Deck_pkey",
DROP COLUMN "tournamentSize",
DROP COLUMN "tournamentTID",
ADD COLUMN     "tournamentId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Deck_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Deck_id_seq";

-- AlterTable
ALTER TABLE "Tournament" DROP CONSTRAINT "Tournament_pkey",
DROP COLUMN "TID",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "tournamentSize" INTEGER NOT NULL,
ADD CONSTRAINT "Tournament_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_CardToDeck" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Deck" ADD CONSTRAINT "Deck_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToDeck" ADD CONSTRAINT "_CardToDeck_B_fkey" FOREIGN KEY ("B") REFERENCES "Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;
