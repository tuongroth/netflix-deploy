require('dotenv').config();  // Đọc file .env
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Tạo ứng dụng express
const app = express();

// Cấu hình middleware
app.use(cors()); // Cho phép kết nối từ các nguồn khác nhau
app.use(bodyParser.json()); // Để đọc dữ liệu JSON trong request body

// Kết nối MongoDB
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Tạo schema và model cho người dùng
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Route cho đăng ký người dùng
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Kiểm tra nếu email đã tồn tại
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'Email already in use' });
  }

  // Tạo người dùng mới và lưu vào MongoDB
  const newUser = new User({ name, email, password });
  await newUser.save();

  return res.status(200).json({ message: 'Registration successful' });
});

// Route cho đăng nhập người dùng
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Kiểm tra người dùng trong MongoDB
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  return res.status(200).json({ message: 'Login successful' });
});

// Cổng mà server sẽ lắng nghe
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
