--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 13.4

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

--
-- Name: trigger_set_timestamp(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.trigger_set_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name text NOT NULL
);


--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: files; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.files (
    id integer NOT NULL,
    name text,
    path text NOT NULL,
    product_id integer
);


--
-- Name: files_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.files_id_seq OWNED BY public.files.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    seller_id integer NOT NULL,
    buyer_id integer NOT NULL,
    product_id integer NOT NULL,
    price integer NOT NULL,
    quantity integer DEFAULT 0,
    total integer NOT NULL,
    status text NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: products_with_deleted; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products_with_deleted (
    id integer NOT NULL,
    category_id integer,
    user_id integer,
    name text NOT NULL,
    description text NOT NULL,
    old_price integer,
    price integer NOT NULL,
    quantity integer DEFAULT 0,
    status integer DEFAULT 1,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    deleted_at timestamp without time zone
);


--
-- Name: products; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.products AS
 SELECT products_with_deleted.id,
    products_with_deleted.category_id,
    products_with_deleted.user_id,
    products_with_deleted.name,
    products_with_deleted.description,
    products_with_deleted.old_price,
    products_with_deleted.price,
    products_with_deleted.quantity,
    products_with_deleted.status,
    products_with_deleted.created_at,
    products_with_deleted.updated_at,
    products_with_deleted.deleted_at
   FROM public.products_with_deleted
  WHERE (products_with_deleted.deleted_at IS NULL);


--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products_with_deleted.id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    cpf_cnpj text NOT NULL,
    cep text,
    address text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    reset_token text,
    reset_token_expires text
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: files id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.files ALTER COLUMN id SET DEFAULT nextval('public.files_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: products_with_deleted id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_with_deleted ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.categories (id, name) FROM stdin;
1	Eletrônicos
2	Comida
3	Automóveis
\.


--
-- Data for Name: files; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.files (id, name, path, product_id) FROM stdin;
60	1642559675995-1.jpg	public\\images\\1642559675995-1.jpg	44
61	1642560226479-2.jpg	public\\images\\1642560226479-2.jpg	45
15	1636204449787-celular01.jpg	public\\images\\1636204449787-celular01.jpg	2
16	1636204449784-celular02.jpg	public\\images\\1636204449784-celular02.jpg	2
17	1636204449782-celular04.jpg	public\\images\\1636204449782-celular04.jpg	2
18	1636204449783-celular03.jpg	public\\images\\1636204449783-celular03.jpg	2
19	1636205281070-computador01.jpg	public\\images\\1636205281070-computador01.jpg	1
20	1636205281069-computador02.jpg	public\\images\\1636205281069-computador02.jpg	1
21	1636205281067-computador04.jpg	public\\images\\1636205281067-computador04.jpg	1
22	1636205281068-computador03.jpg	public\\images\\1636205281068-computador03.jpg	1
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders (id, seller_id, buyer_id, product_id, price, quantity, total, status, created_at, updated_at) FROM stdin;
1	35	66	2	109999	2	219998	open	2022-01-13 08:40:32.78749	2022-01-18 06:49:02.061023
2	35	66	44	432	2	864	sold	2022-01-18 22:35:04.881055	2022-01-18 22:37:05.02631
4	35	66	45	4324	2	8648	canceled	2022-01-18 22:44:07.824505	2022-01-18 22:44:52.451846
\.


--
-- Data for Name: products_with_deleted; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products_with_deleted (id, category_id, user_id, name, description, old_price, price, quantity, status, created_at, updated_at, deleted_at) FROM stdin;
1	1	35	Notebook Acer Aspire 3	- Modelo: A315-23-R6HC\r\n- AMD Ryzen 5\r\n- Gráfico integrado AMD Radeon Vega 8\r\n- 8GB RAM\r\n- 512GB SSD	315999	315999	0	0	2021-11-05 10:25:21.729615	2022-01-08 04:41:43.861414	\N
2	1	35	Redmi Note 10 64GB 4GB RAM - Green	- Super AMOLED de 6,35 polegadas\r\n- 450 nits (tipo), 1100 nits (pico)\r\n- Corning Gorilla Glass 3\r\n- 64 GB de RAM | Qualcomm SDM678 Snapdragon 678 (11 nm)\r\n- Octa-core (2 x 2,2 GHz Kryo 460 Gold e 6 x 1,7 GHz Kryo 460 Silver)\r\n- Li-Po 5000 mAh, no removível\r\n- Carregamento rápido de 33 W, 50% em 25 minutos, 100% em 74 minutos\r\n- Celulares desbloqueados de fábrica so compatíveis com a maioria das operadoras GSM.\r\n- Esteja ciente de que no so compatíveis com operadoras CDMA	109999	109999	10	1	2021-11-05 11:36:14.062026	2022-01-08 05:37:20.077967	\N
44	2	35	delete test	delete test	432	432	432432	1	2022-01-18 22:34:36.014698	2022-01-18 22:37:17.135744	2022-01-18 22:37:17.135744
45	1	35	delete test 2	delete test 2	4324	4324	23432	1	2022-01-18 22:43:46.486933	2022-01-18 22:47:23.679614	2022-01-18 22:47:23.679614
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.session (sid, sess, expire) FROM stdin;
iDv5AaIkfcDzxThc0d2Pwblog_D4Nk34	{"cookie":{"originalMaxAge":2592000000,"expires":"2022-02-17T10:00:24.366Z","httpOnly":true,"path":"/"},"userId":35}	2022-02-17 07:01:04
vyJcEuxAnz9TuYgg7ZuYCzVvdJ8jDMBM	{"cookie":{"originalMaxAge":2592000000,"expires":"2022-02-12T12:39:42.888Z","httpOnly":true,"path":"/"},"userId":66,"cart":{"items":[{"product":{"id":2,"category_id":1,"user_id":35,"name":"Redmi Note 10 64GB 4GB RAM - Green","description":"- Super AMOLED de 6,35 polegadas\\r\\n- 450 nits (tipo), 1100 nits (pico)\\r\\n- Corning Gorilla Glass 3\\r\\n- 64 GB de RAM | Qualcomm SDM678 Snapdragon 678 (11 nm)\\r\\n- Octa-core (2 x 2,2 GHz Kryo 460 Gold e 6 x 1,7 GHz Kryo 460 Silver)\\r\\n- Li-Po 5000 mAh, no removível\\r\\n- Carregamento rápido de 33 W, 50% em 25 minutos, 100% em 74 minutos\\r\\n- Celulares desbloqueados de fábrica so compatíveis com a maioria das operadoras GSM.\\r\\n- Esteja ciente de que no so compatíveis com operadoras CDMA","old_price":109999,"price":109999,"quantity":10,"status":1,"created_at":"2021-11-05T15:36:14.062Z","updated_at":"2022-01-08T09:37:20.077Z","img":"/images/1636204449787-celular01.jpg","files":[{"id":15,"name":"1636204449787-celular01.jpg","path":"public\\\\images\\\\1636204449787-celular01.jpg","product_id":2,"src":"/images/1636204449787-celular01.jpg"},{"id":16,"name":"1636204449784-celular02.jpg","path":"public\\\\images\\\\1636204449784-celular02.jpg","product_id":2,"src":"/images/1636204449784-celular02.jpg"},{"id":17,"name":"1636204449782-celular04.jpg","path":"public\\\\images\\\\1636204449782-celular04.jpg","product_id":2,"src":"/images/1636204449782-celular04.jpg"},{"id":18,"name":"1636204449783-celular03.jpg","path":"public\\\\images\\\\1636204449783-celular03.jpg","product_id":2,"src":"/images/1636204449783-celular03.jpg"}],"formattedOldPrice":"R$ 1.099,99","formattedPrice":"R$ 1.099,99","published":{"day":"08/01","hour":"05h37m"}},"quantity":2,"price":219998,"formattedPrice":"R$ 2.199,98"}],"total":{"quantity":2,"price":219998,"formattedPrice":"R$ 2.199,98"}}}	2022-02-12 08:46:36
GciF2y1qMuEv_QXKs9x_uRgO3PI5i58O	{"cookie":{"originalMaxAge":2592000000,"expires":"2022-02-13T01:25:23.762Z","httpOnly":true,"path":"/"},"userId":66}	2022-02-12 21:32:25
W3BkL9Rxjk-6lWzv80KQOnJsX1cnFwO9	{"cookie":{"originalMaxAge":2592000000,"expires":"2022-02-18T02:44:43.711Z","httpOnly":true,"path":"/"},"userId":35}	2022-02-17 22:46:14
hTZNi9ZoSMxmnesUw-KdI5031Sx36dbP	{"cookie":{"originalMaxAge":2592000000,"expires":"2022-02-15T14:27:40.902Z","httpOnly":true,"path":"/"},"userId":35}	2022-02-15 10:34:14
OIDdPidX5kUohBLTFDWkJJfWOslx-7BQ	{"cookie":{"originalMaxAge":2591999998,"expires":"2022-02-12T02:29:39.488Z","httpOnly":true,"path":"/"},"cart":{"items":[{"product":{"id":2,"category_id":1,"user_id":35,"name":"Redmi Note 10 64GB 4GB RAM - Green","description":"- Super AMOLED de 6,35 polegadas\\r\\n- 450 nits (tipo), 1100 nits (pico)\\r\\n- Corning Gorilla Glass 3\\r\\n- 64 GB de RAM | Qualcomm SDM678 Snapdragon 678 (11 nm)\\r\\n- Octa-core (2 x 2,2 GHz Kryo 460 Gold e 6 x 1,7 GHz Kryo 460 Silver)\\r\\n- Li-Po 5000 mAh, no removível\\r\\n- Carregamento rápido de 33 W, 50% em 25 minutos, 100% em 74 minutos\\r\\n- Celulares desbloqueados de fábrica so compatíveis com a maioria das operadoras GSM.\\r\\n- Esteja ciente de que no so compatíveis com operadoras CDMA","old_price":109999,"price":109999,"quantity":10,"status":1,"created_at":"2021-11-05T15:36:14.062Z","updated_at":"2022-01-08T09:37:20.077Z","img":"/images/1636204449787-celular01.jpg","files":[{"id":15,"name":"1636204449787-celular01.jpg","path":"public\\\\images\\\\1636204449787-celular01.jpg","product_id":2,"src":"/images/1636204449787-celular01.jpg"},{"id":16,"name":"1636204449784-celular02.jpg","path":"public\\\\images\\\\1636204449784-celular02.jpg","product_id":2,"src":"/images/1636204449784-celular02.jpg"},{"id":17,"name":"1636204449782-celular04.jpg","path":"public\\\\images\\\\1636204449782-celular04.jpg","product_id":2,"src":"/images/1636204449782-celular04.jpg"},{"id":18,"name":"1636204449783-celular03.jpg","path":"public\\\\images\\\\1636204449783-celular03.jpg","product_id":2,"src":"/images/1636204449783-celular03.jpg"}],"formattedOldPrice":"R$ 1.099,99","formattedPrice":"R$ 1.099,99","published":{"day":"08/01","hour":"05h37m"}},"quantity":3,"price":329997,"formattedPrice":"R$ 3.299,97"}],"total":{"quantity":3,"price":329997,"formattedPrice":"R$ 3.299,97"}}}	2022-02-11 22:36:24
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, name, email, password, cpf_cnpj, cep, address, created_at, updated_at, reset_token, reset_token_expires) FROM stdin;
35	Luiz Cavalcante	luiz@test.com	553246736447566b583139476c31336b7564537769697a69454d7a51785544797a4d70597a594b477a62513d	29384908320843	32908409	endereco	2021-11-11 00:14:50.559782	2021-11-11 00:14:50.559782	42043d503f306e331165ea3800856f5c8c44475b	1641430986316
66	Sophia Cavalcante	sophia@test.com	553246736447566b58312f47372f2b706d4e33622f555a50436b58716662636448755a30674d70736a6e633d	29084903284903	90238409	endereco test	2022-01-13 08:39:29.109351	2022-01-13 08:39:29.109351	\N	\N
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categories_id_seq', 3, true);


--
-- Name: files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.files_id_seq', 61, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.orders_id_seq', 4, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_id_seq', 45, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 66, true);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: files files_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: products_with_deleted products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_with_deleted
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: users users_cpf_cnpj_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_cpf_cnpj_key UNIQUE (cpf_cnpj);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);


--
-- Name: products_with_deleted delete_product; Type: RULE; Schema: public; Owner: -
--

CREATE RULE delete_product AS
    ON DELETE TO public.products_with_deleted DO INSTEAD  UPDATE public.products_with_deleted SET deleted_at = now()
  WHERE (products_with_deleted.id = old.id);


--
-- Name: products delete_product; Type: RULE; Schema: public; Owner: -
--

CREATE RULE delete_product AS
    ON DELETE TO public.products DO INSTEAD  UPDATE public.products SET deleted_at = now()
  WHERE (products.id = old.id);


--
-- Name: orders set_timestamp; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();


--
-- Name: products_with_deleted set_timestamp; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.products_with_deleted FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();


--
-- Name: files files_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products_with_deleted(id) ON DELETE CASCADE;


--
-- Name: orders orders_buyer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_buyer_id_fkey FOREIGN KEY (buyer_id) REFERENCES public.users(id);


--
-- Name: orders orders_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products_with_deleted(id);


--
-- Name: orders orders_seller_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_seller_id_fkey FOREIGN KEY (seller_id) REFERENCES public.users(id);


--
-- Name: products_with_deleted products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_with_deleted
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: products_with_deleted products_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products_with_deleted
    ADD CONSTRAINT products_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

