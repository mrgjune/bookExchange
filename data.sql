DROP DATABASE IF EXISTS 'bookly';
CREATE DATABASE 'bookly';
\c 'bookly'

CREATE TABLE schools(
    school_handle TEXT PRIMARY KEY,
    school_name TEXT NOT NULL
);

CREATE TABLE users(
    username TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    school_handle TEXT NOT NULL REFERENCES schools ON DELETE CASCADE,
    is_admin BOOLEAN NOT NULL default FALSE
);


CREATE TABLE books(
    isbn Float PRIMARY KEY,
    book_image TEXT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    description TEXT NOT NULL,
    subject_type TEXT NOT NULL,
    edition_number TEXT NOT NULL,
    publisher TEXT NOT NULL,
    copyright_year INTEGER ,
    language Text default 'English',
    available BOOLEAN NOT NULL default TRUE,
    school_handle TEXT NOT NULL REFERENCES schools ON DELETE CASCADE,
    copies INTEGER default  1,
    checked_out TEXT REFERENCES users,
    checked_out_date TIMESTAMP,
    due_date TIMESTAMP
);
INSERT INTO schools(school_handle,school_name) VALUES
('Skidmore','Skidmore College'),
('Hamilton','Hamilton College'),
('St Lawerence','St Lawerence Univeristy'),
('Hobart and William Smith','Hobart and William Smith Colleges'),
('Union','Union College');

INSERT INTO users(username,password,first_name,last_name,email,school_handle,is_admin)VALUES
('mrgjune','password','Mara','Greene','mgreene@skidmore.edu','skid',TRUE),
('cthomps','password','Clara','Thompson','cthomps@skidmore.edu','ham',FALSE);

INSERT INTO books(isbn,book_image,
title,author,description,
subject_type,edition_number,
publisher,copyright_year,
language,
available,
school_handle,copies)VALUES
(013411834,'ds.jpeg','Data Science','Pete Dejore','A indepth explaintion on data science with details of models ',
'Compute Science','1st','Open House',2018,'English',true,'Hobart and William Smith',1);
INSERT INTO books(isbn,book_image,title,author,description,subject_type,edition_number,publisher,copyright_year,language,
available,school_handle,copies)VALUES
(9781947172722,'org.jpeg','Organizational Behavior','David Joe','a textbook for organization behavior','Business','1st','OpenStax',2019,'English',
true,'Hamilton',1);
INSERT INTO books(isbn,book_image,title,author,description,subject_type,edition_number,publisher,copyright_year,language,
available,school_handle,copies)VALUES
(0134112830,'chem.jpeg','Chemistry A Molecular Approach','Nivaldo J Tro','A Molecular Approach reinforces students’ development of 21st century skills including data interpretation and analysis, problem solving and quantitative reasoning, applying conceptual understanding to new situations and peer-to-peer collaboration.   Nivaldo Tro presents chemistry visually through multi-level images–macroscopic, molecular, and symbolic representations–helping students see the connections between the world they see around them (macroscopic), the atoms and molecules that compose the world (molecular), and the formulas they write down on paper (symbolic). The benefits of Dr. Tro’s problem-solving approach are reinforced through digital, Interactive Worked Examples that provide students with an office-hour type of environment and expanded coverage on the latest developments in chemistry.',
'Chemistry','4th','Open House',2018,'English',true,'St Lawerence',1);

INSERT INTO books(isbn,book_image,title,author,description,subject_type,edition_number,publisher,copyright_year,language,
available,school_handle,copies)VALUES
(9780123850591,'computersystems.jpeg','Computer Networks',
'Larry Peterson',
'Suppose you want to build a computer network, one that has the potential to grow to global proportions and to support applications as diverse as teleconferencing, video on demand, electronic commerce, distributed computing, and digital libraries. What available technologies would serve as the underlying building blocks, and what kind of software architecture would you design to integrate these building blocks into an effective communication service? Answering this question is the overriding goal of this book—to describe the available building materials and then to show how they can be used to construct a network from the ground up.',
'Computer Science','1st',
'Larry Petereson and Bruce David',
2019,'English',true,
'Skidmore',1);

INSERT INTO books(isbn,book_image,
title,author,description,
subject_type,edition_number,
publisher,copyright_year,
language,
available,
school_handle,copies)VALUES
(0234324324,'phil.jpeg','Introduction to Philosophy: Ethics','Mathews and Hendricks',
'We often make judgments about good and bad, right and wrong. Philosophical ethics is the critical examination of these and other concepts central to how we evaluate our own and each others’ behavior and choices.',
'Philosophy','1st','Rebus Community','2019','English',True,'Union',1);

