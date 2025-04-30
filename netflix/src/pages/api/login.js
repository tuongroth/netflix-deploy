// pages/api/login.js
import bcrypt from 'bcryptjs';
import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      const client = await MongoClient.connect(process.env.DATABASE_URL);
      const db = client.db();

      const user = await db.collection('users').findOne({ email });
      if (!user) return res.status(401).json({ message: 'No user found with that email' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

      res.status(200).json({ message: 'Login successful' });
      client.close();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
