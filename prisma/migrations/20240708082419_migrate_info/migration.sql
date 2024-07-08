/*
  Warnings:

  - You are about to drop the column `user` on the `journals` table. All the data in the column will be lost.
  - Added the required column `createdBy` to the `journals` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `journals` DROP FOREIGN KEY `journals_user_fkey`;

-- AlterTable
ALTER TABLE `journals` DROP COLUMN `user`,
    ADD COLUMN `createdBy` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `journals` ADD CONSTRAINT `journals_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
