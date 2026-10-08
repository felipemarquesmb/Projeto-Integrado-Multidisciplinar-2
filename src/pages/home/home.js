document.addEventListener('DOMContentLoaded', async () => {
  
  const populares = await getPopularMovies();

  if (populares.length > 0) {
    renderMovies('movies-populares', populares.slice(0, 8));
    renderMovies('movies-lancamentos', populares.slice(2, 10));
    
    const bemAvaliados = [...populares].sort((a, b) => b.vote_average - a.vote_average);
    renderMovies('movies-avaliados', bemAvaliados.slice(0, 8));
  }

  
  await mostrarFilmeSurpresa();

  
  document.getElementById('btn-surpreenda')?.addEventListener('click', mostrarFilmeSurpresa);
  document.getElementById('btn-outro-surpresa')?.addEventListener('click', mostrarFilmeSurpresa);

  
  const btnFiltrar = document.getElementById('btn-filtrar');
  const painelFiltros = document.getElementById('filtros-painel');
  const botoesFiltro = document.querySelectorAll('.filtro-btn');

  btnFiltrar?.addEventListener('click', () => {
    painelFiltros.classList.toggle('ativo');
  });

  botoesFiltro.forEach(btn => {
    btn.addEventListener('click', () => {
      botoesFiltro.forEach(b => b.classList.remove('selecionado'));
      btn.classList.add('selecionado');
      console.log('Filtro selecionado:', btn.dataset.filtro);
    });
  });
});


async function mostrarFilmeSurpresa() {
  
  document.getElementById('surpresa-titulo').textContent = 'Carregando...';
  document.getElementById('surpresa-info').textContent = '';
  document.getElementById('surpresa-sinopse').textContent = '';
  document.getElementById('surpresa-img').src = '';

  const movie = await getRandomMovie();

  if (!movie) {
    document.getElementById('surpresa-titulo').textContent = 'Erro ao carregar filme';
    return;
  }

  
  const detalhes = await getMovieDetails(movie.id);

  const titulo = detalhes?.title || movie.title;
  const ano = (detalhes?.release_date || movie.release_date || '').substring(0, 4);
  const nota = (detalhes?.vote_average || movie.vote_average || 0).toFixed(1);
  const sinopse = detalhes?.overview || movie.overview || 'Sinopse não disponível.';
  const generos = formatGenres(detalhes?.genres);
  const poster = getPosterUrl(detalhes?.poster_path || movie.poster_path);

  
  document.getElementById('surpresa-titulo').textContent = titulo;
  document.getElementById('surpresa-info').textContent = `${ano} • ⭐ ${nota} • ${generos}`;
  document.getElementById('surpresa-sinopse').textContent = sinopse;
  document.getElementById('surpresa-img').src = poster;
  document.getElementById('surpresa-img').alt = titulo;
  document.getElementById('surpresa-link').href = `../filme/filme.html?id=${movie.id}`;
}