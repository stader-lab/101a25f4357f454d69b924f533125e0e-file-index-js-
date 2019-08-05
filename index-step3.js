const { Autohook } = require('twitter-autohook');

(async start => {
  try {
    const webhook = new Autohook();
    
    webhook.on('event', async event => {
      if (event.direct_message_events) {
        await sayHi(event);
      }
    });

    // Removes existing webhooks
    await webhook.removeWebhooks();
    
    // Starts a server and adds a new webhook
    await webhook.start();
    
    // Subscribes to your own user's activity
    await webhook.subscribe({oauth_token: process.env.TWITTER_ACCESS_TOKEN, oauth_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET});  
  } catch (e) {
    // Display the error and quit
    console.error(e);
    process.exit(1);
  }
})();  