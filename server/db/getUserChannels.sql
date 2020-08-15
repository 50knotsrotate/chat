select * from channels c join channelMember cm on cm.channel_id = c.id where cm.user_id = $1;
