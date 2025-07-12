CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    documents character varying(100),
    created_date TIMESTAMP WITHOUT TIME ZONE,
    created_by VARCHAR(100),
    updated_date TIMESTAMP WITHOUT TIME ZONE,
    updated_by VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_by VARCHAR(100),
    created_date TIMESTAMP WITHOUT TIME ZONE,
    updated_by VARCHAR(100),
    updated_date TIMESTAMP WITHOUT TIME ZONE
);

CREATE TABLE IF NOT EXISTS question_tags (
    id SERIAL PRIMARY KEY,
    question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    created_by VARCHAR(100),
    created_date TIMESTAMP WITHOUT TIME ZONE,
	 updated_by VARCHAR(100),
    updated_date TIMESTAMP WITHOUT TIME ZONE
);

CREATE TABLE IF NOT EXISTS user_answers (
    id SERIAL PRIMARY KEY,
    question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    created_by VARCHAR(100),
    created_date TIMESTAMP WITHOUT TIME ZONE,
	 updated_by VARCHAR(100),
    updated_date TIMESTAMP WITHOUT TIME ZONE
);

CREATE TABLE IF NOT EXISTS user_answer_ratings (
    id SERIAL PRIMARY KEY,
    user_answers_id INTEGER NOT NULL REFERENCES user_answers(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    vote_count INT DEFAULT 0,
    created_by VARCHAR(100),
    created_date TIMESTAMP WITHOUT TIME ZONE,
	updated_date TIMESTAMP WITHOUT TIME ZONE

);


CREATE OR REPLACE FUNCTION set_created_date() RETURNS trigger AS $$
/* ------------------------------------------------------------------------------------
FUNCTION: set_created_date
DESCRIPTION 	: This function use to generate trigger for created date
CREATED BY 		: Dhruv Sonani
CREATED DATE	: 07-07-2025
------------------------------------------------------------------------------------*/
BEGIN
	IF NEW.created_date IS NULL THEN
  		NEW.created_date := CURRENT_TIMESTAMP;
	END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_updated_date() RETURNS trigger AS $$
/* ------------------------------------------------------------------------------------
FUNCTION: set_updated_date
DESCRIPTION 	: Set both triggers to all the tables of current database
CREATED BY 		: Dhruv Sonani
CREATED DATE	: 07-07-2025
CHANGE HISTORY	:
------------------------------------------------------------------------------------*/
BEGIN
  NEW.updated_date := CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


DO $$
DECLARE
    ct text;
    ut text;
/* ------------------------------------------------------------------------------------
SCRIPT: for set_created_date & set_updated_date
DESCRIPTION 	: Set both triggers to all the tables of current database
CREATED BY 		: Dhruv Sonani
CREATED DATE	: 07-07-2025
CHANGE HISTORY	:
------------------------------------------------------------------------------------*/
BEGIN
    FOR ct IN 
        SELECT table_name FROM information_schema.columns
        WHERE column_name = 'created_date'
    LOOP
        EXECUTE format('DROP TRIGGER IF EXISTS set_created_date on %I',ct);

        EXECUTE format('CREATE TRIGGER set_created_date
                        BEFORE INSERT ON %I
                        FOR EACH ROW EXECUTE PROCEDURE set_created_date()',
                        ct);
    END LOOP;

    FOR ut IN 
        SELECT table_name FROM information_schema.columns
        WHERE column_name = 'updated_date'
    LOOP
        EXECUTE format('DROP TRIGGER IF EXISTS set_updated_date on %I',ut);

        EXECUTE format('CREATE TRIGGER set_updated_date
                        BEFORE UPDATE ON %I
                        FOR EACH ROW EXECUTE PROCEDURE set_updated_date()',
                        ut);
    END LOOP;
    
END;
$$ LANGUAGE plpgsql;