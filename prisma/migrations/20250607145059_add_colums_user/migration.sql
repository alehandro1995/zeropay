-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'COMPLETED', 'CANCELED', 'FAILED', 'REFUNDED', 'DISPUTED');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('RECEIVE', 'PAYMENT');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "payInExchangers" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "payInGambling" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "payOutExchangers" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "payOutGambling" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "num" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "requisitesId" INTEGER NOT NULL,
    "deviceId" INTEGER,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "type" "TransactionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_number_key" ON "Transaction"("num");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_requisitesId_fkey" FOREIGN KEY ("requisitesId") REFERENCES "requisites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE SET NULL ON UPDATE CASCADE;
