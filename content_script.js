console.log("========from rainbow delimiters of content_script.js");
console.log(jQuery().jquery);


//// functions //////
const colors = [
  "#458588",
  "#b16286",
  "DarkSeaGreen",
  "IndianRed",
  "DarkOrchid",
  "SteelBlue",
  "#FF1493",
  "OliveDrab",
  "darkred",
  "#4c516d",
  "#7e5e60",
  "#666699",
  "#4a646c",
  "#5e644f",
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
  $(RDBlock).find("tr").each(function(i) {
    if (this.classList.contains("rd-colorized")) { return false; }
    // if (this.innerHTML.match(/(\(|\)|\[|\]|\{|\})/)) { debugger; }
    this.innerHTML = this.innerHTML.replace(/(\(|\)|\[|\]|\{|\})/g, function(str) {
      return `<span class='rd-bracket'>${str}</span>`;
    });
    $(this).addClass("rd-colorized");
  })

  var recordDepth = 0;
  var randomNum;
  $(RDBlock).find("span.rd-bracket").each(function(i) {
    if (this.className.includes("rd-id-")) { return false; }
    if (recordDepth == 0) { randomNum = getRandomStr(); }
    if (["(", "[", "{"].includes(this.textContent)) {
      var color = colors[recordDepth % colors.length];
      recordDepth++;
      var stripedColor = color.replace("#", "-").replace(" ", "-")

      $(this).css("color", color);
      this.classList.add(`rd-id-${randomNum}`);
      this.classList.add(`rd-depth-${recordDepth}`);
      this.title = `rd-bk-id/depth:  ${randomNum}/${recordDepth}`
      // $(this).css("font-weight", "bolder");
    }
    if ([")", "]", "}"].includes(this.textContent)) {
      recordDepth--;
      var color = colors[recordDepth % colors.length];
      var stripedColor = color.replace("#", "-").replace(" ", "-");

      $(this).css("color", color);
      this.classList.add(`rd-id-${randomNum}`);
      this.classList.add(`rd-depth-${recordDepth + 1}`);
      this.title = `rd-bk-id/depth:  ${randomNum}/${recordDepth}`
    }
  });
}

const RDBlocks = [ "blockquote", ".SCodeFlow", "table.highlight", "pre.code.highlight", "pre code" ]
function findCousinElms(elm) {
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
  var rdColor = classNames.find(function(e) { return e.startsWith("rd-color-") });
  var rdId = classNames.find(function(e) { return e.startsWith("rd-id-") });
  var parentElm = elm.closest(RDBlocks.find(function(e) { return elm.closest(e); }));
  var cousinElms = $(parentElm).find(`span.${rdDepth}.${rdId}`).filter(function(ii) {
    return matchingArr.includes(this.textContent);
    });
  return cousinElms;
}



/////// actions /////////
RDBlocks.forEach(function(e) {
  if ($(e).length) { colorizing(e); }
});

$("span.rd-bracket").mouseover(function(i) {
  var color = rgb2hex(this.style.color);
  if (!color.length) { return console.log(`mouseover on an unexpected rd-bracket element: ${this.outerHTML}`); }
  cousinElms = findCousinElms(this);
  cousinElms.css("color", "white");
  cousinElms.css("background", color);
  // cousinElms.css("background", "whitesmoke");  // gainsboro
});

$("span.rd-bracket").mouseleave(function(i) {
  var color = rgb2hex(this.style.background);
  if (!color.length) { return console.log(`mouseleave on an unexpected rd-bracket element: ${this.outerHTML}`); }
  cousinElms = findCousinElms(this);
  cousinElms.css("color", color);
  cousinElms.css("background", "transparent");
});



