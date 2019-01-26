function menuChange (event) {
  const img = this.querySelector('div');
  const p = this.querySelector('p');
  if (img.classList.length > 1) return;
  const oldImg = document.querySelector('.menu div.active');
  const oldP = document.querySelector('.menu p.active');
  oldImg.classList.remove('active');
  oldP.classList.remove('active');
  img.classList.add('active');
  p.classList.add('active');
}

function listChange (event) {
  if (this.classList.length > 0) { 
  	return;
  }
	
  if (headerClass.length > 0) {
    headerClass.remove(header.classList[0]);
  }
  
  const old = document.querySelector('.select ul li.active');
  old.classList.remove('active');
  this.classList.add('active');
  if (this == changeList[0]) { 
		now = 0;
		return;
  } else if (this === changeList[1]) {
		now = 1;
		headerClass.add('one');
  } else if (this === changeList[2]) {
		now = 2;
		headerClass.add('two');
  } else if (this === changeList[3]) {
		now = 3;
		headerClass.add('three');
  }
}

const changeList = document.querySelectorAll('.select ul li');
const classList = ['','one','two','three'];
const header = document.querySelector('header');
const headerClass = header.classList;
const menuList = document.querySelectorAll('.menu');
let now = 0;

menuList.forEach((node) => {
  node.addEventListener('click',menuChange);
});

changeList.forEach((node) => {
  node.addEventListener('click',listChange);
});

setInterval(() => { 
  if (now > 3) {
		now = 0;  
  }
  
  changeList[now].classList.remove('active');
  if (now != 0) {	  
    headerClass.remove(headerClass[0]);		  
  }
  
  now = now+1 > 3 ? 0 : now+1;
  changeList[now].classList.add('active');
  if (now != 0) {	  
    headerClass.add(classList[now]);	  
  }		
},3000);