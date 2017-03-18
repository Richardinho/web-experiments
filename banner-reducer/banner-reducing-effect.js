
function applyEffect() {

    let reducedStyles = {

        'background' : {
            backgroundColor : 'black'
        },
        'h1' : {
            fontSize : '14px',
            color : 'gold'
        }
    };

    let expandedStyles = {
        'background' : {
            backgroundColor : 'transparent'
        },
        'h1' : {
            fontSize : '50px',
            color : 'white'
        }
    };

    let reduced = false; // state

    let banner = document.querySelector('[role=banner]');
    let bannerBackground = banner.querySelector('.banner-background');
    let header = banner.querySelector('h1');

    function setReducedBackgroundColor() {
        bannerBackground.style.backgroundColor = reducedStyles.background.backgroundColor;
    }

    function setExpandedBackgroundColor() {
        bannerBackground.style.backgroundColor = expandedStyles.background.backgroundColor;
    }

    function setReducedHeaderColor() {
        header.style.color = reducedStyles.h1.color
    }

    function setExpandedHeaderColor() {
        header.style.color = expandedStyles.h1.color;
    }

    function setReducedHeaderSize() {
        header.style.fontSize = reducedStyles.h1.fontSize;
    }

    function setExpandedHeaderSize() {
        header.style.fontSize = expandedStyles.h1.fontSize;
    }

    /*
        transforms
    */
    function scaleBackground(firstDimensions, lastDimensions) {
        bannerBackground.style.transform = `scaleY(${ firstDimensions.bannerHeight / lastDimensions.bannerHeight })`;
    }

    function scaleHeader(firstDimensions, lastDimensions) {
        header.style.transform = `scale(${ firstDimensions.headerHeight / lastDimensions.headerHeight })`;
    }

    function rescaleBackground() {
        bannerBackground.style.transform = 'scale(1)';
    }

    function rescaleHeader () {
        header.style.transform = 'scale(1)';
    }

    function dimensions (banner, header) {

        let bannerHeight = banner.getBoundingClientRect().height;
        let headerHeight = header.getBoundingClientRect().height;
        let headerTop = header.offsetTop;
        let headerLeft = header.offsetLeft;

        return {
            bannerHeight,
            headerHeight,
            headerTop,
            headerLeft
        };
    }

    function onLoaded () {

        let reduce = {

            f : (banner, header) => {
                return dimensions(banner, header);
            },

            l : (banner, header) => {

                setReducedHeaderSize();

                setReducedHeaderColor();
                setReducedBackgroundColor();

                return dimensions(banner, header);
            },

            i : (bannerBackground, header, firstDimensions, lastDimensions) => {

                scaleBackground(firstDimensions, lastDimensions);
                scaleHeader(firstDimensions, lastDimensions);

                setExpandedHeaderColor();
                setExpandedBackgroundColor();

                document.body.offsetHeight;
            },

            p : (header, bannerBackground) => {

                let promise1 = new Promise(function (resolve) {
                    function animationEnd() {
                        bannerBackground.removeEventListener('animationend', animationEnd);
                        rescaleBackground();
                        setReducedBackgroundColor();
                        resolve();
                    }
                    bannerBackground.addEventListener('animationend', animationEnd);
                });

                let promise2 = new Promise(resolve => {
                    function headerAnimationEnd() {
                        header.removeEventListener('animationend', headerAnimationEnd);
                        rescaleHeader();
                        setReducedHeaderColor();
                        resolve();
                    }
                    header.addEventListener('animationend', headerAnimationEnd);
                });

                Promise.all([promise1, promise1]).then(() => {
                    banner.classList.remove('animation-reduce');
                });

                banner.classList.add('animation-reduce');
            }
        };

        let expand = {

            f : (banner, header) => {
                return dimensions(banner, header);
            },
            l : (banner, header) => {

                setExpandedHeaderSize();

                setExpandedHeaderColor();
                setExpandedBackgroundColor();

                return dimensions(banner, header);
            },
            i : (bannerBackground, header, firstDimensions, lastDimensions) => {

                scaleBackground(firstDimensions, lastDimensions);
                scaleHeader(firstDimensions, lastDimensions);

                setReducedHeaderColor();
                setReducedBackgroundColor();

                document.body.offsetHeight;
            },
            p : () => {
                let promise1 = new Promise(function (resolve) {
                    function animationEnd() {
                        bannerBackground.removeEventListener('animationend', animationEnd);
                        rescaleBackground();
                        setExpandedBackgroundColor();
                        resolve();
                    }
                    bannerBackground.addEventListener('animationend', animationEnd);
                });

                let promise2 = new Promise(resolve => {
                    function headerAnimationEnd() {
                        header.removeEventListener('animationend', headerAnimationEnd);
                        rescaleHeader();
                        setExpandedHeaderColor();
                        resolve();
                    }
                    header.addEventListener('animationend', headerAnimationEnd);
                });

                Promise.all([promise1, promise1]).then(() => {
                    banner.classList.remove('animation-expand');
                });

                banner.classList.add('animation-expand');

            }
        };

        if (pageYOffset > 100) {
            reduced = true;
            setReducedHeaderColor();
            setReducedHeaderSize();
            setReducedBackgroundColor();

        } else {
            reduced = false;
            setExpandedHeaderColor();
            setExpandedHeaderSize();
            setExpandedBackgroundColor();
        }

        window.addEventListener('scroll', ()=> {

            let pageYOffset = window.pageYOffset;

            if (pageYOffset > 100) {
                if (!reduced) {
                    reduced = true;
                    let firstDimensions = reduce.f(banner, header);
                    let lastDimensions = reduce.l(banner, header);
                    reduce.i(bannerBackground, header, firstDimensions, lastDimensions);
                    reduce.p(header, bannerBackground);
                }
            } else {
                if (reduced) {
                    reduced = false;
                    let firstDimensions = expand.f(banner, header);
                    let lastDimensions = expand.l(banner, header);
                    expand.i(bannerBackground, header, firstDimensions, lastDimensions);
                    expand.p(header, bannerBackground);
                }
            }
        });
    }

    document.addEventListener( 'DOMContentLoaded', onLoaded );
}

applyEffect();
