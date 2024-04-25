const mongoose = require('mongoose');

mongoose.connect('mongod://127.0.0.1:27017/mediaDB');

module.exports = mongoose.connection