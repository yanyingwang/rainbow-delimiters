
console.log("========from content_script.js");
console.log("========from content_script.js");
console.log("========from content_script.js");
console.log("========from content_script.js");
console.log(jQuery().jquery);

colors = [
  "#458588",
  "#b16286",
  "DarkSeaGreen",
  "IndianRed",
  "DarkOrchid",
  "SteelBlue",
  "DeepPink2",
  "OliveDrab",
  "dark red"
]




$('a').filter(function() {
    return this.host !== location.host
}).attr('target','_blank');


$('blockquote').find("span.RktPn").each(function() {
  debugger;
}).attr('target','_blank');


// $('blockquote').find("span.RktPn").filter(function() {
// }).attr('target','_blank');
