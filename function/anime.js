let currentPage = 1; // Current page counter
const animePerPage = 20; // Number of anime to display per page
let totalAnimeCount = 0; // Total number of anime available

document.addEventListener('DOMContentLoaded', function() {
  fetchAnimeData();
});

function fetchAnimeData() {
  const url = `https://kitsu.io/api/edge/anime?page[limit]=${animePerPage}&page[offset]=${(currentPage - 1) * animePerPage}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      totalAnimeCount = data.meta.count;
      const animeContainer = document.getElementById('anime-container');
      animeContainer.innerHTML = ''; // Clear existing anime cards

      data.data.forEach(anime => {
        const animeCard = createAnimeCard(anime);
        animeContainer.appendChild(animeCard);
      });

      // Add Next Page button if more anime available
      if (hasNextPage()) {
        addNextPageButton();
      }
    })
    .catch(error => console.error('Error:', error));
}

function createAnimeCard(anime) {
    const animeCard = document.createElement('div');
    animeCard.className = 'anime-card';
  
    const imageElement = document.createElement('img');
    imageElement.className = 'anime-image';
    imageElement.src = anime.attributes.posterImage.medium;
  
    const titleElement = document.createElement('h2');
    titleElement.className = 'anime-title';
    titleElement.textContent = anime.attributes.canonicalTitle;
  
    animeCard.appendChild(imageElement);
    animeCard.appendChild(titleElement);
  
    return animeCard;
  }
  

function hasNextPage() {
  return (currentPage * animePerPage < totalAnimeCount);
}

function addNextPageButton() {
  const nextPageButton = document.createElement('button');
  nextPageButton.textContent = 'Next Page';
  nextPageButton.addEventListener('click', function() {
    currentPage++;
    fetchAnimeData();
  });

  const buttonContainer = document.getElementById('button-container');
  buttonContainer.innerHTML = ''; // Clear existing button
  buttonContainer.appendChild(nextPageButton);
}




