/*
  Warnings:

  - You are about to drop the column `tournamentSize` on the `Tournament` table. All the data in the column will be lost.
  - Added the required column `size` to the `Tournament` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tournament" DROP COLUMN "tournamentSize",
ADD COLUMN     "size" INTEGER NOT NULL;
