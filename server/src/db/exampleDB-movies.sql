--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

DROP DATABASE IF EXISTS movies;
--
-- Name: movies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE DATABASE movies WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'German_Austria.1252' LC_CTYPE = 'German_Austria.1252';

ALTER DATABASE movies OWNER TO postgres;

\connect movies

CREATE TABLE public.movies (
    id integer NOT NULL,
    title character varying(28) NOT NULL,
    year integer NOT NULL,
    genre character varying(26) NOT NULL,
    type character varying(6) NOT NULL
);


ALTER TABLE public.movies OWNER TO postgres;

--
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movies (id, title, year, genre, type) FROM stdin;
0	Avatar	2009	Action, Adventure, Fantasy	movie
1	I Am Legend	2007	Drama, Horror, Sci-Fi	movie
2	300	2006	Action, Drama, Fantasy	movie
3	The Avengers	2012	Action, Sci-Fi, Thriller	movie
4	The Wolf of Wall Street	2013	Biography, Comedy, Crime	movie
5	Interstellar	2014	Adventure, Drama, Sci-Fi	movie
6	Game of Thrones	2011	Adventure, Drama, Fantasy	series
7	Vikings	2013	Action, Drama, History	series
8	Gotham	2014	Action, Crime, Drama	series
9	Power	2014	Crime, Drama	series
10	Narcos	2015	Biography, Crime, Drama	series
11	Breaking Bad	20082013	Crime, Drama, Thriller	series
12	Doctor Strange	2016	Action, Adventure, Fantasy	movie
13	Rogue One: A Star Wars Story	2016	Action, Adventure, Sci-Fi	movie
14	Assassin's Creed	2016	Action, Adventure, Fantasy	movie
15	Luke Cage	2016	Action, Crime, Drama	series
\.


--
-- Name: movies movies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

