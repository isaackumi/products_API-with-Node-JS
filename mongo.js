var mongoose=require('mongoose');
var schema=mongoose.Schema()

const userSchema=schema({
	_id:number,
	name:string,
	posts:{type:schema.Types.ObjectId,ref:'Post' }
});


const postSchema=schema({
	_creator:{type:number,ref:'User' }
	title:stirng,
	text:string
});

// compiling schemas into models
var Post=mongoose.model('Post',postSchema);
var User=mongoose.model('User',userSchema);