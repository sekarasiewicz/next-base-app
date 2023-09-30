/*
  Warnings:

  - You are about to drop the column `imageURL` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Link` table. All the data in the column will be lost.
  - Added the required column `URL` to the `Link` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Link" DROP COLUMN "imageURL",
DROP COLUMN "url",
ADD COLUMN     "URL" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL;
