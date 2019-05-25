-- Deploy sms-management:message_update_sms_status_type to pg

BEGIN;

ALTER TABLE "message" ALTER COLUMN sms_status TYPE text;

COMMIT;
