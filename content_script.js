import * from './lib.js'

console.log("========loading Rainbow Delimiters from content_script.js");
console.log(jQuery().jquery);


const RDBlocks = [];
if (location.href.match(/(docs\.racket-lang\.org|file:\/\/\/.*\/Racket.*\/doc\/.*)/)) {
  RDBlocks.push(".SCodeFlow");  // ".SCodeFlow RktPn"
  RDBlocks.push("blockquote.SVInsetFlow");
} else if (location.href.match(/github\.com/)) {
  RDBlocks.push(".highlight");
} else if (location.href.match(/gitlab\.com/)) {
  RDBlocks.push("code");
} else {
  RDBlocks.push("table tbody tr");
  RDBlocks.push("pre");
  RDBlocks.push("code");
}

// const RDBlocks = [
//   // "blockquote" // racket scribble doc
//   // ".SCodeFlow RktPn" // racket scribble doc / frog scribble post
//   "table tbody tr"
//   ".highlight", // github (viewing code files, code comment of issues, readme of repo)
//   "code" // gitlab stackoverflow
//   // "table.d-block", // github code comment of issues
//   // "pre.code.highlight",
//   // "pre code"
// ]

// $( handler );
$(document).ready(function() { $( handler ); }); // not working for a vuejs website
$(document).on('pjax:end', handler); // this line is mainly for github.com/*
