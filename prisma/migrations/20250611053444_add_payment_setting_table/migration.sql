-- CreateTable
CREATE TABLE "PaymentSetting" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "minOrder" INTEGER,
    "maxOrder" INTEGER,
    "currencyId" INTEGER NOT NULL,
    "paymentId" INTEGER NOT NULL,
    "bankId" INTEGER NOT NULL,

    CONSTRAINT "PaymentSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentSetting_userId_key" ON "PaymentSetting"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentSetting_currencyId_key" ON "PaymentSetting"("currencyId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentSetting_paymentId_key" ON "PaymentSetting"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentSetting_bankId_key" ON "PaymentSetting"("bankId");

-- AddForeignKey
ALTER TABLE "PaymentSetting" ADD CONSTRAINT "PaymentSetting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentSetting" ADD CONSTRAINT "PaymentSetting_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentSetting" ADD CONSTRAINT "PaymentSetting_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payment_method"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentSetting" ADD CONSTRAINT "PaymentSetting_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "bank_name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
