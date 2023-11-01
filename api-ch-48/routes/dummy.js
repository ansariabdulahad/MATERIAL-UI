var express = require('express');
var router = express.Router();
const data = [
  {
    "id": 1,
    "email": "just@gmail.com",
    "mobile": 6393640841
  },
  {
    "id": 2,
    "email": "alok@gmail.com",
    "mobile": 45721345
  },
  {
    "id": 3,
    "email": "sohel@gmail.com",
    "mobile": 45821575
  },
  {
    "id": 4,
    "email": "saddam@gmail.com",
    "mobile": 854236521
  },
  {
    "id": 5,
    "email": "shubham@gmail.com",
    "mobile": 8542156358
  }
];


/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200);
  res.json(data)
});

module.exports = router;
