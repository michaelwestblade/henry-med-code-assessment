-- DropForeignKey
ALTER TABLE "ProviderBookings" DROP CONSTRAINT "ProviderBookings_bookedById_fkey";

-- AlterTable
ALTER TABLE "ProviderBookings" ALTER COLUMN "bookedById" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ProviderBookings" ADD CONSTRAINT "ProviderBookings_bookedById_fkey" FOREIGN KEY ("bookedById") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
