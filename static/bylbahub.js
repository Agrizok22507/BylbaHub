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

function setTheme(color) {
    const elementsWithBorder = ['BylbaHubButton', 'BylbaHubMenu', 'BylbaHubButtonHub', 'BylbaHubButtonTheme', 'BylbaHubButtonPanic', 'BylbaHubLabel', 'BylbaHubStyle'];
    elementsWithBorder.forEach(currentElementForToChangeBorder=>{
        var element = document.getElementById(currentElementForToChangeBorder);
        element.style.border = color;
    });
    
    document.getElementById('BylbaHubStyle').textContent = `
    button:hover {
        background: #666;
        border-color: ${color};
    }
    `;
}

function toggleBylbaHub() {
    if (document.getElementById('BylbaHubMenu').style.display === 'none') {
        document.getElementById('BylbaHubMenu').style.display = 'block';
    } else {
        document.getElementById('BylbaHubMenu').style.display = 'none';
    }
}

function panicMode() {
    navigator.clipboard.writeText("fetch('https://bylbahub.onrender.com/static/main.js').then(r=>r.text()).then(eval)");
    
    var elementsToRemove = ['BylbaHubButton', 'BylbaHubMenu', 'BylbaHubButtonHub', 'BylbaHubButtonTheme', 'BylbaHubButtonPanic', 'BylbaHubLabel', 'BylbaHubStyle'];
    elementsToRemove.forEach(currentElementToRemove => {document.getElementById(currentElementToRemove)?.remove();});

    notification("Panic mode: ON");
}

function appendExtension(name, version, link, importLink, author, description) {
    const divExtension = document.createElement('div');
    const divTitle = document.createElement('div');
    const titleExtension = document.createElement('span');
    const versionTitleExtenstion = document.createElement('span');
    const divAbout = document.createElement('div');
    const aboutExtension = document.createElement('span');
    const buttonInstall = document.createElement('button');

    const menu = document.getElementById('BylbaHubMenu');

    divExtension.style.cssText = 'width: 33%; height: 98%;';
    versionTitleExtenstion.style.cssText = 'color: #999;';

    titleExtension.className = 'bylbahublabel';
    aboutExtension.className = 'bylbahublabel';
    buttonInstall.className = 'bylbahubbutton';

    titleExtension.innerText = name;
    versionTitleExtenstion.innerText = `(v${version})`
    aboutExtension.innerText = `Description: ${description}\nAuthor: ${author}\nWebsite: ${link}`;

    buttonInstall.onclick=()=>`const script = document.createElement('script);
    const resp = await fetch(${importLink});

    script.textContent = resp;
    document.head.appendChild(script);`;

    divTitle.appendChild(titleExtension);
    divTitle.appendChild(versionTitleExtenstion);

    divAbout.appendChild(aboutExtension);

    divExtension.appendChild(divTitle);
    divExtension.appendChild(divAbout);
    divExtension.appendChild(buttonInstall);

    menu.appendChild(divExtension);
}

function changeBylbaHubMenu(menu) {
    if (menu === 'Hub') {
        const rgr = '';
    }
}

function initilizeBylbaHub() {
    const button = document.createElement('button');
    const menu = document.createElement('div');
    const labelDiv = document.createElement('div');
    const label1 = document.createElement('span')
    const label2 = document.createElement('span')
    const buttonsDiv = document.createElement('div');
    const buttonHub = document.createElement('button');
    const buttonTheme = document.createElement('button');
    const buttonPanic = document.createElement('button');
    const contentDiv = document.createElement('div');
    const style = document.createElement('style');

    button.id = 'BylbaHubButton';
    menu.id = 'BylbaHubMenu';
    labelDiv.id = 'BylbaHubLabelDiv';
    label1.id = 'BylbaHubLabel1';
    label2.id = 'BylbaHubLabel2';
    buttonsDiv.id = 'BylbaHubButtonsDiv';
    buttonHub.id = 'BylbaHubButtonHub';
    buttonTheme.id = 'BylbaHubButtonTheme';
    buttonPanic.id = 'BylbaHubButtonPanic';
    contentDiv.id = 'BylbaHubContentDiv';
    style.id = 'BylbaHubStyle';

    button.className = 'bylbahubbutton';
    labelDiv.className = 'bylbahubdiv';
    label1.className = 'bylbahublabel';
    label2.className = 'bylbahublabel';
    buttonsDiv.className = 'bylbahubdiv';
    buttonHub.className = 'bylbahubbutton';
    buttonTheme.className = 'bylbahubbutton';
    buttonPanic.className = 'bylbahubbutton';
    contentDiv.className = 'bylbahubdiv';

    button.innerText = 'BylbaHub';
    buttonHub.innerText = 'Hub';
    buttonTheme.innerText = 'Themes';
    buttonPanic.innerText = 'Panic';
    label1.innerText = 'Bylba';
    label2.innerText = 'Hub';

    style.textContent = `
    .bylbahubbutton {
        font-size: 35px;
        background: #333;
        color: white;
        border: 3px solid #666;
        top: 20px;
        left: 50px;
        border-radius: 7px;
        margin: 6px;
        transition: border-color 0.1s ease,;
    }

    .bylbahubbutton:hover {
        border-color: #cc2b2b;
    }

    #BylbaHubButton {
        position: fixed;
        left: 2%;
        top: 4%;
    }

    .bylbahubdiv {
        height: 13%;
        width: 98%;
        margin: 1%;
    }

    #BylbaHubLabelDiv BylbaHubButtonsDiv {
        height: 13%;
    }

    #BylbaHubButtonsDiv {
        height: 74%;
    }

    #BylbaHubMenu {
        display: none;
        position: fixed;
        background: #333;
        border: 3px solid #cc2b2b;
        border-radius: 10px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 35%;
        width: 50%;
        padding: 5px;
    }

    .bylbahublabel {
        font-size: 35px;
        display: inline-block;
        font-weight: bold;
    }

    #BylbaHubLabel1 {
        color: #ffffff;
    }

    #BylbaHubLabel2 {
        color: #cc2b2b;
    }
    `;

    button.onclick=()=>toggleBylbaHub();
    buttonHub.onclick=()=>changeBylbaHubMenu('Hub');
    buttonTheme.onclick=()=>changeBylbaHubMenu('Theme');
    buttonPanic.onclick=()=>panicMode();

    buttonsDiv.appendChild(buttonHub);
    buttonsDiv.appendChild(buttonTheme);
    buttonsDiv.appendChild(buttonPanic);
    labelDiv.appendChild(label1);
    labelDiv.appendChild(label2);

    menu.appendChild(labelDiv);
    menu.appendChild(buttonsDiv);
    menu.appendChild(contentDiv);

    document.head.appendChild(style);
    document.body.appendChild(button);
    document.body.appendChild(menu);

    notification("BylbaHub successfully injected");
}
