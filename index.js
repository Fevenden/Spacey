'use strict';

function handleSearchClick() {
  $('form').submit(function(e) {
    e.preventDefault();
    const searchTerm = document.getElementById('search').value;
    getNasaImageData(searchTerm);
    getYouTubeData(searchTerm);
    getWikiData(searchTerm);
  })
}

function getNasaImageData(searchTerm) {
  fetch(`https://images-api.nasa.gov/search?q=${searchTerm}&media_type=image&keywords=space&page=1`)
  .then(response => response.json())
  .then(responseJson => displayNasaData(responseJson));
}

function displayNasaData(json) {
  console.log(json);
  for (let i = 0; i < 10; i++) {
    $('.js-images').append(`
      <img src="${json.collection.items[i].links[0].href}" alt="${json.collection.items[i].data[0].description_508}">
    `)
  }
}

function getYouTubeData(searchTerm) {
  fetch(`https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&part=snippet&key=AIzaSyBI-NvmjhQbV-B-JX5ayx1Vyt_spkuXhEw&type=video&safeSearch=strict&order=Relevance`)
  .then(response => response.json())
  .then(responseJson => console.log(responseJson));
}

function displayYouTubeData() {

}

function getWikiData(searchTerm) {
  fetch(`https:/en.wikipedia.org/w/api.php?action=query&format=json&redirects=1&titles=${searchTerm}&prop=extracts&exchars=1200&exsectionformat=plain&origin=*`)
  .then(response => response.json())
  .then(responseJson => console.log(responseJson));
}

function displayWikiData() {

}

function init() {
  handleSearchClick()
}

init()