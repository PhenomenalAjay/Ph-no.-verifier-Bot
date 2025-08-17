# 🚀 Complete Deployment Guide

## 📋 Prerequisites

1. **Telegram Bot Token** - Get from [@BotFather](https://t.me/botfather)
2. **NumVerify API Key** - Get from [numverify.com](https://numverify.com)
3. **Render Account** - Sign up at [render.com](https://render.com)

## 🔧 Local Setup

1. **Create `.env` file**:
   ```
   TELEGRAM_BOT_TOKEN=7741751048:AAF6BZ1-pDnI0nw5Je76Yn9jPDmpXyHuahQ
   NUMVERIFY_API_KEY=your_numverify_api_key_here
   PORT=10000
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Test locally**:
   ```bash
   npm start
   ```

## 🚀 Deploy to Render

### Method 1: Using Render Dashboard (Recommended)

1. **Create Web Service**:
   - Go to [render.com](https://render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repository

2. **Configure Build & Start Commands**:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

3. **Set Environment Variables**:
   ```
   TELEGRAM_BOT_TOKEN=7741751048:AAF6BZ1-pDnI0nw5Je76Yn9jPDmpXyHuahQ
   NUMVERIFY_API_KEY=your_numverify_api_key_here
   WEBHOOK_URL=https://your-app-name.onrender.com/bot7741751048:AAF6BZ1-pDnI0nw5Je76Yn9jPDmpXyHuahQ
   ```

4. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment to complete

### Method 2: Using Render CLI

```bash
# Install Render CLI
npm install -g render-cli

# Login
render login

# Deploy
render deploy
```

## ✅ Verification Steps

1. **Check health endpoint**:
   ```
   https://your-app-name.onrender.com/
   ```

2. **Test Telegram bot**:
   - Send `/start` to @PhoneNumberVerifier_bot
   - Send a 10-digit number like `9876543210`

3. **Check logs**:
   - View logs in Render dashboard
   - Look for "Server is running" message

## 🔍 Troubleshooting

### Common Issues:

1. **Bot not responding**:
   - Check if webhook is set correctly
   - Verify environment variables
   - Check Render logs

2. **Port already in use**:
   - Bot automatically tries next port
   - Use `PORT=10001 npm start` for manual override

3. **Invalid API key**:
   - Verify NumVerify API key
   - Check API usage limits

## 📊 Monitoring

- **Health Check**: `https://your-app-name.onrender.com/`
- **Render Dashboard**: Monitor performance and logs
- **Bot Stats**: Use `/stats` command (if implemented)

## 🔄 Updates

To update the bot:
1. Push changes to GitHub
2. Render will auto-deploy
3. No need to restart manually
