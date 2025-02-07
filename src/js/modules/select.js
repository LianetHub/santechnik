export const select = () => {
    document.querySelectorAll(".dropdown").forEach(function (dropdownWrapper) {
        const dropdownBtn = dropdownWrapper.querySelector(".dropdown__button");
        const dropdownList = dropdownWrapper.querySelector(".dropdown__list");
        const dropdownItems = dropdownList.querySelectorAll(".dropdown__list-item");
        const dropdownInput = dropdownWrapper.querySelector(".dropdown__input");


        dropdownBtn.addEventListener("click", function () {
            if (dropdownBtn.classList.contains('dropdown__button_active')) {
                hiddenDropdown()
            } else {
                openDropdown()
            }
        });

        dropdownItems.forEach(function (listItem) {

            listItem.addEventListener("click", function (e) {
                dropdownItems.forEach(function (el) {
                    el.classList.remove("dropdown__list-item_active");
                    el.removeAttribute('aria-checked');
                });
                e.target.classList.add("dropdown__list-item_active");
                e.target.setAttribute('aria-checked', true);
                dropdownBtn.innerHTML = this.innerHTML;
                dropdownInput.value = this.dataset.value;
                hiddenDropdown();

                let event = new Event('change');
                dropdownInput.dispatchEvent(event);
            });
        });


        document.addEventListener("click", function (e) {
            if (e.target.closest(".dropdown__form") || e.target.closest('.dropdown__list-more-btn')) return;
            if (e.target !== dropdownBtn) {
                hiddenDropdown()
            }
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Tab" || e.key === "Escape") {
                hiddenDropdown()
            }
        });

        function hiddenDropdown() {
            dropdownBtn.classList.remove("dropdown__button_active");
            dropdownList.classList.remove("dropdown__list_visible");
            dropdownBtn.setAttribute('aria-expanded', false);
            dropdownList.setAttribute('aria-hidden', true);
        }

        function openDropdown() {
            dropdownBtn.classList.toggle("dropdown__button_active");
            dropdownList.classList.toggle("dropdown__list_visible");
            dropdownBtn.setAttribute('aria-expanded', true);
            dropdownList.setAttribute('aria-hidden', false);
        }
    });
};
