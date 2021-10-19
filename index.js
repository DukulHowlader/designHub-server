const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require("dotenv").config();

const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7mlny.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 5000;



app.listen(process.env.PORT || port);

client.connect(err => {
const formCollection = client.db("DeshiHub").collection("Form");
const buildFormCollection = client.db("DeshiHub").collection("BuildForm");
console.log(err)
app.post('/addForm', (req,res) =>{
    const formData = req.body;
    formCollection.insertOne(formData)
    .then((result => {
        res.send(result.acknowledged);
    }))
});

app.post('/formBuild', (req,res) =>{
    const formDataDetails = req.body;
    buildFormCollection.insertOne(formDataDetails)
    .then((result => {
        res.send(result.acknowledged);
    }))
});

app.get('/forms', (req,res) => {
    formCollection.find()
    .toArray((err,documents) => {
        res.send(documents)
    })
});

app.get('/formMake/:id', (req,res) => {
   const id = req.params.id;
    formCollection.find({ _id: ObjectId(id) })
    .toArray((err,documents) => {
        res.send(documents)
    })
});

app.get('/formView/:id', (req,res) => {
    const identifier = req.params.id;
     buildFormCollection.find({ FormIdentifier: identifier })
     .toArray((err,documents) => {
         res.send(documents)
     })
 })


});





app.get('/', function (req, res) {
    res.send('Server Is Working!!')
  });
  

