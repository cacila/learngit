const caseClickHandler = function caseClickHandlerFunction (event) {
	if (event.target.classList.length > 1) return;
	caseOne.classList.toggle('active');
	caseTwo.classList.toggle('active');
}

const touchStart = function touchStartHandler (event) {
	event.preventDefault();
	touchFirst = event.changedTouches[0];
}

const touchEnd = function touchEndHandler (event) {
	event.preventDefault();
	let touchEnd = event.changedTouches[0];
	if (touchEnd.clientX - touchFirst.clientX < -50) {
		head.scrollLeft = head.scrollLeft + (head.scrollWidth / sumImg) > (head.scrollWidth - (head.scrollWidth / sumImg)) ? 0 : head.scrollLeft + (head.scrollWidth / sumImg);
		nowImg = nowImg + 1 <= 9 ? nowImg + 1 : 1;
		imgMessage.textContent = `${nowImg}/${sumImg}`;
	} else if (touchEnd.clientX - touchFirst.clientX > 50) {
		head.scrollLeft = head.scrollLeft - (head.scrollWidth / sumImg) < 0 ? head.scrollWidth : head.scrollLeft - (head.scrollWidth / sumImg);
		nowImg = nowImg - 1 >= 1 ? nowImg - 1 : 9;
		imgMessage.textContent = `${nowImg}/${sumImg}`; 
	} 
}

const caseOne = document.querySelector('.rent-buy');
const caseTwo = document.querySelector('.buy');
const imgMessage = document.querySelector('.img-message');
const head = document.querySelector('.head');
const sumImg = 9;
let touchFirst;
let nowImg = 1;

caseOne.addEventListener('click', caseClickHandler);
caseTwo.addEventListener('click', caseClickHandler);

head.addEventListener('touchstart', touchStart);
head.addEventListener('touchend', touchEnd);