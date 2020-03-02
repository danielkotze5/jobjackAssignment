#!/usr/bin/env node
var koa =require('koa');
var koaStatic = require('koa-static');
var IndexRouter = require('./routes');

var app = koa();
app.use(IndexRouter.routes()).use(IndexRouter.allowedMethods());    //somehow this works. keep for now

app.use(koaStatic('publicForClient'));
app.listen('5000');
