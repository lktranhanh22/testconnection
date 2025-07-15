// test-db.js
const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:6KWt1a7lVl2I21wD@db.eaalfzwrrphsdhdrdgjl.supabase.co:5432/postgres',
  ssl: {
    rejectUnauthorized: false, // Bắt buộc cho Supabase (dùng SSL)
  },
});

client.connect()
  .then(() => {
    console.log('✅ Connected to Supabase PostgreSQL successfully!');
    return client.end();
  })
  .catch((err) => {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  });
