import facts from "./facts";
import { degToRad, easeOutQuad } from "./utilities";



function changeYearAnimation(elem: HTMLElement, animationFrameId: any, targetValue: number, duration: number) {
	let startValue: number = parseInt(String(elem.textContent));
	let startTime: number = performance.now();

	function update(time: number) {
		let elapsed: number = time - startTime;
		let progress: number = Math.min(elapsed / duration, 1);
		let easedProgress: number = easeOutQuad(progress);
		let current: number = Math.round(startValue + (targetValue - startValue) * easedProgress);

		elem.textContent = String(current);

		if (progress < 1) {
			animationFrameId = requestAnimationFrame(update);
		} else {
			animationFrameId = null;
		}
	}

	animationFrameId = requestAnimationFrame(update);
}



function factroll() {
	document.querySelectorAll('.factroll').forEach((factroll) => {
		const yearStartElem = <HTMLElement>factroll.querySelector('.factroll__roll-year-start');
		let yearStartAnimationFrameId: any = null;
		const yearEndElem = <HTMLElement>factroll.querySelector('.factroll__roll-year-end');
		let yearEndAnimationFrameId: any = null;
		const switcherCurrentElem = <HTMLElement>factroll.querySelector('.factroll__switcher-title-current');
		const switcherTotalElem = <HTMLElement>factroll.querySelector('.factroll__switcher-title-total');
		switcherTotalElem.textContent = `0${facts.length}`;
		const switcherButtonLeftElem = <HTMLElement>factroll.querySelector('.factroll__switcher-button.left');
		const switcherButtonRightElem = <HTMLElement>factroll.querySelector('.factroll__switcher-button.right');

		// Circle
		const circleElem = <HTMLElement>factroll.querySelector('.factroll__roll-circle');
		circleElem.style.setProperty('--rot', '0deg');
		const circleTitleElem = <HTMLElement>factroll.querySelector('.factroll__roll-title');
		let circleTitleTimeout: any = null;
		let circleButtonElems: HTMLElement[] = [];
		const angleOffset = -60;
		facts.forEach((factSet, index) => {
			const button = document.createElement('button');
			button.classList.add('factroll__roll-circle-button', 'p-medium');
			button.dataset.index = String(index);
			button.dataset.text = String(index + 1);

			const angle = degToRad(360 / (facts.length) * index + angleOffset);
			button.style.left = `${(Math.cos(angle) + 1) / 2 * 100}%`;
			button.style.top = `${(Math.sin(angle) + 1) / 2 * 100}%`;

			circleElem.appendChild(button);
            circleButtonElems.push(button);
		});

		// Facts
		const swipersElem = <HTMLElement>factroll.querySelector('.factroll__swipers');
		let swiperElems: HTMLElement[] = [];
		let swiperTimeout: any = 0;
		facts.forEach((factSet) => {
			const swiperContainerElem = document.createElement('div');
			swiperContainerElem.classList.add('factroll__swiper', 'swiper-container', 'is-inactive');
			swiperContainerElem.innerHTML = `
				<div class="swiper">
					<div class="swiper-wrapper"></div>
				</div>
				<div class="swiper-button-prev"></div>
				<div class="swiper-button-next"></div>
				<div class="swiper-pagination"></div>
			`;

			const swipperWrapperElem = <HTMLElement>swiperContainerElem.querySelector('.swiper-wrapper');
			factSet.facts.forEach((fact) => {
				swipperWrapperElem.insertAdjacentHTML('beforeend', `
					<div class="swiper-slide">
						<p class="swiper-slide__title h3">${fact.year}</p>
						<p class="swiper-slide__text p-medium">${fact.text}</p>
					</div>
				`);
			})

			swipersElem.appendChild(swiperContainerElem);
			swiperElems.push(swiperContainerElem);
		})


		// Logic
		let activeFactSet: number;
		const rotationDuration: number = parseFloat(getComputedStyle(circleElem).getPropertyValue('--rot-duration')) * 1000;
		const transitionDuration: number = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--transition-duration')) * 1000;

		function setFactSet(index: number, immediately: boolean = false) {
			if (index === activeFactSet || index < 0 || index > facts.length - 1) {
				return;
			}

			//Years
			if (yearStartAnimationFrameId !== null) {
				cancelAnimationFrame(yearStartAnimationFrameId);
			}
			if (yearEndAnimationFrameId !== null) {
				cancelAnimationFrame(yearEndAnimationFrameId);
			}
			if (immediately) {
				yearStartElem.textContent = String(facts[index].yearStart);
				yearEndElem.textContent = String(facts[index].yearEnd);
			} else {
				changeYearAnimation(yearStartElem, yearStartAnimationFrameId, facts[index].yearStart, rotationDuration);
				changeYearAnimation(yearEndElem, yearEndAnimationFrameId, facts[index].yearEnd, rotationDuration);
			}

			// Circle title
			clearTimeout(circleTitleTimeout);
			if (immediately) {
				circleTitleElem.textContent = facts[index].name;
				circleTitleElem.classList.remove('is-inactive');
			} else {
				circleTitleElem.classList.add('is-inactive');
				circleTitleTimeout = setTimeout(() => {
					circleTitleElem.textContent = facts[index].name;
					circleTitleTimeout = setTimeout(() => {
						circleTitleElem.classList.remove('is-inactive');
					}, rotationDuration - transitionDuration);
				}, transitionDuration);
			}


			// Circle rotation
			const currentAngle = parseInt(circleElem.style.getPropertyValue('--rot'));
			let targetAngle = -360 / facts.length * index;
			targetAngle = ((targetAngle % 360) + 360) % 360 - 360;
  			targetAngle = targetAngle + 360 * Math.round((currentAngle - targetAngle) / 360);
			circleElem.style.setProperty('--rot', `${targetAngle}deg`);

			// Circle buttons
			if (activeFactSet != undefined) {
				circleButtonElems[activeFactSet].classList.remove('active');
			}
			circleButtonElems[index].classList.add('active');

			// Switcher
			switcherCurrentElem.textContent = `0${index + 1}`;
			if (index === 0) {
				switcherButtonLeftElem.classList.add('is-inactive');
				switcherButtonRightElem.classList.remove('is-inactive');
			} else {
				switcherButtonLeftElem.classList.remove('is-inactive');
				if (index === facts.length - 1) {
					switcherButtonRightElem.classList.add('is-inactive');
				} else {
					switcherButtonRightElem.classList.remove('is-inactive');
				}
			}

			// Swipers
			clearTimeout(swiperTimeout);
			if (activeFactSet != undefined) {
				swiperElems[activeFactSet].classList.add('is-inactive');
			}
			swiperElems[index].style.transform = 'translateY(40px)';
			swiperTimeout = setTimeout(() => {
				swiperElems[index].classList.remove('is-inactive');
				swiperElems[index].style.transform = 'translateY(0)';
			}, immediately ? 0 : rotationDuration - transitionDuration);

			activeFactSet = index;
		}

		setFactSet(0, true);

		switcherButtonLeftElem.addEventListener('click', () => {
			setFactSet(activeFactSet - 1);
		})

		switcherButtonRightElem.addEventListener('click', () => {
			setFactSet(activeFactSet + 1);
		})

		circleButtonElems.forEach((button) => {
			button.addEventListener('click', () => {
				setFactSet(Number(button.dataset.index));
			})
		})
	})
}

export default factroll;