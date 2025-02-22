export const lazy = () => {
    const lazyImages = document.querySelectorAll('img[data-src], source[data-srcset]');

    const imageObserver = new IntersectionObserver((entries, imgObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const lazyImage = entry.target;

                if (lazyImage.hasAttribute("data-src")) {
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.removeAttribute('data-src');
                    lazyImage.removeAttribute('height');

                    lazyImage.addEventListener('error', () => {
                        console.warn(`Ошибка загрузки: ${lazyImage.src}`);
                    });
                }

                if (lazyImage.hasAttribute("data-srcset")) {
                    lazyImage.srcset = lazyImage.dataset.srcset;
                    lazyImage.removeAttribute('data-srcset');
                }

                lazyImage.addEventListener('load', () => {
                    console.log(`Загружено: ${lazyImage.src}`);
                });

                imgObserver.unobserve(lazyImage);
            }
        });
    });

    lazyImages.forEach((lazyImage) => {
        imageObserver.observe(lazyImage);
    });


    setTimeout(() => {
        document.querySelectorAll('img[data-src], source[data-srcset]').forEach((img) => {
            if (img.dataset.src || img.dataset.srcset) {
                console.log(`Повторная загрузка: ${img.dataset.src || img.dataset.srcset}`);
                imageObserver.observe(img);
            }
        });
    }, 3000);


    const loadVideoIfIntersecting = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                if (video.paused) {
                    video.play().catch(err => console.warn("Ошибка автозапуска видео:", err));
                }
                observer.unobserve(video);
            }
        });
    };

    const videoObserver = new IntersectionObserver(loadVideoIfIntersecting);
    document.querySelectorAll('video').forEach(video => videoObserver.observe(video));
};
