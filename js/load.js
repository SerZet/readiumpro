'use strict';
(function() {
	var url ='main/server/endpoint/get_AJAX/users/SaveResultUser'
	var param = {"id":"111",""}
	window.load = function(onSuccess, onError) {
		var xhr = new XMLHttpRequest();
		xhr.responseType ='json';

		xhr.open('GET', url);
		xhr.addEventListener('load', function() {
			onSuccess(xhr.response);
		});
		data:param;
		xhr.send(data);
	};
})();