-- CreateTable
CREATE TABLE "Provider" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "appointmentLength" INTEGER NOT NULL DEFAULT 15
);

-- CreateTable
CREATE TABLE "ProviderBookings" (
    "id" UUID NOT NULL,
    "providerId" UUID NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "booked" BOOLEAN NOT NULL,
    "bookedById" UUID NOT NULL,
    "confirmed" BOOLEAN NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Client" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Provider_id_key" ON "Provider"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_email_key" ON "Provider"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ProviderBookings_id_key" ON "ProviderBookings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProviderBookings_startTime_key" ON "ProviderBookings"("startTime");

-- CreateIndex
CREATE UNIQUE INDEX "Client_id_key" ON "Client"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- AddForeignKey
ALTER TABLE "ProviderBookings" ADD CONSTRAINT "ProviderBookings_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderBookings" ADD CONSTRAINT "ProviderBookings_bookedById_fkey" FOREIGN KEY ("bookedById") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
