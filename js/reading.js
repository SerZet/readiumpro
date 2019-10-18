'use strict';
(function () {
	var test = document.querySelector('.test');
	//start-scr---------------------------------------------------
	var startScreen = document.querySelector('.test-wraper-start');
	var btnStart = document.querySelector('#start-btn');
	//ready-scr-------------------------------------------------
	var readyScreen = document.querySelector('.test-wraper-ready');
	var btnReady = readyScreen.querySelector('#btn-ready');
	//content-scr----------------------------------------------
	var testContent = test.querySelector('#test-scr');
	var btnReading = test.querySelector('#test-reading');
	//timer-----------------------------------------------------
	var timer = testContent.querySelector('#timer');
	var time;
	var timerVal = 0;
	var minute = 0;
	var timerStart;
	var timeResult = [];
	var testResult;
	var str;
	var b = 0;
	var btnResult = document.querySelector('#btn-result');
	var content = 
	[
	{
		testCont: 'Петя и Маша были в гостях у Насти. Они вышли все вместе в сад и сели на траву. Настя взяла хлеба и масла. Они вместе ели, а после пели песни.',
		word: 29,
		question: 'Вопрос : Что ели дети?',
		posAns: ['хлеб с маслом', 'хлеб с колбасой', 'сосиски в тесте'],
		answer: 'хлеб с маслом'
	},
	{
		testCont:'Кот Мурзик был озорной. Однажды он сидел на дереве. Рядом села ворона. Мурзик прыгнул ей на спину. Он вцепился когтями в перья и замер. Ворона испугалась. Она полетела над дорожкой. Кот не удержался и упал. Ему повезло. Он провалился в пушистый снег.',
		word: 42,
		question: 'Вопрос : Как звали кота?',
		posAns: ['Мурзик', 'Пушистик', 'Мурка'],
		answer: 'Мурзик'
	},
	{
		testCont:'Пришла весна, потекла вода. Дети взяли дощечки, сделали лодочку, пустили лодочку по воде. Лодочка плыла, а дети бежали за нею, кричали и ничего впереди себя не видали, и в лужу упали.',
		word: 31,
		question: 'Вопрос : Какое время года описывается?',
		posAns: ['Лето', 'Весна', 'Осень'],
		answer: 'Весна'
	}
	]
	var dateRead ={
				id_user: 1,
				number_lesson: 1,
				number_example: 1,
				number_task: 1,
				result_intervals : [],
				result_raitings: []
			}
	function randomName(min, max) {
		var rand = Math.random()*(max-min)+min;
		return Math.round(rand);
	};
	var random = randomName(0, 2);

	function renderText() {
		testText.textContent = content[random].testCont;
		testQuestion.querySelector('p').textContent = content[random].question;
		for (var i=0; i<content[random].posAns.length; i++) {
			document.querySelectorAll('.possible-answer__item')[i].textContent = content[random].posAns[i];
		}
	}

	function onTimer() {
		timerStart = setInterval(function() {
			timerVal++
			if (timerVal < 10) {
				timerVal = '0' + timerVal;
			};
			if (timerVal%60 == 0) {
				timerVal = '00';
				minute++;
			}
			timer.textContent = minute + ' : ' + timerVal;
		}, 1000);
	}
	function stopTimer() {
		clearInterval(timerStart);
		timerVal = '00';
		minute = 0;
		timeRes();
	}
	function timeRes() {
		var timeString = timer.innerHTML.split('');
		time = parseInt(timeString[0]*60)+parseInt(timeString[4]+timeString[5]);
		timeResult.push(time);
		testResult = Math.round(content[random].word*60/time);
		if (testResult%10 == 1&&testResult!==11) {
					str = 'слово';
				} else if (testResult%10 == 2||testResult%10 == 3||testResult%10 == 4) {
					str = 'слова';
				} else {
					str = 'слов';
				}
	}
	test.addEventListener('click', function(e) {
	//---start-btn------------------------------------
	if (e.target.id == 'start-btn') {
		startScreen.classList.add('hidden');
		readyScreen.classList.remove('hidden');
	//---btn-ready------------------------------------
	} else if (e.target.id == 'btn-ready') {
		readyScreen.classList.add('hidden');
		testContent.classList.remove('hidden');
		onTimer();
		renderText();
	//---btn-reading-----------------------------------
	} else if (e.target.id == 'test-reading') {
		testContent.classList.add('hidden');
		testQuestion.classList.remove('hidden');
		stopTimer();
		dateRead.result_intervals.push(time);
		console.log(timeResult);
	} 
	});
	//test-answer----------------------------------
	var testText = document.querySelector('#test-text');
	var testQuestion = document.querySelector('#test-answer');
	var posAnsw = document.querySelectorAll('.possible-answer__item');
	//==================---------------
	var pa = document.querySelector('.possible-answer');
	var userAnsw = [];
	//qa--------------------------------------------
	function chooseAnsw(e) {
		userAnsw.push(e.target.innerHTML);
		for (var i=0; i<posAnsw.length; i++) {
			if (posAnsw[i].innerHTML==e.target.innerHTML) {
				posAnsw[i].classList.add('possible-answer__item-active');
			}
		}
	}

	function checkAnsw() {
		var erroeAnsw = 0;
		var goodAnsw = 0;
		for (var i=0; i<posAnsw.length; i++) {
			posAnsw[i].classList.remove('possible-answer__item-active');
			if (posAnsw[i].innerHTML==content[random].answer) {
				posAnsw[i].classList.add('possible-answer__item-good');
				console.log(content[random].answer);
			};
		};
		if(userAnsw.includes(content[random].answer)) {
			goodAnsw++;
			dateRead.result_raitings.push(0);
		} else {
			erroeAnsw++;
			dateRead.result_raitings.push(1);
		}
		if (erroeAnsw>0) {
			for (var i=0; i<userAnsw.length; i++) {
				for (var j=0; j<posAnsw.length; j++) {
					if (posAnsw[j].innerHTML==userAnsw[i]) {
						posAnsw[j].classList.add('possible-answer__item-err');
					};
				}
			}
		}

	}
	var resScreen = document.querySelector('#result-block');
	var resScreenText = document.querySelector('#result-text');
	function results() {
		testQuestion.classList.add('hidden');
		resScreen.classList.remove('hidden');
		resScreenText.textContent = testResult +' '+ str+' в минуту';
	}
	//---------------------------------------------------
	pa.addEventListener('mousedown', function(e) {
		console.log(e.which)
		if(e.which==1 && e.target.localName == 'span') {
			if (userAnsw.length<1) {
				chooseAnsw(e);
			};
			if (userAnsw.length==1) {
				var b = 0;
				console.log(userAnsw.length);
				setTimeout(checkAnsw, 1000);
				setTimeout(results, 2000);
			}
		}
	});
	btnResult.addEventListener('click', function() {
		location.replace('test-timer.html');
	})
	window.addEventListener('keypress', function(e) {
		if (e.charCode==32|| e.keyCode == 32 || e.which == 32) {
			e.preventDefault ? e.preventDefault() : e.returnValue = false;
			if (startScreen.classList.contains('hidden')==false) {
				btnStart.click();
			} else if (readyScreen.classList.contains('hidden')==false) {
				btnReady.click();
			}else if (resScreen.classList.contains('hidden')==false) { 
				btnResult.click();
			}
			else if (testContent.classList.contains('hidden')==false) { 
				btnReading.click();
			}
		}
	});	
})();

