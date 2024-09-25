// Михалькевич Владислав
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());  // Для парсинга JSON запросов

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/contacts', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Определение модели для MongoDB
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// CRUD Маршруты

// Создание контакта (Create)
app.post('/contacts', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Чтение всех контактов (Read)
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Обновление контакта (Update)
app.put('/contacts/:id', async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContact) return res.status(404).json({ message: 'Contact not found' });
    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Удаление контакта (Delete)
app.delete('/contacts/:id', async (req, res) => {
  try {
    const removedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!removedContact) return res.status(404).json({ message: 'Contact not found' });
    res.json(removedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
