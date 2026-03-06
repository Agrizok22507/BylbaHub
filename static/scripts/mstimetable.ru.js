const toolbar = document.getElementsByClassName('v-toolbar__content');
const classes = document.getElementsByClassName('breadcrumbs-container'); 
const main = document.getElementsByClassName('v-main');
const bottomBar = document.getElementsByClassName('v-footer modern-footer v-sheet theme--light v-footer--absolute');
const logo = document.getElementsByClassName('logo-text');
const lessonsMenus = document.getElementsByClassName('row mt-8');
const lessons = document.getElementsByClassName('lessons-col col col-12');
const weekdayName = document.getElementById('weekday-name');
const school = document.getElementsByClassName('header-site clickable');
const schoolText = document.getElementsByClassName('site-name');
const buttonMenu = document.createElement("button");
buttonMenu.textContent = "TOOLS";
buttonMenu.style.cssText = 'position: fixed; top: 25px; right: 25px; background: #181720; padding: 10px; z-index: 10000; color: white; border:none; border-radius: 20px;';
buttonMenu.onclick = openToolsMenu;

const menu = document.createElement("div");
menu.style.cssText = 'position: fixed; top: 100px; left: 600px; background: #181720; padding: 10px; z-index: 10000; color: white; width: 500px; height: 400px; border:none; border-radius: 20px; display: none;';

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'darkblue', 'violet', 'red-static', 'orange-static', 'yellow-static', 'green-static', 'blue-static', 'darkblue-static', 'violet-static'];
const buttons = [];

colors.forEach(color => {
    const btn = document.createElement("button");
    btn.textContent = color;
    btn.style.cssText = 'position: relactive; padding: 10px; margin: 10px; background: #312f41ff; color: white; border: none; border-radius: 10px; font-size: 25px; font-family: "Arial";'
    btn.onclick = () => changeAllToColor(color);
    buttons.push(btn);
    menu.appendChild(btn);
});

const closeBtn = document.createElement("button");
closeBtn.textContent = "X";
closeBtn.style.cssText = 'position: relactive; top: 5px; left: 5px; color: red; border: none; border-radius: 10px; font-size: 25px; font-family: "Arial";'
closeBtn.onclick = closeMenu;
menu.appendChild(closeBtn);

document.body.appendChild(buttonMenu);
document.body.appendChild(menu);

function changeAllToColor(color) {
    ChangeBG(toolbar, color);
    ChangeBG(classes, color);
    ChangeBG(main, color);
    ChangeBG(lessonsMenus, color);
    ChangeBG(lessons, color);
    ChangeBG(school, color);
    ChangeBG(weekdayName, color);
}

function changeAllToDarkOrLightTheme(theme) {
    if (theme === 'dark') {
        setDarkTheme(logo);
        setDarkTheme(schoolText);
    } else if (theme === 'light') {
        setLightTheme(logo);
        setLightTheme(schoolText);
    }
}

function ChangeBG(element, color) {
    for (let i = 0; i < element.length; i++) {
        if (color === 'red') {
            changeAllToDarkOrLightTheme('dark');
            element[i].style.background = 'linear-gradient(to bottom, #d93333ff, #9f1919ff)';
        } else if (color === 'orange') {
            changeAllToDarkOrLightTheme('light');
            element[i].style.background = 'linear-gradient(to bottom, #dd9854ff, #ea890aff)';
        } else if (color === 'yellow') {
            changeAllToDarkOrLightTheme('light');
            element[i].style.background = 'linear-gradient(to bottom, #f8e271ff, #e8c80eff)';
        } else if (color === 'green') {
            changeAllToDarkOrLightTheme('light');
            element[i].style.background = 'linear-gradient(to bottom, #48db3dff, #1ba31fff)';
        } else if (color === 'blue') {
            changeAllToDarkOrLightTheme('dark');
            element[i].style.background = 'linear-gradient(to bottom, #519adfff, #1756a3ff)';
        } else if (color === 'darkblue') {
            changeAllToDarkOrLightTheme('dark');
            element[i].style.background = 'linear-gradient(to bottom, #444bceff, #181a85ff)';
        } else if (color === 'violet') {
            changeAllToDarkOrLightTheme('dark');
            element[i].style.background = 'linear-gradient(to bottom, #824adcff, #611896ff)';
        } else if (color === 'red-static') {
            changeAllToDarkOrLightTheme('dark');
            element[i].style.background = '#ea1a1aff';
        } else if (color === 'orange-static') {
            changeAllToDarkOrLightTheme('light');
            element[i].style.background = '#f28d28ff';
        } else if (color === 'yellow-static') {
            changeAllToDarkOrLightTheme('light');
            element[i].style.background = '#f8d424ff';
        } else if (color === 'green-static') {
            changeAllToDarkOrLightTheme('light');
            element[i].style.background = '#36f028ff';
        } else if (color === 'blue-static') {
            changeAllToDarkOrLightTheme('dark');
            element[i].style.background = '#3593ebff';
        } else if (color === 'darkblue-static') {
            changeAllToDarkOrLightTheme('dark');
            element[i].style.background = '#222bd8ff';
        } else if (color === 'violet-static') {
            changeAllToDarkOrLightTheme('dark');
            element[i].style.background = '#6922dbff';
        }
    }
}

function addTransparent(element) {
    for (let i = 0; i < element.length; i++) {
        element[i].style.opacity = '0.5';
    }
}

function setDarkTheme(element) {
    for (let i = 0; i < element.length; i++) {
        element[i].style.color = 'white';
    }
}

function setLightTheme(element) {
    for (let i = 0; i < element.length; i++) {
        element[i].style.color = '#303030';
    }
}

function closeMenu() {
    menu.style.display = 'none';
}

function openToolsMenu() {
    menu.style.display = 'block';
}

changeAllToColor('green');
