const API_KEY = `92dc04c98bf954afad4318cbddffc5d6`;
getMovies();

async function getMovies() {
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    let response = await fetch(url);

    let movieList = await response.json();

    // console.log(movieList.results);

    appendMovies(movieList.results);
}


function appendMovies(data) {
    let container = document.getElementById("movie");
    container.innerHTML = null;

    data.forEach(function (elem) {
        let movie = document.createElement("div");
        movie.id = "movieBlock";
        movie.style.border = "3px solid #292929";
        movie.style.borderRadius = "15px";
        movie.style.height = "200px";
        movie.style.width = "213px";
        movie.style.display = "flex";
        movie.style.flexDirection = "column";
        movie.style.textAlign = "center";
        movie.addEventListener("click",(event) =>{
            event.preventDefault();
            window.alert(`Please search the title -"`+elem.title+`" on the next screen.`);
            window.location.href = "index.html";
        });

        let img = document.createElement("img");
        img.src = `https://image.tmdb.org/t/p/w500${elem.backdrop_path}`;
        img.style.borderTopLeftRadius = "15px";
        img.style.borderTopRightRadius = "15px";
        img.style.height = "80%";
        img.style.width = "auto";

        let title = document.createElement("p");
        title.innerText = elem.title;

        movie.append(img, title);
        container.append(movie);
    });
}