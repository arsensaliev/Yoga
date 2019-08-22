window.onload = function () {
    'use strict';
    // Tabs
    let tabs = document.querySelector('.info-header').children;
    let selectedTab = document.querySelector('.info-header-tab_active').id;
    let catalogList = document.querySelectorAll('.info-tabcontent');
    renderActiveCatalog(selectedTab);

    for (let j = 0; j < tabs.length; j++) {
        tabs[j].addEventListener('click', function (e) {
            removeActive();

            let btn = e.target;
            selectedTab = btn.id;
            btn.classList.add('info-header-tab_active');
            renderActiveCatalog(selectedTab);
        })
    }

    function removeActive() {
        for (let k = 0; k < tabs.length; k++) {
            if (tabs[k].classList.contains('info-header-tab_active')) {
                tabs[k].classList.remove('info-header-tab_active');
            }
        }
    }

    function renderActiveCatalog(selectedTab) {
        for (let i = 0; i < catalogList.length; i++) {
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


    // Modal
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        descBtn = document.querySelector('.description-btn');

    more.addEventListener('click', showModalWindow);

    close.addEventListener('click', hideModalWindow)

    descBtn.addEventListener('click', showModalWindow)

    window.addEventListener('keydown', function (e) {
        if (overlay.classList.contains('overlay_active')) {
            let esc = e.keyCode
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




    // Form
    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро свяжемся с вами!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.getElementsByTagName('form'),
        input = document.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    for (let i = 0; i < form.length; i++) {
        form[i].addEventListener('submit', function (event) {
            event.preventDefault();
            form[i].appendChild(statusMessage);

            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-Type', 'application/json; charset=utf8');

            let formData = new FormData(form[i]);
            let obj = {};

            formData.forEach(function (value, key) {
                obj[key] = value
            })
            let json = JSON.stringify(obj);
            request.send(json);

            request.addEventListener('readystatechange', function () {
                if (request.readyState < 4) {
                    statusMessage.innerHTML = message.loading;
                } else if (request.readyState === 4 && request.status == 200) {
                    statusMessage.innerHTML = message.success;
                } else {
                    statusMessage.innerHTML = message.failure;
                }
            });

            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        });
    }
}