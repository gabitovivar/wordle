export const GET_WORD = 'SELECT * FROM words WHERE status=$1 ORDER BY RANDOM() LIMIT 1';
export const UPDATE_WORD_TO_USED = 'UPDATE words SET status=\'USED\' where status=\'ACTIVE\'';
export const UPDATE_WORD = 'UPDATE words SET status=$1 where id=$2';