function slideMobile(){
    const wrapper = document.querySelector('[data-slide="wrapper"]');
    const lista = document.querySelector('[data-slide="lista"]');

    let distFinalPosition = 0;
    let distStartX = 0;
    let distMovement = 0;
    let distMovePosition = 0;

    let slideArray;

    let indexSlide;

    const prevElement = document.querySelector('[data-slide="prev"]');
    const nextElement = document.querySelector('[data-slide="next"]');

    let control;
    let controlArray;

    const changeEvent = new Event('changeEvent');


    function debounce(callback, delay) {
        let timer;
        return (...args) => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                callback(...args);
                timer = null;
            }, delay);
        };
    } 

    function transition(active){
        lista.style.transition = active ? 'transform .3s' : '';
    }

    function moveSlide(distX){
        distMovePosition = distX;
        lista.style.transform = `translate3d(${distX}px, 0, 0)`;
    }

    function updatePosition(clientX){
        distMovement = (distStartX - clientX) * 1.6;
        return distFinalPosition - distMovement;
    }

    function onStart(event){
        let movetype;

        if(event.type === 'mousedown'){
            event.preventDefault();
            distStartX = event.clientX;
            movetype = 'mousemove';
        }else{
            distStartX = event.changedTouches[0].clientX;
            movetype = 'touchmove';
        }
        wrapper.addEventListener(movetype, onMove);
        transition(false);
    }

    function onMove(event){
        const pointerPosition = (event.type === 'mousemove') ? event.clientX : event.changedTouches[0].clientX;
        const finalPosition = updatePosition(pointerPosition);
        moveSlide(finalPosition);
    }

    function onEnd(event){
        const movetype = (event.type === 'mouseup') ? 'mousemove' : 'touchmove';
        wrapper.removeEventListener(movetype, onMove);
        distFinalPosition = distMovePosition;
        transition(true);
        changeSlideOnEnd();
    }

    function changeSlideOnEnd(){
        if(distMovement > 120 && indexSlide.next !== undefined){
            activeNextSlide();
        }else if(distMovement < -120 && indexSlide.prev !== undefined){
            activePrevSlide();
        }else {
            changeSlide(indexSlide.active);
        }
    }

    function addSlideEvents(){
        wrapper.addEventListener('mousedown', onStart);
        wrapper.addEventListener('touchstart', onStart);
        wrapper.addEventListener('mouseup', onEnd);
        wrapper.addEventListener('touchend', onEnd);
    }

    /*Slides config*/

    function slidePosition(slide){
        const margin = (wrapper.offsetWidth - slide.offsetWidth) / 2;
        return -(slide.offsetLeft - margin);
    }

    function slidesConfig(){
        slideArray = [...lista.children].map((element) => {
            const position = slidePosition(element);

            return { position, element }
        });

        return slideArray;
    }

    function slidesIndexNav(index){
        const last = slideArray.length - 1;

        indexSlide = {
            prev: index ? index - 1 : undefined,
            active: index,
            next: index === last ? undefined : index + 1,
        }
    }

    function changeSlide(index){
        const activeSlide = slidesConfig()[index];
        moveSlide(activeSlide.position);
        slidesIndexNav(index);
        distFinalPosition = activeSlide.position;
        wrapper.dispatchEvent(changeEvent);
    }

    function activePrevSlide(){
        if(indexSlide.prev !== undefined){
            changeSlide(indexSlide.prev);
        }
    }

    function activeNextSlide(){
        if(indexSlide.next !== undefined){
            changeSlide(indexSlide.next);
        }
    }

    function onResize(){
        setTimeout(() => {
            slidesConfig();
            changeSlide(indexSlide.active);
        }, 200);
    }

    function addResizeEvent(){
        const debouncedOnResize = debounce(onResize, 200);

        window.addEventListener('load', onResize);
        window.addEventListener('resize', debouncedOnResize);
    }

    /*Slides config */

    /*Navega????o*/

    function addArrowEvent(){
        prevElement.addEventListener('click', activePrevSlide);
        nextElement.addEventListener('click', activeNextSlide);
    }

    function removeArrowEvent(){
        prevElement.removeEventListener('click', activePrevSlide);
        nextElement.removeEventListener('click', activeNextSlide);
    }

    /*Navega????o*/

    /*Pagina????o*/

    function createControl(){
        const control = document.createElement('ul');
        control.dataset.slide = 'control';
        const slideArray = slidesConfig();
        
        slideArray.forEach((item, index) => {
            control.innerHTML += `<li><a href="#slide${index + 1}">${index + 1}</a></li>`;
        });
        wrapper.appendChild(control);

        return control;
    }

    function eventControl(item, index) {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            changeSlide(index);
        });

        wrapper.addEventListener('changeEvent', activeControlItem);
    }

    function activeControlItem(){
        controlArray.forEach(item => item.classList.remove('ativar'));
        controlArray[indexSlide.active].classList.add('ativar');
    }

    function addControl(customControl){
        control = document.querySelector(customControl) || createControl();
        controlArray = [...control.children];

        controlArray.forEach((item, index) => {
            eventControl(item, index);
        });
    }

    addControl();

    /*Pagina????o*/

    /*Para o Slide funcionar somente no Mobile*/

    function addWindowEvents(){
        const debouncedIsMobile = debounce(isMobile, 200);

        window.addEventListener('load', isMobile);
        window.addEventListener('resize', debouncedIsMobile);
    }

    function removeSlideEvents(){
        wrapper.removeEventListener('mousedown', onStart);
        wrapper.removeEventListener('touchstart', onStart);
        wrapper.removeEventListener('mouseup', onEnd);
        wrapper.removeEventListener('touchend', onEnd);
    }

    function isMobile(){
        const windowWidth = window.innerWidth;
        const windowMobile = 420;

        if(windowWidth < windowMobile){
            addSlideEvents();
            changeSlide(0);
            addArrowEvent();
        }else{
            removeSlideEvents();
            changeSlide(1);
            removeArrowEvent();
        }
    }

    function init(){
        transition(true);
        addWindowEvents();
        slidesConfig();
        addResizeEvent();
    }

    init();

    /*Para o Slide funcionar somente no Mobile*/
}

slideMobile();