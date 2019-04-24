-- Verify sms-management:appschema on pg

BEGIN;

-- 1 / 0 will throw an exception and fail the test
SELECT 1/COUNT(*) FROM information_schema.tables WHERE table_name = 'user';
SELECT 1/COUNT(*) FROM information_schema.tables WHERE table_name = 'message';
ROLLBACK;
