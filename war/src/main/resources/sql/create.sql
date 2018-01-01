
CREATE SEQUENCE hibernate_sequence
  INCREMENT 5
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 10050000
  CACHE 1;


--DROP TABLE motif;
--DROP TABLE author;
--DROP TABLE artifact;
--DROP TABLE person;
--DROP TABLE raw_artifact_data;



CREATE TABLE artifact (
	id int not null,
    onb_image_id int,
    title text,
    description text,
    corporate_body text,
    year int,
    location text,
    address text,
    inventory_number text,
    district int,
    additional_title text,
    digital_collection text,
    picture_credits text,
    date_text text,
    technique_id int,

    CONSTRAINT artifact_pk
		PRIMARY KEY (id)
);

ALTER TABLE artifact
	ADD CONSTRAINT technique_id_fk
		FOREIGN KEY (technique_id)
		REFERENCES technique;


CREATE TABLE person (
	id int not null,
    name text,
    firstName text,
    lastName text,
    wikipedia_url text,
    zettelkatalog_url text,
    dnb_url text,
    musiklexikon_url text,
    biographien_url text,

    CONSTRAINT person_pk
		PRIMARY KEY (id)

);

CREATE TABLE author (
	artifact_id int not null
	, person_id int not null
	, CONSTRAINT author_pk
		PRIMARY KEY (artifact_id, person_id)
);

ALTER TABLE author
	ADD CONSTRAINT artifact_id_fk
		FOREIGN KEY (artifact_id)
		REFERENCES artifact;

ALTER TABLE author
	ADD CONSTRAINT person_id_fk
		FOREIGN KEY (person_id)
		REFERENCES person;

CREATE TABLE motif (
	artifact_id int not null
	, person_id int not null
	, CONSTRAINT motif_pk
		PRIMARY KEY (artifact_id, person_id)
);

ALTER TABLE motif
	ADD CONSTRAINT artifact_id_fk
		FOREIGN KEY (artifact_id)
		REFERENCES artifact;

ALTER TABLE motif
	ADD CONSTRAINT person_id_fk
		FOREIGN KEY (person_id)
		REFERENCES person;


CREATE TABLE keyword (
	id int not null,
	value text,
    CONSTRAINT keyword_pk
		PRIMARY KEY (id)
);


CREATE TABLE assigned_keyword (
	artifact_id int not null
	, keyword_id int not null
	, CONSTRAINT assigned_keyword_pk
		PRIMARY KEY (artifact_id, keyword_id)
);

ALTER TABLE assigned_keyword
	ADD CONSTRAINT artifact_id_fk
		FOREIGN KEY (artifact_id)
		REFERENCES artifact;

ALTER TABLE assigned_keyword
	ADD CONSTRAINT keyword_id_fk
		FOREIGN KEY (keyword_id)
		REFERENCES keyword;


CREATE TABLE technique (
	id int not null,
	name text unique,
    CONSTRAINT technique_pk
		PRIMARY KEY (id)
);