const q = document.querySelector.bind(document)
const qa = document.querySelectorAll.bind(document)

// 

var body2_left_swiper = new Swiper('.body2-left-swiper',{
    spaceBetween:10,
})
var body2_right_swiper = new Swiper('.body2-right-swiper',{
    spaceBetween:10,
    controller:{
        control:body2_left_swiper,
    },
    autoplay:{
        delay:3000,
        disableOnInteraction:false,
    },   
    navigation:{
        prevEl:'.body2-swiper-prev',
        nextEl:'.body2-swiper-next'
    }
})
body2_left_swiper.controller.control = body2_right_swiper

var rrr = 0
q('.robot-btn').addEventListener('click', () => {
    gsap.from('.robot-btn img', {
        opacity: 0,
        duration: .5,
        ease: 'linear',
    })
    q('.robot-box').classList.toggle('active')
    if (rrr === 0) {
        q('.robot-btn img').src = './img/關閉x.png'
        rrr = 1
    } else {
        q('.robot-btn img').src = './img/機器人.png'
        rrr = 0
    }
})

q('.robot-submit').addEventListener('click', () => {
    if (q('.robot-input').value != '') {
        q('.robot-body').innerHTML += `
        <p class="df justify-content-end align-items-end">
            <span class="robot-mess2">
                ${q('.robot-input').value}
            </span>
        </p>
        `
        let ans = '感謝您的詢問，我們將通知網頁管理員為您回復'
        x = Object.keys(robot_data).filter(k => q('.robot-input').value.includes(k))
        if (x.length) {
            ans = robot_data[x].text
            gsap.to(window, { duration: 0, scrollTo: `#${robot_data[x].url}` })
        }
        setTimeout(() => {
            q('.robot-body').innerHTML += `
            <p>
                <span class="robot-mess">
                    ${ans}
                </span>
            </p>
            `
            q('.robot-body').scrollTo({
                top: q('.robot-body').scrollHeight,
                behavior: 'smooth',
            })
        }, 500);
        q('.robot-input').value = ''
    }
})
q('.robot-input').addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        q('.robot-submit').click()
    }
})

var sun_click = 'sun'
const color_data = {
    sun: {
        '--bg--color1': '#79AC78',
        '--bg--color2': '#E9B824',
        '--body--bg': '#fff',
        '--body--color': '#000',
    },
    moon: {
        '--bg--color1': '#E9B824',
        '--bg--color2': '#79AC78',
        '--body--bg': '#5d5d5d',
        '--body--color': '#fff',
    },
}
function sun() {
    if (sun_click === 'sun') {
        sun_click = 'moon'
        q('.nav-icon-sun').src = './img/nav/nav-icon-moon.png'
    } else {
        sun_click = 'sun'
        q('.nav-icon-sun').src = './img/nav/nav-icon-sun.png'
    }
    for (let key in color_data[sun_click]) {
        console.log(color_data[sun_click][key]);
        document.documentElement.style.setProperty(key, color_data[sun_click][key])
    }
}
var fs = 1
const fs_data = {
    1: {
        '--fs--title': '80px',
        '--fs--1': '70px',
        '--fs--2': '60px',
        '--fs--3': '50px',
        '--fs--4': '40px',
        '--fs--5': '30px',
        '--fs--6': '23px',
        '--fs--7': '20px',
    },
    2: {
        '--fs--title': '83px',
        '--fs--1': '73px',
        '--fs--2': '63px',
        '--fs--3': '53px',
        '--fs--4': '43px',
        '--fs--5': '33px',
        '--fs--6': '26px',
        '--fs--7': '23px',
    },
    3: {
        '--fs--title': '86px',
        '--fs--1': '76px',
        '--fs--2': '66px',
        '--fs--3': '56px',
        '--fs--4': '46px',
        '--fs--5': '36px',
        '--fs--6': '29px',
        '--fs--7': '26px',
    },
}
function fs_click() {
    fs += 1
    console.log(fs);
    if (fs === 2) {
        for (let key in fs_data[fs]) {
            document.documentElement.style.setProperty(key, fs_data[fs][key])
            q('.fs-btn').innerText = 'A+'
        }
    } else if (fs === 3) {
        for (let key in fs_data[fs]) {
            document.documentElement.style.setProperty(key, fs_data[fs][key])
        }
        q('.fs-btn').innerText = 'A++'
    } else {
        fs = 1
        for (let key in fs_data[fs]) {
            document.documentElement.style.setProperty(key, fs_data[fs][key])
        }
        q('.fs-btn').innerText = 'A'
    }
}

// modal

const login_modal = new bootstrap.Modal('#login')
const logout_modal = new bootstrap.Modal('#logout')

var log = 0
q('.nav-login').addEventListener('click', () => {
    if (log === 0) {
        login_modal.show()
        log = 1
    } else {
        logout_modal.show()
    }
})
q('.login-btn').addEventListener('click', () => {
    qa('#login input').forEach((item) => {
        item.value = ''
    })
    q('.nav-login').innerHTML += '<span class="color2 fw-bold">b034</span>'
})
function logout() {
    log = 0
    q('.nav-login').click()
    q('.nav-login').innerHTML = '<img src="./img/nav/nav-icon-login.png" alt="" class="nav-icon">'
}
