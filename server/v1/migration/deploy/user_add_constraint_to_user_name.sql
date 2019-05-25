-- Deploy sms-management:user_add_constraint_to_user_name to pg

BEGIN;
ALTER TABLE "user" DROP CONSTRAINT pk_user_id CASCADE;
ALTER TABLE "user" ADD CONSTRAINT pk_user_name PRIMARY KEY ( user_name );

COMMIT;
