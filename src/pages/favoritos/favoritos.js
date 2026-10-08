document.addEventListener('DOMContentLoaded', () => {
  
  const favoritos = MOCK_MOVIES.slice(0, 4);

  const container = document.getElementById('lista-favoritos');
  const msgVazio = document.getElementById('msg-vazio');

  if (favoritos.length === 0) {
    container.style.display = 'none';
    msgVazio.style.display = 'block';
    return;
  }

  container.innerHTML = favoritos.map(movie => `
    <a href="../filme/filme.html?id=${movie.id}" class="movie-card">
      <div class="movie-poster">
        <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
        <div class="movie-rating"><i class="fas fa-star"></i> ${movie.rating.toFixed(1)}</div>
      </div>
      <div class="movie-info">
        <h3 class="movie-title">${movie.title}</h3>
        <p class="movie-year">${movie.year}</p>
      </div>
    </a>
  `).join('');
});