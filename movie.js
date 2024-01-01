document.addEventListener('DOMContentLoaded', function () {
    let movieTitle = document.getElementById("movieTitle");
    let language = document.getElementsByName("language");
    let genre = document.getElementById("genre");
    let rated = document.getElementById("rated");
    let submit = document.getElementById("submit");
    let tbody = document.getElementById("tablebody");
    let deleteAllBtn = document.getElementById("deleteAll");

    let moviesList;
    if(localStorage.movies != null){
        moviesList=JSON.parse(localStorage.getItem('movies'))
    }else{
        moviesList = [];
    }

    submit.addEventListener('click', function () {
        if (movieTitle.value === '') {
            alert('Movie Title is required');
        } else {
            addMovie();
        }
    });

    //deleteAllBtn.addEventListener('click', deleteAll);

    function addMovie() {
        const newMovie = {
            movieTitle: movieTitle.value,
            language: languageChecked(),
            genre: genre.value,
            rated: isRated()
        };

        moviesList.push(newMovie);
        clearForm();
        updateLocalStorage();
        showMovies();
    }

    function languageChecked(){
        for (let i = 0; i < language.length; i++) {
            if (language[i].checked) {
                return language[i].value;
            }
        }
    }

    function isRated(){
        if(rated.checked){
            return "Yes";
        }else{
            return "No";
        }
    }

    function clearForm() {
        movieTitle.value = '';
        for (let i = 0; i < language.length; i++) {
            language[i].checked = false;
        }
        genre.value = 'action';
        rated.checked = false;

    }
    function updateLocalStorage() {
        localStorage.setItem('movies', JSON.stringify(moviesList));
    }

    function showMovies() {
        let table = '';
        moviesList.forEach((movie, index) => {
            table += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${movie.movieTitle}</td>
                    <td>${movie.language}</td>
                    <td>${movie.genre}</td>
                    <td>${movie.rated}</td>
                    <td><button onclick="deleteMovie(${index})" id="delete">delete</button></td>
                </tr>
            `;
        });
        tbody.innerHTML = table;
        updateDeleteAllBtn();
    }

    function updateDeleteAllBtn() {
        if(moviesList.length > 0){
            deleteAllBtn.innerHTML = ` 
            <button onclick="deleteAll()" id="delete">Delete All (${moviesList.length})</button>
            `
        }else{
            deleteAllBtn.innerHTML = '';
        }
    }

    
    function deleteMovie(i) {
        moviesList.splice(i, 1);
        updateLocalStorage();
        showMovies();
    }

    function deleteAll() {
        localStorage.removeItem('movies');
        moviesList = [];
        showMovies();
    }

    window.deleteMovie = deleteMovie;
    window.deleteAll = deleteAll;
    showMovies();
});
