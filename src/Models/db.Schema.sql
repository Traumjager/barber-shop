DROP TABLE IF EXISTS media;
DROP TABLE IF EXISTS subscriptions;
DROP TABLE IF EXISTS tickets;
DROP TABLE IF EXISTS queue;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS barber;
DROP TABLE IF EXISTS client;
CREATE TABLE barber (
	id serial PRIMARY KEY,
	user_name varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
    city varchar(255) NOT NULL,
    address varchar(255) NOT NULL,
    gender varchar(255),
    age int,
    shop_gender  varchar(255) NOT NULL,
    shop_name varchar(255) NOT NULL,
    phone_num varchar(255),
    profile_pic varchar(255),
    working_hours varchar(255),
    holidays varchar(255),
    state varchar(255),
    verification_token varchar(255),
    verified boolean default false
);

CREATE TABLE client (
	id serial PRIMARY KEY,
	user_name varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
    city varchar(255) NOT NULL,
    gender varchar(255),
    age int,
    phone_num varchar(255),
    profile_pic varchar(255),
    verification_token varchar(255),
    verified boolean default false
);

CREATE TABLE services (
	id serial PRIMARY KEY,
	barber_id int NOT NULL,
    service_name varchar(255) NOT NULL,
    description varchar(255),
    price int NOT NULL,
    discount int default 0,
    end_date date,
    estimated_time varchar(255),
     CONSTRAINT fk_barber
      FOREIGN KEY(barber_id)
	  REFERENCES barber(id) ON DELETE CASCADE
);

CREATE TABLE products (
	id serial PRIMARY KEY,
	barber_id int NOT NULL,
    product_name varchar(255) NOT NULL,
    description varchar(255),
    price int NOT NULL,
    discount int default 0,
    end_date date,
    product_image varchar(255),
     CONSTRAINT fk_barber
      FOREIGN KEY(barber_id) 
	  REFERENCES barber(id) ON DELETE CASCADE
);

CREATE TABLE media (
	id serial PRIMARY KEY,
    barber_id int NOT NULL,
    media_type varchar(255) NOT NULL,
    media_path varchar(255) NOT NULL,
     CONSTRAINT fk_barber
      FOREIGN KEY(barber_id)
      REFERENCES barber(id) ON DELETE CASCADE
);  


CREATE TABLE subscriptions (
	id serial PRIMARY KEY,
    barber_id int NOT NULL,
    client_id int NOT NULL,
     CONSTRAINT fk_barber
      FOREIGN KEY(barber_id)
      REFERENCES barber(id) ON DELETE CASCADE,
     CONSTRAINT fk_client
      FOREIGN KEY(client_id)
      REFERENCES client(id) ON DELETE CASCADE
);   

CREATE TABLE tickets (
	id serial PRIMARY KEY,
    barber_id int NOT NULL REFERENCES barber(id) ON DELETE CASCADE,
    client_id int NOT NULL REFERENCES client(id) ON DELETE CASCADE,
    service_id int NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    time varchar(255) NOT NULL,
    -- '2004-10-19 10:23:54'
     CONSTRAINT fk_barber
      FOREIGN KEY(barber_id)
      REFERENCES barber(id) ON DELETE CASCADE,
     CONSTRAINT fk_client
      FOREIGN KEY(client_id)
      REFERENCES client(id) ON DELETE CASCADE,
      CONSTRAINT fk_service
      FOREIGN KEY(service_id)
      REFERENCES services(id) ON DELETE CASCADE
);  



CREATE TABLE queue (
	id serial PRIMARY KEY,
    barber_id int NOT NULL,
    client_id int NOT NULL,
    service_id int NOT NULL,
    time varchar(255),
    -- '2004-10-19 10:23:54'
     CONSTRAINT fk_barber
      FOREIGN KEY(barber_id)
      REFERENCES barber(id) ON DELETE CASCADE,
     CONSTRAINT fk_client
      FOREIGN KEY(client_id)
      REFERENCES client(id) ON DELETE CASCADE,
      CONSTRAINT fk_service
      FOREIGN KEY(service_id)
      REFERENCES services(id) ON DELETE CASCADE
);


CREATE TABLE reviews (
	id serial PRIMARY KEY,
    barber_id int NOT NULL,
    client_id int NOT NULL,
    description varchar(255),
    date TIMESTAMP,
    -- '2004-10-19 10:23:54'
    rate int,
     CONSTRAINT fk_barber
      FOREIGN KEY(barber_id)
      REFERENCES barber(id) ON DELETE CASCADE,
     CONSTRAINT fk_client
      FOREIGN KEY(client_id)
      REFERENCES client(id) ON DELETE CASCADE
); 
