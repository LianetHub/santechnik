"use strict";


// import Swiper from "swiper";
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
        if (target.closest('[data-copy]')) {
            let copyBtn = target.closest('[data-copy]');
            copyToClipboard(copyBtn);
        }

        if (target.closest('.menu__lang-btn')) {
            document.querySelector('.menu__lang-btn').classList.toggle('open');
            document.querySelector('.menu__lang-content').classList.toggle('open');
        }

        if (target.closest('.menu__lang-item')) {
            selectLanguage(target.closest('.menu__lang-item'));
        }

        if (target.classList.contains('menu__btn')) {
            target.classList.toggle('open');
            target.nextElementSibling.classList.toggle('open');
        }

        if (target.classList.contains('heading__caption')) {
            target.classList.toggle('active');
            target.nextElementSibling.slideToggle()
        }

        if (target.matches('.about__platform-tab')) {

            target.classList.add('active');
            Array.from(target.parentElement.children).forEach(sibling => {
                if (sibling !== target) {
                    sibling.classList.remove('active');
                }
            });

            const tabs = document.querySelectorAll('.about__platform-tab');
            const blocks = document.querySelectorAll('.about__platform-block');
            const index = Array.prototype.indexOf.call(tabs, target);

            blocks.forEach((block, i) => {
                if (i === index) {
                    block.classList.add('active');
                } else {
                    block.classList.remove('active');
                }
            });
        }

        if (target.closest('.faq__item-caption')) {
            target.closest('.faq__item-caption').classList.toggle('active');
            target.closest('.faq__item-caption').nextElementSibling.slideToggle()
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

    if (document.querySelector('.download__slider')) {
        new Swiper('.download__slider-content', {
            slidesPerView: 4,
            spaceBetween: 40,
            watchSlidesProgress: true,
            navigation: {
                nextEl: ".download__next",
                prevEl: ".download__prev",
            }
        })
    }

    if (document.querySelector('.rating__slider')) {
        new Swiper('.rating__slider', {
            slidesPerView: 1,
            spaceBetween: 28,
            navigation: {
                nextEl: ".rating__next",
                prevEl: ".rating__prev",
            },
            breakpoints: {
                767.98: {
                    slidesPerView: 2,
                }
            }
        })
    }



    // const sliderOptions = {
    //     slidesPerView: "auto",
    //     spaceBetween: 10,
    //     watchOverflow: true,
    //     grabCursor: true,
    //     breakpoints: {
    //         767.98: {
    //             spaceBetween: 20,
    //         }
    //     }
    // };

    // if (document.querySelector('.info__slider')) {
    //     new Swiper('.info__slider', sliderOptions)
    // }

    // if (document.querySelector('.reviews__slider')) {
    //     new Swiper('.reviews__slider', sliderOptions)
    // }

    // if (document.querySelector('.benefits__slider')) {
    //     new Swiper('.benefits__slider', sliderOptions)
    // }

    // if (document.querySelector('.articles__slider')) {
    //     new Swiper('.articles__slider', {
    //         slidesPerView: "auto",
    //         spaceBetween: 20,
    //         watchOverflow: true,
    //         grabCursor: true,
    //     })
    // }

    // if (document.querySelector('.partners__slider')) {
    //     new Swiper('.partners__slider', sliderOptions)
    // }


    document.addEventListener('scroll', (e) => {
        if (scrollY > 0) {
            document.querySelector('.header').classList.add('scroll');
        } else {
            document.querySelector('.header').classList.remove('scroll');
        }
    })


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
