
const { Int32 } = require('mongodb');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

songSchema = new Schema( {
	title: String,
	album: String,
  	artist: String,
	genre: String,
	track_num: Number,
	year: Number,
	filename:String,
	url:String,
	albumArt:String
}),
song = mongoose.model('song', songSchema);

module.exports = song;