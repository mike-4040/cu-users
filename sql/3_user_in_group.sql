CREATE TABLE public.user_in_group
(
    id SERIAL,
    user_id integer NOT NULL,
    group_id integer NOT NULL,
    CONSTRAINT user_in_group_pkey PRIMARY KEY (id),
    CONSTRAINT to_group FOREIGN KEY (group_id)
        REFERENCES public."group" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT to_user FOREIGN KEY (user_id)
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
);
