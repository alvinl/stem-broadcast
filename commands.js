
exports.broadcast = function (client, args) {
  
  var config           = this.configs['stem-broadcast'],
      redis            = require('redis').createClient(config.redisPort,
                                                       config.redisHost),
      crypto           = require('crypto'),
      broadcastMessage = args.join(' '),
      bot              = this.bot,
      log              = this.log,
      Stem             = this;

  if (!broadcastMessage)
    return bot.sendMessage(client, 'Usage: broadcast <broadcast message>');

  log.info('[Broadcast] Broadcasting:', broadcastMessage);

  for (var friend in bot.friends) {

    var friendStatus = bot.friends[friend];

    if (friendStatus === 3)
      bot.sendMessage(friend, broadcastMessage);

  }

  var broadcast = {

    id:      crypto.randomBytes(5).toString('hex'),
    message: broadcastMessage

  };

  Stem.broadcasted.push(JSON.stringify(broadcast));

  redis.publish(config.cluster || 'broadcast', JSON.stringify(broadcast));

};