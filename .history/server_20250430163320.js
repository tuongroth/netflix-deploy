
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Tạo ứng dụng express
const app = express();

// Cấu hình middleware
app.use(cors()); // Cho phép kết nối từ các nguồn khác nhau
app.use(bodyParser.json()); // Để đọc dữ liệu JSON trong request body

// Route cho đăng ký người dùng
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;

  // Ở đây bạn có thể thực hiện các thao tác như lưu vào cơ sở dữ liệu (MongoDB, MySQL, v.v.)
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Please provide name, email, and password' });
  }

  console.log('User registered:', { name, email, password });
  return res.status(200).json({ message: 'Registration successful' });
});

// Route cho đăng nhập người dùng
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Kiểm tra đăng nhập (ở đây bạn có thể kiểm tra với cơ sở dữ liệu)
  if (email === 'test@example.com' && password === 'password123') {
    return res.status(200).json({ message: 'Login successful' });
  }

  return res.status(401).json({ error: 'Invalid email or password' });
});

// Cổng mà server sẽ lắng nghe
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
