DROP TABLE IF EXISTS barber;

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
    state varchar(255)
);

DROP TABLE IF EXISTS client;

CREATE TABLE client (
	id serial PRIMARY KEY,
	user_name varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
    city varchar(255) NOT NULL,
    gender varchar(255),
    age int,
    phone_num varchar(255),
    profile_pic varchar(255)
);

DROP TABLE IF EXISTS services;

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
	  REFERENCES barber(id)
);


DROP TABLE IF EXISTS products;

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
	  REFERENCES barber(id)
);


DROP TABLE IF EXISTS media;

CREATE TABLE media (
	id serial PRIMARY KEY,
    barber_id int NOT NULL,
    media_type varchar(255) NOT NULL,
    media_path varchar(255) NOT NULL,
     CONSTRAINT fk_barber
      FOREIGN KEY(barber_id)
      REFERENCES barber(id)
);    

DROP TABLE IF EXISTS subscriptions;

CREATE TABLE subscriptions (
	id serial PRIMARY KEY,
    barber_id int NOT NULL,
    client_id int NOT NULL,
     CONSTRAINT fk_barber
      FOREIGN KEY(barber_id)
      REFERENCES barber(id),
     CONSTRAINT fk_client
      FOREIGN KEY(client_id)
      REFERENCES client(id)

);    


DROP TABLE IF EXISTS tickets;

CREATE TABLE tickets (
	id serial PRIMARY KEY,
    barber_id int NOT NULL,
    client_id int NOT NULL,
    service_id int NOT NULL,
    time int,
     CONSTRAINT fk_barber
      FOREIGN KEY(barber_id)
      REFERENCES barber(id),
     CONSTRAINT fk_client
      FOREIGN KEY(client_id)
      REFERENCES client(id),
      CONSTRAINT fk_service
      FOREIGN KEY(service_id)
      REFERENCES services(id)

);  
DROP TABLE IF EXISTS queue;

CREATE TABLE queue (
	id serial PRIMARY KEY,
    barber_id int NOT NULL,
    client_id int NOT NULL,
    service_id int NOT NULL,
    time int,
     CONSTRAINT fk_barber
      FOREIGN KEY(barber_id)
      REFERENCES barber(id),
     CONSTRAINT fk_client
      FOREIGN KEY(client_id)
      REFERENCES client(id),
      CONSTRAINT fk_service
      FOREIGN KEY(service_id)
      REFERENCES services(id)

);  

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
	id serial PRIMARY KEY,
    barber_id int NOT NULL,
    client_id int NOT NULL,
    description varchar(255),
    date date,
    rate int,
     CONSTRAINT fk_barber
      FOREIGN KEY(barber_id)
      REFERENCES barber(id),
     CONSTRAINT fk_client
      FOREIGN KEY(client_id)
      REFERENCES client(id)
); 

