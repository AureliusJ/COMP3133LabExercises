const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config(); // Load environment variables
const { ApolloServer } = require('apollo-server-express'); 
const typeDefs = require('./schema'); 
const resolvers = require('./resolvers'); 
const Movie = require('./models/Movie'); // Import Movie model

// ✅ Load MongoDB Connection String from .env
const mongodb_atlas_url = process.env.MONGODB_URL;

// ✅ Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(mongodb_atlas_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ Success: MongoDB connected');
    } catch (error) {
        console.error('❌ MongoDB Connection Failed:', error.message);
        process.exit(1);
    }
};

// ✅ Seed the Database (if empty)
const seedMovies = async () => {
    try {
        const count = await Movie.countDocuments();
        if (count === 0) {
            console.log("📥 No movies found. Seeding database...");
            const movies = JSON.parse(fs.readFileSync('./Sample_Movies_Records.json', 'utf-8'));
            await Movie.insertMany(movies);
            console.log('✅ Movies successfully seeded!');
        } else {
            console.log('✅ Movies already exist in the database.');
        }
    } catch (error) {
        console.error('❌ Error seeding movies:', error.message);
    }
};

// ✅ Set up Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// ✅ Initialize Express App
const app = express();
app.use(express.json());
app.use('*', cors());

// ✅ Start Server
const startServer = async () => {
    await server.start();
    server.applyMiddleware({ app });

    app.listen(process.env.PORT || 4000, async () => {
        console.log(`🚀 GraphQL Server running at http://localhost:${process.env.PORT || 4000}/graphql`);
        await connectDB();  // Connect to MongoDB
        await seedMovies(); // Seed data if empty
    });
};

startServer();
