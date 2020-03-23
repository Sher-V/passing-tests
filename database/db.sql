--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 12.1

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
-- Name: answers; Type: TABLE; Schema: public; Owner: vadim
--

CREATE TABLE public.answers (
    id integer NOT NULL,
    question_id integer NOT NULL,
    answer text NOT NULL,
    is_right_answer boolean NOT NULL
);


ALTER TABLE public.answers OWNER TO vadim;

--
-- Name: answers_id_seq; Type: SEQUENCE; Schema: public; Owner: vadim
--

ALTER TABLE public.answers ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.answers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: questions; Type: TABLE; Schema: public; Owner: vadim
--

CREATE TABLE public.questions (
    id integer NOT NULL,
    type text NOT NULL,
    test_id bigint,
    text text NOT NULL
);


ALTER TABLE public.questions OWNER TO vadim;

--
-- Name: questions_id_seq; Type: SEQUENCE; Schema: public; Owner: vadim
--

ALTER TABLE public.questions ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.questions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: tests; Type: TABLE; Schema: public; Owner: vadim
--

CREATE TABLE public.tests (
    id integer NOT NULL,
    title text NOT NULL
);


ALTER TABLE public.tests OWNER TO vadim;

--
-- Name: tests_id_seq; Type: SEQUENCE; Schema: public; Owner: vadim
--

ALTER TABLE public.tests ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tests_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: answers; Type: TABLE DATA; Schema: public; Owner: vadim
--

COPY public.answers (id, question_id, answer, is_right_answer) FROM stdin;
1	1	Everything	t
2	1	Nothing	f
3	1	That depends	f
4	2	Everything	f
5	2	Nothing	t
6	2	That depends	t
7	3	Everything	t
8	3	Nothing	t
9	3	That depends	t
13	5	1	t
14	5	2	f
15	5	That 3	f
16	6	Clean my room	t
17	6	Whash hands	t
18	6	Slepp	t
\.


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: vadim
--

COPY public.questions (id, type, test_id, text) FROM stdin;
1	single	1	What you can do?
2	multiple	2	What he can do?
3	anything	3	What I can do?
5	multiple	1	Are you a man?
8	anything	3	5
6	anything	1	What are you going to do today?
\.


--
-- Data for Name: tests; Type: TABLE DATA; Schema: public; Owner: vadim
--

COPY public.tests (id, title) FROM stdin;
1	Test №1
2	Test №2
3	Test №3
\.


--
-- Name: answers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vadim
--

SELECT pg_catalog.setval('public.answers_id_seq', 18, true);


--
-- Name: questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vadim
--

SELECT pg_catalog.setval('public.questions_id_seq', 9, true);


--
-- Name: tests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: vadim
--

SELECT pg_catalog.setval('public.tests_id_seq', 5, true);


--
-- Name: answers answers_pkey; Type: CONSTRAINT; Schema: public; Owner: vadim
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: vadim
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- Name: tests tests_pkey; Type: CONSTRAINT; Schema: public; Owner: vadim
--

ALTER TABLE ONLY public.tests
    ADD CONSTRAINT tests_pkey PRIMARY KEY (id);


--
-- Name: answers answers_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: vadim
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions(id) ON DELETE CASCADE;


--
-- Name: questions questions_test_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: vadim
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_test_id_fkey FOREIGN KEY (test_id) REFERENCES public.tests(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

