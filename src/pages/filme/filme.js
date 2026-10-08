document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    document.getElementById('filme-titulo').textContent = 'Filme não encontrado';
    return;
  }

  
  const movie = await getMovieDetails(id);

  if (!movie || movie.success === false) {
    document.getElementById('filme-titulo').textContent = 'Erro ao carregar o filme';
    return;
  }

  
  document.getElementById('filme-titulo').textContent = movie.title;
  document.getElementById('filme-ano').textContent = movie.release_date ? movie.release_date.substring(0, 4) : 'N/A';
  
  
  const horas = Math.floor((movie.runtime || 0) / 60);
  const minutos = (movie.runtime || 0) % 60;
  document.getElementById('filme-duracao').textContent = movie.runtime ? `${horas}h ${minutos}min` : 'N/A';

  
  document.getElementById('filme-nota').innerHTML = `<i class="fas fa-star"></i> ${(movie.vote_average || 0).toFixed(1)}`;

  
  document.getElementById('filme-generos').textContent = formatGenres(movie.genres);

  
  document.getElementById('filme-sinopse').textContent = movie.overview || 'Sinopse não disponível.';

  
  document.getElementById('filme-poster').src = getPosterUrl(movie.poster_path);
  document.getElementById('filme-poster').alt = movie.title;

  
  document.getElementById('filme-diretor').textContent = 'Informação de direção disponível em breve';

  
  document.getElementById('filme-elenco').innerHTML = `
    <div class="ator">Elenco principal<span>Disponível em breve</span></div>
  `;

  
  const semelhantes = await getSimilarMovies(id);
  const container = document.getElementById('filmes-semelhantes');
  if (container && semelhantes.length > 0) {
    container.innerHTML = semelhantes.slice(0, 6).map(m => `
      <a href="filme.html?id=${m.id}" class="movie-card">
        <img src="${getPosterUrl(m.poster_path)}" alt="${m.title}">
        <div class="info">${m.title}</div>
      </a>
    `).join('');
  }
});