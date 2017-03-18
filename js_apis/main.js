(function () {



	var form = document['myForm'];

	form.onsubmit = function(event) {
		
		event.preventDefault();
		
		var options = this.multselect.options;
		var selected = [];
		for(var i=0; i < options.length; i++) {

			if(options[i].selected) {
				selected.push(options[i].value);
			}

		}
		console.log(selected);

	}
	function print(label, value) {
		console.log(label, ':', value);
	}
}());
