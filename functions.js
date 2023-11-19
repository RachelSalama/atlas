const baseUrl = `https://restcountries.com/v3.1`;
const contentHolder = document.querySelector("#content");
const countryErr = document.getElementById("id_message");


const fetchApi = async (search, filter = "") => {
    try {
        const res = await fetch(`${baseUrl}/${search}/${filter}`);
        const data = await res.json();

        return data
    }
    catch (error) {

        console.log(error);
    }
};


const addContent = (holder, content) => holder.append(content);

const render = (arr, holder, create) => {
    if (!Array.isArray(arr)) {
        arr = [arr];
    }
    holder.innerHTML = "";
    arr.map((el) => addContent(holder, create(el)));
};

const callApi = (search, filter, place, func) => {
    fetchApi(search, filter).then(data => { console.log(data); render(data, place, func) })
        .catch(() => {countryErr.classList.remove('d-none');});
}


// const getCountryByCode = (code) => {
//     fetchApi(`alpha/${code}`, '?fields=name').then(data=> {return (data.name.common)});

// }

const createBorderLinks = (arr) => {
    let inner = "<h5>Borders:</h5>";
    // const countryNames = (arr.map((el) => getCountryByCode(el)));
    // console.log(countryNames);
    inner += arr.map((name) => `<button class="bg-info mb-1 border-0 w-100 btnView">${name}</button>`).join('');
    return inner;
}

const viewMore = (search) => {
    console.log(search);
    callApi(`alpha/${search}`, '?fields=name,capital,flags,languages,population,maps,borders,capitalInfo', contentHolder, createDetailedColCard);
}

const createDetailedColCard = (obj) => {
    const container = document.createElement("div");
    container.className = "d-flex align-content-center justify-content-around"
    const colEL = document.createElement("div");
    colEL.className = "col-md-5 mt-5";
    colEL.innerHTML = `<iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0"marginwidth="0"
    src="https://maps.google.com/maps?q=${obj.capitalInfo.latlng[0]},${obj.capitalInfo.latlng[1]}&hl=es&z=6&amp;output=embed">
    </iframe> `;

    const cardEl = document.createElement("div");
    cardEl.className = "col-md-5 ";
    cardEl.innerHTML = `<h3 class="bg-light mt-5">${obj.name.common}</h3><h4 class="bg-light">Capitel: ${obj.capital[0]}</h4>
              <p class="bg-light">Language: ${Object.values(obj.languages).join(" ,")}</p> <p class="bg-light">Population: ${obj.population}</p>
              <div class="d-flex align-content-start bg-light">
              <img class="w-50 mt-3" src=${obj.flags.png} alt="${obj.flags.alt}" /><div class="border"></div></div> `;
    const borderHolder = cardEl.querySelector('.border');
    borderHolder.innerHTML = (createBorderLinks(obj.borders));
    const btnsView = borderHolder.querySelectorAll('.btnView')
    console.log(btnsView);
    for (let index = 0; index < btnsView.length; index++) {
        btnsView[index].addEventListener('click', () => viewMore(obj.borders[index]));
    }
    container.append(cardEl);
    container.append(colEL);
    return container;
};





const createColCard = (obj) => {
    console.log(obj);
    const colEL = document.createElement("div");
    colEL.className = "mt-5 col-md-5 p-1 align-items-center justify-content-center";
    const cardEl = document.createElement("div");
    cardEl.className = "card p-1 col-8 shadow align-items-center justify-content-center";
    cardEl.innerHTML = `<h3>${obj.name.common}</h3><h4>Capitel: ${obj.capital[0]}</h4>
    <img class="w-100" src=${obj.flags.png} alt=${obj.flags.alt} />
              <p>Oregion: ${obj.region}</p><button class="bg-info border-0 w-40 btnView">View more</button>
    `;
    const btnView = cardEl.querySelector('.btnView');
    console.log(obj.cca3);
    btnView.addEventListener('click', () => viewMore(obj.cca3));
    colEL.append(cardEl);
    return colEL;
};







export { callApi, addContent, render, createColCard, viewMore, contentHolder, countryErr };

