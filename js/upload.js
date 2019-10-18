'use strict';

(function () {
	//var url = '../main/server/endpoint/get_AJAX/users/SaveResultUser.php'

	window.upload = function(data, url, onSuccess) {
		var xhr = new XMLHttpRequest();
		xhr.ContentType ='application/json';
		xhr.responseType ='json';
		xhr.addEventListener('load', function() {
			onSuccess(xhr.response);
		});

		xhr.open('POST', url);
		xhr.send(data);
	};
})();