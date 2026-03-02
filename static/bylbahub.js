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

async function loadScript(url) {
    const response = await fetch(url);
    const code = await response.text();
    
    const script = document.createElement('script');
    script.textContent = code;
    document.head.appendChild(script);
    
    return new Promise(resolve => {setTimeout(resolve, 10)});
}

async function loadScriptsList() {
    try {
        const response = await fetch('https://bylbahub.onrender.com/static/scripts.json');
        const data = await response.json();
        if (data) {
            return data;
        } else {
            return []
        }
    } catch (error) {
        notification(`Error with loading extensions: ${error}`)
    }
}

function setTheme(color) {
    const style = document.getElementById('BylbaHubStyle');
    style.textContent = `
    #BylbaHubContentDiv {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        align-items: flex-start;
        justify-content: flex-start;
        height: 64%;
        width: 98%;
        margin: 1%;
        overflow-y: auto;
        padding: 5px;
    }
    
    .bylbahubbutton {
        font-size: 35px;
        background: #333;
        color: white;
        border: 3px solid #666;
        top: 20px;
        left: 50px;
        border-radius: 7px;
        margin: 6px;
        transition: border-color 0.1s ease;
    }

    .bylbahubbutton:hover {
        border-color: ${color};
    }

    #BylbaHubButton {
        position: fixed;
        left: 2%;
        top: 4%;
    }

    .bylbahublabeldiv, .bylbahubbuttonsdiv {
        height: 13%;
        width: 98%;
        margin: 1%;
    }

    .bylbahubcontentdiv {
        height: 64%;
        width: 98%;
        margin: 1%;
        overflow-y: auto;
    }

    .bylbahubdiv {
        height: 13%;
        width: 98%;
        margin: 1%;
    }

    #BylbaHubLabelDiv {
        height: 13%;
    }

    #BylbaHubButtonsDiv {
        height: 13%;
    }

    #BylbaHubMenu {
        z-index: 999999;
        box-sizing: border-box;
        display: none;
        position: fixed;
        background: #333;
        border: 3px solid ${color};
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
        color: ${color};
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
    
    var elementsToRemove = ['BylbaHubButton', 'BylbaHubMenu'];
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

    const contentDiv = document.getElementById('BylbaHubContentDiv');

    divExtension.style.cssText = 'width: calc(33.33% - 10px); height: auto; min-height: 120px; background: #444; border-radius: 5px; padding: 10px; margin-bottom: 10px; box-sizing: border-box; border: 1px solid #666; margin: 6px;';
    versionTitleExtenstion.style.cssText = 'color: #999;';
    titleExtension.style.cssText = 'font-size: 20px; display: inline-block; font-weight: bold; color: white;';
    aboutExtension.style.cssText = 'font-size: 15px; display: inline-block; color: #999;';

    buttonInstall.className = 'bylbahubbutton';

    buttonInstall.innerText = 'Install';
    titleExtension.innerText = name;
    versionTitleExtenstion.innerText = `(v${version})`
    aboutExtension.innerText = `Description: ${description}\nAuthor: ${author}\nWebsite: ${link}`;

    buttonInstall.onclick=()=>loadScript(importLink);

    divTitle.appendChild(titleExtension);
    divTitle.appendChild(versionTitleExtenstion);

    divAbout.appendChild(aboutExtension);

    divExtension.appendChild(divTitle);
    divExtension.appendChild(divAbout);
    divExtension.appendChild(buttonInstall);

    contentDiv.appendChild(divExtension);
}

function appendTheme(color) {
    const buttonTheme = document.createElement('button');

    const contentDiv = document.getElementById('BylbaHubContentDiv');

    buttonTheme.style.cssText = ` width: calc(20% - 10px); height: 60px; background: ${color}; border-radius: 7px; border: 3px solid #666; margin: 5px; cursor: pointer; transition: transform 0.2s; box-sizing: border-box;`;

    buttonTheme.onclick=()=>setTheme(color);

    contentDiv.appendChild(buttonTheme);
}

async function changeBylbaHubMenu(menu) {
    const contentDiv = document.getElementById('BylbaHubContentDiv');

    contentDiv.innerHTML = '';
    if (menu === 'Hub') {
        const jsonList = await loadScriptsList();
        if (jsonList) {
            jsonList.forEach(extension => {
                appendExtension(extension.name, extension.version, extension.link, extension.scriptUrl, extension.author, extension.description);
            });
        } else {
            notification("Error with loading extension")
        }
    } else if (menu === 'Theme') {
        appendTheme('rgb(204, 43, 43)');
        appendTheme('rgb(244, 153, 67)');
        appendTheme('rgb(235, 223, 46)');
        appendTheme('rgb(99, 204, 43)');
        appendTheme('rgb(48, 224, 159)');
        appendTheme('rgb(53, 234, 237)');
        appendTheme('rgb(57, 186, 241)');
        appendTheme('rgb(100, 110, 248)');
        appendTheme('rgb(156, 83, 240)');
        appendTheme('rgb(164, 43, 204)');
        appendTheme('rgb(255, 154, 248)');
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
    labelDiv.className = 'bylbahublabeldiv';
    label1.className = 'bylbahublabel';
    label2.className = 'bylbahublabel';
    buttonsDiv.className = 'bylbahubbuttonsdiv';
    buttonHub.className = 'bylbahubbutton';
    buttonTheme.className = 'bylbahubbutton';
    buttonPanic.className = 'bylbahubbutton';
    contentDiv.className = 'bylbahubcontentdiv';

    button.innerText = 'BylbaHub';
    buttonHub.innerText = 'Hub';
    buttonTheme.innerText = 'Themes';
    buttonPanic.innerText = 'Panic';
    label1.innerText = 'Bylba';
    label2.innerText = 'Hub';

    style.textContent = `
    #BylbaHubContentDiv {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        align-items: flex-start;
        justify-content: flex-start;
        height: 64%;
        width: 98%;
        margin: 1%;
        overflow-y: auto;
        padding: 5px;
    }

    .bylbahubbutton {
        font-size: 35px;
        background: #333;
        color: white;
        border: 3px solid #666;
        top: 20px;
        left: 50px;
        border-radius: 7px;
        margin: 6px;
        transition: border-color 0.1s ease;
    }

    .bylbahubbutton:hover {
        border-color: #cc2b2b;
    }

    #BylbaHubButton {
        position: fixed;
        left: 2%;
        top: 4%;
    }

    .bylbahublabeldiv, .bylbahubbuttonsdiv {
        height: 13%;
        width: 98%;
        margin: 1%;
    }

    .bylbahubcontentdiv {
        height: 64%;
        width: 98%;
        margin: 1%;
        overflow-y: auto;
    }

    .bylbahubdiv {
        height: 13%;
        width: 98%;
        margin: 1%;
    }

    #BylbaHubLabelDiv {
        height: 13%;
    }

    #BylbaHubButtonsDiv {
        height: 13%;
    }

    #BylbaHubMenu {
        z-index: 999999;
        box-sizing: border-box;
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

    changeBylbaHubMenu('Hub');

    notification("BylbaHub successfully injected");
}
