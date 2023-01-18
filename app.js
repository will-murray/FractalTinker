const express = require('express');
const { re } = require('mathjs');
const app = express();
const path = require('path');
const port = 7000;
const router = express.Router();



app.use(express.static(__dirname + '/public'))
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')))
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')))



app.listen(port, () => console.log("server up on port ",port));
