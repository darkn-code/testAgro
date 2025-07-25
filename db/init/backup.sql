--
-- PostgreSQL database dump
--
CREATE DATABASE agro40;
\c agro40

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: cultivos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cultivos (
    id_cultivo integer NOT NULL,
    nombre_cultivo text NOT NULL,
    tipo_cultivo text NOT NULL,
    descripcion_cultivo text NOT NULL,
    id_plaga integer NOT NULL,
    id_tratamiento integer NOT NULL,
    id_parcela integer NOT NULL,
    id_ubicacion integer NOT NULL
);


ALTER TABLE public.cultivos OWNER TO postgres;

--
-- Name: cultivos_id_cultivo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cultivos_id_cultivo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cultivos_id_cultivo_seq OWNER TO postgres;

--
-- Name: cultivos_id_cultivo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cultivos_id_cultivo_seq OWNED BY public.cultivos.id_cultivo;


--
-- Name: parcela; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parcela (
    id_parcela integer NOT NULL,
    nombre_parcela text NOT NULL,
    descripcion_parcela text NOT NULL,
    ruta_foto_parcela text NOT NULL,
    id_cultivo integer NOT NULL,
    id_plaga integer NOT NULL,
    id_tratamiento integer NOT NULL,
    id_ubicacion integer NOT NULL
);


ALTER TABLE public.parcela OWNER TO postgres;

--
-- Name: parcela_id_parcela_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.parcela_id_parcela_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.parcela_id_parcela_seq OWNER TO postgres;

--
-- Name: parcela_id_parcela_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.parcela_id_parcela_seq OWNED BY public.parcela.id_parcela;


--
-- Name: plagas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plagas (
    id_plaga integer NOT NULL,
    nombre_plaga text NOT NULL,
    tipo_plaga text NOT NULL,
    descripcion_plaga text NOT NULL,
    porcentaje_plaga integer NOT NULL,
    id_cultivo integer NOT NULL
);


ALTER TABLE public.plagas OWNER TO postgres;

--
-- Name: plagas_id_plaga_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.plagas_id_plaga_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.plagas_id_plaga_seq OWNER TO postgres;

--
-- Name: plagas_id_plaga_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.plagas_id_plaga_seq OWNED BY public.plagas.id_plaga;


--
-- Name: tratamiento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tratamiento (
    id_tratamiento bigint NOT NULL,
    nombre_tratamiento text NOT NULL,
    tipo_tratamiento text NOT NULL,
    descripcion_tratamiento text NOT NULL,
    id_cultivo integer NOT NULL
);


ALTER TABLE public.tratamiento OWNER TO postgres;

--
-- Name: tratamiento_id_tratamiento_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tratamiento_id_tratamiento_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tratamiento_id_tratamiento_seq OWNER TO postgres;

--
-- Name: tratamiento_id_tratamiento_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tratamiento_id_tratamiento_seq OWNED BY public.tratamiento.id_tratamiento;


--
-- Name: ubicacion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ubicacion (
    id_ubicacion integer NOT NULL,
    descripcion_ubicacion text NOT NULL
);


ALTER TABLE public.ubicacion OWNER TO postgres;

--
-- Name: ubicacion_id_ubicacion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ubicacion_id_ubicacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ubicacion_id_ubicacion_seq OWNER TO postgres;

--
-- Name: ubicacion_id_ubicacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ubicacion_id_ubicacion_seq OWNED BY public.ubicacion.id_ubicacion;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id_usuario integer NOT NULL,
    nombre text NOT NULL,
    apellido_paterno text NOT NULL,
    apellido_materno text NOT NULL,
    edad integer NOT NULL,
    usuario text NOT NULL,
    contrasena text NOT NULL,
    tipo_usuario text NOT NULL,
    ruta_foto text NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_usuario_seq OWNER TO postgres;

--
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_usuario_seq OWNED BY public.usuarios.id_usuario;


--
-- Name: cultivos id_cultivo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cultivos ALTER COLUMN id_cultivo SET DEFAULT nextval('public.cultivos_id_cultivo_seq'::regclass);


--
-- Name: parcela id_parcela; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parcela ALTER COLUMN id_parcela SET DEFAULT nextval('public.parcela_id_parcela_seq'::regclass);


--
-- Name: plagas id_plaga; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plagas ALTER COLUMN id_plaga SET DEFAULT nextval('public.plagas_id_plaga_seq'::regclass);


--
-- Name: tratamiento id_tratamiento; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tratamiento ALTER COLUMN id_tratamiento SET DEFAULT nextval('public.tratamiento_id_tratamiento_seq'::regclass);


--
-- Name: ubicacion id_ubicacion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ubicacion ALTER COLUMN id_ubicacion SET DEFAULT nextval('public.ubicacion_id_ubicacion_seq'::regclass);


--
-- Name: usuarios id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass);


--
-- Data for Name: cultivos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cultivos (id_cultivo, nombre_cultivo, tipo_cultivo, descripcion_cultivo, id_plaga, id_tratamiento, id_parcela, id_ubicacion) FROM stdin;
\.


--
-- Data for Name: parcela; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.parcela (id_parcela, nombre_parcela, descripcion_parcela, ruta_foto_parcela, id_cultivo, id_plaga, id_tratamiento, id_ubicacion) FROM stdin;
\.


--
-- Data for Name: plagas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plagas (id_plaga, nombre_plaga, tipo_plaga, descripcion_plaga, porcentaje_plaga, id_cultivo) FROM stdin;
\.


--
-- Data for Name: tratamiento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tratamiento (id_tratamiento, nombre_tratamiento, tipo_tratamiento, descripcion_tratamiento, id_cultivo) FROM stdin;
\.


--
-- Data for Name: ubicacion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ubicacion (id_ubicacion, descripcion_ubicacion) FROM stdin;
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id_usuario, nombre, apellido_paterno, apellido_materno, edad, usuario, contrasena, tipo_usuario, ruta_foto) FROM stdin;
1	Daniela	Aguilar	Aguilar	20	Daniela-administrador	$2b$12$wi.utUvu1BX3HVZ61Xiqheb92JFUtmyRyh28YIDeimnyyzrpOKtp6	administrador	/static/fotos_usuarios/MUA_10.jpg
2	Guadalupe	Aguilar	Aguilar	29	Guadalupe-agricultor	$2b$12$sjlZ0A32Y4wxTykJT6cDnOAJtHp5BOJ4JpzpmFAgRQqYbhwKMoJlW	agricultor	/static/fotos_usuarios/MUA_3.jpg
\.


--
-- Name: cultivos_id_cultivo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cultivos_id_cultivo_seq', 1, false);


--
-- Name: parcela_id_parcela_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.parcela_id_parcela_seq', 1, false);


--
-- Name: plagas_id_plaga_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.plagas_id_plaga_seq', 1, false);


--
-- Name: tratamiento_id_tratamiento_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tratamiento_id_tratamiento_seq', 1, false);


--
-- Name: ubicacion_id_ubicacion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ubicacion_id_ubicacion_seq', 1, false);


--
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_usuario_seq', 2, true);


--
-- Name: cultivos cultivos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cultivos
    ADD CONSTRAINT cultivos_pkey PRIMARY KEY (id_cultivo);


--
-- Name: parcela parcela_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parcela
    ADD CONSTRAINT parcela_pkey PRIMARY KEY (id_parcela);


--
-- Name: plagas plagas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plagas
    ADD CONSTRAINT plagas_pkey PRIMARY KEY (id_plaga);


--
-- Name: tratamiento tratamiento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tratamiento
    ADD CONSTRAINT tratamiento_pkey PRIMARY KEY (id_tratamiento);


--
-- Name: ubicacion ubicacion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ubicacion
    ADD CONSTRAINT ubicacion_pkey PRIMARY KEY (id_ubicacion);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);


--
-- PostgreSQL database dump complete
--

