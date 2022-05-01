CREATE TABLE user_info (
    id serial,
    account_number int not null,
    user_name text not null CHECK (user_name <> ''),
    user_email text not null CHECK (user_email <> ''),
    user_password text not null CHECK (user_password <> ''),  
    watched_coins text,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);