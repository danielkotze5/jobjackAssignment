#!/usr/bin/env node
var koa =require('koa');
var bodyParser = require('koa-bodyparser');

var app = koa();

var IndexRouter = require('./routes');
app.use(bodyParser());
app.use(IndexRouter.routes()).use(IndexRouter.allowedMethods());    

app.listen('5000');
console.log("Server running on port 5000...");
