/*
  Warnings:

  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[passwordId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `passwordId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `password`,
    ADD COLUMN `passwordId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Password` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `HashedPassword` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_passwordId_key` ON `User`(`passwordId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_passwordId_fkey` FOREIGN KEY (`passwordId`) REFERENCES `Password`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
