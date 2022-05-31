function slideMobile(){
    const wrapper = document.querySelector('[data-slide="wrapper"]');
    const lista = document.querySelector('[data-slide="lista"]');

    function onStart(event){
        event.preventDefault();
        console.log('mousedown');
        wrapper.addEventListener('mousemove', onMove);
    }

    function onMove(event){
        console.log('moveu');
    }

    function onEnd(event){
        console.log('acabou');
        wrapper.removeEventListener('mousemove', onMove);
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