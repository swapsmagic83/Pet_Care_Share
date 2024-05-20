DROP DATABASE IF EXISTS pets;
CREATE DATABASE pets;
\connect pets

\i pets-schema.sql

-- DROP DATABASE pets_test;
-- CREATE DATABASE pets_test;
-- \connect pets_test