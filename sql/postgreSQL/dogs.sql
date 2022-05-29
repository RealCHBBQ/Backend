CREATE TABLE public.dogs (
    id serial4 NOT NULL,
    title varchar(32) NOT NULL,
    summary text NULL,
    imageurl varchar(2048) NULL,
    authorid int4 NULL,
    size varchar NULL,
    CONSTRAINT dogs_pkey PRIMARY KEY (id)
);