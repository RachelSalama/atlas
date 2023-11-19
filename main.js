import { callApi, createColCard, render, contentHolder, countryErr} from "./functions.js";

const searchInput = document.getElementById("id_search");
const searchBtn = document.getElementById("searchBtn");

const israel = document.getElementById("israel");
const usa = document.getElementById("usa");
const thailand = document.getElementById("thailand");
const france = document.getElementById("france");
const closeBtn = document.getElementById("closeBtn");



const homeCountrys= () => {
callApi('alpha?codes=FRA,IL,USA,TH,all', '?fields=name,capital,region,flags', contentHolder, createColCard)
}

const findCountry = (search) => {
        callApi(`name/${search}`, '?fields=name,capital,region,cca3,flags', contentHolder, createColCard);
}

homeCountrys();

searchBtn.addEventListener("click", () => {findCountry(searchInput.value); searchInput.value=""});
israel.addEventListener("click", ()=> findCountry("israel"));
usa.addEventListener("click", ()=> findCountry("usa"));
france.addEventListener("click", ()=> findCountry("france"));
thailand.addEventListener("click", ()=> findCountry("thailand"));
closeBtn.addEventListener("click", ()=> {countryErr.classList.add('d-none'); homeCountrys(); searchInput.value=""});






