console.log("========loading Rainbow Delimiters from content_script.js");
console.log(jQuery().jquery);

const colors = [
  // "#458588",
  // "#b16286",
  // "DarkSeaGreen",
  // "IndianRed",
  // "DarkOrchid",
  // "#FF1493",
  // "SteelBlue",
  // "OliveDrab",
  // "darkred",
  // "#4c516d",
  // "#7e5e60",
  // "#666699",
  // "#4a646c",
  // "#5e644f"

  //// https://flaviocopes.com/rgb-color-codes/
  /// Light
  "LightSalmon",
  "gold",
  "DarkKhaki",
  "GreenYellow",
  "DarkSeaGreen",
  "turquoise",
  "LightBlue",
  "thistle",
  "violet",
  "wheat",
  "tan",
  "LightSteelBlue",
  "lavender"

  /// Dark
  // "DarkRed",
  // "DarkGoldenRod",
  // "DarkOliveGreen",
  // "DarkSlateGray",
  // "MidnightBlue",
  // "DarkSlateBlue",
  // "SaddleBrown",
  // "DarkMagenta",
  // "RosyBrown"

  // "firebrick",
  // "DarkGoldenRod",
  // "Olive",
  // "DarkSlateGray",
  // "CadetBlue",
  // "indigo",
  // "SaddleBrown",
  // "RosyBrown",
  // "SlateGray"

  // "DarkRed",
  // "firebrick",
  // "crimson",
  // "red",
  // "tomato",
  // "coral",
  // "IndianRed",
  // "LightCoral",
  // "DarkSalmon",
  // "Salmon",
  // "LightSalmon",
  // "orangeRed",
  // "DarkOrange",
  // "orange",
  // "gold"

  //// https://www.color-hex.com/color/ff0000
  // "#350000",
  // "#4c0000",
  // "#470000",
  // "#580000",
  // "#660000",
  // "#990000",
  // "#6b0000",
  // "#7c0000",
  // "#580000",
  // "#7f0000"
]

//// functions //////
const RDBlocks = [];
if (location.href.match(/(docs\.racket-lang\.org|file:\/\/\/.*\/Racket.*\/doc\/.*|file:\/\/\/.*racket.*doc)/)) {
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
    //TODO: this.innerHTML = this.innerHTML.replace(/<span class="RktPn">(\(|\)|\[|\]|\{|\})<\/span>/g, function(str) {  let bracket = str.match(/(\(|\)|\[|\]|\{|\})/); return `<span class='RktPn rd-bracket'>${str}</span>`; });
    if (location.href.match(/(docs\.racket-lang\.org|file:\/\/\/.*\/Racket.*\/doc\/.*)/)) {
      $(this).find("span").each(function(i) {
        if (this.innerText.match(/(\(|\)|\[|\]|\{|\})/g)) {
          this.innerHTML = this.innerHTML.replace(/(\(|\)|\[|\]|\{|\})/g, function(str) {
            return `<span class='rd-bracket'>${str}</span>`;
          });
        }
      });
    } else {
      this.innerHTML = this.innerHTML.replace(/(\(|\)|\[|\]|\{|\})/g, function(str) {
        return `<span class='rd-bracket'>${str}</span>`;
      });
    }

    $(this).addClass("rd-colorized");
  })

  let recordDepth = 0;
  let randomId;
  let randomIdds = [];
  $(RDBlock).find("span.rd-bracket").each(function(i) {
    if (this.className.includes("rd-id-")) { return false; }
    if (recordDepth == 0) { randomId = getRandomStr(); }

    if (["(", "[", "{"].includes(this.textContent)) {
      let color;
      if ($(this).parent()[0].className === "RktVal") {
        color = "#228b22";
      } else if ($(this).parent()[0].className === "RktRes") {
        color = "#0000af";
      } else if ($(this).parent()[0].className === "RktOpt") {
        color = "black";
      } else if ($(this).parent()[0].className === "RktErr") {
        color = "red";
      } else {
        color = colors[recordDepth % colors.length];
      };

      let idd = getRandomStr(); randomIdds.push(idd);
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

      let color;
      if ($(this).parent()[0].className === "RktVal") {
        color = "#228b22";
      } else if ($(this).parent()[0].className === "RktRes") {
        color = "#0000af";
      } else if ($(this).parent()[0].className === "RktErr") {
        color = "red";
      } else {
        color = colors[recordDepth % colors.length];
      };

      let idd = randomIdds.pop();
      $(this).css("color", color);
      this.classList.add(`rd-id-${randomId}`);
      this.classList.add(`rd-idd-${idd}`);
      this.classList.add(`rd-depth-${recordDepth}`);
      // this.title = `rd-bk-id/depth:  ${randomId}/${recordDepth}`
    }
  });
}

function findClosestElms(elm) {
  let matchingStr = elm.textContent;
  let matchingArr;
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

  let classNames = elm.className.split(" ");
  let rdDepth = classNames.find(function(e) { return e.startsWith("rd-depth-") });
  let depthNum = rdDepth.split("-").pop();
  let rdId = classNames.find(function(e) { return e.startsWith("rd-id-") });
  let rdIdd = classNames.find(function(e) { return e.startsWith("rd-idd-") });
  let parentElm = elm.closest(".rd-colorized").parentElement;
  let cousinElms = $(parentElm).find(`span.${rdDepth}.${rdId}`).not(`span.${rdIdd}`).filter(function(ii) {
    return matchingArr.includes(this.textContent);
  });
  let brotherElms = $(parentElm).find(`span.${rdDepth}.${rdId}.${rdIdd}`).filter(function(ii) {
    return matchingArr.includes(this.textContent);
  });
  return [ brotherElms, cousinElms ];
}

/////// actions /////////
function initRD() {
  RDBlocks.forEach(function(e) {
    if ($(e).length) { colorizing(e); }
  });

  $("span.rd-bracket").mouseover(function(i) {
    console.log(this.classList);
    let color = rgb2hex(this.style.color);
    if (color == "white") { return false };
    if (!color.length) { return console.log(`mouseover on an unexpected rd-bracket element: ${this.outerHTML}`); }
    [ brotherElms, cousinElms ] = findClosestElms(this);
    brotherElms.css("color", "white");
    brotherElms.css("background", color);
    cousinElms.css("background", "#E0E0E0");  // whitesmoke gainsboro
  });

  $("span.rd-bracket").mouseleave(function(i) {
    let color = rgb2hex(this.style.backgroundColor);
    if (color == "transparent") { return false };
    if (!color.length) { return console.log(`mouseleave on an unexpected rd-bracket element: ${this.outerHTML}`); }
    [ brotherElms, cousinElms ] = findClosestElms(this);
    brotherElms.css("color", color);
    brotherElms.css("background", "transparent");
    cousinElms.css("background", "transparent");
  });
}


$(document).ready(function() {  // not working for a vuejs website
  initRD();
});
$(document).on('pjax:end', initRD); // this line is mainly for github.com/*
