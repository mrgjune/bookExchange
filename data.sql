DROP DATABASE IF EXISTS 'bookly';
CREATE DATABASE 'bookly';
\c 'bookly'

CREATE TABLE schools(
    handle TEXT PRIMARY KEY,
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
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    subject_type TEXT NOT NULL,
    edition_number Integer NOT NULL,
    available BOOLEAN NOT NULL default TRUE,
    school_handle TEXT NOT NULL REFERENCES schools ON DELETE CASCADE,
    copies INTEGER NOT NULL,
    checked_out TEXT REFERENCES users,
    checked_out_date TIMESTAMP,
    due_date TIMESTAMP
);
INSERT INTO schools(handle,school_name) VALUES
('skid','Skidmore College'),
('ham','Hamilton College'),
('slu','St Lawerence College');

INSERT INTO users(username,password,first_name,last_name,email,school_handle,is_admin)VALUES
('mrgjune','password','Mara','Greene','mgreene@skidmore.edu','skid',TRUE),
('cthomps','password','Clara','Thompson','cthomps@skidmore.edu','Hamilton',FALSE);

INSERT INTO books(isbn,title,author,subject_type,edition_number,available,school_handle,copies)VALUES
(45435345,'Chemistry','Mcflair','Chem',3,TRUE,'skid',1);
