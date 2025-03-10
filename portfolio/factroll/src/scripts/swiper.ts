import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

function swiperInit() {
	const swiperElems = document.querySelectorAll('.swiper-container');
	swiperElems.forEach((item, index) => {
		const swiperContainerElem = item as HTMLElement;
		const swiperElem = <HTMLElement>swiperContainerElem.querySelector('.swiper');
		const buttonLeftElem = <HTMLElement>swiperContainerElem.querySelector('.swiper-button-prev');
		const buttonRightElem = <HTMLElement>swiperContainerElem.querySelector('.swiper-button-next');
		const paginationtElem = <HTMLElement>swiperContainerElem.querySelector('.swiper-pagination');

		const id = String(index);

		swiperElem.dataset.id = id;
		buttonLeftElem.dataset.id = id;
		buttonRightElem.dataset.id = id;
		paginationtElem.dataset.id = id;

		const swiper = new Swiper(`.swiper[data-id="${id}"]`, {
			modules: [Navigation, Pagination],
			slidesPerView: 'auto',
			spaceBetween: 50,
			navigation: {
				prevEl: `.swiper-button-prev[data-id="${id}"]`,
				nextEl: `.swiper-button-next[data-id="${id}"]`,
			},
			pagination: {
				el: `.swiper-pagination[data-id="${id}"]`,
				clickable: true,
			},
			freeMode: true,
			mousewheel: true,
			grabCursor: true,
		});
	});
}

export default swiperInit;