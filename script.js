document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const type = data.get('type');
    const number = data.get('bort-number');
    // console.log(`https://kd.kmda.gov.ua/vq/${type}${number}`)
    open(`https://kd.kmda.gov.ua/vq/${type}${number}`, '_blank');
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceWorker.js')
        .then(() => console.log('SW registered!'))
        .catch(err => console.warn(err));

    // navigator.serviceWorker.getRegistrations().then(regs => {
    //     for (let reg of regs) {
    //         console.log(reg)
    //         reg.unregister();
    //     }
    // });
}