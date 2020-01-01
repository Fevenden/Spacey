'use strict';

function handleSearchClick() {
  $('form').submit(function(e) {
    e.preventDefault();
    const searchTerm = document.getElementById('search').value;
    const youTubeSearch = 'what is' + searchTerm
    getNasaImageData(searchTerm);
    getYouTubeData(youTubeSearch);
    getWikiData(searchTerm);
  })
}

function getNasaImageData(searchTerm) {
  fetch(`https://images-api.nasa.gov/search?q=${searchTerm}&media_type=image&keywords=space&page=1`)
  .then(response => response.json())
  .then(responseJson => displayNasaData(responseJson));
}

function displayNasaData(json) {
  for (let i = 0; i < 10; i++) {
    $('.js-images').append(`
      <img src="${json.collection.items[i].links[0].href}" alt="${json.collection.items[i].data[0].description_508} class="spaceImg">
    `)
  }
}

function getYouTubeData(searchTerm) {
  fetch(`https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&part=snippet&key=AIzaSyBI-NvmjhQbV-B-JX5ayx1Vyt_spkuXhEw&type=video&safeSearch=strict&order=Relevance&videoEmbeddable=true`)
  .then(response => response.json())
  .then(responseJson => displayYouTubeData(responseJson));
}

function displayYouTubeData(json) {
  console.log(json);
  for (let i = 0; i < json.items.length; i++) {
    $('.js-videos').append(`
      <iframe width="560" height="315" src="https://www.youtube.com/embed/${json.items[i].id.videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `);
  };
}

function getWikiData(searchTerm) {
  fetch(`https:/en.wikipedia.org/w/api.php?action=query&format=json&redirects=1&titles=${searchTerm}&prop=extracts&exsectionformat=plain&origin=*&indexpageids=1`)
  .then(response => response.json())
  .then(responseJson => displayWikiData(responseJson));
}

function displayWikiData(json) {
  let pageID = `${json.query.pageids[0]}`
  $('.js-wiki').append(`
    <h2>${json.query.pages[pageID].title}</h2>
    ${json.query.pages[pageID].extract}
  `);
}

function init() {
  handleSearchClick()
}

init()