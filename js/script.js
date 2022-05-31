function slideMobile(){
    const wrapper = document.querySelector('[data-slide="wrapper"]');
    const lista = document.querySelector('[data-slide="lista"]');

    let distFinalPosition = 0;
    let distStartX = 0;
    let distMovement = 0;
    let distMovePosition = 0;

    function moveSlide(distX){
        distMovePosition = distX;
        lista.style.transform = `translate3d(${distX}px, 0, 0)`;
    }

    function updatePosition(clientX){
        distMovement = (distStartX - clientX) * 1.6;
        return distFinalPosition - distMovement;
    }

    function onStart(event){
        event.preventDefault();
        distStartX = event.clientX;
        console.log(distStartX);
        wrapper.addEventListener('mousemove', onMove);
    }

    function onMove(event){
        const finalPosition = updatePosition(event.clientX);
        moveSlide(finalPosition);
    }

    function onEnd(event){
        wrapper.removeEventListener('mousemove', onMove);
        distFinalPosition = distMovePosition;
    }

    function addSlideEvents(){
        wrapper.addEventListener('mousedown', onStart);
        wrapper.addEventListener('mouseup', onEnd);
    }

    /*Para o Slide funcionar somente no Mobile*/
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

    function addWindowEvents(){
        const debouncedIsMobile = debounce(isMobile, 200);

        window.addEventListener('load', isMobile);
        window.addEventListener('resize', debouncedIsMobile);
    }

    function removeSlideEvents(){
        wrapper.removeEventListener('mousedown', onStart);
        wrapper.removeEventListener('mouseup', onEnd);
    }

    function isMobile(){
        const windowWidth = window.innerWidth;
        const windowMobile = 380;

        if(windowWidth < windowMobile){
            addSlideEvents();
        }else{
            removeSlideEvents();
        }
    }

    function init(){
        addWindowEvents();
        /*return this;*/
    }

    init();
    /*Para o Slide funcionar somente no Mobile*/
}

slideMobile();