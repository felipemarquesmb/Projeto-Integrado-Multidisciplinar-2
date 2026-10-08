document.addEventListener('DOMContentLoaded', () => {
  
  renderMoviesGrid('resultados-filmes', MOCK_MOVIES);

  document.getElementById('btn-buscar')?.addEventListener('click', () => {
    
    renderMoviesGrid('resultados-filmes', MOCK_MOVIES);
  });
});

function renderMoviesGrid(containerId, movies) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = movies.map(movie => `
    <a href="../filme/filme.html?id=${movie.id}" class="movie-card">
      <div class="movie-poster">
        <img src="${movie.poster}" alt="${movie.title}" loading="lazy"
             onerror="this.src='https://via.placeholder.com/300x450?text=Sem+Poster'">
        <div class="movie-rating"><i class="fas fa-star"></i> ${movie.rating.toFixed(1)}</div>
      </div>
      <div class="movie-info">
        <h3 class="movie-title">${movie.title}</h3>
        <p class="movie-year">${movie.year}</p>
      </div>
    </a>
  `).join('');
}