--DDL Database and Table for BDSwiss Coding Challenge
CREATE DATABASE dbswiss;


--use extension uuid-ossp
--RUN create extension if not exists "uuid-ossp"; //pgsl Terminal
create table users
(
    id  uuid  PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name varchar(30) not null,
    last_name  varchar(30) not null,
    email      varchar(50) not null,
    password   text        not null
);




