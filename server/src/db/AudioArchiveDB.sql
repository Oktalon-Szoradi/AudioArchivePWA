--
-- PostgreSQL database dump
--

-- Dumped from database version 15.5 (Debian 15.5-1.pgdg120+1)
-- Dumped by pg_dump version 16.1 (Debian 16.1-1.pgdg120+1)

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

DROP DATABASE IF EXISTS audioarchive;
--
-- Name: audioarchive; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE audioarchive WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';


ALTER DATABASE audioarchive OWNER TO postgres;

\connect audioarchive

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

--
-- Name: audios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.audios (
    aid integer NOT NULL,
    name character varying NOT NULL,
    description text,
    "timestamp" timestamp with time zone NOT NULL,
    rating integer,
    audio bytea NOT NULL,
    CONSTRAINT "validRating" CHECK (((rating >= 0) AND (rating <= 5)))
);


ALTER TABLE public.audios OWNER TO postgres;

--
-- Name: audios_aid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.audios_aid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.audios_aid_seq OWNER TO postgres;

--
-- Name: audios_aid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.audios_aid_seq OWNED BY public.audios.aid;


--
-- Name: audios aid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audios ALTER COLUMN aid SET DEFAULT nextval('public.audios_aid_seq'::regclass);


--
-- Data for Name: audios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.audios (aid, name, description, "timestamp", rating, audio) FROM stdin;
\.


--
-- Name: audios_aid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.audios_aid_seq', 1, false);


--
-- Name: audios audios_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audios
    ADD CONSTRAINT audios_pk PRIMARY KEY (aid);


--
-- PostgreSQL database dump complete
--

