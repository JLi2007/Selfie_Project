const sort = []

document.getElementById('time').addEventListener('click', event => {
    sortData((a,b) => b.time - a.time);
})

document.getElementById('alpha').addEventListener('click', event => {
    sortData((a,b) => {
        if (b.inputs > a.inputs) return -1;
        else return 1;
    })
})

function sortData(compare) {
    const sortedData = sort.slice().sort(compare)
    for (const item of sort) {
        item.elt.remove();
    }
    for (const sortedItem of sortedData){
        document.body.append(sortedItem.elt);
    }
}

async function getData(){
    const response = await fetch('/api');
    const data = await response.json();

    for (const item of data) {
        const roots = document.createElement("div");
        const descrip = document.createElement("div");
        const geo = document.createElement("div");
        const date = document.createElement("div");
        const image = document.createElement("img");

        descrip.textContent = item.inputs;
        geo.textContent = `${item.lat}°, ${item.lon}°`;
        date.textContent = new Date(item.timestamp).toLocaleString();
        image.src = item.image64;

        roots.append(descrip, geo, date, image);
        sort.push({elt: roots, time: item.timestamp, descrip: descrip.textContent, date: date.textContent});
        roots.style.width = '100%'
        roots.style.display = 'flex'
        roots.style.flexDirection = 'column';
        roots.style.alignItems = 'center'
        roots.style.justifyContent = 'center'
        roots.style.padding = '10px 10px'

        document.body.append(roots);
    }
    console.log(data);
}

getData();