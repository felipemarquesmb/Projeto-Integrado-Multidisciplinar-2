
const API_KEY = window.API_KEY ||''; 

if (!API_KEY) {
  console.warn('API_KEY não encontrada. Verifique o arquivo src/config.js');
}

const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';




async function getPopularMovies() {
  try {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=1`);
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error('Erro ao buscar filmes populares:', error);
    return [];
  }
}


async function getMovieDetails(id) {
  try {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar detalhes do filme:', error);
    return null;
  }
}


async function getSimilarMovies(id) {
  try {
    const res = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=pt-BR&page=1`);
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error('Erro ao buscar filmes semelhantes:', error);
    return [];
  }
}


async function getRandomMovie() {
  const movies = await getPopularMovies();
  if (movies.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * movies.length);
  return movies[randomIndex];
}


function getPosterUrl(path) {
  if (!path) return 'https://via.placeholder.com/300x450?text=Sem+Poster';
  return `${IMAGE_BASE}${path}`;
}


function formatGenres(genres) {
  if (!genres || genres.length === 0) return 'Gênero não informado';
  return genres.map(g => g.name).join(' • ');
}


function createMovieCard(movie) {
  const poster = getPosterUrl(movie.poster_path);
  const year = movie.release_date ? movie.release_date.substring(0, 4) : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  return `
    <a href="../filme/filme.html?id=${movie.id}" class="movie-card">
      <div class="movie-poster">
        <img src="${poster}" alt="${movie.title}" loading="lazy"
             onerror="this.src='https://via.placeholder.com/300x450?text=Sem+Poster'">
        <div class="movie-rating">
          <i class="fas fa-star"></i> ${rating}
        </div>
      </div>
      <div class="movie-info">
        <h3 class="movie-title">${movie.title}</h3>
        <p class="movie-year">${year}</p>
      </div>
    </a>
  `;
}


function renderMovies(containerId, movies) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = movies.map(createMovieCard).join('');
}