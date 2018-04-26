#!/usr/bin/env node

require('fs').writeFile('db.json',JSON.stringify({names:{},votes:{},max:0})+'\n',()=>{});
