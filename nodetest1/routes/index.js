var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Lala Land' });
});

/* GET Hello World page.*/
router.get('/helloworld', function(req, res) {
	res.render('helloworld', {title: 'Hello, World!'})
});

/* GET userlist page */
router.get('/userlist', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{},function(e,docs) {
		res.render('userlist', {"userlist" : docs});
	})
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

router.post('/adduser',function(req,res) {
	var db = req.db;
	var userName = req.body.username;
	var userEmail = req.body.useremail;
	
	var collection = db.get('usercollection');
	
	collection.insert({"username":userName,"email":userEmail}, function(err, doc) {
		if(err){
			res.send("Got problem la");
		}else{
			res.location("userlist");
			res.redirect("userlist");
		}
	});
});

/* UPDATE User Page */
router.post('/updateuser',function(req,res) {
	var db = req.db;
	var userName = req.body.username;
	var userEmail = req.body.useremail;
	
	var collection = db.get('usercollection');
	
	collection.update({"username":userName},{"username":userName,"email":userEmail}, function(err, doc) {
		if(err){
			res.send("Got problem la");
		}else{
			res.location("userlist");
			res.redirect("userlist");
		}
	});
});







module.exports = router;
