export const GET_PLAYS = 'select * from games where user_id = $1';
export const UPDATE_PLAY = 'update games set wins = $1, playes = $2 where user_id = $3';
export const CREATE_PLAY = 'insert into games (user_id, playes, wins) values ($1, $2, $3)';
export const FIND_BETTER_PLAYERS = 'select * from games order by wins desc limit 10';