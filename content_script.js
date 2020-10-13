console.log("========from rainbow delimiters of content_script.js");
console.log(jQuery().jquery);
// $('a').filter(function() {
//   return this.host !== location.host
// }).attr('target','_blank');


var colors = [
  "#458588",
  "#b16286",
  "DarkSeaGreen",
  "IndianRed",
  "DarkOrchid",
  "SteelBlue",
  "#FF1493",
  "OliveDrab",
  "darkred"
]

function getRandomStr() {
  return Math.floor(Math.random() * 1000000).toString();
}
function hex(x) {
  return ("0" + parseInt(x).toString(16)).slice(-2);
}
function rgb2hex(str) {
  rgb = str.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (rgb === null) {
    return str;
  } else {
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
  }
}



var colorized = [];
var randomNum;
$('blockquote').find("span.RktPn").each(function(i) {
  if (colorized.length === 0) {
    randomNum = getRandomStr();
  }
  if (this.textContent === "(") {
    var color = colors[colorized.length];
    var stripedColor = color.replace("#", "-").replace(" ", "-")
    $(this).css("color", color);
    this.classList.add(`rd-color-${stripedColor}`);
    this.classList.add(`rd-id-${randomNum}`);
    // $(this).attr('id', `color-${id}`);
    colorized.push(color);
    // $(this).css("font-weight", "bolder");
  };

  if (this.textContent === ")") {
    var color = colorized.pop()
    var stripedColor = color.replace("#", "-").replace(" ", "-")
    $(this).css("color", color);
    this.classList.add(`rd-color-${stripedColor}`);
    this.classList.add(`rd-id-${randomNum}`);
    // $(this).attr('id', `color-${id}`);
  };
});


var colorized = [];
var randomNum;
$('blockquote').find("span.RktPn").each(function(i) {
  if (colorized.length === 0) {
    randomNum = getRandomStr();
  }
  if (this.textContent === "[") {
    var color = colors[colorized.length];
    var stripedColor = color.replace("#", "-").replace(" ", "-")
    $(this).css("color", color);
    this.classList.add(`rd-color-${stripedColor}`);
    this.classList.add(`rd-id-${randomNum}`);
    // $(this).attr('id', `color-${id}`);
    colorized.push(color);
    // $(this).css("font-weight", "bolder");
  };

  if (this.textContent === "]") {
    let color = colorized.pop()
    let stripedColor = color.replace("#", "-").replace(" ", "-")
    $(this).css("color", color);
    this.classList.add(`rd-color-${stripedColor}`);
    this.classList.add(`rd-id-${randomNum}`);
    // $(this).attr('id', `color-${id}`);
  };
});



//////// mouse hover /////////////
$("span.RktPn").mouseover(function(i) {
  var color = rgb2hex(this.style.color);
  var matchingStr = this.textContent
  var classNames = this.className.split(" ")
  var rdColor = classNames[1];
  var rdId = classNames[2];
  var elms = $(this).parents("blockquote").find(`span.${rdColor}.${rdId}`).filter(function(ii) {
    if (matchingStr === "(" || matchingStr === ")") {
      if (this.textContent === "(" || this.textContent === ")") {
        return true;
      }
    } else if (matchingStr === "[" || matchingStr === "]") {
      if (this.textContent === "[" || this.textContent === "]") {
        return true;
      }}});
  // elms.css("background", "whitesmoke");  // gainsboro
  elms.className = ["RktPn", rdColor, rdId ].join(" ");
  elms.css("color", "white");
  elms.css("background", color);
});


$("span.RktPn").mouseleave(function(i) {
  var color = rgb2hex(this.style.color);
  var matchingStr =  this.textContent
  var elms = $(this).parents("blockquote").find(`span#${this.id}`).filter(function(ii) {
    if (matchingStr === "(" || matchingStr === ")") {
      if (this.textContent === "(" || this.textContent === ")") {
        return true;
      }
    } else if (matchingStr === "[" || matchingStr === "]") {
      if (this.textContent === "[" || this.textContent === "]") {
        return true;
      }}});
  elms.css("color", color);
  elms.css("background", "transparent");
});
