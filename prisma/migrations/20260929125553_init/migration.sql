-- CreateTable
CREATE TABLE "Winner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "scene" INTEGER NOT NULL,
    "timeMs" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Winner_pkey" PRIMARY KEY ("id")
);
