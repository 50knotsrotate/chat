INSERT INTO Messages
  (user_id, body, channel_id)
VALUES($1, $2, $3)
RETURNING *;
