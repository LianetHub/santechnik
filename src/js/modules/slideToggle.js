export const slide = () => {
    HTMLElement.prototype.slideToggle = function (duration, callback, finalDisplay = "block") {
        if (this.clientHeight === 0) {
            _s(this, duration, callback, true, finalDisplay);
        } else {
            _s(this, duration, callback);
        }
    };

    HTMLElement.prototype.slideUp = function (duration, callback) {
        _s(this, duration, callback);
    };

    HTMLElement.prototype.slideDown = function (duration, callback, finalDisplay = "block") {
        _s(this, duration, callback, true, finalDisplay);
    };

    function _s(el, duration, callback, isDown, finalDisplay) {
        if (typeof duration === "undefined") duration = 400;
        if (typeof isDown === "undefined") isDown = false;
        if (typeof finalDisplay === "undefined") finalDisplay = "block";

        el.style.overflow = "hidden";
        if (isDown) el.style.display = finalDisplay;

        var elStyles = window.getComputedStyle(el);

        var elHeight = parseFloat(elStyles.getPropertyValue("height"));
        var elPaddingTop = parseFloat(elStyles.getPropertyValue("padding-top"));
        var elPaddingBottom = parseFloat(elStyles.getPropertyValue("padding-bottom"));
        var elMarginTop = parseFloat(elStyles.getPropertyValue("margin-top"));
        var elMarginBottom = parseFloat(elStyles.getPropertyValue("margin-bottom"));

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
                el.style.height = stepHeight * elapsed + "px";
                el.style.paddingTop = stepPaddingTop * elapsed + "px";
                el.style.paddingBottom = stepPaddingBottom * elapsed + "px";
                el.style.marginTop = stepMarginTop * elapsed + "px";
                el.style.marginBottom = stepMarginBottom * elapsed + "px";
            } else {
                el.style.height = elHeight - stepHeight * elapsed + "px";
                el.style.paddingTop = elPaddingTop - stepPaddingTop * elapsed + "px";
                el.style.paddingBottom = elPaddingBottom - stepPaddingBottom * elapsed + "px";
                el.style.marginTop = elMarginTop - stepMarginTop * elapsed + "px";
                el.style.marginBottom = elMarginBottom - stepMarginBottom * elapsed + "px";
            }

            if (elapsed >= duration) {
                el.style.height = "";
                el.style.paddingTop = "";
                el.style.paddingBottom = "";
                el.style.marginTop = "";
                el.style.marginBottom = "";
                el.style.overflow = "";
                if (!isDown) el.style.display = "none";
                if (typeof callback === "function") callback();
            } else {
                window.requestAnimationFrame(step);
            }
        }

        window.requestAnimationFrame(step);
    }
};
