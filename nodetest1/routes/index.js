var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' })
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

router.get('/deleteuser', function(req,res){
	var db = req.db;
	var name = req.query.name;
	var collection = db.get('usercollection');
	collection.remove({username:name});
	 res.location("userlist");
     // And forward to success page
     res.redirect("userlist");
})

router.get('/updateuser', function(req,res){
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
	
	 res.location("userlist");
     // And forward to success page
     res.redirect("userlist");
});
	


/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

module.exports = router;
