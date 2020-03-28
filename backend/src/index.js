const routes = require('./routes');
const cors = require('cors')
const express = require('express')
const app = express();
app.use(cors()); //todas as front ends podem acessar esse servidor
app.use(express.json())
app.use(routes)
app.listen(3333)