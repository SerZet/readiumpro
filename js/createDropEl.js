'use strict';
(function () {
	window.createDragEl = function(arr) {
	//перемешиваем элементы задания
	let str = window.mixArray(arr.word);
	var classDropEl = {};
	classDropEl.dropItemBlock = arr.classes.dragElClass
	classDropEl.emptyBlock = arr.classes.dropZonaElClass
	classDropEl.dropZonaId = arr.classes.dropZonaBlockId
	classDropEl.dropDownId = arr.classes.dropDownBlockId
	console.log(classDropEl);
	for(let i=0; i<str.length; i++) {
		let div = document.createElement('div');
		for(let i=0; i<classDropEl.dropItemBlock.length; i++) {
			div.classList.add(classDropEl.dropItemBlock[i]);
		}
		let drop = document.createElement('div');
		for(let i=0; i<classDropEl.emptyBlock.length; i++) {
			drop.classList.add(classDropEl.emptyBlock[i]);
		}
		let img = document.createElement('img');
		img.setAttribute('src', '../img/test/char/'+ str[i].toLowerCase()+'.svg');
		img.setAttribute('alt', str[i]);
		div.appendChild(img);
		document.querySelector('#'+ classDropEl.dropZonaId).appendChild(div);
		document.querySelector('#'+ classDropEl.dropDownId).appendChild(drop);
		}
	}
})();