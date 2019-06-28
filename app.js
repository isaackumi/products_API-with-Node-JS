var express=require("express");
var bodyparser=require("body-parser");
var path=require("path");
var mongoose=require("mongoose");
var Product=require("./models/products.js");
 
 
 

var app=express();
app.use(bodyparser.json());
 
 


mongoose.connect("mongodb+srv://isaackumi:"+
process.env.atlaspwd+"@cluster0-tgvdd.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true });

// Get all products
app.get('/products',function(req,res){    // working
Product.find()
.exec()
.then(function(data){
	res.send(data);
})
.catch(function(e){
	res.send(e);
});	 
 
 
});


// Get a single product by ID
app.get('/products/:id',function(req,res){
var id=req.params.id;
Product.findById({_id:id})
.exec()
.then(function(result){
	console.log(result);
	res.status(200).json(result);
})
.catch(function(error){
	console.log(error);
	res.status(204).json({mesage:"Nothing was found!"});
});
});

// Add a new product
app.post('/products',function(req,res){
	var products=new Product({
		_id: new mongoose.Types.ObjectId(),
	name:req.body.name,
	price:req.body.price
	});
products.save().then(function(result){
	console.log(result);
	res.send(result);
}).catch(function(err){console.log(err);});

});

// Update an existing product
app.put('/products/:id',function(req,res){
	var id=req.params.id;
	Product.update({_id:id},{$set:req.body})
	.exec()
	.then(function(result){
		res.send(result);
		console.log(result);
	})
	.catch(function(error){
		console.log(error);
	});
});

// Delete a product 
app.delete('/products/:id',function(req,res){
	var id=req.params.id;
	Product.remove({_id:id})
	.exec()
	.then(function(result){
		res.send(result);
		console.log(result);
	})
	.catch(function(error){
		res.send(error);
		console.log(error);
	});

});


 


var port = process.env.PORT || 5000;

app.listen(port,function(){
	console.log('serving on port 5000');
});