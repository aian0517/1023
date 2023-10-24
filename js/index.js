const q = document.querySelector.bind(document)
const qa = document.querySelectorAll.bind(document)
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin,TextPlugin)
let gsap_media = gsap.matchMedia()

// nav

const nav_anim = gsap.from('nav', {
    margin: 20,
    borderRadius: 10,
    scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        toggleActions: "play none none reverse",
    },
})
// nav_anim.pause()

// load

// gsap_media.add('(min-width:1080px)',()=>{
//     gsap.to('.load-img',{
//         y:-15,
//         duration:1,
//         ease:'linear',
//         yoyo:true,
//         repeat:-1,
//     })
//     var load_gsap = gsap.timeline({
//         scrollTrigger:{
//             trigger:'.load-box',
//             start:'bottom bottom',
//             end:'95% top',
//             scrub:true,
//             // markers:true,
//         },
//         onComplete:()=>{
//             q('.load-box').remove()
//             gsap.to('body',{duration:0,scrollTop:0})
//             q('nav').classList.add('fixed-top')
//             load_gsap.kill()
//         },

//     })
//     load_gsap.set('nav',{
//         marginTop:q('.load-box').offsetHeight/2
//     })
//     load_gsap.to('.load-bg2,.load-box',{
//         scale:1.2,
//     })
//     load_gsap.to('.load-box',{
//         y:500,
//     },"<")
//     load_gsap.to('.load-box',{
//         autoAlpha:0,
//     },)
//     load_gsap.to('nav',{
//         marginTop:0,
//     },"<")
// })

// header

gsap.to('.head-bg', {
    y: 100,
    scrollTrigger: {
        trigger: 'header',
        start: 'center center',
        end: 'bottom center',
        endTrigger: '#body1',
        scrub: 1,
    }
})
const head_carousel = {
    0: `<span class="color2">慢動作探索城市，品味初秋思愁</span>`,
    1: `活動期間：<span class="color2 fw-bold">2023 年 10 月份，週五/週六/週日</span><br>
    <span class="color2 fw-bold">(每週五晚間 18:00-22:00)</span><br>
    <span class="color2 fw-bold">(每週六日上午 10:00 至下午 21:00)</span><br>
    `,
    2: `<span class="color2 fw-bold">免費入場</span>，可根據自己的興趣參加不同主題的活動和品味美食<br>
    活動地點：<span class="color2 fw-bold">台中市西區林森路33號</span>
    `
}
q('#head-carousel').addEventListener('slide.bs.carousel', (e) => {
    gsap.to('.head-text', {
        duration: 5,
        text: {
            value: head_carousel[e.to],
            speed: 1,
        }
    })
})
// body1

var body1_swiper = new Swiper('.body1-swiper', {
    slidesPerView: 3,
    spaceBetween: 30,
    breakpoints: {
        1: {
            slidesPerView: 1.2,
        },
        1080: {
            slidesPerView: 3,
        },
    }
})
body1_card_data.forEach((item) => {
    body1_swiper.appendSlide(`
    <div class="swiper-slide">
        <div class="card body1-card">
            <h1 class="card-title body1-card-title fw-bold">${item.title}</h1>
            <div class="overflow-hidden">
                <img src="${item.img}" alt="" class="card-img-top body1-card-img">
            </div>
            <div class="card-body body1-card-body">
                <p class="card-text f6 taj lep" >${item.text}</p>
            </div>
        </div>
    </div>
    `)
})

gsap.from('.body1-card', {
    y: 100,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger: '#body1',
        start: '20% center',
        end: 'center center',
    },
})
// gsap.to('main',{
//     y:-1 * q('#body1').offsetHeight,
//     scrollTrigger:{
//         trigger:'header',
//         start:'top top',
//         end:'bottom top',
//         pin:true,
//         scrub:true,
//         ease:'linear',
//         markers:true,
//     },
// })

// body2

var body2_swiper = new Swiper('.body2-swiper', {
    slidesPerView: 4,
    breakpoints: {
        1: {
            slidesPerView: 1.5,
        },
        1080: {
            slidesPerView: 4,
        },
    }
})
var body2_card_swiper = new Swiper('.body2-card-swiper',{
    slidesPerView: 4,
    spaceBetween:10,
    breakpoints: {
        1: {
            slidesPerView: 1.5,
            centeredSlides:true,
        },
        1080: {
            slidesPerView: 4,
        },
    }
})
mobile.forEach((item, index) => {
    body2_swiper.appendSlide(`
    <div class="swiper-slide">
        <div id="${item}" class="eeee ${index === 0 || index === 2 ? 'body2-btn' : 'body2-btn2'} ${item === mobile_click ? 'active' : ''}" onclick="body2_btn_click(event)">
            <p class="f7">${mobile_title[index].p}</p>
            <h1 class="f5">${mobile_title[index].title}<br>
                「${item}」
            </h1>
        </div>
    </div>
    `)
})
gsap.to('.body2-btn', {
    y: 50,
    duration: 2,
    yoyo: true,
    repeat: -1,
    ease: 'linear'
})
gsap.to('.body2-btn2', {
    y: -50,
    duration: 2,
    yoyo: true,
    repeat: -1,
    ease: 'linear'
})

function mobile_fun() {
    body2_card_swiper.removeAllSlides()
    mobile_card_data[mobile_click].forEach((item) =>{
        body2_card_swiper.appendSlide(`
        <div class="swiper-slide">
            <div class="card body2-card">
                <img src="${item.img}" alt="" class="card-img-top body2-img">
                <div class="card-body">
                    <h1 class="card-title body2-title f5 text-center fw-bold">${item.title}</h1>
                    <p class="card-text body2-text f6">${item.text}</p>
                </div>
            </div>
        </div>
        `)
    })
    q('.body2-a').innerText =`點我查看更多${mobile_click}活動資訊`
    q('.body2-a').href = `${body2_href[mobile_click]}`
    var body2_img_gsap = gsap.timeline()
    .to('.body2-card', {
        autoAlpha: 0,
        ease: 'linear',
        duration: .2,
    })
    .fromTo('.body2-card', 
    {autoAlpha: 0,},
    {
        autoAlpha: 1,
        ease: 'linear',
        duration: .2,
    }, '>')
}
function body2_btn_click(e) {
    mobile_click = e.currentTarget.id
    qa('.eeee').forEach((item)=>{
        item.classList.remove('active')
    })
    e.currentTarget.classList.add('active')
    mobile_fun()
}
mobile_fun()
gsap_media.add('(min-width:1080px)',()=>{
    gsap.from('.body2-card-swiper',{
        xPercent:100,
        ease:'linear',
        scrollTrigger:{
            trigger:'#body2',
            start:'top center',
            end:'45% center',
            scrub:true,
            // markers:true,
        },
    })
})
// body3

function body3_click(e){
    var sss = e.target.innerText
    qa('.body3-click').forEach((item)=>{
        item.classList.remove('active')
    })
    e.target.classList.add('active')
    
    q('.body3-right').innerHTML = `
    <div class="body3-right-text-box w-100 h-100">
        <p class="f7 fw-bold text-center">寶島慢播假日市集</p>
        <h1 class="f7 fw-bold text-center">2023年<br>
            10月份活動日歷</h1>
        <h1 class="f4 fw-bold text-center" style="line-height: 1.4;">${body3_data[sss].date}<br>${body3_data[sss].title}</h1>
        <p class="f6 text-center">
            ${body3_data[sss].text}
        </p>
    </div>
    `
    gsap.from('.body3-right-text-box',{
        autoAlpha:0,
        duration:.5,
    })
}

// body4

var body4_swiper = new Swiper('.body4-swiper', {
    slidesPerView: 4,
    centeredSlides: true,
    breakpoints: {
        1: {
            slidesPerView: 1.2,
            spaceBetween: 20,
            noSwiping: false,
        },
        1080: {
            slidesPerView: 4,
            spaceBetween: 0,
            noSwiping: true,
        },
    },
})

//





// gsap_media.add('(min-width:1080px)', () => {
//     gsap.from('.body3-img', {
//         x: 300,
//         autoAlpha: 0,
//         duration: 1,
//         ease: "bounce.out",
//         scrollTrigger: {
//             trigger: '#body3',
//             start: 'top center',
//             end: 'center center',
//         }
//     })
// })

// body5

// gsap_media.add('(min-width:1080px)', () => {
//     gsap.to('.body4-swiper-wrapper', {
//         x: 0,
//         duration: 2,
//         scrollTrigger: {
//             trigger: '.body4-swiper',
//             start: 'top center',
//             end: 'center center',
//             scrub: 1,
//         }
//     })
// })
var body5_swiper = new Swiper('.body5-swiper', {
    grabCursor: true,
    slidesPerView: 1,
    spaceBetween: 20,
    centeredSlides: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.body5-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.body5-swiper-next',
        prevEl: '.body5-swiper-prev',
    },
})
body5_data.forEach((item, index) => {
    body5_swiper.appendSlide(`
    <div class="swiper-slide">
        <div class="forum">
            <div>
                <h1 class="f5 forum-name">${item.name}</h1>
                <p class="text-end">${item.email}</p>
            </div>
            <div class="forum-content p-3">
                <p class="f7">
                    ${item.text}
                </p>
            </div>
        </div>
    </div>
    `)
})
Chart.defaults.font.size = 18
Chart.defaults.color = '#79AC78'
const body5_chart = new Chart(q('#body5-chart'), {
    type: 'doughnut',
    data: {
        labels: ['第一週「歷史之旅」', '第二週「城市大自然」', '第三週「街頭藝術之旅」', '第四週「多元文化探索」'],
        datasets: [{
            label: '萬人',
            data: [300, 330, 280, 320],
            backgroundColor: [
                '#79AC78',
                '#E9B824',
                '#6499E9',
                '#FF8080'
            ]
        }]
    },
})


// body6

function body6() {
    q('.serve-btn-box').innerHTML = ''
    body6_btn.forEach((item) => {
        q('.serve-btn-box').innerHTML += `
            <div id="${item}" class="my-3 serve-btn fw-bold ${item === body6_click ? 'active' : ''}" onclick="body6_a(event)">${item}</div>
        `
    })
    gsap.from('.body6-text', {
        y: 50,
        opacity: 0,
        duration: .5,
    })
    q('.body6-text').innerHTML = `${body6_data[body6_click]}`
}
function body6_a(e) {
    body6_click = e.currentTarget.id
    body6()
}
body6()

var message_name = []
var message_email = []
var message_text = []

function message_submit(event) {
    if (q('form input').value != '') {
        message_name.push(q('.message-name').value)
        message_email.push(q('.message-email').value)
        message_text.push(q('.message-text').value)
        localStorage.setItem('message-name', JSON.stringify(message_name))
        localStorage.setItem('message-email', JSON.stringify(message_email))
        localStorage.setItem('message-text', JSON.stringify(message_text))
        body5_swiper.appendSlide(`
        <div class="swiper-slide">
            <div class="forum">
                <div>
                    <h1 class="f5 forum-name">${q('.message-name').value}</h1>
                    <p class="text-end">${q('.message-email').value}</p>
                </div>
                <div class="forum-content p-3">
                    <p class="f7">${q('.message-text').value}</p>
                </div>
            </div>
        </div>
        `)
        q('.message-name').value = ''
        q('.message-email').value = ''
        q('.message-text').value = ''
        location.href = '#body5'
        body5_swiper.slideTo(body5_swiper.slides.length - 1, 0)
        body5_swiper.autoplay.start()
    }
}
window.addEventListener('load', () => {
    const local_name = JSON.parse(localStorage.getItem('message-name')) || []
    const local_email = JSON.parse(localStorage.getItem('message-email')) || []
    const local_text = JSON.parse(localStorage.getItem('message-text')) || []
    local_name.forEach((item, index) => {
        body5_swiper.appendSlide(`
        <div class="swiper-slide">
            <div class="forum">
                <div>
                    <h1 class="f5 forum-name">${item}</h1>
                    <p class="text-end">${local_email[index]}</p>
                </div>
                <div class="forum-content p-3">
                    <p class="f7">${local_text[index]}</p>
                </div>
            </div>
        </div>
        `)
    })
    message_name = message_name.concat(local_name)
    message_email = message_email.concat(local_email)
    message_text = message_text.concat(local_text)
})

// 
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




function gsap_title_anim(elem) {
    gsap.from(elem, {
        x: -150,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: elem,
            start: 'top center',
            end: 'center center',
            // markers:true,
        },
    })
}
gsap_title_anim('.title')
gsap_title_anim('.title2')
gsap_title_anim('.title3')
gsap_title_anim('.title4')
gsap_title_anim('.title5')
gsap_title_anim('.title6')

