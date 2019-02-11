var animate = document.querySelector('button');
var action = document.querySelectorAll('button')[1];
var div = document.querySelector('div');

animate.addEventListener('click', () => {
	console.log('animation has been clicked')
	if(div.className == 'blue') {
		div.className = 'green';
	} else {
		div.className = 'blue';
	}
})

action.addEventListener('click', () => {
	noBlock(0, 10000); //клики работают
	//block(0, 80000); //демонстрация блокировки кликов
})

var arr = [];
var str = 'text'

function noBlock(from, to) {
	if(from == 0) {
		console.log('START');
	}
	if(from == 80000) {
		console.log('THE END');
		return;
	}
	for(var i = from; i < to; i++) {
		arr.unshift(i + str);
		//console.log(i);
		if(i == to - 1) {
			setTimeout(() => {
				noBlock(from + 10000, to + 10000);
			}, 1000)
		}
	}
}

function block(from, to) {
	console.log('START');
	for(var i = from; i < to; i++) {
		arr.unshift(i + str);
		//console.log(i);
	}
	console.log('THE END');
}