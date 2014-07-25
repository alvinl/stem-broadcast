
module.exports = function (Stem) {

  var commands = require('./commands'),
      config   = Stem.configs['stem-broadcast'],
      redis    = require('redis').createClient(config.redisPort,
                                               config.redisHost);

  /**
   * `Stem` overrides
   */

  Stem.broadcasted = [];

  /**
   * Register commands
   */
  
  Stem.api.addCommand('broadcast', commands.broadcast, 1);

  /**
   * Listen for broadcasts
   */
  
  redis.subscribe(config.cluster || 'broadcast');

  redis.on('message', function (channel, broadcast) {

    var parsedBroadcast = JSON.parse(broadcast),
        isSelfBroadcast = Stem.broadcasted.indexOf(broadcast);

    // Check to make sure the broadcast isn't our own
    if (~isSelfBroadcast) {

      Stem.broadcasted.splice(isSelfBroadcast, 1);
      return;

    }
     
    Stem.log.info('[Broadcast] Relaying broadcast:', parsedBroadcast.message);

    for (var friend in Stem.bot.friends) {

      var friendStatus = Stem.bot.friends[friend];

      if (friendStatus === 3)
        Stem.bot.sendMessage(friend, parsedBroadcast.message);

    }

  });

};