'use strict'

let Rx = rxjs;
let operators = rxjs.operators;

var mybtn = document.querySelector('#mybtn');
mybtn.addEventListener('click', action)

function action() {
	const myStream1 = new Rx.Observable(observer => {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', '/files/test.html', true);
		xhr.send();
		xhr.onreadystatechange = (() => {
			if(xhr.readyState == 4 && xhr.status == 200) {
				setTimeout(() => {
					observer.next(xhr.responseText);
					observer.complete();
				}, 1000);
			}
		})
	});

	const myStream2 = new Rx.Observable(observer => {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', '/files/users.json', true);
		xhr.send()
		xhr.onreadystatechange = (() => {
			if(xhr.readyState == 4 && xhr.status == 200) {
				setTimeout(() => {
					observer.next(xhr.responseText);
					observer.complete();
				}, 3000);
			}
		})
	});

	const combined = Rx.combineLatest(myStream1, myStream2);

	combined.subscribe(all => {
		console.log(all);
		var div = createList(...all);
		document.body.append(div);
	});
}

// или устаревший operators.combineLatest:

/*function action() {

	const myStream1 = new Rx.Observable(observer => {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', '/files/users.json', true);
		xhr.send()
		xhr.onreadystatechange = (() => {
			if(xhr.readyState == 4 && xhr.status == 200) {
				setTimeout(() => {
					observer.next(xhr.responseText);
					observer.complete();
				}, 4000);
			}
		})
	})

	const myStream2 = new Rx.Observable(observer => {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', '/files/test.html', true);
		xhr.send()
		xhr.onreadystatechange = (() => {
			if(xhr.readyState == 4 && xhr.status == 200) {
				setTimeout(() => {
					observer.next(xhr.responseText);
				}, 1000);
			}
		})
	}).pipe(operators.combineLatest(myStream1))

	myStream2.subscribe(res => {
		console.log(res);
		var div = createList(...res);
		document.body.append(div);
	});
}*/

function createList(data1, data2) {
	let div = document.createElement('div');
	let ul = document.createElement('ul');
	var arrUsers = JSON.parse(data2);
	for(var j = 0; j < arrUsers.length; j++) {
		ul.innerHTML += '<li>' + arrUsers[j].name + ' ' + arrUsers[j].surname + '</li>';
	}
	div.innerHTML = data1;
	div.append(ul);
	return div;
}
