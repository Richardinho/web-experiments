
const triggerEl = document.getElementById('trigger');

triggerEl.addEventListener('click', () => {
	const containerEl = document.createElement('div');
	containerEl.className = 'container';
	const iframeEl = document.createElement('iframe');
	iframeEl.id = 'drawer';
	iframeEl.src = '/drawer/ribbon.html';
	containerEl.append(iframeEl);
	document.body.append(containerEl);
})
