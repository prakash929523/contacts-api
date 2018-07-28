var Sequelize = require('sequelize');

var sequelize;

sequelize = new Sequelize(undefined, undefined, undefined, {
		'dialect' : 'sqlite',
		'storage' : __dirname + '/data/contacts-api.sqlite'
	});

var db = {};

db.contacts = sequelize.import(__dirname + '/models/contacts.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;