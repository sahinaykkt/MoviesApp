const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7f0580dd5b7d1aec74b6664dd187c914&page=3"
const IMG_PATH = "https://image.tmdb.org/t/p/w1280"
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=7f0580dd5b7d1aec74b6664dd187c914&query="'

const main = document.querySelector("#main");
const form = document.querySelector("#form");
const search = document.querySelector("#search");
const mainPage = document.querySelector("#main-page")

getMovies(API_URL);

mainPage.addEventListener("click",function(){
    getMovies(API_URL);
})

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const {
            title,
            poster_path,
            vote_average,
            overview
        } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${voteAverage(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>${title}</h3>
          ${overview}
        </div>
        `
        main.appendChild(movieEl)
    })
}

function voteAverage(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if (searchTerm && searchTerm !== "") {
        getMovies(SEARCH_API + searchTerm)

        search.value = ""
    } else {
        window.location.reload()
    }
})

let header = document.querySelector("#main-page")

header.addEventListener("click",function(){
    getMovies(API_URL);
})