export function addLocking(lockClass = "lock") {

    // const viewportWidth = window.visualViewport.width;

    const body = document.body;
    // if (body.classList.contains(lockClass)) return;

    // const pagePosition = window.scrollY;
    // body.dataset.position = pagePosition;
    // body.style.top = `-${pagePosition}px`;

    // const lockPaddingValue =
    //     viewportWidth - document.querySelector(".wrapper").getBoundingClientRect().width + "px";

    // body.style.setProperty("--lock-padding", lockPaddingValue);
    body.classList.add(lockClass);
}

export function removeLocking(lockClass = "lock") {
    const body = document.body;
    // if (!body.classList.contains(lockClass)) return;

    // const pagePosition = parseInt(body.dataset.position, 10) || 0;
    // body.style.top = "";
    // body.style.removeProperty("--lock-padding");
    body.classList.remove(lockClass);
    // body.removeAttribute("data-position");

    // window.scrollTo({ top: pagePosition, left: 0 });
}

export function toggleLocking(lockClass = "lock") {
    if (document.body.classList.contains(lockClass)) {
        removeLocking(lockClass);
    } else {
        addLocking(lockClass);
    }
}
