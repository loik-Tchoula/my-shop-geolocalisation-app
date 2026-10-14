const { createClient } = require('@libsql/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

exports.handler = async (event, context) => {
  const path = event.path.split('/').pop();
  
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { email, password } = JSON.parse(event.body);

  try {
    if (path === 'signup') {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.execute({
        sql: "INSERT INTO users (email, password) VALUES (?, ?)",
        args: [email, hashedPassword]
      });
      return { statusCode: 201, body: JSON.stringify({ message: "User created" }) };
    }

    if (path === 'login') {
      const result = await db.execute({
        sql: "SELECT * FROM users WHERE email = ?",
        args: [email]
      });
      
      const user = result.rows[0];
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return { statusCode: 400, body: JSON.stringify({ error: "Invalid credentials" }) };
      }

      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
      return {
        statusCode: 200,
        body: JSON.stringify({ token, email: user.email })
      };
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
