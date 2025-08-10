-- create the 'posts' table
create table if not exists posts (
    id serial primary key,
    title varchar(50) not null,
    content text not null,
    created_at timestamp default current_timestamp,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)