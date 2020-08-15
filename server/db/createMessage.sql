INSERT INTO Messages
  (user_id, body, channel_id)
VALUES($1, $2, $3)

select m.body, m.channel_id, m.id, c.name, u.username
from messages m
  join channels c on c.id = m.channel_id
  join users u on u.id = m.user_id
where m.channel_id
in (select cm.channel_id
from channelMember cm
where cm.user_id = 1)
order by m.id desc limit 1;




