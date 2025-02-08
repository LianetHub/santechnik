"use strict";



import * as devFunctions from "./modules/functions.js";

//  init Fancybox
if (typeof Fancybox !== "undefined" && Fancybox !== null) {
    Fancybox.bind("[data-fancybox]", {
        dragToClose: false,
        closeButton: false
    });
}


document.addEventListener("DOMContentLoaded", () => {

    // devFunctions.OS();
    devFunctions.spollers();
    devFunctions.select();


    /* menu vars */
    const iconMenu = document.querySelector(".icon-menu");
    const menuBody = document.querySelector(".menu");
    const header = document.querySelector(".header");
    const body = document.body;

    /* event handlers */
    document.addEventListener("click", (e) => {
        const target = e.target;


        if (target.closest(".icon-menu") || target.classList.contains('menu')) {
            getMenu();
            hideLangChoising();
        }

        // copy btn
        // if (target.closest('[data-copy]')) {
        //     let copyBtn = target.closest('[data-copy]');
        //     copyToClipboard(copyBtn);
        // }

        // if (target.closest('.menu__lang-btn')) {
        //     document.querySelector('.menu__lang-btn').classList.toggle('open');
        //     document.querySelector('.menu__lang-content').classList.toggle('open');
        // }

        // if (target.closest('.menu__lang-item')) {
        //     selectLanguage(target.closest('.menu__lang-item'));
        // }

        // if (target.classList.contains('menu__btn')) {
        //     target.classList.toggle('open');
        //     target.nextElementSibling.classList.toggle('open');
        // }

        // if (target.classList.contains('heading__caption')) {
        //     target.classList.toggle('active');
        //     target.nextElementSibling.slideToggle()
        // }

        // if (target.matches('.about__platform-tab')) {

        //     target.classList.add('active');
        //     Array.from(target.parentElement.children).forEach(sibling => {
        //         if (sibling !== target) {
        //             sibling.classList.remove('active');
        //         }
        //     });

        //     const tabs = document.querySelectorAll('.about__platform-tab');
        //     const blocks = document.querySelectorAll('.about__platform-block');
        //     const index = Array.prototype.indexOf.call(tabs, target);

        //     blocks.forEach((block, i) => {
        //         if (i === index) {
        //             block.classList.add('active');
        //         } else {
        //             block.classList.remove('active');
        //         }
        //     });
        // }

        if (target.matches('.service__item-caption')) {
            target.closest('.service__item-caption').classList.toggle('active');
            target.closest('.service__item-caption').style.setProperty('pointer-events', 'none');
            target.closest('.service__item-caption')?.nextElementSibling.slideToggle(300, () => {
                target.closest('.service__item-caption').removeAttribute('style');
            })
        }

        if (target.closest('.faq__item-caption')) {

            target.closest('.faq__item-caption').classList.toggle('active');
            target.closest('.faq__item-caption').style.setProperty('pointer-events', 'none');
            target.closest('.faq__item-caption')?.nextElementSibling.slideToggle(300, () => {
                target.closest('.faq__item-caption').removeAttribute('style');
            })
        }


    });

    function selectLanguage(langItem) {
        let currentLangBlock = document.querySelector('.menu__lang-current');
        let currentFlagBlock = document.querySelector('.menu__lang-flag');

        let selectedFlag = langItem.querySelector('.menu__lang-icon');
        let selectedValue = langItem.dataset.lang;



        document.querySelectorAll('.menu__lang-item').forEach(langBtn => {
            langBtn.classList.remove('selected');
        });

        langItem.classList.add('selected');
        currentLangBlock.innerHTML = selectedValue;
        currentFlagBlock.innerHTML = selectedFlag.innerHTML;

        hideLangChoising()

    }

    function hideLangChoising() {
        document.querySelector('.menu__lang-btn').classList.remove('open');
        document.querySelector('.menu__lang-content').classList.remove('open')
    }


    function getMenu() {
        devFunctions.toggleLocking();
        iconMenu.classList.toggle("active");
        header.classList.toggle("active");
        menuBody.classList.toggle("active");
    }

    function copyToClipboard(copyBtn) {


        let template = document.createElement('input');
        template.classList.add('hidden');
        template.setAttribute('type', "text");
        template.value = copyBtn.previousElementSibling.textContent;

        let tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.textContent = "Скопировано"


        copyBtn.appendChild(tooltip);
        tooltip.classList.add('visible');

        document.body.appendChild(template);
        template.select();
        document.execCommand("copy");
        template.remove();
        setTimeout(() => {
            tooltip.remove()
        }, 400)

    }

    // sliders

    if (document.querySelector('.reviews__slider')) {
        new Swiper('.reviews__slider', {
            slidesPerView: 2,
            spaceBetween: 20,
            watchSlidesProgress: true,
            navigation: {
                nextEl: ".reviews__next",
                prevEl: ".reviews__prev",
            }
        })
    }
    if (document.querySelector('.reviews__more-slider')) {
        new Swiper('.reviews__more-slider', {
            slidesPerView: 5,
            spaceBetween: 20,
            watchSlidesProgress: true,
            pagination: {
                el: '.reviews__more-pagination',
                clickable: true
            }
        })
    }

    if (document.querySelector('.more__slider')) {
        new Swiper('.more__slider', {
            slidesPerView: 3,
            spaceBetween: 20,
            watchSlidesProgress: true,
            navigation: {
                nextEl: ".more__next",
                prevEl: ".more__prev",
            }
        })
    }

    if (document.querySelector('.works__slider')) {
        new Swiper('.works__slider', {
            slidesPerView: "auto",
            spaceBetween: 20,
            watchSlidesProgress: true,
            navigation: {
                nextEl: ".works__next",
                prevEl: ".works__prev",
            }
        })
    }

    if (document.querySelectorAll('.service__slider')) {
        document.querySelectorAll('.service__slider')?.forEach(slider => {

            const thumbsSlider = new Swiper(slider.querySelector('.service__slider-thumbs'), {
                slidesPerView: 3,
                spaceBetween: 12
            })

            const mainSlider = new Swiper(slider.querySelector('.service__slider-main'), {
                slidesPerView: 1,
                watchSlidesProgress: true,
                navigation: {
                    nextEl: ".service__next",
                    prevEl: ".service__prev",
                },
                thumbs: {
                    swiper: thumbsSlider
                }
            })


        })
    }



    document.addEventListener('scroll', (e) => {
        if (scrollY > 0) {
            document.querySelector('.header').classList.add('scroll');
        } else {
            document.querySelector('.header').classList.remove('scroll');
        }
    });


    // observer header height
    function updateHeaderHeight() {
        var header = document.querySelector('.header__wrapper');
        var htmlFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

        if (header && htmlFontSize) {
            var headerHeight = header.offsetHeight / htmlFontSize;
            document.body.style.setProperty('--header-height', `${headerHeight}rem`);
        }
    }

    updateHeaderHeight();

    window.addEventListener('resize', updateHeaderHeight);





});


// slideToggle

HTMLElement.prototype.slideToggle = function (duration, callback) {
    if (this.clientHeight === 0) {
        _s(this, duration, callback, true);
    } else {
        _s(this, duration, callback);
    }
};

HTMLElement.prototype.slideUp = function (duration, callback) {
    _s(this, duration, callback);
};

HTMLElement.prototype.slideDown = function (duration, callback) {
    _s(this, duration, callback, true);
};

function _s(el, duration, callback, isDown) {

    if (typeof duration === 'undefined') duration = 400;
    if (typeof isDown === 'undefined') isDown = false;

    el.style.overflow = "hidden";
    if (isDown) el.style.display = "block";

    var elStyles = window.getComputedStyle(el);

    var elHeight = parseFloat(elStyles.getPropertyValue('height'));
    var elPaddingTop = parseFloat(elStyles.getPropertyValue('padding-top'));
    var elPaddingBottom = parseFloat(elStyles.getPropertyValue('padding-bottom'));
    var elMarginTop = parseFloat(elStyles.getPropertyValue('margin-top'));
    var elMarginBottom = parseFloat(elStyles.getPropertyValue('margin-bottom'));

    var stepHeight = elHeight / duration;
    var stepPaddingTop = elPaddingTop / duration;
    var stepPaddingBottom = elPaddingBottom / duration;
    var stepMarginTop = elMarginTop / duration;
    var stepMarginBottom = elMarginBottom / duration;

    var start;

    function step(timestamp) {

        if (start === undefined) start = timestamp;

        var elapsed = timestamp - start;

        if (isDown) {
            el.style.height = (stepHeight * elapsed) + "px";
            el.style.paddingTop = (stepPaddingTop * elapsed) + "px";
            el.style.paddingBottom = (stepPaddingBottom * elapsed) + "px";
            el.style.marginTop = (stepMarginTop * elapsed) + "px";
            el.style.marginBottom = (stepMarginBottom * elapsed) + "px";
        } else {
            el.style.height = elHeight - (stepHeight * elapsed) + "px";
            el.style.paddingTop = elPaddingTop - (stepPaddingTop * elapsed) + "px";
            el.style.paddingBottom = elPaddingBottom - (stepPaddingBottom * elapsed) + "px";
            el.style.marginTop = elMarginTop - (stepMarginTop * elapsed) + "px";
            el.style.marginBottom = elMarginBottom - (stepMarginBottom * elapsed) + "px";
        }

        if (elapsed >= duration) {
            el.style.height = "";
            el.style.paddingTop = "";
            el.style.paddingBottom = "";
            el.style.marginTop = "";
            el.style.marginBottom = "";
            el.style.overflow = "";
            if (!isDown) el.style.display = "none";
            if (typeof callback === 'function') callback();
        } else {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}
