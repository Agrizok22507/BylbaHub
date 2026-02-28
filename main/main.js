async function loadScript(url) {
    const response = await fetch(url);
    const code = await response.text();
    
    const script = document.createElement('script');
    script.textContent = code;
    document.head.appendChild(script);
    
    return new Promise(resolve => {setTimeout(resolve, 10)});
}

async function main() {
    try {
        await loadScript('https://raw.githubusercontent.com/Agrizok22507/BylbaHub/main/main/bylbahub.js');
        setTimeout(() => {
            if (typeof initilizeBylbaHub === 'function') {initilizeBylbaHub();} else {alert('Error with loading BylbaHub')}
        }, 50);
    } catch {alert("Error with loading BylbaHub")}
}

main();
