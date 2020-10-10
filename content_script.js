
console.log("========from content_script.js");
console.log("========from content_script.js");
console.log("========from content_script.js");
console.log("========from content_script.js");

$('a').filter(function(){
    return this.host !== location.host
}).attr('target','_blank');
