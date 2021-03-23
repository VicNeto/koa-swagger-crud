require('dotenv').config();
import app, { db } from './app';

const PORT = process.env['PORT'] || 3001;

db.connect();

app.listen(PORT).on("close", (err:any) => {
  db.close();
  console.log(`💣 Server terminated`);
  process.exit(0);
});

app.on('error', err => {
    console.error('server error', err);
});

console.log(`🚀 Server running on port ${PORT}`);