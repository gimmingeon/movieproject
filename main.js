const apiKey = '';

const options = {
    method: 'GET',
    headers: { accept: 'application/json' }
};

    const searchInput = document.getElementById('searchInput');
    const movieListContainer = document.getElementById('movieList');
    let movies = [];

    function fetchMovies() {
      fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=' + apiKey, options)
        .then(response => response.json())
        .then(data => {
          movies = data.results;
          displayMovies(movies);
        })
        .catch(error => console.error('에러가 생겼습니다 : ', error));
    }

    function displayMovies(movies) {
      movieListContainer.innerHTML = '';

      movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movieCard';
        movieCard.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w200/${movie.poster_path}" alt="${movie.title}">
          <h2>${movie.title}</h2>
          <p>${movie.overview}</p>
          <h3>Rating: ${movie.vote_average}</h3>
        `;
        movieCard.addEventListener('click', () => alert(`영화 ID: ${movie.id}`));

        movieListContainer.appendChild(movieCard);
      });
    }

    function searchMovies() {
      const searchTerm = searchInput.value.toLowerCase();

      const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchTerm));
      displayMovies(filteredMovies);
    }

    fetchMovies(); 