function panicLNAvito() {
    document.getElementById('lNAvitoButton').remove();
    document.getElementById('LNAvitoMenu').remove();
}

function displayLNAvito() {
    const menu = document.getElementById('LNAvitoMenu');
    if (menu.style.display !== 'none') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
    
}

function changeFaseLNAvito(fase) {
    if (fase) {
        const pinia = window.__pinia || (() => {
        const app = document.querySelector('#app').__vue_app__;
        return app?.config?.globalProperties?.$pinia;
        })();
        
        if (pinia) {
            const screensStore = pinia.state.value.screens;
        
            screensStore.currentIndex = fase;
            alert('✅ Успешно');
        } else {
            alert('❌ Не удалось');
        }
    } else {
        alert("Поле с этапом пустое")
    }
}

function getTrueAnswers() { 
    const app = document.querySelector('#app').__vue_app__;
    if (!app) {
        return alert('❌ Не удалось');
    }
    
    const findGameComponent = (root) => {
        if (root?.type?.name === 'Game') return root;
        if (root?.subTree?.component) return findGameComponent(root.subTree.component);
        if (root?.subTree?.children) {
        for (let child of root.subTree.children) {
            if (child?.component) {
            const found = findGameComponent(child.component);
            if (found) return found;
            }
        }
        }
        return null;
    };
    
    const gameComponent = findGameComponent(app._instance);
    
    if (gameComponent) {
        const props = gameComponent.props;
        console.log('🎮 ТЕКУЩАЯ ИГРА:', props);
        
        if (props.tasks) {
        console.log('✅ ВСЕ ПРАВИЛЬНЫЕ ОТВЕТЫ:');
        props.tasks.forEach((task, i) => {
            if (task.correctAnswer) {
            console.log(`Задание ${i+1}: ${task.correctAnswer}`);
            } else if (task.answer) {
            console.log(`Задание ${i+1}: ${task.answer}`);
            }
        });
        } else if (props.announcements) {
        console.log('✅ ВСЕ ПРАВИЛЬНЫЕ КАТЕГОРИИ:');
        props.announcements.forEach((ann, i) => {
            console.log(`Объявление ${i+1}: категория "${ann.category}", подкатегория "${ann.subcategory}"`);
        });
        }
    } else {
        alert('❌ Не удалось');
    }
}

function createLNAvitoMenu() {
    alert("Меню успешно создано, откройте его по полупрозрачной кнопке в правом вверхнем меню")
    const button = document.createElement('button');
    const menu = document.createElement('div');
    const firstSection = document.createElement('section');
    const label = document.createElement('span');
    const secondSection = document.createElement('section');
    const changeFaseButton = document.createElement('button');
    const threeSection = document.createElement('section');
    const getTrueAnswersButton = document.createElement('button');
    const panicButton = document.createElement('button');
    const faseInput = document.createElement('input');

    button.id = 'lNAvitoButton';
    menu.id = 'LNAvitoMenu';
    faseInput.id = 'LNAvitoInput';
    
    label.innerText = 'LNAvito by baklysha';
    button.innerText = 'LNAvito';
    changeFaseButton.innerText = 'Перейти на этап';
    getTrueAnswersButton.innerText = 'Получить ответы';
    panicButton.innerText = 'Скрыть';
    faseInput.placeholder = 'Этап (0-14)';

    label.style.cssText = `font-size: 30px;
    font-weight: bold;
    color: white;`;
    button.style.cssText = `cursor: pointer;
        opacity: 0.04;
        z-index: 999999;
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 5px;
        color: white;
        background: #1a1a1a;
        font-size: 30px;
        font-weight: bold;
        border: 3px solid #333333;
        box-shadow: 0 0 20px rgba(179, 0, 255, 0.5), 0 4px 8px rgba(0,0,0,0.5);
        border-radius: 7px;
        letter-spacing: 1px;
        text-transform: uppercase;`;
    menu.style.cssText = `display: none;
        position: fixed;
        z-index: 999999;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 15px;
        background: #1a1a1a;
        border: 3px solid #333333;
        box-shadow: 0 0 50px rgba(179, 0, 255, 0.3), 0 10px 30px rgba(0,0,0,0.8);
        border-radius: 16px;
        width: 510px;
        height: 310px;`;
    changeFaseButton.style.cssText = `cursor: pointer;
        padding: 5px;
        color: white;
        background: #1a1a1a;
        font-size: 30px;
        font-weight: bold;
        border: 3px solid #333;
        box-shadow: 0 0 15px rgba(179, 0, 255, 0.4);
        border-radius: 7px;
        margin: 10px;`;
    getTrueAnswersButton.style.cssText = `cursor: pointer;
        padding: 5px;
        color: white;
        background: #1a1a1a;
        font-size: 30px;
        font-weight: bold;
        border: 3px solid #333;
        box-shadow: 0 0 15px rgba(179, 0, 255, 0.4);
        border-radius: 7px;
        margin: 10px;`;
    panicButton.style.cssText =`cursor: pointer;
        padding: 5px;
        color: white;
        background: #1a1a1a;
        font-size: 30px;
        font-weight: bold;
        border: 3px solid #333;
        box-shadow: 0 0 15px rgba(179, 0, 255, 0.4);
        border-radius: 7px;
        margin: 10px;`;
    faseInput.style.cssText = `
        transform: translateX(-50% -50%);
        padding: 5px;
        color: white;
        background: #1a1a1a;
        font-size: 30px;
        font-weight: bold;
        border: 3px solid #333;
        box-shadow: 0 0 20px rgba(179, 0, 255, 0.5);
        border-radius: 7px;
        width: 40%;
        text-align: center;`;

    button.onclick=()=>displayLNAvito();
    changeFaseButton.onclick=()=>changeFaseLNAvito(document.getElementById('LNAvitoInput').value);
    getTrueAnswersButton.onclick=()=>getTrueAnswers();
    panicButton.onclick=()=>panicLNAvito();

    firstSection.appendChild(label);

    secondSection.appendChild(faseInput);
    secondSection.appendChild(changeFaseButton);

    threeSection.appendChild(getTrueAnswersButton);
    threeSection.appendChild(panicButton);

    menu.appendChild(firstSection);
    menu.appendChild(secondSection);
    menu.appendChild(threeSection);

    document.body.appendChild(menu);
    document.body.appendChild(button);
}

createLNAvitoMenu();
