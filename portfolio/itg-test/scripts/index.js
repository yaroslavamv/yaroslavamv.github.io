const header = document.querySelector('.main__content-header');

window.addEventListener('scroll', () => {
	header.classList.toggle('scrolled', header.getBoundingClientRect().top === 0);
});