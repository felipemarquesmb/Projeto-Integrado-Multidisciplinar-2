document.addEventListener('DOMContentLoaded', () => {
  const historico = MOCK_MOVIES.slice(0, 5);
  const avaliados = MOCK_MOVIES.slice(2, 6);

  document.getElementById('historico').innerHTML = historico.map(m => `
    <a href="../filme/filme.html?id=${m.id}" class="movie-card">
      <img src="${m.poster}" alt="${m.title}">
      <div class="info">${m.title}</div>
    </a>
  `).join('');

  document.getElementById('avaliados').innerHTML = avaliados.map(m => `
    <a href="../filme/filme.html?id=${m.id}" class="movie-card">
      <img src="${m.poster}" alt="${m.title}">
      <div class="info">${m.title}</div>
    </a>
  `).join('');
});