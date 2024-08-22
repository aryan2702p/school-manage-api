const School = require('../models/School');
const calculateDistance = require('../utils/distanceCalculator');

exports.addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    return res.status(400).json({ error: 'Latitude and longitude must be numbers' });
  }

  try {
    const id = await School.create(name, address, latitude, longitude);
    res.status(201).json({ message: 'School added successfully', id });
  } catch (error) {
    console.error('Error adding school:', error);
    res.status(500).json({ error: 'An error occurred while adding the school' });
  }
};

exports.listSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  const userLat = parseFloat(latitude);
  const userLon = parseFloat(longitude);

  if (isNaN(userLat) || isNaN(userLon)) {
    return res.status(400).json({ error: 'Invalid latitude or longitude' });
  }

  try {
    const schools = await School.findAll();
    const schoolsWithDistance = schools.map(school => ({
      ...school,
      distance: calculateDistance(userLat, userLon, school.latitude, school.longitude)
    }));

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);
    res.json(schoolsWithDistance);
  } catch (error) {
    console.error('Error fetching schools:', error);
    res.status(500).json({ error: 'An error occurred while fetching schools' });
  }
};