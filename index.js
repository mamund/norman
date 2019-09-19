#!/usr/bin/env node

/* 
 * name ....: norman utility
 * date ....: 2019-01
 * author ..: mamund
 *
 * runs postman collections test via newman
 * see https://www.npmjs.com/package/newman#api-reference
 *
 * "Goodbye, Norman, Goodbye!"
 * https://getyarn.io/yarn-clip/6e57047d-795a-4904-bdcf-784de3ed0066
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
      // add deployment command here
      // shell.exec("insertproper git command here for heroku deploy");
    });  
  }
  else {
    console.log("** ERROR: Collection file not found: " + coll);
  }
} 

// *** eof

