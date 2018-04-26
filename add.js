#!/usr/bin/env node

var name = process.argv.slice(2).join(' ');

if(!name) {
 process.stderr.write("We expected a task name\n");
 exit(1);
}

var json = require('./db.json');
var id = json.max+1;
++json.max

json.names[id] = name;
json.votes[id] = {};

require('fs').writeFile('db.json',JSON.stringify(json)+'\n',()=>{});
