-- CreateTable
CREATE TABLE "Card" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "manacost" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Deck" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "wins" INTEGER NOT NULL,
    "losses" INTEGER NOT NULL,
    "draws" INTEGER NOT NULL,
    "place" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "price" REAL NOT NULL,
    "winrate" REAL NOT NULL,
    "drawrate" REAL NOT NULL,
    "commanderName" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    CONSTRAINT "Deck_commanderName_fkey" FOREIGN KEY ("commanderName") REFERENCES "Commander" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Deck_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tournament" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "size" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Commander" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "identity" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CardToDeck" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CardToDeck_A_fkey" FOREIGN KEY ("A") REFERENCES "Card" ("name") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CardToDeck_B_fkey" FOREIGN KEY ("B") REFERENCES "Deck" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CommanderToUser" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CommanderToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Commander" ("name") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CommanderToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_CardToDeck_AB_unique" ON "_CardToDeck"("A", "B");

-- CreateIndex
CREATE INDEX "_CardToDeck_B_index" ON "_CardToDeck"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CommanderToUser_AB_unique" ON "_CommanderToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CommanderToUser_B_index" ON "_CommanderToUser"("B");
