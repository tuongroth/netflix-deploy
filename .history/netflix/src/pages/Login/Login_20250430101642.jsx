import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import prismadb from '@/lib/prismadb'; // Đường dẫn tùy vào project bạn

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { email, password } = req.body;

  try {
    const user = await prismadb.user.findUnique({
      where: { email },
    });

    if (!user || !user.hashedPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Nếu muốn tạo session JWT thì cần thêm bước ở đây (tùy project)
    return res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
