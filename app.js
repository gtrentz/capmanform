const express = require('express');
const sql = require('mssql');
const app = express();
const port = 3000;

const config = {
  user: 'CloudSAd91cd62d',
  password: 'password',
  server: 'uihc-unifier.database.windows.net',
  database: 'FormSubmissions',
  options: {
    encrypt: true
  }
};

app.get('/api/formdata', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM FormData');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
