-- Deploy sms-management:appschema to pg

BEGIN;
-- USER
CREATE TYPE status AS ENUM ('pending', 'sent', 'Delivered');

CREATE TABLE "user" (
    id                  serial NOT NULL,
    first_name          text,
    last_name           text,
    user_name           text UNIQUE NOT NULL,
    email               text UNIQUE NOT NULL,
    phone_number        integer UNIQUE NOT NULL,
    date_created        date DEFAULT CURRENT_DATE NOT NULL,
    password            text NOT Null,
    CONSTRAINT pk_user_id PRIMARY KEY ( id )
);

CREATE TABLE "message" (
    id                  serial NOT NULL,
    body                text NOT NULL,
    to_user             integer NOT NULL REFERENCES "user" (id),
    from_user           integer NOT NULL REFERENCES "user" (id),
    sms_status          status DEFAULT 'pending',
    date_created        date DEFAULT CURRENT_DATE NOT NULL,
    date_updated        timestamptz
);

-- FOREIGN KEYS

COMMIT;
