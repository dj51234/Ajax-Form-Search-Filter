const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data));
function findMatches(wordToMatch, cities) {
  return cities.filter(place => {

    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex)
  });
}

function addCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const city = place.city.replace(regex,`<span class="highlight">${this.value}</span>`)
    const state = place.city.replace(regex,`<span class="highlight">${this.value}</span>`)
    return `
      <li class="item">
        <span class="name">${city}, ${state}</span>
        <span class="name">${addCommas(place.population)}</span>
      </li>
    `;
  }).join('');
  const defaultHtml = `
    <li class="item">
      <span class="name">Filter by City</span>
    </li>
    <li class="item">
      <span class="name">or State</span>
    </li>
  `;
  if (searchInput.value === '') {
    suggestions.innerHTML = defaultHtml;
  } else {
    suggestions.innerHTML = html;
  }
}
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.items');
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
