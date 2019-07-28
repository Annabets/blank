const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const log = require('./lib/log')(module);


const port = process.env.PORT || config.get('port');

const app = express();

app.use(bodyParser.json());

app.get('/api/users',(req,res)=>{
    const users=[
        {id:1,firstName:'John',lastName:'Doe'},
        {id:2,firstName:'Steve',lastName:'Smith'},
        {id:3,firstName:'Mary',lastName:'Swanson'}
    ];
    res.json(users);
})

app.post('/api/users/register',(req,res)=>{
    console.log(req.body);
    res.json({user:req.body});
})

app.listen(port,()=>{
    log.info(`Express server listening on port ${port}`);
});