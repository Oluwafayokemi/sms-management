-- Deploy sms-management:message_update_schema to pg

BEGIN;

ALTER TABLE "message" ALTER COLUMN to_user TYPE text NOT NULL REFERENCES "user" (user_name);
ALTER TABLE "message" ALTER COLUMN from_user TYPE text NOT NULL REFERENCES "user" (user_name ;
COMMIT;
