select m.body, m.id, u.username
        from messages m join channels c on m.channel_id = c.id
        join users u on m.user_id = u.id
        where c.id = $1;
