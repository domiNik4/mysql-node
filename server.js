const express = require('express');
const bodyParser=require('body-parser');
const mysql=require('mysql');
const connectionManager=require('mysql-connection-manager');
const cors=require('cors');
var app =express();
app.use(bodyParser.json());
app.use(cors());

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"school"
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Successfully connected to MYSQL database!");
});

app.get('/children',(req,res)=>{
	var query = 'select * from children';
	conn.query(query, function (err, result) {
		conn.end();
    	if (err){
    		res.status(400).send(err);
    	}
    	var children=JSON.stringify(result);
    	res.status(200).header('content-type','application/json').send(children);
  	});
});

app.post('/children',(req,res)=>{
	var child={name:req.body.name,idp:req.body.idp,status:null}
	var query = 'insert into children(name, idp) values("'+child.name+'", '+child.idp+')';
	conn.query(query,function (err, result){
    	if (err)
    		res.status(400).send(err);
    	child.status='inserted';
    	var msg=JSON.stringify(child);
    	res.status(200).header('content-type','application/json').send(child);
    });
});

app.listen(3000,()=>{console.log("Server running on port 3000. Press ctrl+C to exit.")});
