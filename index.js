'use strict';
const maxQ = 10;
let searchTerm;
let youTubeSearch;
let imgCounter = 0;

function handleSearchClick() {
  $('form').submit(function(e) {
    $('.js-error').empty()
    e.preventDefault();
    searchTerm = document.getElementById('search').value;
    youTubeSearch = 'what is' + searchTerm;
    apiCall(`https://images-api.nasa.gov/search?q=${searchTerm}&media_type=image&keywords=space&page=1`).then(response => displayNasaData(response))
  });
}

function apiCall(url) {
  return fetch(url)
  .then(response => { 
    if (response.ok) {
      return response.json()
    } 
    throw new Error(response.statusText);
  })
  .then(responseJson => responseJson)
  .catch(err =>{
    if (!err.message) {
      $('.js-error').append(`Something went wrong: YouTube Quota limit reached, videos unavailable until 12:00am(PT)`)
    } else{
      $('.js-error').append(`Something went wrong: ${err.message}`);
    }
  });
}

function displayNasaData(json) {
  if(json.collection.items.length < 10) {
    $('.js-error').append('make sure you are searching for a space related term');
  } else {
    $('.js-images').empty();
    $('.js-wiki').empty();
    $('.js-videos').empty()
    apiCall(`https://www.googleapis.com/youtube/v3/search?q=${searchTerm}&part=snippet&key=AIzaSyBI-NvmjhQbV-B-JX5ayx1Vyt_spkuXhEw&type=video&safeSearch=strict&order=Relevance&videoEmbeddable=true&relevanceLanguage=en&topidId=/m/01k8wb&videoCategoryId=27`).then(response => displayYouTubeData(response));
    apiCall(`https://en.wikipedia.org/w/api.php?action=query&format=json&redirects=1&titles=${searchTerm}&prop=extracts&exsectionformat=plain&origin=*&indexpageids=1&exintro=true&explaintext=true`).then(response => displayWikiData(response));
    for (let i = 0; i < maxQ; i++) {
      let showClass = (i === 0)? 'show':'hidden';
      $('.js-images').append(`
        <li class="nasaImg">
          <img src="${json.collection.items[i].links[0].href}" alt="${json.collection.items[i].data[0].description_508}" class="spaceImg spaceImg${i} ${showClass}">
        </li>
      `);
    };
  }
}

function handleNextPrevClick() {
  $('.next').click(function(e) {
  e.preventDefault();
  let array = $('.spaceImg').toArray();
  $(array[imgCounter]).removeClass('show').addClass('hidden');
  imgCounter ++
  if (imgCounter === maxQ) {
    imgCounter = 0;
  };
  $(array[imgCounter]).removeClass('hidden').addClass('show');
  });

  $('.previous').click(function(e) {
  e.preventDefault();
  let array = $('.spaceImg').toArray();
  $(array[imgCounter]).removeClass('show').addClass('hidden');
  imgCounter -- 
  if (imgCounter === -1) {
    imgCounter = 9;
  };
  $(array[imgCounter]).removeClass('hidden').addClass('show');
  })
}

function displayYouTubeData(json) {
  for (let i = 0; i < json.items.length; i++) {
    $('.js-videos').append(`
      <iframe width="560" height="315" src="https://www.youtube.com/embed/${json.items[i].id.videoId}" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `);
  };
}

function displayWikiData(json) {
  let pageID = `${json.query.pageids[0]}`;
  $('.js-wiki').append(`
    <h2>${json.query.pages[pageID].title}</h2>
    <p>${json.query.pages[pageID].extract} Read more at <a href="https://en.wikipedia.org/wiki/${json.query.pages[pageID].title}">Wikipedia</a>.</p>
  `);
}

function init() {
  handleSearchClick()
  handleNextPrevClick()
}

init()