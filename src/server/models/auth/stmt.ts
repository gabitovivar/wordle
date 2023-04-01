export const findByEmail = 'select id, email, password from users where email = $1';
export const createUser = 'insert into users (email, password) values ($1,$2) returning id';