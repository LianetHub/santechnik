export const cookies = () => {

    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    function setCookie(name, value, options) {
        options = options || {};
        let expires = options.expires;
        if (typeof expires == "number" && expires) {
            let d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }
        value = encodeURIComponent(value);
        let updatedCookie = name + "=" + value;
        for (let propName in options) {
            updatedCookie += "; " + propName;
            let propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }
        document.cookie = updatedCookie;
    }

    function deleteCookie(name) {
        setCookie(name, "", {
            expires: -1
        })
    }

    let noticed = getCookie('cookie-block');

    if (typeof (noticed) == 'undefined' || noticed != 1) {

        $('.cookie-block').removeClass('hidden')

        $('[data-accept-cookie]').on('click', function () {
            console.log('click');

            setCookie('cookie-block', 1);
            $('.cookie-block').addClass('hide');
        });
        $('[data-close-cookie]').on('click', function () {
            $('.cookie-block').addClass('hide');
            deleteCookie('cookie-block');
        });

    }

}

