
fetch('https://kitsu.io/api/edge/trending/manga', {
  headers: {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json'
  }
})
  .then(response => response.json())
  .then(data => {
    const trendingManga = data.data;

    const mangaList = document.getElementById('mangaList');
    trendingManga.forEach((manga, index) => {
      const mangaItem = document.createElement('li');
      mangaItem.className = 'mangaItem';

      const enumeration = document.createElement('span');
      enumeration.className = 'enumeration';
      enumeration.textContent = `${index + 1}.`;

      const title = document.createElement('p');
      title.textContent = manga.attributes.canonicalTitle;

      const coverImage = document.createElement('img');
      coverImage.src = manga.attributes.posterImage.small;
      coverImage.alt = manga.attributes.canonicalTitle;

      mangaItem.appendChild(enumeration);
      mangaItem.appendChild(coverImage);
      mangaItem.appendChild(title);
      mangaList.appendChild(mangaItem);
    });
  })
  .catch(error => console.error(error));

  document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap scrollspy
    var scrollSpy = new bootstrap.ScrollSpy(document.body, {
      target: '#navbarSupportedContent'
    });

    // Smooth scrolling
    var scroll = new SmoothScroll('a[href*="#"]');
  });