/*
  Warnings:

  - You are about to drop the `tbl_test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "tbl_test";

-- CreateTable
CREATE TABLE "board" (
    "board_id" SERIAL NOT NULL,
    "writer" VARCHAR(50),
    "title" VARCHAR(50),
    "content" VARCHAR(1000),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "board_pkey" PRIMARY KEY ("board_id")
);

-- CreateTable
CREATE TABLE "reply" (
    "board_id" INTEGER NOT NULL,
    "reply_id" SERIAL NOT NULL,
    "writer" VARCHAR(50),
    "content" VARCHAR(1000),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "reply_pkey" PRIMARY KEY ("reply_id")
);

-- AddForeignKey
ALTER TABLE "reply" ADD CONSTRAINT "fk_reply_board_id_board_board_id" FOREIGN KEY ("board_id") REFERENCES "board"("board_id") ON DELETE RESTRICT ON UPDATE RESTRICT;
