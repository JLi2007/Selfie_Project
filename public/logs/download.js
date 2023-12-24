async function downloadImage(url, filename){
    const response = await fetch(url)
    const blob = await response.blob();

    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

document.body.addEventListener('click', (event)=>{
    if (event.target.tagName === 'IMG'){
        const clickedImageData = sort.find(item => item.elt.querySelector('img') === event.target);

        if (clickedImageData) {
            const imageUrl = event.target.src;
            const imageName = `downloaded_${clickedImageData.descrip} ${clickedImageData.date}.png`
            downloadImage(imageUrl, imageName);
        }
    }
})