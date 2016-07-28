module.exports = {
  "DATABASE_URI": "postgres://localhost:5432/roundabout",
  "SESSION_SECRET": "Optimus Prime is my real dad",
  "TWITTER": {
    "consumerKey": "nZ1pfdI2vng8KFDCNYLlxnhOC",
    "consumerSecret": "fJfll4RLBYqCLZbhIT6lb8CR1LZekJbC0r7MXkimSqftfgNVU8",
    "callbackUrl": "/auth/twitter/callback"
  },
  "FACEBOOK": {
    "clientID": "1000131926773890",
    "clientSecret": "41e5e1334f397c9d55d71af7f82ea2d2",
    "callbackURL": "/auth/facebook/callback"
  },
  "GOOGLE": {
    "clientID": "INSERT_GOOGLE_CLIENTID_HERE",
    "clientSecret": "INSERT_GOOGLE_CLIENT_SECRET_HERE",
    "callbackURL": "INSERT_GOOGLE_CALLBACK_HERE"
  },
  "LOGGING": true
};
