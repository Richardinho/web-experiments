const toggleBtn = document.querySelector('#toggle-button');

let flag = false;
const foo = document.getElementById('foo');

function update() {
	flag = !flag;

	if (flag) {
		foo.style.background = 'red';
		foo.style.width = '50px';
		foo.style.height = '50px';
	}
	else {
		foo.style.background = 'blue';
		foo.style.width = '100px';
		foo.style.height = '100px';
	}
}

toggleBtn.addEventListener('click', () => {
	document.startViewTransition(() => update());
})
