-- CreateEnum
CREATE TYPE "PaymentMode" AS ENUM ('Card', 'Upi', 'NetBanking', 'Crypto', 'Other');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Student', 'Teacher', 'Admin');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "enrolled_Course" TEXT,
    "role" "Role" NOT NULL DEFAULT 'Student'
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Category" TEXT NOT NULL,
    "Price" TEXT NOT NULL,
    "Thumbnail" TEXT NOT NULL,
    "EnrolledStudents" TEXT NOT NULL,
    "Lectures" TEXT NOT NULL,
    "Teachers" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL,
    "validity" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Lecture" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "VideoUrl" TEXT NOT NULL,
    "UpdatedDate" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "CoursePurchases" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "paymentMethod" "PaymentMode" NOT NULL,
    "paymentId" TEXT NOT NULL,
    "purchasedDate" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Course_id_key" ON "Course"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Lecture_id_key" ON "Lecture"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CoursePurchases_id_key" ON "CoursePurchases"("id");

-- AddForeignKey
ALTER TABLE "CoursePurchases" ADD CONSTRAINT "CoursePurchases_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
