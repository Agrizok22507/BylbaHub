var respBackground = 'none';

function notification(text) {
    const notif = document.createElement('div');
    notif.textContent = text;
    notif.id = 'notification'
    notif.style.cssText = 'position: fixed; top: 20px; right: -300px; background: #333; color: white; border: 2px solid #666; padding: 15px; font-family: sans-serif; z-index: 9999; transition: right 0.3s ease, opacity 0.3s ease; opacity: 0; border-radius: 3px;';
    document.body.appendChild(notif);
    setTimeout(() => {
        notif.style.right = '20px';
        notif.style.opacity = '0.8';
    }, 10);
    setTimeout(() => {
        notif.style.right = '-300px';
        notif.style.opacity = '0';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

function displayElement(element, display) {
    document.getElementById(element).style.display = display;
}

function hexToRGB(hex) {
    if (hex.startsWith('#')) {
        hex = hex.slice(1)
    }
    return `rgb(${parseInt(hex.substring(0, 2), 16)}, ${parseInt(hex.substring(2, 4), 16)}, ${parseInt(hex.substring(4, 6), 16)})`;
  }

function makeAllResponses(value) {
    if (value === "true") {
        var resp = document.querySelectorAll(`td[style="text-align: center; background: ${respBackground}; letter-spacing: 2px;"]`);
        resp.forEach(element => {
            let nextElement = element.nextElementSibling;
            if (nextElement) {
                element.innerText = nextElement.innerText;
                element.style.background = hexToRGB('#c0ffc0');
            }
        });
        respBackground = hexToRGB('#c0ffc0');
        notification("Results successfully was edited on True")
    } else if (value === "truefalse") {
        var resp = document.querySelectorAll(`td[style="text-align: center; background: ${respBackground}; letter-spacing: 2px;"]`);
        resp.forEach(element => {
            let nextElement = element.nextElementSibling;
            if (nextElement) {
                element.innerText = nextElement.innerText.slice(0, Math.ceil(nextElement.innerText.length / 2));
                element.style.background = hexToRGB('#ffffc0');
            }
        });
        respBackground = hexToRGB('#ffffc0');
        notification("Results successfully was edited on Partially true")
    } else if (value === "false") {
        var resp = document.querySelectorAll(`td[style="text-align: center; background: ${respBackground}; letter-spacing: 2px;"]`);
        resp.forEach(element => {
            element.innerText = Math.floor(Math.random() * 101);
            element.style.background = hexToRGB('#ffc0c0');
        });
        respBackground = hexToRGB('#ffc0c0');
        notification("Results successfully was edited on False")
    } else if (value === "none") {
        var resp = document.querySelectorAll(`td[style="text-align: center; background: ${respBackground}; letter-spacing: 2px;"]`);
        resp.forEach(element => {
            element.innerText = "";
            element.style.background = hexToRGB('#ffffff');
        });
        respBackground = hexToRGB('#ffffff');
        notification("Results successfully was edited on None")
    }
}

function panic() {
    navigator.clipboard.writeText(Math.floor(Math.random() + Math.random()));
    document.getElementById('bylbavprMenu')?.remove();
    document.getElementById('notification')?.remove();
    document.getElementById('btnTogglebylbavprMenu')?.remove();
}

function copyCode() {
    navigator.clipboard.writeText("fetch('https://gist.githubusercontent.com/Agrizok22507/476f3f618a6e998928f8c3408a34119b/raw/e075f62bdb76dae2d4e5a6d251769e01ec1810f1/bylbaVPR.js').then(r=>r.text()).then(eval)");
    notification("Code successfully was copied")
}

function createMenuBylbaVPR() {
    const menu = document.createElement('div');
    menu.style.cssText = 'display: none; position: fixed; background: #333; border: 2px solid #666; border-radius: 10px; top: 50%; left: 50%; height: 250px; width: 420px; padding: 20px;';
    menu.id = 'bylbavprMenu';

    const label = document.createElement('span');
    label.innerText = 'BylbaVPR';
    label.style.cssText = 'font-size: 35px; background: linear-gradient(180deg, #9e34eb, #eb34a4, #34ebd8); background-size: 100% 300%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: gradientMove 3s ease infinite; display: inline-block; font-weight: bold;';

    const MARselect = document.createElement('select');
    MARselect.style.cssText = 'font-size: 25px; display: block; margin: 10px;'
    MARselect.id = 'MARselect';

    const MARoptionTrue = document.createElement('option');
    const MARoptionTrueFalse = document.createElement('option');
    const MARoptionFalse = document.createElement('option');
    const MARoptionNone = document.createElement('option');

    MARoptionTrue.value = 'true';
    MARoptionTrueFalse.value = 'truefalse';
    MARoptionFalse.value = 'false';
    MARoptionNone.value = 'none';

    MARoptionTrue.innerText = 'Верно';
    MARoptionTrueFalse.innerText = 'Почти верно';
    MARoptionFalse.innerText = 'Неверно';
    MARoptionNone.innerText = 'Нет ответа';

    MARselect.appendChild(MARoptionTrue);
    MARselect.appendChild(MARoptionTrueFalse);
    MARselect.appendChild(MARoptionFalse);
    MARselect.appendChild(MARoptionNone);

    const MARbtn = document.createElement('button');
    MARbtn.innerText = "Исполнить";
    MARbtn.style.cssText = 'font-size: 25px; background: #333; color: white; border: 2px solid #666; top: 20px; left: 50px; border-radius: 7px; margin: 10px;';
    MARbtn.onclick=()=>makeAllResponses(document.getElementById('MARselect').value)

    const panicbtn = document.createElement('button');
    panicbtn.innerText = 'Скрыть';
    panicbtn.style.cssText = 'font-size: 25px; background: #333; color: white; border: 2px solid #666; top: 20px; left: 50px; border-radius: 7px; margin: 10px;';
    panicbtn.onclick=()=>panic()

    const copybtn = document.createElement('button');
    copybtn.innerText = 'Скопировать код для загрузки';
    copybtn.style.cssText = 'font-size: 25px; background: #333; color: white; border: 2px solid #666; top: 20px; left: 50px; border-radius: 7px; margin: 10px;';
    copybtn.onclick=()=>copyCode()

    menu.appendChild(label);
    menu.appendChild(MARselect);
    menu.appendChild(MARbtn);
    menu.appendChild(panicbtn);
    menu.appendChild(copybtn);

    const gradientAnimation = document.createElement('style');
    gradientAnimation.textContent = `
        @keyframes gradientMove {
            0% { background-position: 0% 0%; }
            50% { background-position: 0% 100%; }
            100% { background-position: 0% 0%; }
        }
    `;
    document.head.appendChild(gradientAnimation);

    document.body.appendChild(menu);
}

function toggleBylbaVPRMenu() {
    if (document.getElementById('bylbavprMenu').style.display === 'none') {
        displayElement('bylbavprMenu', 'block')
    } else {
        displayElement('bylbavprMenu', 'none')
    }
}

var resp = document.querySelectorAll('td[style="text-align:center;background:none;letter-spacing: 2px;"]');
resp.forEach(element => {
    element.style.cssText = 'text-align: center; background: none; letter-spacing: 2px;';
});

const btnhover = document.createElement('style');
btnhover.textContent = `
    button:hover {
        background: #666;
        border-color: #999;
        transform: scale(1.05);
    }
`;
document.head.appendChild(btnhover);

const btn = document.createElement('button');
btn.innerText = 'BylbaVPR';
btn.id = 'btnTogglebylbavprMenu';
btn.style.cssText = 'position: fixed; font-size: 25px; background: #333; color: white; border: 2px solid #666; top: 20px; left: 50px; border-radius: 5px;';
btn.onclick=()=>toggleBylbaVPRMenu()
document.body.appendChild(btn);

createMenuBylbaVPR();
notification("BylbaVPR successfully loaded!");
