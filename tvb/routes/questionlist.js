var express = require('express');
var router = express.Router();

/* GET questions listing. */
/*
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
*/
/*
 * GET questionlist.
 */

router.use(function(req, res, next) {  
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "X-Requested-With"); 
    next();
});

router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('questionlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
 * POST to addquestion.
 */
router.post('/addquestion', function(req, res) {
    var db = req.db;
    var collection = db.get('questionlist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deletequestion.
 */
router.delete('/deletequestion/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('questionlist');
    var questionToDelete = req.params.id;
    collection.remove({ '_id' : questionToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});


module.exports = router;