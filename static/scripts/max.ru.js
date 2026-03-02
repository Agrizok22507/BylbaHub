const t = document.title;
if (t === "MAX") {
    max();
}

function max() {
    function changeFavicon() {
        const linkElement = document.getElementById('linkForFavicon');
        var newLinkByUser = linkElement.value;
        const favicon = document.querySelector('link[rel="icon"]');
        if (favicon) {
            favicon.remove();
        }
        var newIcon = document.createElement('link');
        newIcon.rel = 'icon';
        newIcon.href = newLinkByUser;
        document.head.appendChild(newIcon);
    }

    function changeTitle() {
        const titleElement = document.getElementById('textForTitle');
        var newTitleByUser = titleElement.value;
        const title = document.querySelector('title');
        title.remove();
        var newTitle = document.createElement('title');
        newTitle.innerText = newTitleByUser;
        document.head.appendChild(newTitle);
    }

    function showMenu() {
        menu.style.display = 'block';
    }

    function hideMenu() {
        menu.style.display = 'none';
    }

    const buttonMenu = document.createElement("button");
    buttonMenu.textContent = "BX";
    buttonMenu.style.cssText = 'position: fixed; top: 25px; right: 25px; background: #181720; padding: 10px; z-index: 10000; color: white; border:none; border-radius: 20px;';
    buttonMenu.onclick = showMenu;

    const menu = document.createElement("div");
    menu.style.cssText = 'position: fixed; top: 100px; left: 600px; background: #181720; padding: 10px; z-index: 10000; color: white; width: 900px; height: 500px; border:none; border-radius: 20px; display: none;';

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "X";
    closeBtn.style.cssText = 'position: display: block; relative; margin: 15px; top: 5px; left: 5px; color: white; border: none; border-radius: 10px; font-size: 25px; font-family: "Arial";'
    closeBtn.onclick = hideMenu;
    
    const uploadLink = document.createElement("input");
    uploadLink.type = 'text';
    uploadLink.placeholder = 'Ссылка на изображение'
    uploadLink.style.cssText = 'border: none; display: block; margin: 15px; border-radius: 5px; background: black; color: grey; position: relative; font-size: 20px; font-family: "Arial";'
    uploadLink.id = 'linkForFavicon';

    const uploadLinkButton = document.createElement('button');
    uploadLinkButton.textContent = "Изменить иконку";
    uploadLinkButton.style.cssText = 'position: relative; display: block; margin: 15px; color: white; border: none; border-radius: 10px; font-size: 25px; font-family: "Arial";'
    uploadLinkButton.onclick = changeFavicon;

    const uploadTitle = document.createElement("input");
    uploadTitle.type = 'text';
    uploadTitle.placeholder = 'Заголовок'
    uploadTitle.style.cssText = 'border: none; display: block; margin: 15px; border-radius: 5px; background: black; color: grey; position: relative; font-size: 20px; font-family: "Arial";'
    uploadTitle.id = 'textForTitle';

    const uploadTitleButton = document.createElement('button');
    uploadTitleButton.textContent = "Изменить заголовок страницы";
    uploadTitleButton.style.cssText = 'position: relative; display: block; margin: 15px; color: white; border: none; border-radius: 10px; font-size: 25px; font-family: "Arial";'
    uploadTitleButton.onclick = changeTitle;

    document.body.appendChild(buttonMenu);
    document.body.appendChild(menu);
    menu.appendChild(closeBtn);
    menu.appendChild(uploadLink);
    menu.appendChild(uploadLinkButton);
    menu.appendChild(uploadTitle);
    menu.appendChild(uploadTitleButton);
}
