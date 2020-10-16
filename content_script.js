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
  "black"
]

function getRandomStr() {
  return Math.floor(Math.random() * 10000000000).toString();
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
    $(this).addClass("rd-colorized");

    if ($(this).find("span.RktPn").length) {
      $(this).find("span.RktPn").each(function(ii) {
        $(this).addClass("rd-bracket")
      });
    } else {
      this.innerHTML = this.innerHTML.replace(/\(|\)|\[|\]{|}/g, function(str) {
        return `<span class='rd-bracket'>${str}</span>`;
      });
    }
  })

  var colorized = [];
  var randomNum;
  $(RDBlock).find("span.rd-bracket").each(function(i) {
    if (this.className.includes(" rd-id-")) { return false; }
    if (!colorized.length) { randomNum = getRandomStr(); }

    if (this.textContent === "(") {
      var color = colors[colorized.length] || "red";
      var stripedColor = color.replace("#", "-").replace(" ", "-")
      $(this).css("color", color);
      this.classList.add(`rd-color-${stripedColor}`);
      this.classList.add(`rd-id-${randomNum}`);
      colorized.push(color);
      // $(this).css("font-weight", "bolder");
    };

    if (this.textContent === ")") {
      var color = colorized.pop() || "red";
      var stripedColor = color.replace("#", "-").replace(" ", "-");
      $(this).css("color", color);
      this.classList.add(`rd-color-${stripedColor}`);
      this.classList.add(`rd-id-${randomNum}`);
    };
  });

  var colorized = [];
  var randomNum;
  $(RDBlock).find("span.rd-bracket").each(function(i) {
    if (this.className.includes(" rd-id-")) { return false; }
    if (!colorized.length) { randomNum = getRandomStr(); }

    if (this.textContent === "[") {
      var color = colors[colorized.length];
      var stripedColor = color.replace("#", "-").replace(" ", "-")
      $(this).css("color", color);
      this.classList.add(`rd-color-${stripedColor}`);
      this.classList.add(`rd-id-${randomNum}`);
      colorized.push(color);
      // $(this).css("font-weight", "bolder");
    };

    if (this.textContent === "]") {
      let color = colorized.pop()
      let stripedColor = color.replace("#", "-").replace(" ", "-")
      $(this).css("color", color);
      this.classList.add(`rd-color-${stripedColor}`);
      this.classList.add(`rd-id-${randomNum}`);
    };
  });
}


/////// actions /////////
function findCousinElms(elm) {
}

const RDBlocks = [ "blockquote", ".SCodeFlow", "table.highlight" ]
RDBlocks.forEach(function(e) {
  if ($(e).length) { colorizing(e); }
});

$("span.rd-bracket").mouseover(function(i) {
  var color = rgb2hex(this.style.color);
  if (!color.length) { return console.log(`mouseover on an unexpected rd-bracket element: ${this.outerHTML}`); }

  var matchingStr = this.textContent;
  var classNames = this.className.split(" ");
  var rdColor = classNames.find(function(e) { return e.startsWith("rd-color-") });
  var rdId = classNames.find(function(e) { return e.startsWith("rd-id-") });

  var elm = this;
  var parentElm = elm.closest(RDBlocks.find(function(e) { return elm.closest(e); }));
  var cousinElms = $(parentElm).find(`span.${rdColor}.${rdId}`).filter(function(ii) {
    if (matchingStr === "(" || matchingStr === ")") {
      if (this.textContent === "(" || this.textContent === ")") {
        return true;
      }
    } else if (matchingStr === "[" || matchingStr === "]") {
      if (this.textContent === "[" || this.textContent === "]") {
        return true;
      }}});
  // elms.css("background", "whitesmoke");  // gainsboro

  cousinElms.css("color", "white");
  cousinElms.css("background", color);
});

$("span.rd-bracket").mouseleave(function(i) {
  var color = rgb2hex(this.style.background);
  if (!color.length) { return; }
  var matchingStr = this.textContent;
  var classNames = this.className.split(" ");
  var rdColor = classNames.find(function(e) { return e.startsWith("rd-color-") });
  var rdId = classNames.find(function(e) { return e.startsWith("rd-id-") });
  var RDBlock = RDBlocks.find(function(e) { return $(this).parents(e) })

  var elm = this;
  var parentElm = elm.closest(RDBlocks.find(function(e) { return elm.closest(e); }));
  var cousinElms = $(parentElm).find(`span.${rdColor}.${rdId}`).filter(function(ii) {
    if (matchingStr === "(" || matchingStr === ")") {
      if (this.textContent === "(" || this.textContent === ")") {
        return true;
      }
    } else if (matchingStr === "[" || matchingStr === "]") {
      if (this.textContent === "[" || this.textContent === "]") {
        return true;
      }}});
  // elms.css("background", "whitesmoke");  // gainsboro

  elms.css("color", color);
  elms.css("background", "transparent");
});
