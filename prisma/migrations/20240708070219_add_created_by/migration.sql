/*
  Warnings:

  - Added the required column `createdBy` to the `journals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `journals` ADD COLUMN `createdBy` INTEGER NOT NULL;
