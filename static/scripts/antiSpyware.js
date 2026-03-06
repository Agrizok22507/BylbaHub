spywareLinks = [
    'google-analytics', 'ga.js', 'analytics.js', 'gtag.js', 'googletagmanager',
    'UA-', 'G-', 'measurementId',
    'yandex.metrika', 'metrika.yandex', 'mc.yandex',
    'facebook.net', 'fbq(', 'tr.facebook',
    'hotjar', 'mixpanel', 'amplitude', 'segment.io',
    'mouseflow', 'crazyegg', 'clicktale',
    'doubleclick', 'googleadservices', 'googleads',
    'bing.com/tag', 'linkedin.com/insight',
    'telemetry', 'tracking', 'analytics', 'metrics',
    'beacon', 'pixel', 'tracker', 'monitoring',
    'collectData', 'sendData', 'userData',
    'fingerprint', 'deviceId', 'sessionId',
    'stats.g.doubleclick.net',
    'www.google-analytics.com',
    'connect.facebook.net',
    'mc.yandex.ru',
    'bam.nr-data.net',
    'segment.io',
    'heapanalytics.com',
    'mouseflow.com'
]

function blockSpywares() {
    const spywareElements = [];
    const scripts = document.querySelectorAll('script');
    let blockedScripts = 0;

    spywareLinks.forEach(link=>{
        scripts.forEach(script=>{
            if (script.src.includes(link)) {
                spywareElements.push(script)
            }
        });
    });

    spywareElements.forEach(element=>{
        blockedScripts = blockedScripts + 1;
        element.remove();
    })

    alert(`Успешно!
Заблокировано: ${blockedScripts}`);
}

blockSpywares();
