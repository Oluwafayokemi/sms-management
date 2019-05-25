-- Deploy sms-management:message_update_schema to pg
BEGIN;
ALTER TABLE "message" ALTER COLUMN to_user TYPE text;

ALTER TABLE "message" ALTER COLUMN from_user TYPE text;
COMMIT;