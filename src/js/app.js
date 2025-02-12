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

    devFunctions.isWebp();
    devFunctions.OS();
    devFunctions.spollers();
    devFunctions.mask();
    devFunctions.lazy();




    /* event handlers */
    document.addEventListener("click", (e) => {

        const target = e.target;


        if (target.classList.contains('wrapper')) {
            document.querySelectorAll('.service__popup')?.forEach(popup => popup.classList.remove('active'));
            devFunctions.removeLocking()
        }

        if (target.matches('.service__info-btn')) {
            target.nextElementSibling?.classList.add('active');
            devFunctions.addLocking()
        }

        if (target.matches('.service__popup-close')) {
            document.querySelectorAll('.service__popup')?.forEach(popup => popup.classList.remove('active'));
            devFunctions.removeLocking()
        }


        if (target.matches('.search__toggler')) {
            document.querySelectorAll('.menu__btn.active')?.forEach(btn => {
                btn.classList.remove('active');
                btn.nextElementSibling?.classList.remove('open');
            });
            document.querySelector('.search').classList.add('active');
            setTimeout(() => {
                document.querySelector('.search__form-input')?.focus()
            }, 300)
            devFunctions.addLocking()
        }

        if (target.matches('.header')) {
            const search = document.querySelector('.search');
            const openSubmenu = document.querySelector('.submenu.open');

            if (search?.classList.contains('active')) {
                search.classList.remove('active');
                devFunctions.removeLocking();
            }
            if (openSubmenu) {
                openSubmenu.previousElementSibling?.classList.remove('active');
                openSubmenu.classList.remove('open');
                devFunctions.removeLocking();
            }
        }

        if (target.matches('.menu__btn')) {


            document.querySelector('.search').classList.remove('active');

            if (window.innerWidth > 768) {
                document.querySelectorAll('.menu__btn.active').forEach(btn => {
                    if (btn !== target) {
                        btn.classList.remove('active');
                        btn.nextElementSibling?.classList.remove('open');
                    }
                });
            } else {
                document.querySelectorAll('.menu__btn.active').forEach(btn => {
                    if (target.closest('.submenu')) return;
                    if (btn !== target) {
                        btn.classList.remove('active');
                        btn.nextElementSibling?.classList.remove('open');
                    }
                });
            }


            target.classList.toggle('active');
            target.nextElementSibling?.classList.toggle('open');

            if (document.querySelector('.menu__btn.active')) {
                devFunctions.addLocking();
            } else {
                devFunctions.removeLocking();
            }
        }

        if (target.matches('.submenu__close')) {
            target.closest('.submenu').previousElementSibling?.classList.remove('active');
            target.closest('.submenu').classList.remove('open');
            devFunctions.removeLocking();
        }


        if (target.matches('.submenu__search')) {
            target.closest('.submenu').previousElementSibling?.classList.remove('active');
            target.closest('.submenu').classList.remove('open');
            devFunctions.removeLocking();

            document.querySelector('.search__toggler').dispatchEvent(new MouseEvent("click", {
                bubbles: true,
                cancelable: true
            }));

        }

        if (target.matches('.menu__search-toggler')) {

            document.querySelector('.search__toggler').dispatchEvent(new MouseEvent("click", {
                bubbles: true,
                cancelable: true
            }));

        }

        if (target.matches('.submenu__btn')) {
            document.querySelectorAll('.submenu__btn.active').forEach(btn => {
                if (btn !== target) {
                    btn.classList.remove('active');
                    btn.nextElementSibling?.classList.remove('open');
                }
            });

            target.classList.toggle('active');
            target.nextElementSibling?.classList.toggle('open');

        }

        if (target.matches('.subsubmenu__close')) {
            target.closest('.subsubmenu').previousElementSibling?.classList.remove('active');
            target.closest('.subsubmenu').classList.remove('open');

        }



        if (target.matches('.tabs__btn')) {

            target.classList.add('active');
            Array.from(target.parentElement.children).forEach(sibling => {
                if (sibling !== target) {
                    sibling.classList.remove('active');
                }
            });

            const tabs = document.querySelectorAll('.tabs__btn');
            const blocks = document.querySelectorAll('.tabs__content');
            const index = Array.prototype.indexOf.call(tabs, target);

            blocks.forEach((block, i) => {
                if (i === index) {
                    block.classList.add('active');
                } else {
                    block.classList.remove('active');
                }
            });
        }

        if (target.matches('.prices__btn')) {



            target.previousElementSibling?.querySelector('.prices__table-hidden').slideDown(300, () => { }, "table-row-group");
            target.remove()
        }


    });

    // sliders

    if (document.querySelector('.reviews__slider')) {
        new Swiper('.reviews__slider', {
            slidesPerView: 1.15,
            spaceBetween: 20,
            watchSlidesProgress: true,
            navigation: {
                nextEl: ".reviews__next",
                prevEl: ".reviews__prev",
            },
            breakpoints: {
                767.98: {
                    slidesPerView: 2,
                }
            }
        })
    }

    if (document.querySelector('.reviews__more-slider')) {
        new Swiper('.reviews__more-slider', {
            slidesPerView: "auto",
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
            slidesPerView: "auto",
            spaceBetween: 10,
            watchSlidesProgress: true,
            navigation: {
                nextEl: ".more__next",
                prevEl: ".more__prev",
            },
            breakpoints: {
                1399.98: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                }
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

    if (document.querySelector('.tabs__btns')) {
        new Swiper('.tabs__btns', {
            slidesPerView: "auto",
            watchSlidesProgress: true,
            breakpoints: {
                1399.98: {
                    slidesPerView: 4,
                }
            }
        })
    }

    if (document.querySelector('.breadcrumbs__slider')) {
        new Swiper('.breadcrumbs__slider', {
            slidesPerView: "auto",
            spaceBetween: 8
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


    // move search on scroll class on header
    function initMoveSearchOnScroll() {
        const header = document.querySelector(".header");
        const search = document.querySelector(".header__search");
        const menu = document.querySelector(".menu");
        const headerTop = document.querySelector(".header__top");

        if (!header || !search || !menu || !headerTop) return;

        function moveSearch() {
            if (window.innerWidth < 768 || header.classList.contains("scroll")) {
                if (!menu.contains(search)) {
                    menu.appendChild(search);
                }
            } else {
                if (!headerTop.contains(search)) {
                    headerTop.appendChild(search);
                }
            }
        }

        const observer = new MutationObserver(moveSearch);
        observer.observe(header, { attributes: true, attributeFilter: ["class"] });

        window.addEventListener("resize", moveSearch);
        moveSearch();
    }

    initMoveSearchOnScroll();


    // observer swipe to refresh
    let touchStartY = 0;
    let isSwipeToRefresh = false;

    document.addEventListener("touchstart", (event) => {
        if (window.scrollY === 0) {
            touchStartY = event.touches[0].clientY;
        }
    });

    document.addEventListener("touchmove", (event) => {
        if (window.scrollY === 0 && event.touches[0].clientY > touchStartY + 50) {
            isSwipeToRefresh = true;
        }
    });

    document.addEventListener("touchend", () => {
        if (isSwipeToRefresh) {
            setTimeout(() => {
                window.scrollTo(0, 0);
                document.documentElement.style.scrollBehavior = "auto";
                requestAnimationFrame(() => {
                    document.documentElement.style.scrollBehavior = "";
                });
            }, 50);
        }
        isSwipeToRefresh = false;
    });





});

