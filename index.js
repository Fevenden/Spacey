'use strict';

function handleSearchClick() {
  $('form').submit(function(e) {
    e.preventDefault();
    const searchTerm = document.getElementById('search').value;
    getNasaImageData(searchTerm);
  })
}

function getNasaImageData(searchTerm) {
  fetch(`https://images-api.nasa.gov/search?q=${searchTerm}&media_type=image&keywords=space&page=1`)
  .then(response => response.json())
  .then(responseJson => console.log(responseJson));
}



function init() {
  handleSearchClick()
}

init()