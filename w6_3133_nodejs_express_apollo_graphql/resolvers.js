const Movie = require('./models/Movie');

const resolvers = {
    Query: {
      // Get all movies
      getMovies: async () => {
        try {
          return await Movie.find();
        } catch (error) {
          throw new Error('Error fetching movies');
        }
      },
      
      // Get a movie by ID
      getMovieById: async (_, { id }) => {
        try {
          return await Movie.findById(id);
        } catch (error) {
          throw new Error('Movie not found');
        }
      },
    },
  
    Mutation: {
      // Add a new movie
      addMovie: async (_, { name, director_name, production_house, release_date, rating }) => {
        try {
          const newMovie = new Movie({ name, director_name, production_house, release_date, rating });
          return await newMovie.save();
        } catch (error) {
          throw new Error('Error adding movie');
        }
      },
  
      // Update an existing movie
      updateMovie: async (_, { id, name, director_name, production_house, release_date, rating }) => {
        try {
          return await Movie.findByIdAndUpdate(
            id,
            { name, director_name, production_house, release_date, rating },
            { new: true }
          );
        } catch (error) {
          throw new Error('Error updating movie');
        }
      },
  
      // Delete a movie
      deleteMovie: async (_, { id }) => {
        try {
          return await Movie.findByIdAndDelete(id);
        } catch (error) {
          throw new Error('Error deleting movie');
        }
      },
    },
  };
  
  module.exports = resolvers;