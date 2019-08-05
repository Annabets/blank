const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const log = require('./lib/log')(module);



const port = process.env.PORT || config.get('port');

const app = express();

app.use(bodyParser.json());

app.use('/api/users',require('./routes/users'));

app.listen(port,()=>{
    log.info(`Express server listening on port ${port}`);
});