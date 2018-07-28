var express = require('express');
var bodyParser =require('body-parser');
var _ = require('underscore');
var db = require('./db.js');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', function(req, res){
	res.send('Saving contacts information');
});

//POST /todos
app.post('/contacts', function(req, res){
	var body = req.body;  

	//call create on db.todo
	db.contacts.create(body).then(function(contact) {
		res.json(contact.toJSON());
	}, function(e) {
		res.status(400).json(e);
	});

});


//get /contacts?completed=true&q=work
app.get('/contacts', function(req, res){
	var query = req.query;
	var where = {};

	// if(query.hasOwnProperty('completed') && query.completed === 'true'){
	// 	where.completed = true;
	// }else if(query.hasOwnProperty('completed') && query.completed === 'false'){
	// 	where.completed = false;
	// }

	// if(query.hasOwnProperty('q') && query.q.length > 0){
	// 	where.description = {
	// 		$like : '%' +query.q + '%'
	// 	};
	// }

	db.contacts.findAll({where: where}).then(function (contact){
		res.json(contact);
	}, function(e){
		res.status(500).send();
	})
	
});

//get contact by id
app.get('/contacts/:phoneNumber', function(req, res){
	var contactPN = parseInt(req.params.phoneNumber, 10);


	db.contacts.findOne({where :{phoneNumber : contactPN}}).then(function (contact){
		if(!!contact){
			res.json(contact.toJSON());
		}else{
			res.status(404).send();
		}
	}, function(e) {
		res.status(500).send();
	});

});


//Delete http method /todos/:id
app.delete('/contacts/:phoneNumber', function(req, res){
	var contactPN = parseInt(req.params.phoneNumber, 10);
	db.contacts.destroy({
		where: {
			phoneNumber: contactPN
		}
	}).then(function (rowsDeleted){
		if(rowsDeleted === 0) {
			res.status(404).json({
				eror: 'No contact with this phoneNumber'
			});
		}else{
				res.status(204).send();
			}
		}, function(){
			res.status(500).send();
 	});
});

//PUT /todos/:id
app.put('/contacts/:phoneNumber', function(req, res){
	var contactPN = parseInt(req.params.phoneNumber, 10);
	var body = req.body;
	var attributes = {};

	if (body.hasOwnProperty('name')){
		attributes.name = body.name;
	}

	if (body.hasOwnProperty('phoneNumber')){
		attributes.phoneNumber = body.phoneNumber;
	}
	if (body.hasOwnProperty('email')){
		attributes.email = body.email;
	}

	if (body.hasOwnProperty('address')){
		attributes.address = body.address;
	}
	if (body.hasOwnProperty('dob')){
		attributes.dob = body.dob;
	}


	 db.contacts.findOne({where : {phoneNumber : contactPN}}).then(function(contacts){
	 	if(contacts){
	 		contacts.update(attributes).then(function(){
	 		res.json(contacts.toJSON());
	 }, function (e){
	 	res.status(400).json(e);
	 });
	 	}else {
	 		res.status(404).send();
	 	}
	 }, function(){
	 	res.status(500).send();
	 });
});



//data base
db.sequelize.sync({force: true}).then(function(){
	app.listen(PORT, function(){
	console.log('Express listening on port ' + PORT + '!');
	});
});


