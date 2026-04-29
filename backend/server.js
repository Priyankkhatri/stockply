require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./src/app');

const PORT = process.env.PORT || 5000;
const DB = process.env.MONGODB_URI;

mongoose
  .connect(DB)
  .then(() => console.log('✅ DB connection successful!'))
  .catch((err) => console.log('❌ DB connection failed:', err));

app.listen(PORT, () => {
  console.log(`
  🚀 Server is running!
  📡 Port: ${PORT}
  🔗 Health Check: http://localhost:${PORT}/health
  `);
});
