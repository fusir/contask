#!/usr/bin/env node

var json = require('./db.json');

var previousWinners={};
var votes = json.votes;

function getNextWinners () {
 var currentWinners=[];
 Object.keys(votes).forEach(key=>{
  if(previousWinners[key]) { return; }
  var doeswin=true;
  Object.keys(votes[key]).forEach(subkey=>{
   if(previousWinners[subkey]) { return; }
   if(votes[key][subkey]<0) {
    doeswin=false;
   }
  });
  if(doeswin) {
   currentWinners.push(key);
  }
 });
 currentWinners.forEach(i=>{
  previousWinners[i]=true;
 });
 return currentWinners;
}

function getAllWinners () {
 var winners = [];
 while(true) {
  var result = getNextWinners();
  if(result.length) {
   winners.push(result);
  }
  else {
   break;
  }
 }
 return winners;
}

function getOne(allWinners,avOffset,topOffset) {
 var actualOffset = Math.round(-avOffset*Math.log(Math.random()));
 if(actualOffset>topOffset) { return getOne(allWinners,avOffset,topOffset); }
 var bucketNumber = 0;
 while(true) {
  actualOffset-=allWinners[bucketNumber].length;
  if(actualOffset<0) {
   break;
  }
  ++bucketNumber;
 }
 return allWinners[bucketNumber][Math.floor(Math.random()*allWinners[bucketNumber].length)];
}

function getOptions () {
 var totalTaskCount = Object.keys(json.names).length;
 var averageOffset = Math.round(Math.sqrt(totalTaskCount));
 var count = averageOffset;
 var winners = getAllWinners();
 var options={};
 while(count) {
  var option = getOne(winners,averageOffset,totalTaskCount-1);
  if(!options[option]) {
   options[option]=true;
   --count;
  }
 }
 return Object.keys(options);
}

function displayOptions () {
 var options = getOptions();
 options.forEach(id=>{
  console.log(id+':',json.names[id]);
 });
}

function processrank () {
 var RL = require('readline');
 var rl = RL.createInterface({input:process.stdin});
 rl.on('line',line=>{
  vote(line.split(',').map(id=>{
   return id.trim();
  }));
 });
}

function vote(votes) {
 for(var i=0;i<votes.length-1;++i) {
  for(var j=i+1;j<votes.length;++j) {
   json.votes[votes[i]][votes[j]] = (json.votes[votes[i]][votes[j]]||0)+1;
   json.votes[votes[j]][votes[i]] = (json.votes[votes[j]][votes[i]]||0)-1;
  }
 }
 require('fs').writeFile('db.json',JSON.stringify(json)+'\n',()=>{
  process.exit(0);
 });
}


displayOptions();
processrank();
