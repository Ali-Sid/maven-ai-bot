import dotenv from 'dotenv';
import { Client, GatewayIntentBits } from 'discord.js';
import { ask } from './ai.js';
import express from 'express';
import cors from 'cors'

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('Discord bot is running!');
});

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});


// const genAI = new GoogleGenerativeAI(API_KEY);
// const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

client.on('ready', () => {
  console.log('Bot is online!');
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const prompt = message.content;
  console.log(prompt, "prompt>>>>")
  const result = await ask(prompt);
  console.log(result, "result>>>>>")
  const response = await result.parts[0].text;
  console.log(response, "response>>>>>")
  await message.channel.send(response);
  console.log(response, "channel send!!!")
});

client.login(DISCORD_TOKEN);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});