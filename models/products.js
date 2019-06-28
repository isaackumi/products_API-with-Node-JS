var mongoose=require('mongoose');
var schema=mongoose.Schema();

// Product Schema
var productSchema=mongoose.Schema({
	_id:mongoose.Types.ObjectId,
	name:String,
	price:Number
});


module.exports=mongoose.model("Products",productSchema);

 