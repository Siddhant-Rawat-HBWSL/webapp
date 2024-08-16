/*
  Warnings:

  - You are about to drop the column `passwordUpdateAt` on the `user` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Password` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `password` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `passwordUpdateAt`;
