# Number Verifier Bot

A Telegram bot that verifies phone numbers using the NumVerify API.

## Features
- Verify phone numbers and get detailed information
- Simple and easy to use
- Real-time verification results

## Project Structure
```
Number-Verifier-Bot/
├── src/
│   ├── bot.js              # Main bot logic
│   ├── commands/           # Bot command handlers
│   │   ├── start.js
│   │   └── verify.js
│   ├── services/           # External service integrations
│   │   └── numverify.js
│   └── utils/              # Utility functions
│       └── validators.js
├── config/
│   └── config.js           # Configuration settings
├── tests/                  # Test files
│   ├── unit/
│   └── integration/
├── docs/                   # Documentation
├── .env                    # Environment variables (not in git)
├── .gitignore
├── index.js               # Entry point
├── package.json
├── package-lock.json
└── README.md
```

## Prerequisites
- Node.js (v14 or higher)
- Telegram Bot Token
- NumVerify API Key

## Installation

1. Install dependencies
   ```bash
   npm install
   ```
2. Create a `.env` file in the root directory with the following content:
   ```
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token
   NUMVERIFY_API_KEY=your_numverify_api_key
   ```

## Usage
1. Start the bot
   ```bash
   npm start
   ```
2. Open Telegram and search for your bot
3. Send `/start` to begin
4. Enter a phone number to verify

## API Response Format
The bot returns the following information:
- Mobile Number
- Carrier
- Location
- Country Code

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
