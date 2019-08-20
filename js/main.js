window.onload = function () {
    var tabs = document.querySelector('.info-header').children;
    var selectedTab = document.querySelector('.info-header-tab_active').id;
    var catalogList = document.querySelectorAll('.info-tabcontent');
    renderActiveCatalog(selectedTab);

    for (var j = 0; j < tabs.length; j++) {
        tabs[j].addEventListener('click', function (e) {
            removeActive();

            var btn = e.target;
            selectedTab = btn.id;
            btn.classList.add('info-header-tab_active');
            renderActiveCatalog(selectedTab);
        })
    }

    function removeActive() {
        for (var k = 0; k < tabs.length; k++) {
            if (tabs[k].classList.contains('info-header-tab_active')) {
                tabs[k].classList.remove('info-header-tab_active');
            }
        }
    }

    function renderActiveCatalog(selectedTab) {
        for (var i = 0; i < catalogList.length; i++) {
            catalogList[i].classList.remove('hide');
            if (!catalogList[i].classList.contains(selectedTab)) {
                catalogList[i].classList.add('hide');
            }
        }
    }


    // Timer
    let deadline = '2020-08-19';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)));
        if (t <= 0) {
            return {
                'total': t,
                'hours': 0,
                'minutes': 0,
                'seconds': 0
            }
        }

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        };

        function getZero(num) {
            if (num >= 0 && num < 10) {
                return '0' + num;
            } else {
                return num;
            }
        }

    };
    setClock('timer', deadline);



    var more = document.querySelector('.more');
    var overlay = document.querySelector('.overlay');
    var close = document.querySelector('.popup-close');
    var descBtn = document.querySelector('.description-btn');

    more.addEventListener('click', showModalWindow);


    close.addEventListener('click', hideModalWindow)

    descBtn.addEventListener('click', showModalWindow)

    window.addEventListener('keydown', function (e) {
        if (overlay.classList.contains('overlay_active')) {
            var esc = e.keyCode
            if (esc == 27) {
                hideModalWindow()
            }
        }
    })
    window.addEventListener('click', function (e) {
        if (e.target == overlay) {
            hideModalWindow()
        }
    })


    function showModalWindow() {
        overlay.classList.add('overlay_active');
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    }

    function hideModalWindow() {
        overlay.classList.remove('overlay_active');
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    }
}