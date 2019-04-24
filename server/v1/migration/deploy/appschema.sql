-- Deploy sms-management:appschema to pg

BEGIN;
-- USER
CREATE TYPE status AS ENUM ('pending', 'sent', 'Delivered');

CREATE TABLE "user" (
    id                  serial NOT NULL,
    first_name          text NOT NULL,
    last_name           text NOT NULL,
    user_name           text NOT NULL,
    phone_number        integer NOT NULL,
    date_created        date DEFAULT CURRENT_DATE NOT NULL,
    CONSTRAINT pk_user_id PRIMARY KEY ( id )
);

CREATE TABLE "message" (
    id                  serial NOT NULL,
    body                text NOT NULL,
    message_recipient   text NOT NULL,
    to_user             integer NOT NULL REFERENCES "user" (id),
    from_user           integer NOT NULL REFERENCES "user" (id),
    sms_status          status DEFAULT 'pending',
    date_created        date DEFAULT CURRENT_DATE NOT NULL,
    date_updated        timestamptz
);

-- FOREIGN KEYS

COMMIT;
