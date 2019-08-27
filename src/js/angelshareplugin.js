(function($) {
    $.fn.angelSharePlugin = function(options) {
        let settings = $.extend({
            autoUtm: false,
            urlParams: false,
            autoMessage: false,
            rounded: false,
            btns: ['facebook', 'twitter', 'telegram']
        }, options)

        const pageProtocol = window.location.protocol + '//',
            pageHost = window.location.hostname,
            pagePath = window.location.pathname,
            pageGetParams = settings.urlParams ? window.location.search : '',
            message = settings.autoMessage ? '&text=' + settings.autoMessage : '',
            socialSetup = {
                facebook: {
                    class: 'fb',
                    url: 'https://www.facebook.com/sharer/sharer.php?u=',
                },
                twitter: {
                    class: 'tw',
                    url: 'https://twitter.com/intent/tweet?url='
                },
                telegram: {
                    class: 'tme',
                    url: 'https://telegram.me/share/url?url='
                },
            }

        let list = document.createElement('ul')
        list.classList.add('share-buttons-group')
        if (settings.rounded)
            list.classList.add('sbg-rounded')

        settings.btns.forEach(item => {
            let utm = '',
                el = document.createElement('li'),
                link = document.createElement('a')

            if (settings.autoUtm) utm = '&utm_source=' + item + '&utm_medium=referral'

            link.setAttribute('target', '_blank')
            link.classList.add('share-button-' + socialSetup[item].class)
            link.href = socialSetup[item].url + pageProtocol + pageHost + pagePath + message + utm + pageGetParams 
            el.append(link)
            list.append(el)
        })

        this.each(function(){
            const $this = $(this),
                  clone = list.cloneNode(true)
            $this.append(clone)
        })
    }
})(jQuery)