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

function setTheme(color1, color2, color3) {
    styleText = `
    @keyframes gradientMove {
        0% { background-position: 0% 0%; }
        50% { background-position: 0% 100%; }
        100% { background-position: 0% 0%; }
    }

    @keyframes animateBorder {
        0% { border: 3px solid ${color1}; }
        25% { border: 3px solid ${color2}; }
        50% { border: 3px solid ${color3}; }
        75% { border: 3px solid ${color2}; }
        100% { border: 3px solid ${color1}; }
    }

    button:hover {
        background: #666;
        border-color: #999;
        transform: scale(1.02) rotate(15deg);
    }
    `

    const elementsWithBorder = ['BylbaConsoleMenu', 'BylbaConsolebtn', 'BylbaConsolebtnExecute', 'BylbaConsolebtnPanic', 'BylbaConsolebtnCopy', 'BylbaConsolebtnPaste', 'BylbaConsolebtnClear'];
    elementsWithBorder.forEach(currentElementForToChangeBorder=>{
        var element = document.getElementById(currentElementForToChangeBorder);
        element.style.border = color1;
        element.animation = 'animateBorder 3s ease infinite;';
    });
    document.getElementById('BylbaConsoleStyle').textContent = styleText;
    document.getElementById('BylbaConsoleLabel').style.cssText = `font-size: 35px; background: linear-gradient(180deg, ${color1}, ${color2}, ${color3}); background-size: 100% 300%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: gradientMove 3s ease infinite; display: inline-block; font-weight: bold;`;
}

function toggleBylbaHub() {
    if (document.getElementById('BylbaConsoleMenu').style.display === 'none') {
        document.getElementById('BylbaConsoleMenu').style.display = 'block';
    } else {
        document.getElementById('BylbaConsoleMenu').style.display = 'none';
    }
}

function panicMode() {
    navigator.clipboard.writeText("fetch('https://raw.githubusercontent.com/Agrizok22507/BylbaHub/main/main/main.js').then(r=>r.text()).then(eval)");
    
    var elementsToRemove = ['BylbaConsoleMenu', 'BylbaConsolebtn', 'BylbaConsoleLabel', 'BylbaConsoleInput', 'BylbaConsolebtnExecute', 'BylbaConsolebtnPanic', 'BylbaConsolebtnCopy', 'BylbaConsolebtnPaste', 'BylbaConsolebtnClear'];
    elementsToRemove.forEach(currentElementToRemove => {document.getElementById(currentElementToRemove)?.remove();});

    notification("Panic mode: ON");
}

function initilizeBylbaHub() {
    const button = document.createElement('button');
    const menu = document.createElement('div');
    const buttonHub = document.createElement('button');
    const buttonTheme = document.createElement('button');
    const buttonPanic = document.createElement('button');
    const label = document.createElement('span')
    const style = document.createElement('style');

    button.id = 'BylbaHubButton';
    menu.id = 'BylbaHubMenu';
    buttonHub.id = 'BylbaHubButtonHub';
    buttonTheme.id = 'BylbaHubButtonTheme';
    buttonPanic.id = 'BylbaHubButtonPanic';
    label.id = 'BylbaHubLabel';
    style.id = 'BylbaHubStyle';

    button.style.cssText = 'position: fixed; font-size: 25px; background: #333; color: white; border: 3px solid #666; top: 15px; left: 15px; border-radius: 7px; margin: 6px; animation: animateBorder 3s ease infinite;';
    menu.style.cssText = 'display: none; position: fixed; background: #333; border: 3px solid #9e34eb; border-radius: 10px; top: 50%; left: 50%; transform: translate(-50%, -50%); height: 200px; width: 600px; padding: 20px; animation: animateBorder 3s ease infinite;';
    buttonHub.style.cssText = 'font-size: 35px; background: #333; color: white; border: 3px solid #666; top: 20px; left: 50px; border-radius: 7px; margin: 6px; transition: rotate 0.3s ease, scale 0.3s ease, border-color 0.3s ease, background 0.3s ease; animation: animateBorder 3s ease infinite;';
    buttonTheme.style.cssText = 'font-size: 35px; background: #333; color: white; border: 3px solid #666; top: 20px; left: 50px; border-radius: 7px; margin: 6px; transition: rotate 0.3s ease, scale 0.3s ease, border-color 0.3s ease, background 0.3s ease; animation: animateBorder 3s ease infinite;';
    buttonPanic.style.cssText = 'font-size: 35px; background: #333; color: white; border: 3px solid #666; top: 20px; left: 50px; border-radius: 7px; margin: 6px; transition: rotate 0.3s ease, scale 0.3s ease, border-color 0.3s ease, background 0.3s ease; animation: animateBorder 3s ease infinite;';
    label.style.cssText = `font-size: 35px; background: linear-gradient(180deg, #9e34eb, #eb34a4, #34ebd8); background-size: 100% 300%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: gradientMove 3s ease infinite; display: inline-block; font-weight: bold;`;

    button.innerText = 'BylbaHub';
    buttonHub.innerText = 'Hub';
    buttonTheme.innerText = 'Themes';
    buttonPanic.innerText = 'Panic';
    label.innerText = 'BylbaHub';

    style.textContent = `
    @keyframes gradientMove {
        0% { background-position: 0% 0%; }
        50% { background-position: 0% 100%; }
        100% { background-position: 0% 0%; }
    }

    @keyframes animateBorder {
        0% { border: 3px solid #9e34eb; }
        25% { border: 3px solid #eb34a4; }
        50% { border: 3px solid #34ebd8; }
        75% { border: 3px solid #eb34a4; }
        100% { border: 3px solid #9e34eb; }
    }

    button:hover {
        background: #666;
        border-color: #999;
        transform: scale(1.02) rotate(15deg);
    }
    `;

    button.onclick=()=>toggleBylbaHub();
    buttonHub.onclick=()=>panicMode();
    buttonTheme.onclick=()=>panicMode();
    buttonPanic.onclick=()=>panicMode();

    fetch('https://raw.githubusercontent.com/Agrizok22507/BylbaHub/main/main/background.jpg').then(r=>r.blob()).then(b=>{
    const url = URL.createObjectURL(b);
    menu.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url('${url}')`;
    menu.style.backgroundSize = 'cover';
    menu.style.backgroundPosition = 'center';
    menu.style.backgroundRepeat = 'no-repeat';}).catch(console.error);

    menu.appendChild(buttonHub);
    menu.appendChild(buttonTheme);
    menu.appendChild(buttonPanic);
    menu.appendChild(label);

    document.head.appendChild(style);
    document.body.appendChild(button);
    document.body.appendChild(menu);

    notification("BylbaHub successfully injected");
}