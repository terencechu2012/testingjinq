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

router.get('/userlist2', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{},function(e,docs) {
		res.render('userlist2', {"userlist" : docs});
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

router.get('/deleteuser', function(req,res){
	var db = req.db;
	var name = req.query.name;
	var collection = db.get('usercollection');
	collection.remove({username:name});
	 res.location("userlist2");
     // And forward to success page
     res.redirect("userlist2");
})

router.get('/updateuser2', function(req,res){
	var myname = req.query.name;
	res.render('updateuser',{"myname":myname})
});

router.post('/updateuserzz', function(req,res){
	var db = req.db;
	var oldname = req.body.oldname;
	var userName = req.body.username;
    var userEmail = req.body.useremail;
	var collection = db.get('usercollection');
	
	collection.update({username:oldname},{"username" : userName,
        "email" : userEmail});
	
	 res.location("userlist2");
     // And forward to success page
     res.redirect("userlist2");
});







module.exports = router;
