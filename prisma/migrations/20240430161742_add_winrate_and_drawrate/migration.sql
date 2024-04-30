/*
  Warnings:

  - Added the required column `drawrate` to the `Deck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `winrate` to the `Deck` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Deck" ADD COLUMN     "drawrate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "winrate" DOUBLE PRECISION NOT NULL;
