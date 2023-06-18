const apiUrl = 'https://kitsu.io/api/edge/manga';
const mangaListElement = document.getElementById('manga-list');
const paginationElement = document.getElementById('pagination');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const pageSize = 20;

async function fetchMangaData(pageNumber, pageSize, searchQuery = '') {
  try {
    const url = searchQuery
      ? `${apiUrl}?filter[text]=${encodeURIComponent(searchQuery)}&page[limit]=${pageSize}&page[offset]=${(pageNumber - 1) * pageSize}`
      : `${apiUrl}?page[limit]=${pageSize}&page[offset]=${(pageNumber - 1) * pageSize}`;

    const response = await fetch(url);
    const data = await response.json();
    const mangas = data.data;

    if (mangas.length === 0) {
      return;
    }

    mangas.forEach(manga => {
      const mangaItem = document.createElement('div');
      mangaItem.classList.add('manga-item');

      mangaItem.dataset.cover = manga.attributes.posterImage?.small || '';
      mangaItem.dataset.description = manga.attributes.description || '';
      mangaItem.dataset.rating = manga.attributes.averageRating || '';
      mangaItem.dataset.startDate = manga.attributes.startDate || '';
      mangaItem.dataset.endDate = manga.attributes.endDate || '';
      mangaItem.dataset.popularityRank = manga.attributes.popularityRank || '';
      mangaItem.dataset.ratingRank = manga.attributes.ratingRank || '';
      mangaItem.dataset.ageRating = manga.attributes.ageRating || '';
      mangaItem.dataset.volumeCount = manga.attributes.volumeCount || '';
      


      const mangaTitle = document.createElement('h3');
      mangaTitle.classList.add('manga-title');
      mangaTitle.textContent = manga.attributes.canonicalTitle;

      const mangaCover = document.createElement('img');
      mangaCover.classList.add('manga-cover');
      mangaCover.src = manga.attributes.posterImage?.small || '';
      mangaCover.alt = manga.attributes.canonicalTitle;

      mangaItem.appendChild(mangaCover);
      mangaItem.appendChild(mangaTitle);
      mangaListElement.appendChild(mangaItem);

      mangaItem.addEventListener('click', handleMangaItemClick);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

function handleMangaItemClick(event) {
  const mangaItem = event.currentTarget;

  const cover = mangaItem.dataset.cover;
  const description = mangaItem.dataset.description;
  const rating = mangaItem.dataset.rating;
  const startDate = mangaItem.dataset.startDate;
  const endDate = mangaItem.dataset.endDate;
  const popularityRank = mangaItem.dataset.popularityRank;
  const ratingRank = mangaItem.dataset.ratingRank;
  const ageRating = mangaItem.dataset.ageRating;
  const volumeCount = mangaItem.dataset.volumeCount;

  localStorage.setItem('selectedManga', JSON.stringify({
    cover,
    description,
    rating,
    startDate,
    endDate,
    popularityRank,
    ratingRank,
    ageRating,
    volumeCount
  }));

  window.location.href = 'details.html';
}

async function fetchMangaCount(searchQuery = '') {
  try {
    const url = searchQuery
      ? `${apiUrl}?filter[text]=${encodeURIComponent(searchQuery)}`
      : apiUrl;

    const response = await fetch(url);
    const data = await response.json();
    const mangas = data.data;
    const mangaCount = mangas.length;
    const totalPages = Math.ceil(mangaCount / pageSize);
    return totalPages;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function addPagination(totalPages) {
  paginationElement.innerHTML = '';

  const previousPageItem = document.createElement('li');
  previousPageItem.classList.add('page-item');
  previousPageItem.innerHTML = `
    <a class="page-link" href="#" aria-label="Previous">
      <span aria-hidden="true">&laquo;</span>
    </a>
  `;
  previousPageItem.addEventListener('click', function () {
    const activePage = paginationElement.querySelector('.page-item.active');
    const currentPage = parseInt(activePage.querySelector('.page-link').textContent);
    if (currentPage > 1) {
      handlePagination(currentPage - 1, pageSize);
    }
  });
  paginationElement.appendChild(previousPageItem);

  for (let i = 1; i <= totalPages; i++) {
    const pageItem = document.createElement('li');
    pageItem.classList.add('page-item');

    const pageLink = document.createElement('a');
    pageLink.classList.add('page-link');
    pageLink.href = '#';
    pageLink.textContent = i;
    pageLink.addEventListener('click', function () {
      handlePagination(i, pageSize);
    });

    pageItem.appendChild(pageLink);
    paginationElement.appendChild(pageItem);
  }

  const nextPageItem = document.createElement('li');
  nextPageItem.classList.add('page-item');
  nextPageItem.innerHTML = `
    <a class="page-link" href="#" aria-label="Next">
      <span aria-hidden="true">&raquo;</span>
    </a>
  `;
  nextPageItem.addEventListener('click', function () {
    const activePage = paginationElement.querySelector('.page-item.active');
    const currentPage = parseInt(activePage.querySelector('.page-link').textContent);
    if (currentPage < totalPages) {
      handlePagination(currentPage + 1, pageSize);
    }
  });
  paginationElement.appendChild(nextPageItem);
}



async function handlePagination(pageNumber, pageSize, searchQuery = '') {
  mangaListElement.innerHTML = '';

  await fetchMangaData(pageNumber, pageSize, searchQuery);

  const activePage = paginationElement.querySelector('.active');
  if (activePage) {
    activePage.classList.remove('active');
  }

  const currentPage = paginationElement.querySelector(`li:nth-child(${pageNumber + 1})`); // Modify this line
  currentPage.classList.add('active');
}



async function handleSearch(event) {
  event.preventDefault();
  const searchQuery = searchInput.value.trim();
  mangaListElement.innerHTML = '';
  paginationElement.innerHTML = '';

  fetchMangaCount(searchQuery)
    .then(totalPages => {
      addPagination(totalPages);
      handlePagination(1, pageSize, searchQuery);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

searchForm.addEventListener('submit', handleSearch);

async function init() {
  const totalPages = await fetchMangaCount();
  addPagination(totalPages);

  handlePagination(1, pageSize);
}

init();