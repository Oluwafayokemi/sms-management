-- Deploy sms-management:user_add_phone to pg

BEGIN;

ALTER TABLE "user" ALTER COLUMN phone_number TYPE text;

COMMIT;
