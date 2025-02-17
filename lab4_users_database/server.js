const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/userModel');

const app = express();
const PORT = 8081;
const MONGO_URI = "mongodb+srv://jason29gunawan:Jason29@labex4.8wc74.mongodb.net/?retryWrites=true&w=majority&appName=LabEx4"; // Replace with your DB URL

app.use(express.json());

app.use('/users', userRoutes);
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Failed:", err));
  

  async function seedUsers() {
    try {
      const count = await User.countDocuments();
      if (count === 0) {
        const users = require('./UsersData.json');
        await User.insertMany(users);
        console.log('Users seeded successfully');
      } else {
        console.log('Users already seeded');
      }
    } catch (error) {
      console.error('Error seeding users:', error.message);
    }
  }
  
  seedUsers();

  
  app.listen(8081, () => {
    console.log('Server is running on http://localhost:8081');
  });