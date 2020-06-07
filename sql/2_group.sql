CREATE TABLE public."group"
(
    id integer SERIAL,
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    owner_id integer NOT NULL,
    CONSTRAINT group_pkey PRIMARY KEY (id),
    CONSTRAINT group_owner FOREIGN KEY (owner_id)
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
);
