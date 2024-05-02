-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CommanderToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CommanderToUser_AB_unique" ON "_CommanderToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CommanderToUser_B_index" ON "_CommanderToUser"("B");

-- AddForeignKey
ALTER TABLE "_CommanderToUser" ADD CONSTRAINT "_CommanderToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Commander"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommanderToUser" ADD CONSTRAINT "_CommanderToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
