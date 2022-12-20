const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const router = express.Router();
const Station = require("../models/Station");
const asyncWrapper = require("express-async-wrapper");
const mongoose = require("mongoose");
// let multer = require('multer');


router.use(requireAuth);




router.get('/stations', async (req, res) => {
    const stations = await Station.find({userId: req.user._id}).sort({ createdAt: -1 });
    res.status(200).json(stations);
  });
  
  router.post('/stations',async (req, res) => {
    const {title, coffee, location, quantity, photo} = req.body;
    
  if (!title || !location || !quantity || !coffee ) {
     return res.status(404).json({ error: "No station created" });
    }
    try {
      const station = await Station.create({title, coffee, location, quantity, photo, userId: req.user._id});
      res.status(201).json(station);
      
    } catch (error) {
      res.status(422).send({error: error.message});
    }
  });
  
  router.get('/stations/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: `No such station` });
    }
    const station = await Station.findOne({ _id: id });
    if (!station) {
      return res.status(404).json({ msg: `No such station with id : ${id}` });
    }
    res.status(200).json(station);
  });
  
  router.patch('/stations/:id',async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ msg: "No such station" });
    }
    const station = await Station.findByIdAndUpdate({ _id: id }, { ...req.body });
    if (!station) {
      return res.status(404).json({ msg: "No such station" });
    }
    res.status(200).json(station);
  });
  
  router.delete('/stations/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such station" });
    }
    const station = await Station.findByIdAndDelete({ _id: id });
    if (!station) {
      return res.status(404).json({ error: "No such station " });
    }
    res.status(200).json(station);
  });

module.exports = router;