-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "bio" SET DEFAULT NULL,
ALTER COLUMN "location" SET DEFAULT NULL,
ALTER COLUMN "preferredLocation" SET DEFAULT NULL,
ALTER COLUMN "cvLink" SET DEFAULT NULL,
ALTER COLUMN "professionalSummary" SET DEFAULT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_phoneNumber_key" ON "Profile"("phoneNumber");
