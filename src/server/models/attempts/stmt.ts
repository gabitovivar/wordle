export const GET_ATTEMPTS_BY_USERID = 'select * from attempts where user_id = $1';
export const UPDATE_ATTEMPT_BY_USER = 'update attempts set attempt=$1 where user_id = $2';
export const RESET_ATTEMPTS = 'update attempts set attempt = 0';
export const CREATE_ATTEMPTS = 'insert into attempts (user_id,attempt) values ($1,$2)';
