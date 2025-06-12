-- AlterTable
ALTER TABLE "User" ADD COLUMN     "paymentStatus" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "receiveStatus" BOOLEAN NOT NULL DEFAULT false;
