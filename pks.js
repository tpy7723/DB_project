var http = require('http');
var express = require('express');
var mysql = require('mysql');
var dbconfig = require('./database.js');
var connection = mysql.createConnection(dbconfig);
var app = express();
var server = require('http').Server(app)
var io = require('socket.io')(server)
const https = require('https')
app.io = io
var app = express();
require('date-utils');

// ADD THIS
var cors = require('cors');
app.use(cors());


const router = express.Router();

app.get('/login_em', function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  console.log('in login_em')
  console.log(req.query);
  var id = req.query.id,
      password = req.query.password;
  console.log('ID'+id+'  password'+password);
//  res.send('hell0');
//con.query('update Student SET token = ? WHERE studentId = ?', token, id, (err, result, fields)=>{
  connection.query('SELECT * from 직원 WHERE 직원번호=?',[id],(e,r,f)=>{
  	if(e){
  		console.log('error : \n'+e)
  		res.send({
  			status:'error',
  			errMsg:'에러'
  		})
  	}
  	else{
      console.log(r[0].비밀번호)
      if(r[0].비밀번호 == password ){
        console.log('login pass')
        res.send({
          status: 'success',
          result: JSON.parse(JSON.stringify(r)),
          field: f
        })
      }
      else{
        console.log('no user')
        res.send({
  				status: "no-user"
  			})
      }
	}
})
});

/*
router.post('/call/review', (req, res, next) => {
  console.log('in call/review')
  con.query('SELECT * from 후기', (e, r, f) => {
    if (e) {
      console.log(e);
      res.send({
        status: 'error',
        errMsg: '에러.'
      })
    } else {
      console.log(r)
      res.send({
        status: 'success',
        data: r
      })
    }
  })
});
*/

app.get('/', function(req, res) {
  res.send('Root');
});

app.get('/login', function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  console.log('in login_em')
  console.log(req.query);
  var id = req.query.id,
      password = req.query.password;
  console.log('ID'+id+'  password'+password);
//  res.send('hell0');
//con.query('update Student SET token = ? WHERE studentId = ?', token, id, (err, result, fields)=>{
  connection.query('SELECT * from 고객 WHERE ID=?',[id],(e,r,f)=>{
  	if(e){
  		console.log('error : \n'+e)
  		res.send({
  			status:'error',
  			errMsg:'에러'
  		})
  	}
  	else{
      console.log(r[0].비밀번호)
      if(r[0].비밀번호 == password ){
        console.log('login pass')
        res.send({
          status: 'success',
          result: JSON.parse(JSON.stringify(r)),
          field: f
        })
      }
      else{
        console.log('no user')
        res.send({
  				status: "no-user"
  			})
      }
	}
})
});
/*
router.post('/call/review', (req, res, next) => {
  console.log('in call/review')
  con.query('SELECT * from 후기', (e, r, f) => {
    if (e) {
      console.log(e);
      res.send({
        status: 'error',
        errMsg: '에러.'
      })
    } else {
      console.log(r)
      res.send({
        status: 'success',
        result: JSON.parse(JSON.stringify(r))
      })
    }
  })
})
*/
app.get('/call/review', function(req, res) {
   console.log('in call/review')
   connection.query('SELECT * from 후기', (e, r, f) => {

   res.setHeader('Content-Type', 'text/plain');
   if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      console.log(r)
      res.send({
        status: 'success',
        result: JSON.parse(JSON.stringify(r)),
        fields: f
      })
    }
 })
});

app.get('/request/review', function(req, res) { //게시글 등록
  res.send('Root');
});


app.get('/call/question', function(req, res) {
  console.log('in call/question')
  //  res.send('hell0');

  connection.query('SELECT * from 질문게시판', (e, r, f) => {
    res.setHeader('Content-Type', 'text/plain');
    if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      console.log(r)
      res.send({
        status: 'success',
        result: JSON.parse(JSON.stringify(r)),
        fields: f
      })
    }
  })
});

app.get('/request/question', function(req, res) { //등록
   var newDate = new Date(); // 현재 시각 받아옴
   var time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');
   console.log(req.query);
   var context = req.query.질문내용,
       id = req.query.ID;
   var 질문번호 = '90000'
   connection.query('insert into 질문게시판 values (?,?,?,?)',[질문번호,context,time,id],(e,r,f) =>{
	res.setHeader('Content-Type', 'text/plain');
	    if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      res.send({
        status: 'success'
      })
   }
  })
});
app.get('/call/reservation', function(req, res) {
  console.log('in call/reservation')
  //  res.send('hell0');
  console.log(req.query);
  var id = req.query.ID;
  connection.query('SELECT * from 예약게시판 where', (e, r, f) => {
    res.setHeader('Content-Type', 'text/plain');
    if (e) {
      console.log(e)
      res.send({
        status: 'error',
        errMsg: '에러',
      })
    } else {
      console.log(r)
      res.send({
        status: 'success',
        result: JSON.parse(JSON.stringify(r)),
        fields: f
      })
    }
  })
});
app.get('/request/reservation', function(req, res) {
  res.send('Root');
});

// configuration ===============================================================
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'),
  function() {
    console.log('Express server listening on port ' + app.get('port'));
  });