-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(42) NOT NULL,
    "lastName" VARCHAR(42) NOT NULL,
    "email" VARCHAR(42) NOT NULL,
    "phoneNumber" VARCHAR(13) NOT NULL,
    "bio" TEXT DEFAULT NULL,
    "proffessionalSummary" TEXT DEFAULT NULL,
    "password" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "careerStardate" TIMESTAMP(3) NOT NULL,
    "isOpenToWork" BOOLEAN NOT NULL DEFAULT true,
    "isOpenToRelocation" BOOLEAN NOT NULL DEFAULT true,
    "preferredLocation" TEXT DEFAULT NULL,
    "techStack" TEXT[],
    "cvLink" TEXT DEFAULT NULL,
    "socialMediaLinks" TEXT[],

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);
