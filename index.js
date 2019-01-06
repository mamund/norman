#!/usr/bin/env node

/* 
 * norman utility
 * runs postman collections test via newman
 * 2019-01
 * mamund
 */

"use strict";

var newman = require('newman');
var program = require('commander');
var fs = require('fs');

// top-level routine
program
  .arguments('<coll> [en]')
  .action(function(coll, en){runner(coll, en)})
  .parse(process.argv);

// do the work
function runner(coll, en) {
  var options;
 
  if(fs.existsSync(coll)===true) {
    options = {};
    options.collection = coll;
    options.environment = en;
    options.reporters = 'cli';
     
    newman.run(options, function (err) {
      if (err) { throw err; }
      console.log('collection run complete!');
    });  
  }
  else {
    console.log("** ERROR: Collection file not found: " + coll);
  }
} 

// *** eof

