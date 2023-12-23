/*
  Warnings:

  - You are about to drop the column `careerStardate` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `proffessionalSummary` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `careerStarDate` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "careerStardate",
DROP COLUMN "proffessionalSummary",
ADD COLUMN     "careerStarDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "professionalSummary" TEXT DEFAULT NULL,
ALTER COLUMN "bio" SET DEFAULT NULL,
ALTER COLUMN "preferredLocation" SET DEFAULT NULL,
ALTER COLUMN "cvLink" SET DEFAULT NULL;
