var express = require('express');
var mongo = require('mongodb');
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

/*
var ObjectId = mongo.ObjectID;
var minID = new Date(2015, 7, 1, 0, 0, 0, 0).getTime();
var maxID = new Date().getTime();

function randomIds() {
  var ids = [];
  for (var i = 0; i<1000; i++) {
    var date = new Date(Math.random() * (maxID - minID) + minID);
    var oid = ObjectId(Math.floor(date.getTime()/1000))
    var date2 = new Date(Math.random() * ((date.getTime() + 60000) - (date.getTime() - 60000)) + date.getTime() + 60000);
    var oid2 = ObjectId(Math.floor(date2.getTime()/1000))

    if (date.getTime() > date2.getTime()) {
      ids.push({_id: {$gte: oid2, $lte: oid}});
    }
    else {
      ids.push({_id: {$gte: oid, $lte: oid2}});

    }
  }
  return ids;
}
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

router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('questionlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
 * GET n random question
 */
router.get('/:n', function(req, res) {
    var db = req.db;
    var n = req.params.n;
    var collection = db.get('questionlist');
    var results = [];
    var count = collection.count({}, function(err, count) {
        n = Math.min(n, count);
        var ids = [];

        var getRandomQuestion = function(i)
        { 
            var a = Math.random();
            var b = Math.random();
            
            collection.findOne({rnd: {$gte: Math.min(a,b), $lte: Math.max(a,b)}},function(e,docs){
                if(docs)
                {
                    if(ids.indexOf(String(docs["_id"])) < 0)
                    {
                        ids.push(String(docs["_id"]));
                        results.push(docs);
                        if(i == n)
                        {
                            res.contentType('application/json');
                            res.send(JSON.stringify(results));
                        }
                        else
                        {
                            getRandomQuestion(i+1);
                        }
                    }
                    else
                        getRandomQuestion(i);
                }
                else
                    getRandomQuestion(i);
            });
        }
        getRandomQuestion(1);
    });
     
    //console.log(randomIds())
    //res.contentType('application/json');
    //res.send(JSON.stringify(results));
});

/*
 * POST to addquestion.
 */
router.post('/addquestion', function(req, res) {
    var db = req.db;
    var collection = db.get('questionlist');
    req.body.rnd = Math.random();
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