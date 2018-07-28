module.exports = function(sequelize, DataTypes){
		return sequelize.define('contacts',{
			name: {
				type: DataTypes.STRING,
				allowNull: false, //description is not optional
				validate: {
					len: [1, 250]
				}
			},
			phoneNumber : {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: false,
				
			    unique: true,
			    validate: {
				    is: ["^[0-9]+$", "i"]
				}
    
			},
			email :{
				type: DataTypes.STRING,
				allowNull: false,
				unique : true,
				validate : {
					isEmail : true,
					notEmpty : true,
					len : [1, 255]
				}
			},
			address : {
				type :DataTypes.STRING,
				allowNull : true
			},
			dob : {
				type : DataTypes.DATE,
				allowNull : false,
				defaultValue : sequelize.NOW
			}

	});
};