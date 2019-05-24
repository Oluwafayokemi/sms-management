-- Deploy sms-management:user_create_unique_index to pg

BEGIN;

CREATE UNIQUE INDEX duplicate ON "user" (user_name, email, phone_number);

COMMIT;
