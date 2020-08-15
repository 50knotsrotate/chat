INSERT INTO USERS
  (username,password)
VALUES($1, $2)
RETURNING *;
