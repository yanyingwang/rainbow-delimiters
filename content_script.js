console.log("========loading Rainbow Delimiters from content_script.js");
console.log(jQuery().jquery);

//// functions //////
const colors = [
  "#b16286",
  "#458588",
  "DarkSeaGreen",
  "IndianRed",
  "DarkOrchid",

  "#FF1493",
  "SteelBlue",
  "OliveDrab",
  "darkred",

  "#4c516d",
  "#7e5e60",
  "#666699",
  "#4a646c",
  "#5e644f",

  "#b16286",
  "#458588",
  "DarkSeaGreen",
  "IndianRed",
  "DarkOrchid",

  "#FF1493",
  "SteelBlue",
  "OliveDrab",
  "darkred",

  "#4c516d",
  "#7e5e60",
  "#666699",
  "#4a646c",
  "#5e644f"
]

const RDBlocks = [
  // "blockquote", // racket scribble doc
  // ".SCodeFlow", // racket scribble doc / frog scribble post
  "table tbody tr",
  ".highlight", // github (viewing code files, code comment of issues, readme of repo)
  "code" // gitlab stackoverflow
  // "table.d-block", // github code comment of issues
  // "pre.code.highlight",
  // "pre code"
]


function getRandomStr() {
  return Math.floor(Math.random() * 10000).toString();
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

function colorizing(RDBlock) {
  $(RDBlock).each(function(i) {
    if (this.classList.contains("rd-colorized")) { return false; }
    if ($(this).find("span.rd-bracket").length) { return false; }
    // if (this.innerHTML.match(/(\(|\)|\[|\]|\{|\})/)) { debugger; }

    this.innerHTML = this.innerHTML.replace(/(\(|\)|\[|\]|\{|\})/g, function(str) {
      return `<span class='rd-bracket'>${str}</span>`;
    });
    $(this).addClass("rd-colorized");
  })

  var recordDepth = 0;
  var randomId;
  var randomIdds = [];
  $(RDBlock).find("span.rd-bracket").each(function(i) {
    if (this.className.includes("rd-id-")) { return false; }
    if (recordDepth == 0) { randomId = getRandomStr(); }
    if (["(", "[", "{"].includes(this.textContent)) {
      var color = colors[recordDepth % colors.length];
      var idd = getRandomStr(); randomIdds.push(idd);
      $(this).css("color", color);
      this.classList.add(`rd-id-${randomId}`);
      this.classList.add(`rd-idd-${idd}`);
      this.classList.add(`rd-depth-${recordDepth}`);
      // this.title = `rd-bk-id/depth:  ${randomId}/${recordDepth}`
      recordDepth++;
      // $(this).css("font-weight", "bolder");
    }
    if ([")", "]", "}"].includes(this.textContent)) {
      recordDepth--;
      var color = colors[recordDepth % colors.length];
      var idd = randomIdds.pop();
      $(this).css("color", color);
      this.classList.add(`rd-id-${randomId}`);
      this.classList.add(`rd-idd-${idd}`);
      this.classList.add(`rd-depth-${recordDepth}`);
      // this.title = `rd-bk-id/depth:  ${randomId}/${recordDepth}`
    }
  });
}

function findClosestElms(elm) {
  var matchingStr = elm.textContent;
  var matchingArr;
  switch(matchingStr) {
  case '(':
  case ')':
    matchingArr = ['(', ')'];
    break;
  case '[':
  case ']':
    matchingArr = ['[', ']'];
    break;
  case '{':
  case '}':
    matchingArr = ['{', '}'];
    break;
  }

  var classNames = elm.className.split(" ");
  var rdDepth = classNames.find(function(e) { return e.startsWith("rd-depth-") });
  var depthNum = rdDepth.split("-").pop();
  var rdId = classNames.find(function(e) { return e.startsWith("rd-id-") });
  var rdIdd = classNames.find(function(e) { return e.startsWith("rd-idd-") });
  var parentElm = elm.closest(".rd-colorized").parentElement;
  var cousinElms = $(parentElm).find(`span.${rdDepth}.${rdId}`).not(`span.${rdIdd}`).filter(function(ii) {
    return matchingArr.includes(this.textContent);
  });
  var brotherElms = $(parentElm).find(`span.${rdDepth}.${rdId}.${rdIdd}`).filter(function(ii) {
    return matchingArr.includes(this.textContent);
  });
  return [ brotherElms, cousinElms ];
}

/////// actions /////////
handler = function main() {
  RDBlocks.forEach(function(e) {
    if ($(e).length) { colorizing(e); }
  });

  $("span.rd-bracket").mouseover(function(i) {
    console.log(this.classList);
    var color = rgb2hex(this.style.color);
    if (color == "white") { return false };
    if (!color.length) { return console.log(`mouseover on an unexpected rd-bracket element: ${this.outerHTML}`); }
    [ brotherElms, cousinElms ] = findClosestElms(this);
    brotherElms.css("color", "white");
    brotherElms.css("background", color);
    cousinElms.css("background", "gainsboro");  // whitesmoke
  });

  $("span.rd-bracket").mouseleave(function(i) {
    var color = rgb2hex(this.style.backgroundColor);
    if (color == "transparent") { return false };
    if (!color.length) { return console.log(`mouseleave on an unexpected rd-bracket element: ${this.outerHTML}`); }
    [ brotherElms, cousinElms ] = findClosestElms(this);
    brotherElms.css("color", color);
    brotherElms.css("background", "transparent");
    cousinElms.css("background", "transparent");
  });
}

// $( handler );
$(document).ready(function() { $( handler ); }); // not working for a vuejs website
$(document).on('pjax:end', handler); // this line is mainly for github.com/*
