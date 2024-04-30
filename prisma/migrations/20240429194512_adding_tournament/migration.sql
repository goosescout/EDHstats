-- AlterTable
ALTER TABLE "Deck" ADD COLUMN     "tournamentTID" TEXT;

-- CreateTable
CREATE TABLE "Tournament" (
    "TID" TEXT NOT NULL,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("TID")
);

-- AddForeignKey
ALTER TABLE "Deck" ADD CONSTRAINT "Deck_tournamentTID_fkey" FOREIGN KEY ("tournamentTID") REFERENCES "Tournament"("TID") ON DELETE SET NULL ON UPDATE CASCADE;
