-- Revert sms-management:appschema from pg

BEGIN;

-- XXX Add DDLs h-- Order is important! (or use CASCADE)
DROP TABLE "user" CASCADE;
DROP TABLE message CASCADE;

COMMIT;
