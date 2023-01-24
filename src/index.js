import './css/styles.css';
import debounce from "lodash.debounce";

const DEBOUNCE_DELAY = 300;

const input = document.querySelector("#search-box");
const list = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info")

input.addEventListener('input' , debounce (onSearch , DEBOUNCE_DELAY));

function onSearch(event) {
//    event.preventDefault();

    const name = input.value.trim();
    console.log(name);

    if (name) {
        fetchCountries(name)
            .then(renderCounty)
            .catch(error => { console.log(error) })
            .finally(() => input.reset);
    } else {
        list.innerHTML = ""
        return
    } 
}

function fetchCountries(name) {

    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags,languages`)
        .then(response => {
        // console.log(response)
        return response.json();
    })
}

function renderCounty(country) {

    

    if (country.length > 10) {
        console.log("Too many matches found. Please enter a more specific name.");
    } else if (country.length > 1 && country.length <= 10) {
         
        for (let i = 0; i < country.length; i += 1) {
            const countriesName = country[i].altSpellings[country[i].altSpellings.length - 1];
            const flags = country[i].flags.svg;  
            list.innerHTML += `<li class="country_name"><img src="${flags}" alt="flag of ${countriesName}" width="60"><p class="countru_name">${countriesName}</p>`
        }
    } else {
    
const countryName = country[0].altSpellings[country[0].altSpellings.length - 1];

const flag = country[0].flags.svg;
const capital = country[0].capital;
const population = country[0].population;
const languages = Object.values(country[0].languages);

list.innerHTML = `<li class="country_name"><img src="${flag}" alt="flag of ${countryName}" width="60">
  <p class="countru_name">${countryName}</p>`
   countryInfo.innerHTML = `<p>Capital:${capital}</p>
  <p>Population:${population}</p>
  <p>Languages:${languages}</p>`

}
}

// Напиши функцію fetchCountries(name), яка робить HTTP - запит 
// на ресурс name і повертає проміс з масивом країн - результатом
// запиту.Винеси її в окремий файл fetchCountries.js і зроби іменований
// експорт.