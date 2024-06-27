-- CreateTable
CREATE TABLE "tbl_test" (
    "test_code" VARCHAR(6) NOT NULL,
    "test_name" VARCHAR(100) NOT NULL,
    "test_id" VARCHAR(10) NOT NULL,
    "test_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_tbl_test" PRIMARY KEY ("test_code")
);
