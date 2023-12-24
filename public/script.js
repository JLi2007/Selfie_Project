function setup(){
    noCanvas();
    const video = createCapture(VIDEO);
    video.size(550,400);
let lat, lon;
const button = document.getElementById('button');

button.addEventListener('click', async event => {
    const inputs = document.getElementById('inputs').value;
    video.loadPixels();
    const image64 = video.canvas.toDataURL();
    const data = {lat, lon, inputs, image64};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/api', options);
    const json = await response.json();
    console.log(json);
    });
    if ('geolocation' in navigator) {
        console.log('geolocation available');
        navigator.geolocation.getCurrentPosition(async position => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            document.getElementById('lat').textContent = lat;
            document.getElementById('lon').textContent = lon;
        }); 
    } else{
        console.log('geolocation not available');
    }
}


