var test = document.querySelector('.test');
//start-scr
var startScreen = document.querySelector('.test-wraper-start');
var btnStart = document.querySelector('#start-btn');
var startScreenContent = document.querySelector('.first-screen__text-top');
//test-scr
var testContent = document.querySelector('.test-wraper-2');
var table1 = testContent.querySelector('.table-letter');
var table2 = testContent.querySelector('.table-letter2');
var table3 = testContent.querySelector('.table-letter3');
var btn = document.querySelector('#test-abc');
var rotateContent = document.querySelector('.test-block__lesson-wrap');
var timerBlock = document.querySelector('.test-block__timers');
var timer = document.querySelectorAll('.test-timer');
var btnOverlay = document.querySelector('.btn-overlay');
//scrin-hint
var abcHint = document.querySelector('.hint-rotate');
var hintP = abcHint.querySelector('.hint-rotate__text');
var hintGreen = abcHint.querySelector('.text-green');
var hintContent = abcHint.querySelector('.text-blue');
var abcHintOk = document.querySelector('#adc-hint-ok');
//result-scr 
var testResult = document.querySelector('.test-wraper-result');
var btnResult = testResult.querySelector('#btn-result');
var resultBlock = testResult.querySelector('.result-block__text');
var arrBestRes = [];

//timer------------
var a = 0;
var b = 0;
var c = 0;
var d = 0;
var timeStep;
var timeResult = [];
var timerVal = 0;
var minute = 0;
var timerStart;
var t = ['Отлично! А теперь попробуй прочитать парами.', 'Хорошо! А теперь прочитай тройками))).'];
var tableContent1 = ['A','Б','В','Г','Д','Е','Ё','Ж','З','И','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Э','Ю','Я'];
var tableContent2 = ['ба','бо','бу','бы','бэ','бя','бё','бю','би','бе','ва','во','ву','вы','вэ','вя','вё','вю','ви','ве','га','го','гу','гы','гэ','гя','гё','гю','ги','ге'];
var tableContent3 = ['кра','кро','кру','кры','крэ','кря','крё','крю','кри','кре','лна','лно','лну','лны','лнэ','зля','злё','злю','зли','зле','мна','мно','мну','мны','мнэ','мня','мнё','мню','мни','мне'];
var table = document.querySelector('.table-letter');
var td = table.querySelectorAll('td');
console.log(btnStart);
function tableContent (arr) {
	for (var i=0; i<arr.length; i++) {
		td[i].textContent = arr[i];
	}
}
// timer start---------
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
	var time = parseInt(timeString[0]*60)+parseInt(timeString[4]+timeString[5]);
	timeResult.push(time);
}
console.log(timer[1]);
//AJAX UploadResult
function resultGoHome(timeStep,a) {
	var dateAbc ={
			id_user: '1',
			number_lesson: '1',
			number_example: '2',
			number_task: a,
			result_intervals : [timeStep],
			result_raitings: []
		}
		var dateUpload = JSON.stringify(dateAbc);
		var urlStepRes = 'https://echo.htmlacademy.ru';
 		window.upload(dateUpload, urlStepRes, function (response) {
			console.log(response);
		})
}
//step start-scr
btnStart.addEventListener('click',function() {
	startScreen.classList.add('hidden');
	testContent.classList.remove('hidden');
	timer[0].classList.add('test-timer--active');
	b = 0;
	c = 0;
	onTimer(b);
	if (a<4) {
		a++;
		switch(a) {
			case 2: 
			tableContent (tableContent2);
			table1.classList.add('table-letter2');
			table1.classList.remove('table-letter');
			
			break;
			case 3: 
			tableContent (tableContent3);
			timerBlock.removeChild(timer[timer.length-1]);
			table1.classList.add('table-letter3');
			table1.classList.remove('table-letter2');
			break;
		}
		console.log(a);
	}
});
function rotate() {
	rotateContent.classList.add('hidden');
	abcHint.classList.remove('hidden');
	btnOverlay.classList.remove('hidden');
};

btn.addEventListener('click', function() {
	if (b<5) {
		b++;
		switch(b) {
			case 1 : 
			rotateContent.style.transform = 'rotate(90deg)';
			rotate();
			hintContent.textContent = 'сверху-вниз';
			styleNextTimer(b);
			stopTimer(b);
			break;
			case 2 : 
			if (a==3) {
				rotateContent.style.transform = 'rotate(270deg)';
				hintContent.textContent = 'снизу-вверх';

			} else {
				rotateContent.style.transform = 'rotate(180deg)';
				hintContent.textContent = 'вверх ногами';
			}
			rotate();
			styleNextTimer(b);
			stopTimer(b);
			break;
			case 3 : 
			if (a == 3) {
				rotateContent.style.transform = 'rotate(360deg)';
				hintContent.textContent = 'на скорость';
			} else {
				rotateContent.style.transform = 'rotate(270deg)';
				hintContent.textContent = 'снизу-вверх';
			}
			rotate();
			styleNextTimer(b);
			stopTimer(b);
			break;
			case 4 : 
			if (a==3) {
				b++;
			}else {
				rotateContent.style.transform = 'rotate(360deg)';
				rotate();
				hintContent.textContent = 'на скорость';
				styleNextTimer(b);
				stopTimer(b);
				break;
			}
			default : 
			clearInterval(timerStart);
			if (a==3) {
				timeRes(b-1);
			} else {
				timeRes(b);
			}
			testResult.classList.remove('hidden');
			testContent.classList.add('hidden');
			var bestTime = Math.min.apply(null, timeResult);
			arrBestRes.push(bestTime);
			var resultMin ;
			var resultSec1;
			var resultSec2;
			if (a==1) {
				resultGoHome(bestTime,a)
				resultMin = Math.floor(arrBestRes[a-1]/60);
				resultSec = (arrBestRes[a-1]-resultMin*60);
				if (resultSec<10) {
					resultSec = '0' + resultSec;
				}
				resultBlock.textContent = resultMin+' : '+resultSec;
			}
			if (a==2) {
				resultGoHome(bestTime,a)
				resultMin = Math.floor(arrBestRes[a-1]/60);
				resultSec = (arrBestRes[a-1]-resultMin*60);
				if (resultSec<10) {
					resultSec = '0' + resultSec;
				}
				resultBlock.textContent = resultMin+' : '+resultSec;
			}
			if (a==3) {
				resultGoHome(bestTime,a)
				resultMin = Math.floor(arrBestRes[a-1]/60);
				resultSec = (arrBestRes[a-1]-resultMin*60);
				if (resultSec<10) {
					resultSec = '0' + resultSec;
				}
				resultBlock.textContent = resultMin+' : '+resultSec;
			}
			
			for (i = 0; i<timer.length; i++) {
				timerVal = '00';
				minute = 0;
				timer[i].textContent = minute + ' : ' + timerVal;
				timer[i].classList.add('disabled');
			};
			timer[0].classList.remove('disabled');
			timer[timer.length-1].classList.remove('test-timer--active');
			console.log(timer[4].innerHTML.split(''));
			console.log(timeResult);
			console.log(bestTime);
			timeResult.length = 0;
		};
	};
	if (a==1) {
		startScreenContent.textContent= t[0];
	} else if(a==2){
		startScreenContent.textContent= t[1];
	}
});

/*-----------------abcHintOk-------------------------------------------------*/

abcHintOk.addEventListener('click', function() {
	if(c<5) {
		c++;
		rotateContent.classList.remove('hidden');
		abcHint.classList.add('hidden');
		btnOverlay.classList.add('hidden');
		onTimer(c);
		console.log(c);
	}
});
/*----------------------btnResult---------------------------------------------*/
btnResult.addEventListener('click', function() {
	if (a==3) {
		location.replace('ball.html');
	} else {
		testResult.classList.add('hidden');
		startScreen.classList.remove('hidden');
	}
	
});
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
/*---------------------------------space----------------------------------*/
window.addEventListener('keypress', function(e) {
	if (e.charCode==32|| e.keyCode == 32 || e.which == 32) {
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
		if (modalHint.classList.contains('hidden')) {
			if (testContent.classList.contains('hidden')&&testResult.classList.contains('hidden')) {
				console.log('btnStart');
				btnStart.click();
			} else if (startScreen.classList.contains('hidden')&&testResult.classList.contains('hidden')&&abcHint.classList.contains('hidden')) {
				console.log('btn');
				abcHintOk.blur();
				btn.click();
				if(b==5&&b==4&&a==3) {
					resultGoHome(bestTime,a);
				}
			}else if (startScreen.classList.contains('hidden')&&testResult.classList.contains('hidden')&&rotateContent.classList.contains('hidden'))
			{ console.log('GGGGGGGGGGGGG');	
			btn.blur();
			abcHintOk.click();
		}else {
			btnResult.click();
		}
	}
	
}
});
/*--------------------------------------------------------------------------*/