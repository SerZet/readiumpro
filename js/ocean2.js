'use strict';
(function () {
	const arr = {
		id_user: '1232321',
		number_lesson:'1',
		number_example: '2',
		number_task: '5',
		//массив вариантов задания
		words: ["ОКЕАН", "ТЕАТР", "КРЫША", "ЗАВОД", "МАЙОР"],
		classes: {
		//классы  перетаскиваемых элементов
		dragElClass:['drop-down-block__item','btn'],
		//классы дроп элементов
		dropZonaElClass:['drop-zona__items'],
		//id дроп зоны
		dropZonaBlockId:'words',
		//id драг зоны
		dropDownBlockId:'drop-zona'
	}
	}
	let b = 0;
	var wordsnumber = 0;//номер слова
	window.mixArray(arr.words);
	arr.word = arr.words[wordsnumber];
	const href = "img/";
	let startScreen = document.querySelector('.test-wraper-start');
	let btnStart = document.querySelector('#start-btn');
	let testContent = document.querySelector('#test-content');
	let testRes = document.querySelector('#result-scr');
	//--createWord----------------------------------

	window.createDragEl(arr);
	//-----------------------------------------------
	var dragZon=document.querySelectorAll('.drop-down-block__item');

	//----dragStart---------------
	let dragSrcEl = null;
	function handleDragStart(evt) {
		console.log('start');
		dragSrcEl = this;
		console.log(dragSrcEl);
		evt.dataTransfer.effectAllowed = 'move';
		evt.dataTransfer.setData('text', this.innerHTML);
		console.log(evt.dataTransfer);
		return false;
	}

	var letters = document.querySelectorAll('.drop-zona__items');
	[].forEach.call(letters, function(letter) {
		letter.addEventListener('dragstart', handleDragStart, false);

		letter.addEventListener('dragover', handleDragOver, false);

		letter.addEventListener('drop', handleDrop, false);

	});
	var d = document.querySelectorAll('.drop-down-block__item');
	[].forEach.call(d, function(letter) {
		letter.addEventListener('dragstart', handleDragStart, false);

		letter.addEventListener('dragover', handleDragOver, false);

		letter.addEventListener('drop', handleDrop, false);

	});
	//----dragOver-------
	function handleDragOver(e) {
		if (e.preventDefault) {
			e.preventDefault();
		}
		e.dataTransfer.dropEffect = 'move';
		return false;
	}
	//----dragEnter------
	function handleDragEnter(e) {
		this.classList.contains('over')
		this.classList.add('over');
	}
	//----dragLeave-------
	function handleDragLeave(e) {
		this.classList.remove('over');
	}
	//----drop-------------
	function handleDrop(e) {
		console.log('drop');
		e.preventDefault();
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		console.log(dragSrcEl);
		if (dragSrcEl != this) {
			dragSrcEl.innerHTML = this.innerHTML;
			this.innerHTML = e.dataTransfer.getData('text');
		}
		return false;
	}
	//----dragEnd-------------------
	function handleDragEnd(e) {
		this.classList.remove('over');
	}
	var wor = document.querySelector('#words');
	var drz = document.querySelector('#drop-zona');
	var tit = document.querySelector('.dropdown-block__title');
	var nex = document.querySelector('.next-task-text');
	var ddi = document.querySelectorAll('.drop-down-block__item');
	document.querySelector('#btn').addEventListener('click', checkWord);
	function resultGoHome (time, step) {
		var dateOcean ={
				id_user: '1',
				number_lesson: '1',
				number_example: '5',
				number_task: step +'',
				result_intervals : [time],
				result_raitings: [step]
			}
		var dateUpload = JSON.stringify(dateOcean);
		var urlStepRes = 'https://echo.htmlacademy.ru';
		window.upload(dateUpload, urlStepRes, function (response) {
			console.log(response);
		})
	}
	function checkWord(e) {
		const userAnsw = [];
		const answWord = document.querySelectorAll('.drop-zona__items');
		function checkEmptyItem(call) {
			let empty = false;
			answWord.forEach(function(el){
				if(el.firstChild==null) {
					el.classList.add('red-border')
					empty = true;
					setTimeout(function() {
						el.classList.remove('red-border')
					}, 1000, el);
				}
			})
			if (empty==false) {
				call();
			}	
		}
		checkEmptyItem(checkWordItem);
		function checkWordItem() {
			var goodWord=true;
			for(let i=0; i<arr.word.length; i++) {
				if(answWord[i].firstChild==null) break;
				userAnsw.push(answWord[i].firstChild.alt);
				var ua = userAnsw.join('');
				console.log('gggg'+' '+answWord[i].firstChild.alt);

				if(answWord[i].firstChild.alt!==arr.word[i]) {
					goodWord=false;
					answWord[i].classList.add('red-border')
					setTimeout(function(i) {
						answWord[i].classList.remove('red-border')
						const img = answWord[i].querySelector('img')
						console.log(img)
						answWord[i].removeChild(img);
						dragZon[i].appendChild(img);
					}, 1000, i);
				} else {
					answWord[i].classList.add('green-border')
					setTimeout(function(i) {
						answWord[i].classList.remove('green-border')
					}, 1000, i);
				}
			}
			if(goodWord==true&&wordsnumber<arr.words.length-1&&nex.classList.contains('hidden')) {
				b++;
				stopTimer(b);
				resultGoHome (time, b);
				setTimeout(function() {
					drz.classList.add('hidden');
					tit.classList.add('hidden');
					nex.classList.remove('hidden');
				}, 1000);
			} else if(wordsnumber<arr.words.length-1&&drz.classList.contains('hidden')) {
				wordsnumber++;
				arr.word = arr.words[wordsnumber];
				answWord.forEach(function(el){
					el.innerHTML='';
					el.classList.remove('green-border');
				});
				let str = window.mixArray(arr.word);
				for(let i=0; i<str.length; i++) {
					let img = document.createElement('img');
					img.setAttribute('src', '../img/test/char/'+ str[i].toLowerCase()+'.svg');
					img.setAttribute('alt', str[i]);
					ddi[i].appendChild(img);
				}
				if (b<5) {
					onTimer(b);
					styleNextTimer(b);
				}
				drz.classList.remove('hidden');
				tit.classList.remove('hidden');
				nex.classList.add('hidden');
			} else if(wordsnumber==arr.words.length-1&&b==4&&goodWord==true){
				testContent.classList.add('hidden');
				testRes.classList.remove('hidden');
				resultGoHome (time, b+1)
			}
			console.log('Ggaa'+' '+goodWord);
			console.log('aaa'+' '+ua);
		}
		console.log(document.querySelectorAll('.drop-zona__items'))
	}
	console.log(document.querySelectorAll('#words img'))
	//timers
	let timer = document.querySelectorAll('.test-timer');
	let timeResult = [];
	let timerVal = 0;
	let minute = 0;
	let timerStart;
	let time;
	function onTimer(arg) {
		timerStart = setInterval(function() {
			timerVal++
			if (timerVal < 10) {
				timerVal = '0' + timerVal;
			};
			if (timerVal%60 == 0) {
				timerVal = '00';
				minute++;
			}
			timer[arg].textContent = minute + ' : ' + timerVal;
		}, 1000);
	}
	function stopTimer(arr) {
		clearInterval(timerStart)
		timerVal = '00';
		minute = 0;
		timeRes(arr);
	}
	//end timer-----------
	function styleNextTimer(arg) {
		timer[arg-1].classList.remove('test-timer--active');
		timer[arg].classList.remove('disabled');
		timer[arg].classList.add('test-timer--active');
	}
	//Test results
	function timeRes(arg) {
		var timeString = timer[arg-1].innerHTML.split('');
		time = parseInt(timeString[0]*60)+parseInt(timeString[4]+timeString[5]);
		timeResult.push(time);
	}
	//step start


	btnStart.addEventListener('click',function() {
		startScreen.classList.add('hidden');
		testContent.classList.remove('hidden');
		timer[0].classList.add('test-timer--active');
		onTimer(b);
	});
	//step word
	let btn = document.querySelector('#btn');
	btn.addEventListener('click', function() {

	})
	//modal-hint
	//modalHint
	var modalHint = document.querySelector('.modal-hint');
	var openHint = document.querySelector('#modal-hint');
	var closeHint = document.querySelector('.hint-btn');
	var hintOver = document.querySelector('.overlay');
	openHint.addEventListener('click', function() {
		modalHint.classList.remove('hidden');
		hintOver.classList.remove('hidden')
	});
	closeHint.addEventListener('click', function() {
		modalHint.classList.add('hidden');
		hintOver.classList.add('hidden');

	});
})()
