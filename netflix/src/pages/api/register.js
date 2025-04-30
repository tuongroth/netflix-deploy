// pages/api/register.js
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, password } = req.body;
  console.log("Received:", name, email, password); // ✅ Kiểm tra dữ liệu client gửi lên

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    console.log("Connecting to DB...");
    const client = await MongoClient.connect(process.env.DATABASE_URL);
    const db = client.db();

    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      client.close();
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword,
    });

    console.log("User registered:", result.insertedId);

    client.close();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
