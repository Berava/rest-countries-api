const baseEndpoint = 'https://restcountries.eu/rest/v2/all';
const sectionFlags = document.querySelector('.flags');
const searchCountry = document.getElementById('search');
const selected = document.querySelector('.selected');
const optionContainer = document.querySelector('.options-container');
const optionsList = document.querySelectorAll('.option');

selected.addEventListener('click', () => {
    optionContainer.classList.toggle("active");
});

// Event Listener on filter regions
optionsList.forEach(o => {
    o.addEventListener('click', () => {
        selected.firstElementChild.innerHTML = o.querySelector("label").innerHTML;
        optionContainer.classList.remove("active");
        filterByRegion(o.querySelector("label").textContent);
    })
})

// Event listeners on filter countries
searchCountry.addEventListener('keyup', filterByCountries)

// handle error 
function handleError(err) {
    console.log('Oh no no');
    console.log(err);
}
// fetch flags
async function fetchFlags() {
    const res = await fetch(`${baseEndpoint}`);
    const data = await res.json();
    displayFlags(data);
}

// create html
function displayFlags(data) {
    const html = data.map(country => {
        return `
        <figure class="flag">
            <img src="${country.flag}" alt="${country.name}" />
            <figcaption>
              <h2>${country.name}</h2>
              <p><strong>Population:</strong> ${country.population}</p>
              <p class="region"><strong>Region:</strong> ${country.region}</p>
              <p><strong>Capital:</strong> ${country.capital}</p>
            </figcaption>
        </figure>
            `;
    });
    sectionFlags.innerHTML = html.join('');
    // sectionFlags.innerHTML = html.join('');
}

// Filter flags by countries
function filterByCountries(e) {
    // convert text to lowercase
    const text = e.target.value.toLowerCase();
    // Get array from list of all countries
    const countriesEl = Array.from(sectionFlags.getElementsByTagName('h2'));
    countriesEl.forEach(countryEl => {
        if(countryEl.textContent.toLowerCase().indexOf(text) !== -1) {
            countryEl.parentElement.parentElement.style.display = 'block';
        } else {
            countryEl.parentElement.parentElement.style.display = 'none';
        };
    })
}

// Filter flags by regions
function filterByRegion(name) {
    // convert text to lowercase
    const text = name.toLowerCase();
    // Get array from list of all regions
    const regionsEl = Array.from(sectionFlags.querySelectorAll('.region'));
    regionsEl.forEach(regionEl => {
        if(regionEl.textContent.toLowerCase().indexOf(text) !== -1) {
            regionEl.parentElement.parentElement.style.display = 'block';
        } else {
            regionEl.parentElement.parentElement.style.display = 'none';
        }
    })
}

fetchFlags().catch(handleError);