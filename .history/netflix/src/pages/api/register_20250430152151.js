import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
      const client = await MongoClient.connect(process.env.DATABASE_URL);
      const db = client.db();

      const existingUser = await db.collection('users').findOne({ email });
      if (existingUser) {
        return res.status(422).json({ error: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await db.collection('users').insertOne({
        name,
        email,
        password: hashedPassword,
      });

      client.close();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
