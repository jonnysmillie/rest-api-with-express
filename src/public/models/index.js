var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema ({

	_id: this.ObjectId,
	fullName: String,
	emailAddress: String,
	password: String,
});

var CourseSchema = new Schema ({

	_id: this.ObjectId,
	user: Pointer,
	title: String,
	description: String,
	estimatedTime: String,
	materialsNeeded: String,
	steps: {
		stepNumber: Number,
		title: String,
		description: String
	},
	reviews: {
		_id: reviewIds
	}
});

var ReviewSchema = new Schema ({

	_id: this.ObjectId,
	user: userId,
	postedOn: Date,
	rating: Number,
	review: String
})