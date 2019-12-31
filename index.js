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
  .then(responseJson => { 
    console.log(responseJson);
    getYouTubeData(searchTerm)
  });
}

function getYouTubeData(searchTerm) {
  fetch(`https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&part=snippet&key=AIzaSyBI-NvmjhQbV-B-JX5ayx1Vyt_spkuXhEw&type=video&safeSearch=strict&order=Relevance`)
  .then(response => response.json())
  .then(responseJson => console.log(responseJson));
}

function init() {
  handleSearchClick()
}

init()