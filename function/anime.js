let currentPage = 1; // Current page counter
const animePerPage = 20; // Number of anime to display per page
let totalAnimeCount = 0; // Total number of anime available
const rev = document.getElementById('prev');
const nxt = document.getElementById('nxt');
const topp = document.getElementById('top');
const currentPageElement = document.getElementById('currentPage');
const currentPageContainer = document.getElementById('currentPageContainer');


document.addEventListener('DOMContentLoaded', function() {
  fetchAnimeData();
  const searchForm = document.getElementById('searchForm');
  searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const searchInput = document.getElementById('searchInput');
    const searchQuery = searchInput.value.trim();

    if (searchQuery !== '') {
      searchAnime(searchQuery);
    }
  });
  const filterForm = document.getElementById('filterForm');
  const filterInput = document.getElementById('filterInput');
  const filterButton = document.getElementById('filterButton');
  filterButton.addEventListener('click', filterAnime);
  const resetButton = document.getElementById('resetButton');

  filterButton.addEventListener('click', function() {
    const filterQuery = filterInput.value.trim();
    if (filterQuery !== '') {
      filterAnime(filterQuery);
    }
  });

  resetButton.addEventListener('click', function() {
    filterInput.value = '';
    fetchAnimeData();
  });
  
});
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Bootstrap scrollspy
  var scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#navbarSupportedContent'
  });

  // Smooth scrolling
  var scroll = new SmoothScroll('a[href*="#"]');
});

function fetchAnimeData() {
  const url = `https://kitsu.io/api/edge/anime?page[limit]=${animePerPage}&page[offset]=${(currentPage - 1) * animePerPage}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      totalAnimeCount = data.meta.count;
      const animeContainer = document.getElementById('anime-container');
      animeContainer.innerHTML = '';

      data.data.forEach(anime => {
        const animeCard = createAnimeCard(anime);
        animeContainer.appendChild(animeCard);
      });

      if (hasNextPage()) {
        addNextPageButton();
      }
      
      if (currentPage > 1) {
        rev.disabled = false;
      } else {
        rev.disabled = true;
      }
    })
    
    .catch(error => {
      console.error('Error:', error);
    });
    currentPageElement.textContent = currentPage;
}

function createAnimeCard(anime) {
  const animeCard = document.createElement('div');
  animeCard.className = 'anime-card';

  const animeLink = document.createElement('a');
  animeLink.href = `animeDetails.html?id=${anime.id}`; // Pass the anime ID as a query parameter

  const imageElement = document.createElement('img');
  imageElement.className = 'anime-image';
  imageElement.src = anime.attributes.posterImage.medium;

  const titleElement = document.createElement('h2');
  titleElement.className = 'anime-title';
  titleElement.textContent = anime.attributes.canonicalTitle;

  animeLink.appendChild(imageElement);
  animeLink.appendChild(titleElement);
  animeCard.appendChild(animeLink);

  return animeCard;
}


rev.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchAnimeData();
    const targetSection = topp;
    targetSection.scrollIntoView({ behavior: "smooth" });
  }
});

nxt.addEventListener('click', () => {
  currentPage++;
  fetchAnimeData();
  const targetSection = topp;
  targetSection.scrollIntoView({ behavior: "smooth" });
});
  
  


function searchAnime(query) {
  const url = `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(query)}&page[limit]=${animePerPage}&page[offset]=0`;

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

      // Remove Next Page button
      const buttonContainer = document.getElementById('button-container');
      buttonContainer.innerHTML = '';
    })
    .catch(error => console.error('Error:', error));
}

function filterAnime() {
  const filterSelect = document.getElementById('filterSelect');
  const filterCriteria = filterSelect.value;
  const filterValue = document.getElementById('filterInput').value.trim();

  let url = `https://kitsu.io/api/edge/anime?`;

  if (filterCriteria === 'subtype') {
    url += `filter[subtype]=${encodeURIComponent(filterValue)}`;
  } else if (filterCriteria === 'title') {
    url += `filter[text]=${encodeURIComponent(filterValue)}`;
  } else if (filterCriteria === 'ageRating') {
    url += `filter[ageRating]=${encodeURIComponent(filterValue)}`;
  }

  url += `&page[limit]=${animePerPage}&page[offset]=0`;

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

      // Remove Next Page button
      const buttonContainer = document.getElementById('button-container');
      buttonContainer.innerHTML = '';
    })
    .catch(error => console.error('Error:', error));
}





