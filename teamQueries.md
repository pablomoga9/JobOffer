// Creacion de tablas 

Tabla users: 

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL UNIQUE,
    email text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    full_name text COLLATE pg_catalog."default" NOT NULL,
    role text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

Tabla favs: 

CREATE TABLE IF NOT EXISTS public.favs
(
    id integer NOT NULL UNIQUE,
    user_id integer COLLATE pg_catalog."default" NOT NULL,
    ad text COLLATE pg_catalog."default" NOT NULL
)

Añadir como Foreign Key "user_id" en la tabla favs:

ALTER TABLE favs
    ADD CONSTRAINT fk_favs_users 
    FOREIGN KEY (user_id) REFERENCES users (id);

Añadir usuarios a la tabla users:
INSERT INTO public.users (
    id,email,password,full_name,role)
    VALUES (1,'boschpalomaa@gmail.com',crypt'$2a$04$SYsZjLRJBZZX7oFILtqY/eTi0u8t9jsLcXnrbYUOp514X8GINkJ9K','Paloma Bosch','client')

INSERT INTO public.users(
    id, email, password, full_name, role)
    VALUES (2, 'sofia.guardia@hotmail.com','jobscanner','Sofia Guardia','admin');

INSERT INTO public.users (
    id,email,password,full_name,role)
    VALUES (3,'clientedeprueba@gmail.com','password','Juan Perez','client');

Para encriptar el password de clienteprueba por ejemplo: 
CREATE EXTENSION pgcrypto; (solo lo ejecutamos una vez)
SELECT crypt('password', gen_salt('bf', 4));

Se ejecuta la query y con el resultado del password encriptado le hacemos un INSERT INTO reemplazando 'password' por el algoritmo que nos devuelve crypt:
INSERT INTO users (user_id,enc_pass) VALUES (1,'$2a$04$1bfMQDOR6aLyD4q3KVb8/ujG7ZAkyie4d/s3ABwuZNbzkFFgXtC76');
