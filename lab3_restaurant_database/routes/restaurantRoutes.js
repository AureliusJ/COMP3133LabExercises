const express = require("express");
const Restaurant = require("../models/Restaurant");

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/cuisine/:cuisine", async (req, res) => {
    try {
      const cuisine = new RegExp(req.params.cuisine, 'i'); 
      const restaurants = await Restaurant.find({ cuisine: cuisine });
      res.json(restaurants);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  

router.get("/", async (req, res) => {
  try {
    const sortBy = req.query.sortBy;
    let sortOrder = sortBy === "DESC" ? -1 : 1;

    const restaurants = await Restaurant.find()
      .select("_id cuisines name city restaurant_id")
      .sort({ restaurant_id: sortOrder });

    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/Delicatessen", async (req, res) => {
    try {
      const restaurants = await Restaurant.find({ 
        cuisine: "Delicatessen", 
        city: { $ne: "Brooklyn" } 
      }).select("cuisine name city -_id").sort({ name: 1 });
  
      console.log("Found restaurants:", restaurants.length);
      res.json(restaurants);
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message });
    }
  });
  

module.exports = router;
