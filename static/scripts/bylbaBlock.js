let blockingInterval;
let ads = [];

function block(element) {
        const message = document.createElement('div');
        message.innerHTML = '🥔bylbaBlocked🥔';
        message.style.cssText = 'background: rgb(201, 178, 47); padding: 10px; border: none; border-radius: 5px;';
        element.replaceWith(message);
}

function oneSFilter() {
    console.log("bylbaBlock v2 [БЛОКИРОВКА РЕКЛАМ]: ПОИСК РЕКЛАМ ЗАВЕРШЁН! Заблокировано " + ads.length + " реклам.")
    console.log("bylbaBlock v2 [БЛОКИРОВКА РЕКЛАМ]: ПРОЦЕСС ПОИСКА РЕКЛАМЫ НАЧАЛСЯ!");
    const elements = document.querySelectorAll('[class*="ad "], [class*=" ad "], [class*=" ad-"], [class*="banner "], [class*=" banner "], [class*="banner-"], [id*="ad-"], [id*="banner-"], [id*="ad "], [id*=" ad "], [id*=" ad-"], [id*="banner "], [id*=" banner "], [id*="banner-"], [data-name*="ad"], [data-name="adWrapper"][data-name*="ad "], [data-name*=" ad "], [data-name*=" ad-"], [data-name*="banner "], [data-name*=" banner "], [data-name*="banner-"]');
    elements.forEach(element => {
        if (element.tagName === 'HTML' || element.tagName === 'HEAD' || element.tagName === 'BODY' || element.tagName === 'SCRIPT' || element.tagName === 'STYLE') {
            return;
        }

        let levelOfTrust = 4;
        levelOfTrust -= 1
        console.log("bylbaBlock v2 [БЛОКИРОВКА РЕКЛАМ]: " + element + " не прошёл первую проверку, его уровень доверия : " + levelOfTrust + "/4.");
        levelOfTrust = twoSFilter(element, levelOfTrust);
        levelOfTrust = threeSFilter(element, levelOfTrust);
        levelOfTrust = fourSFilter(element, levelOfTrust);

        checkResult(element, levelOfTrust);
    });
}

function twoSFilter(element, levelOfTrust) {
    const twoStep = element.innerHTML;
    const keywords = ['реклама', 'соцреклама'];
    if (keywords.some(keyword => twoStep.toLowerCase().includes(keyword))) {
        levelOfTrust -= 1;
        console.log("bylbaBlock v2 [БЛОКИРОВКА РЕКЛАМ]: " + element + " не прошёл вторую проверку, его уровень доверия : " + levelOfTrust + "/4.");
    }
    return levelOfTrust;
}

function threeSFilter(element, levelOfTrust) {
    if (element.getAttribute('href')?.includes('yandex.ru/an/count') || element.querySelector('[href*="yandex.ru/an/count"]')) {
        levelOfTrust -= 2;
        console.log("bylbaBlock v2 [БЛОКИРОВКА РЕКЛАМ]: " + element + " не прошёл третью проверку, его уровень доверия : " + levelOfTrust + "/4.");
    } else if (element.hasAttribute('href') || element.querySelector('[href]')) {
        levelOfTrust -= 0.5;
        console.log("bylbaBlock v2 [БЛОКИРОВКА РЕКЛАМ]: " + element + " не прошёл третью проверку, его уровень доверия : " + levelOfTrust + "/4.");
    }
    return levelOfTrust;
}

function fourSFilter(element, levelOfTrust) {
    const rect = element.getBoundingClientRect();
    const adSizes = [
        {w: 300, h: 250}, {w: 728, h: 90}, 
        {w: 160, h: 600}, {w: 320, h: 50},
        {w: 1000, h: 275}, {w: 1144, h: 300}
    ];
    
    const isAdSize = adSizes.some(size =>
        Math.abs(rect.width - size.w) < 10 && 
        Math.abs(rect.height - size.h) < 10
    );
    
    if (isAdSize) {
        levelOfTrust -= 1;
        console.log("bylbaBlock v2 [БЛОКИРОВКА РЕКЛАМ]: " + element + " не прошёл четвёртую проверку, его уровень доверия : " + levelOfTrust + "/4.");
    }
    return levelOfTrust;
}

function checkResult(element, levelOfTrust) {
    if (levelOfTrust <= 2) {
        ads.push(element);
        console.log("bylbaBlock v2 [БЛОКИРОВКА РЕКЛАМ]: " + element + " БЛОКИРУЕТСЯ, его уровень доверия : " + levelOfTrust + "/4!");
        alert("БЛОК");
        block(element)
    }
}

function startBlocking() {
    blockingInterval = setInterval(oneSFilter, 10000);
}

startBlocking();
