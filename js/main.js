// start of side navbar
closeNav();

$(".nav .close-open").on("click", function () {
  if ($(".nav").css("left") == "0px") {
    closeNav();
  } else {
    openNav();
  }
});

function closeNav() {
  let x = $(".nav .links").outerWidth();
  $(".nav").animate({ left: -x }, 500);
  $(".close-open").removeClass("fa-x");
  $(".close-open").addClass("fa-align-justify");
  $(".menu li").animate({ top: "400px" }, 500);
}

function openNav() {
  $(".nav").animate({ left: 0 }, 500);
  $(".close-open").addClass("fa-x");
  $(".close-open").removeClass("fa-align-justify");
  $(".menu li").eq(0).animate({ top: 0 }, 400);
  $(".menu li").eq(1).animate({ top: 0 }, 500);
  $(".menu li").eq(2).animate({ top: 0 }, 600);
  $(".menu li").eq(3).animate({ top: 0 }, 700);
  $(".menu li").eq(4).animate({ top: 0 }, 800);
  $(".menu li").eq(5).animate({ top: 0 }, 900);
}

// end of side  Navbar

// start of body

async function GetMovies() {
  let response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=51b82807ffb4c4dcbde81ae89b6d0bd0`
  );
  response = await response.json();
  concat(response);
  displayMovies(response);
}
GetMovies();

async function GetPopularMovies() {
  let responsePopular = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=51b82807ffb4c4dcbde81ae89b6d0bd0`
  );
  responsePopular = await responsePopular.json();
  concat(responsePopular);
  displayMovies(responsePopular);
}
GetPopularMovies();

async function GetTopMovies() {
  let responseTop = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&api_key=51b82807ffb4c4dcbde81ae89b6d0bd0`
  );
  responseTop = await responseTop.json();
  concat(responseTop);
  displayMovies(responseTop);
}
GetTopMovies();

async function GetUpcomingMovies() {
  let responseUp = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}&api_key=51b82807ffb4c4dcbde81ae89b6d0bd0`
  );
  responseUp = await responseUp.json();
  concat(responseUp);
  displayMovies(responseUp);
}
GetUpcomingMovies();

async function GetTrendingMovies() {
  let responseTrending = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=51b82807ffb4c4dcbde81ae89b6d0bd0`
  );
  responseTrending = await responseTrending.json();
  concat(responseTrending);
  displayMovies(responseTrending);
}
GetTrendingMovies();

function displayMovies(arr) {
  let cartona = ``;
  for (let i = 0; i < arr.results.length; i++) {
    cartona += `
       <div class="col-lg-4 col-md-6">
          <div class="movie-img position-relative rounded-3">
            <img
              src="https://image.tmdb.org/t/p/w500/${
                arr.results[i].poster_path
              }"
              alt=""
              class="w-100 border-black rounded-3"
            />
            <div class="movie-layer p-4 ">
            <div class="slide-up">
              <h1 class="text-center text-white">${
                arr.results[i].original_title
              }</h1>
              </div>
              <p class="text-white fw-lighter" id="shake-p"> ${
                arr.results[i].overview
              }</p>
              <p class="text-white fw-lighter">release date:${
                arr.results[i].release_date
              }</p>
              <i class="fa-solid fa-star text-warning"></i>
              <i class="fa-solid fa-star text-warning"></i>
              <i class="fa-solid fa-star text-warning"></i>
              <i class="fa-solid  text-warning fa-star-half-stroke"></i>
                <div class="rounded-circle border border-success border-2 rate py-2 my-3"><h5 class="text-center fw-lighter text-white ">${arr.results[
                  i
                ].vote_average.toFixed(2)}</h5></div>
            </div>
          </div>
         
        </div>
  `;
  }
  document.getElementById("movies").innerHTML = cartona;
}

$("#now").on("click", function () {
  GetMovies();
});
$("#popular").on("click", function () {
  GetPopularMovies();
});
$("#top").on("click", function () {
  GetTopMovies();
});
$("#upcoming").on("click", function () {
  GetUpcomingMovies();
});
$("#trending").on("click", function () {
  GetTrendingMovies();
});

let arr = [];
function concat(newdata) {
  arr.push(newdata);
}

function searchMovie(searchWord) {
  let word = searchWord.toLowerCase();
  let movieList = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].results.length; j++) {
      if (arr[i].results[j].title.toLowerCase().includes(word)) {
        movieList.push(arr[i].results[j]);
      } else {
        console.log("not found");
      }
    }
  }
  let movieCartona = ``;
  for (let i = 0; i < movieList.length; i++) {
    movieCartona += `
       <div class="col-lg-4 col-md-6">
          <div class="movie-img position-relative rounded-3">
            <img
              src="https://image.tmdb.org/t/p/w500/${movieList[i].poster_path}"
              alt=""
              class="w-100 border-black rounded-3"
            />
            <div class="movie-layer p-4 ">
            <div class="slide-up">
              <h1 class="text-center text-white">${
                movieList[i].original_title
              }</h1>
              </div>
              <p class="text-white fw-lighter" id="shake-p"> ${
                movieList[i].overview
              }</p>
              <p class="text-white fw-lighter">release date:${
                movieList[i].release_date
              }</p>
              <i class="fa-solid fa-star text-warning"></i>
              <i class="fa-solid fa-star text-warning"></i>
              <i class="fa-solid fa-star text-warning"></i>
              <i class="fa-solid  text-warning fa-star-half-stroke"></i>
                <div class="rounded-circle border border-success border-2 rate py-2 my-3"><h5 class="text-center fw-lighter text-white ">${movieList[
                  i
                ].vote_average.toFixed(2)}</h5></div>
            </div>
          </div>
         
        </div>
  `;
  }
  $("#movies").addClass("d-none");
  document.getElementById("searchResults").innerHTML = movieCartona;
}

window.addEventListener("load", function () {
  $(".loading").fadeOut(2000, function () {
    $(".loading").addClass("d-none");
  });
});
