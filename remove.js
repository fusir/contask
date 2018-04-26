#!/usr/bin/env node

var id = process.argv[2];

if(!id) {
 process.stderr.write("Expected id to delete\n");
 exit(1);
}

var json = require('./db.json');
var names=json.names;
var votes=json.votes;

delete names[id];
delete votes[id];

Object.keys(votes).forEach(i=>{
 delete votes[i][id];
});

require('fs').writeFile('db.json',JSON.stringify(json)+'\n',()=>{});
