
console.log("========from content_script.js");
console.log(jQuery().jquery);
$('a').filter(function() {
    return this.host !== location.host
}).attr('target','_blank');


var colors = [
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

var colorized = [];
$('blockquote').find("span.RktPn").each(function(i) {
  if (this.textContent === "(") {
    let c = colors[colorized.length];
    let id = c.replace("#", "-").replace(" ", "-")
    $(this).css("color", c);
    $(this).attr('id', `color-${id}`);
    colorized.push(c);
    // $(this).css("font-weight", "bolder");
  };

  if (this.textContent === ")") {
    let c = colorized.pop()
    let id = c.replace("#", "-").replace(" ", "-")
    $(this).css("color", c);
    $(this).attr('id', `color-${id}`);
    // $(this).css("font-weight", "bolder");
  };
});

var colorized = [];
$('blockquote').find("span.RktPn").each(function(i) {
  if (this.textContent === "[") {
    let c = colors[colorized.length];
    $(this).css("color", c);
    colorized.push(c);
    // $(this).css("font-weight", "bolder");
  };

  if (this.textContent === "]") {
    $(this).css("color", colorized.pop());
    // $(this).css("font-weight", "bolder");
  };
});



// $("span.RktPn").mouseover(function(i) {
//   console.log("=====detected!!!!");
//   debugger;
// });
