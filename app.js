var state = {
  query: {
    part: 'snippet',
    key: 'AIzaSyDBb2Iu4-q20ubEJh6C7dicfxrTMOT500s',
    maxResults: 6,
    pageToken: '',
    type: 'video',
    q: ''
  },
  youtubeUrl: 'https://www.googleapis.com/youtube/v3/search',
};

//API call
function getDataFromApi(state, callback) {
  $.getJSON(state.youtubeUrl, state.query, callback);
}

//state management functions
function setSearchTerm(state, element) {
  state.query.q = element.val();
}

//render functions
function renderPage(data) {
  renderResults(data);
  renderButtons(state, data);
}

function renderResults(data) {
  var resultsHTML = '<div class="row">';
  data.items.forEach(function (item) {
    resultsHTML = (resultsHTML + '<div class="search-item col s12 m6"><div class="card small hoverable">' +
      '<div class="card-image">' +
        '<iframe src="https://www.youtube.com/embed/' + item.id.videoId + '" frameborder="0" allowfullscreen></iframe>' +
      '</div>' +
      '<div class="card-content">' +
        '<p class="truncate">' + item.snippet.title + '</p>' +
      '</div>' +
      '<div class="card-action">' +
        '<a href="https://www.youtube.com/channel/' + item.snippet.channelId + '">View more from '+ item.snippet.channelTitle + '</a>' +
      '</div>' + 
      '</div></div>')
  });  
  resultsHTML = resultsHTML + '</div>';
  $('.search-results').html(resultsHTML);
}

function renderButtons(state, data) {
  renderNextPageButton(state, data);
  if (data.prevPageToken) {
    renderPrevPageButton(state, data);
  }
}

function renderNextPageButton(state, data) {
  $('.next-page').removeClass('hidden');
  $('.next-page').click(function(e) {
    e.preventDefault();
    state.query.pageToken = data.nextPageToken;
    getDataFromApi(state, renderPage);
  });
}

function renderPrevPageButton(state, data) {
  $('.prev-page').removeClass('hidden');
  $('.prev-page').click(function(e) {
    e.preventDefault();
    state.query.pageToken = data.prevPageToken;
    getDataFromApi(state, renderPage);
  })
}

//event listener
function watchSubmit() {
  $('form[name="user-search"]').submit(function(e) {
    e.preventDefault();
    setSearchTerm(state, $(this).find('.user-search-input'));
    getDataFromApi(state, renderPage); 
  });
}

$(document).ready(function () {
	watchSubmit();  
})
