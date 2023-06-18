// JavaScript code
// Fetch manga data from API
fetch('https://kitsu.io/api/edge/trending/manga', {
  headers: {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json'
  }
})
  .then(response => response.json())
  .then(data => {
    // Extract trending manga from the response
    const trendingManga = data.data;

    // Generate HTML for each manga item with title and image
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
