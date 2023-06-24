const apiUrl = 'https://kitsu.io/api/edge/manga';
const perPage = 20; // Number of mangas per page
let page = 1; // Starting page number
let totalMangas = 0; // Total number of mangas
const rev = document.getElementById('prev');
const nxt = document.getElementById('nxt');
const topp = document.getElementById('top');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const pageElement = document.getElementById('page');
const pageContainer = document.getElementById('pageContainer');

function fetchMangas() {
  const offset = (page - 1) * perPage;
  let fetchUrl = `${apiUrl}?page[limit]=${perPage}&page[offset]=${offset}`;

  if (searchInput.value.trim() !== '') {
    const searchQuery = searchInput.value.trim();
    fetchUrl += `&filter[text]=${searchQuery}`;
  }

  fetch(fetchUrl)
    .then(response => response.json())
    .then(data => {
      if (totalMangas === 0) {
        totalMangas = data.meta.count;
      }

      const mangaList = document.getElementById('manga-list');
      mangaList.innerHTML = '';

      data.data.forEach(manga => {
        const title = manga.attributes.canonicalTitle;
        const coverImage = manga.attributes.posterImage.small;
        const mangaId = manga.id; 

        const mangaItem = document.createElement('div');
        mangaItem.classList.add('manga-item');

        const mangaTitle = document.createElement('h2');
        mangaTitle.textContent = title;

        const mangaCover = document.createElement('img');
        mangaCover.src = coverImage;
        mangaCover.alt = title;

        mangaItem.appendChild(mangaTitle);
        mangaItem.appendChild(mangaCover);

        mangaItem.addEventListener('click', () => {
          // Store the selected manga details in local storage
          localStorage.setItem('selectedManga', JSON.stringify({
            id: mangaId,
            name: title,
            cover: coverImage,
            description: manga.attributes.description,
            rating: manga.attributes.averageRating || 'Not available',
            startDate: manga.attributes.startDate || 'Ongoing',
            endDate: manga.attributes.endDate || 'Ongoing',
            popularityRank: manga.attributes.popularityRank || 'Not available',
            ratingRank: manga.attributes.ratingRank || 'Not available',
            ageRating: manga.attributes.ageRating || 'Not available',
            volumeCount: manga.attributes.volumeCount || 'Not available'
          }));

          // Redirect to the details.html page
          window.location.href = 'details.html';
        });

        mangaList.appendChild(mangaItem);
      });

      if (page > 1) {
        rev.disabled = false;
      } else {
        rev.disabled = true;
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });

  pageElement.textContent = page;
}

rev.addEventListener('click', () => {
  if (page > 1) {
    page--;
    fetchMangas();
    const targetSection = topp;
    targetSection.scrollIntoView({ behavior: "smooth" });
  }
});

nxt.addEventListener('click', () => {
  page++;
  fetchMangas();
  const targetSection = topp;
  targetSection.scrollIntoView({ behavior: "smooth" });
});

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  page = 1;
  fetchMangas();
});

function filterMangas() {
  const filterSelect = document.getElementById('filterSelect');
  const filterCriteria = filterSelect.value;
  const filterValue = document.getElementById('filterInput').value.trim();

  let fetchUrl = `${apiUrl}?`;

  if (filterCriteria === 'title') {
    fetchUrl += `filter[text]=${encodeURIComponent(filterValue)}`;
  } else if (filterCriteria === 'ageRating') {
    fetchUrl += `filter[ageRating]=${encodeURIComponent(filterValue)}`;
  }

  fetchUrl += `&page[limit]=${perPage}&page[offset]=0`;

  fetch(fetchUrl)
    .then(response => response.json())
    .then(data => {
      totalMangas = data.meta.count;
      const mangaList = document.getElementById('manga-list');
      mangaList.innerHTML = '';

      data.data.forEach(manga => {
        const title = manga.attributes.canonicalTitle;
        const coverImage = manga.attributes.posterImage.small;
        const mangaId = manga.id; // Assuming "id" is the unique identifier for each manga

        const mangaItem = document.createElement('div');
        mangaItem.classList.add('manga-item');

        const mangaTitle = document.createElement('h2');
        mangaTitle.textContent = title;

        const mangaCover = document.createElement('img');
        mangaCover.src = coverImage;
        mangaCover.alt = title;

        mangaItem.appendChild(mangaTitle);
        mangaItem.appendChild(mangaCover);

        mangaItem.addEventListener('click', () => {
          // Store the selected manga details in local storage
          localStorage.setItem('selectedManga', JSON.stringify({
            id: mangaId,
            name: title,
            cover: coverImage,
            description: manga.attributes.description,
            rating: manga.attributes.averageRating || 'Not available',
            startDate: manga.attributes.startDate || 'Ongoing',
            endDate: manga.attributes.endDate || 'Ongoing',
            popularityRank: manga.attributes.popularityRank || 'Not available',
            ratingRank: manga.attributes.ratingRank || 'Not available',
            ageRating: manga.attributes.ageRating || 'Not available',
            volumeCount: manga.attributes.volumeCount || 'Not available'
          }));

          // Redirect to the details.html page
          window.location.href = 'details.html';
        });

        mangaList.appendChild(mangaItem);
      });
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById('filterButton').addEventListener('click', filterMangas);
document.getElementById('resetButton').addEventListener('click', () => {
  document.getElementById('filterInput').value = '';
  filterMangas();
});

document.getElementById('resetButton').addEventListener('click', () => {
  document.getElementById('filterInput').value = '';
  fetchMangas(); // Call fetchMangas() after resetting the filter
});


fetchMangas();
