function makeAllRainbow() {
    const allElements = document.querySelectorAll('*');
    let color = 0;
    const colors = ['red', 'orange', 'yellow', 'lightgreen', 'cyan', 'lightblue', 'violet', 'pink'];
    
    setInterval(() => {
        allElements.forEach(element => {
            element.style.transition = 'background-color 0.5s ease';
            element.style.backgroundColor = colors[color];
        });
        color = (color + 1) % colors.length;
    }, 250);
}

makeAllRainbow();
