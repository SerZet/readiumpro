'use strict';
(function () {
		function randomName(min, max) {
			var rand = Math.random()*(max-min)+min;
			return Math.round(rand);
		};
		function randomArr(len, min, max) {
			var arr = []                 
			var len;               
			var rundomnumber;            

			while (arr.length <= len-1) {
				rundomnumber = randomName(min,max); 
				if (arr.indexOf(rundomnumber) == -1) { 
					arr.push(rundomnumber);        
				};
				console.log(arr)
			};
			return arr;
		};
		window.mixArray = function(arr) {
			var array = [];
			var randomIndex = randomArr(arr.length, 0, arr.length-1);
			for (var i = 0; i<randomIndex.length; i++) {
				array[array.length] = arr[randomIndex[i]];
			}
			return array;
		};
})();