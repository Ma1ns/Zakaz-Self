const config = require('../../config.json');
const owner = config.userID;

module.exports = {
  name: "start",
  run: async (message, args, command, client) => {

    if (!owner.includes(message.author.id)) return;

    message.delete();

      var interval = setInterval (function ()
            {
              message.channel.send("!work")
            }, 30000)

    
    var interval = setInterval (function ()
            {
              client.channels.cache.get('1032669857893859329').send('!dep all')
            }, 1000000)

      }
};