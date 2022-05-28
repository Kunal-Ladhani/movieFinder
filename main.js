async function searchMovie(movieName) {
  try {
    let url = `http://www.omdbapi.com/?s=${movieName}&apikey=d01a74a8`;

    let movie = await fetch(url);
  
    let data = await movie.json();
 
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function main() {
  let query = document.getElementById("query").value;

  let response = searchMovie(query);
  let data = await response;

  showMovieList(data.Search);
}
  

let id;
function debounceFunction(func, delay) {
  if (id) {
    clearTimeout(id);  
  }

  id = setTimeout(function () {
    func();
  }, delay);
}


let searchBox = document.getElementById("searchBox");

function showMovieList(movieArray) {
  console.log(movieArray);
  
  searchBox.innerHTML = null;
  searchBox.style.backgroundColor = "none";

  if(movieArray === undefined) {
    return false;
  }
  
  movieArray.forEach(function(Movie) {
    searchBox.style.backgroundColor = "#1d1d1d";
    
    let movie = document.createElement("div");
    movie.style.display = "flex";
    movie.style.gap = "10px";
    movie.style.backgroundColor = "#1d1d1d";
    movie.style.borderBottom = "6px solid #292929";
    movie.style.height = "110px";
    movie.addEventListener("click",function() {
      fetchMovieData(Movie.imdbID);
    });

    let moviePoster = document.createElement("div");
    moviePoster.style.display = "flex";
    moviePoster.style.alignItems = "center";
    moviePoster.style.justifyContent = "center";
    moviePoster.style.marginLeft = "10px";
    
    
    let poster = document.createElement("img");
    poster.src = Movie.Poster; 
    poster.alt = Movie.Title;
    poster.style.height = "96px";
    poster.style.width = "64px";
    
    moviePoster.append(poster);

    let movieInfo = document.createElement("div");
    
    let title = document.createElement("p");
    title.innerText = Movie.Title;
    title.style.fontSize = "13px";
    title.style.textOverflow = "ellipsis";
    
    let year = document.createElement("p");
    year.innerText = Movie.Year;
    year.style.tex

    movieInfo.append(title,year);

    movie.append(moviePoster,movieInfo);
    
    searchBox.append(movie);
  });

}


async function fetchMovieData(imdbID) {
  try {
    let movieURL = `http://www.omdbapi.com/?apikey=d01a74a8&i=${imdbID}`;
  
    let response = await fetch(movieURL);
    console.log(response);

    let movieData = await response.json();
    showMovieData(movieData);

  } catch(err) {
    console.log(err);
  }
}

function showMovieData(movieObject) {
  console.log(movieObject);

  let movie = document.getElementById("movie");
  movie.innerHTML = null;
  
  let moviePoster = document.createElement("div");
  moviePoster.id = "moviePoster";
  
  moviePoster.style.margin = "auto";
  moviePoster.style.display = "flex";
  moviePoster.style.flexDirection = "column";
  moviePoster.style.width = "100%";
  moviePoster.style.height = "100%";
  moviePoster.style.textAlign = "center";

  let poster = document.createElement("img");
  poster.src = movieObject.Poster;
  poster.style.width = "90%";
  poster.style.borderRadius = "15px";
  poster.style.margin = "auto";
  poster.style.marginTop = "10px";

  let movieTitle = document.createElement("div");
  movieTitle.id = "movieTitle";
  movieTitle.innerText = movieObject.Title;
  
  movieTitle.style.marginBottom = "20px";
  
  moviePoster.append(poster,movieTitle);
  
  let movieInfo = document.createElement("div");
  movieInfo.style.height = "100%";
  movieInfo.style.width = "100%";
  
  movieInfo.style.display = "flex";
  movieInfo.style.flexDirection = "column";
  
  movieInfo.style.textAlign = "center";
  

  let list = document.createElement("ul");
  list.id = "movieMiscInfo";
  list.style.listStyle = "none";

  let year = document.createElement("li");
  year.id = "year";
  year.innerText = "Year : "+movieObject.Year;

  let rated = document.createElement("li");
  rated.id = "rated";
  rated.innerText = "Rated : "+ movieObject.Rated;

  let released = document.createElement("li");
  released.id="released";
  released.innerText ="Released :"+ movieObject.Released;
  
  list.append(year,rated,released);
  
  let genre = document.createElement("p");
  genre.id="genre";
  genre.innerText = "Genre : "+movieObject.Genre;

  let writer = document.createElement("p");
  writer.id="writer";
  writer.innerText = "Writers : "+movieObject.Writer;

  let actors = document.createElement("p");
  actors.id="actors";
  actors.innerText = "Actors : "+ movieObject.Actors;

  let plot = document.createElement("p");
  plot.id="plot";
  plot.innerText = movieObject.Plot;

  let language = document.createElement("p");
  language.id="language";
  language.innerText = "Language : "+ movieObject.Language;

  let rating = document.createElement("p");
  rating.id="rating";
  rating.innerText = "imdB Rating : "+ movieObject.imdbRating;
  
  movieInfo.append(list,genre,writer,actors,language,rating);

  if(Number(movieObject.imdbRating) > 8.5) {
    let recommended = document.createElement("p");
    recommended.innerText = "RECOMMENDED!";
    movieInfo.appendChild(recommended);
  }


  movie.append(moviePoster,movieInfo);
}