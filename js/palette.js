String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

$(document).ready(function(){
    var globals = Object.keys(window);
    for(var i = 0; i < globals.length; i++){
	console.log(globals[i]);
	if(globals[i].endsWith("_COLOR")){
	    var v = window[globals[i]];
	    $("#palette").append('<div id="'+v+'">'+globals[i]+': <input class="color" value="'+v.substring(1)+'"></div>');
	}
    }
});
