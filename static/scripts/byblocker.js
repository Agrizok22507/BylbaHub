let website = null;
let attempt = 0;

function cloneWebsite() {
    const website = document.createDocumentFragment();

    const bodyClone = document.body.cloneNode(true);
    const headClone = document.head.cloneNode(true);

    website.appendChild(headClone);
    website.appendChild(bodyClone);

    return website
}

function removeWebsite() {
    document.head.innerHTML = '';
    document.body.innerHTML = '';
}

function returnWebsite() {
    removeWebsite();

    const head = website.querySelector('head');
    const body = website.querySelector('body');
    
    if (head) {
        Array.from(head.children).forEach(element => {
            const newElement = document.createElement(element.tagName);
            
            Array.from(element.attributes).forEach(attr => {
                newElement.setAttribute(attr.name, attr.value);
            });
            
            newElement.innerHTML = element.innerHTML;
            
            document.head.appendChild(newElement);
        });
    }

    if (body) {
        Array.from(body.children).forEach(element => {
            const newElement = document.createElement(element.tagName);
            
            Array.from(element.attributes).forEach(attr => {
                newElement.setAttribute(attr.name, attr.value);
            });
            
            newElement.innerHTML = element.innerHTML;
            
            document.body.appendChild(newElement);
        });
    }
}

function tryToReturnWebsite(firstRandomValue, secondRandomValue) {
    const value = document.getElementById('byblockerInput').value;

    if (parseInt(value) === parseInt(firstRandomValue) + parseInt(secondRandomValue)) {
        returnWebsite();
        alert("Правильно!");
    } else {
        removeWebsite();
        createByblockerMenu();
        alert("Не правильно, попробуй ещё раз!");
    }
}

function createByblockerMenu() {
    attempt += 1;

    const div = document.createElement('div');
    const title = document.createElement('span');
    const description1 = document.createElement('span');
    const description2 = document.createElement('span');
    const input = document.createElement('input');
    const button = document.createElement('button');
    const firstRandomValue = Math.floor(Math.random() * 101);
    const secondRandomValue = Math.floor(Math.random() * 101);

    title.innerText = 'Byblocker';
    description1.innerText = 'Привет, я добрый блокировщик, я не буду вымогать деньги, а лишь проверю твои математические способности';
    description2.innerText = `Реши пример ${firstRandomValue}+${secondRandomValue}=?`;
    input.placeholder = 'Ответ';
    button.innerText = 'Проверить';

    div.style.cssText = 'z-index: 999999; position: fixed; background:rgb(32, 32, 32); width: 75%; height: 75%; top: 10%; left: 12.5%; display: flex; flex-direction: column; gap: 20px;';
    title.style.cssText = 'font-size: 45px; color: lightgreen; margin: 0; font-weight: bold;';
    description1.style.cssText = 'font-size: 35px; color: white; margin: 0;';
    description2.style.cssText = 'font-size: 35px; color: white; margin: 0;';
    input.style.cssText = 'font-size: 37px; padding: 3px; background: rgb(63, 63, 63); color: white; border-radius: 5px; border: 3px solid rgb(80, 80, 80);';
    button.style.cssText = 'font-size: 40px; padding: 3px; background: rgb(63, 63, 63); color: white; border-radius: 5px; border: 3px solid rgb(80, 80, 80);';

    div.className = 'byblocker';

    input.id = 'byblockerInput';

    input.type = 'number';

    button.onclick=()=>tryToReturnWebsite(firstRandomValue, secondRandomValue)

    if (attempt >= 5) {
        const buttonHelp = document.createElement('button');

        buttonHelp.innerText = 'Мне нужна помощь';

        buttonHelp.style.cssText = 'font-size: 50px; padding: 5px; background: rgb(63, 63, 63); color: white; border-radius: 5px; border: 3px solid rgb(80, 80, 80);';

        buttonHelp.onclick=()=>returnWebsite()

        div.appendChild(buttonHelp);
    }

    div.appendChild(title);
    div.appendChild(description1);
    div.appendChild(description2);
    div.appendChild(input);
    div.appendChild(button);

    document.body.appendChild(div);
}

website = cloneWebsite();
removeWebsite();
createByblockerMenu();
