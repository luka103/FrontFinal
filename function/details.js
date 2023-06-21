document.addEventListener('DOMContentLoaded', function() {
  const mangaDetailsElement = document.getElementById('manga-details');
  const page_name = document.getElementById("page_name");


  const selectedManga = JSON.parse(localStorage.getItem('selectedManga'));
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap scrollspy
    var scrollSpy = new bootstrap.ScrollSpy(document.body, {
      target: '#navbarSupportedContent'
    });

    // Smooth scrolling
    var scroll = new SmoothScroll('a[href*="#"]');
  });
  if (selectedManga) {
    const mangaName = document.createElement('h2');
    mangaName.classList.add('manga-name');
    page_name.textContent = selectedManga.name;

    mangaName.textContent = selectedManga.name;

    const mangaCover = document.createElement('img');
    mangaCover.classList.add('manga-cover-details');
    mangaCover.src = selectedManga.cover;
    mangaCover.alt = 'Manga Cover';

    const mangaDescription = document.createElement('p');
    mangaDescription.classList.add('manga-description-details');
    const descriptionLabel = document.createElement('strong');
    descriptionLabel.textContent = 'Description: ';
    mangaDescription.appendChild(descriptionLabel);
    mangaDescription.appendChild(document.createTextNode(selectedManga.description));

    const mangaRating = document.createElement('p');
    mangaRating.textContent = `Rating: ${selectedManga.rating}`;

    const mangaDates = document.createElement('p');
    if (selectedManga.endDate) {
      mangaDates.textContent = `Start Date: ${selectedManga.startDate} - End Date: ${selectedManga.endDate}`;
    } else {
      mangaDates.textContent = `Start Date: ${selectedManga.startDate} - Ongoing`;
    }

    const mangaPopularityRank = document.createElement('p');
    mangaPopularityRank.textContent = `Popularity Rank: ${selectedManga.popularityRank}`;

    const mangaRatingRank = document.createElement('p');
    mangaRatingRank.textContent = selectedManga.ratingRank ? `Rating Rank: ${selectedManga.ratingRank}` : "Rating Rank: Not available";

    const mangaAgeRating = document.createElement('p');
    mangaAgeRating.textContent = `Age Rating: ${selectedManga.ageRating}`;

    const mangaVolumeCount = document.createElement('p');
    mangaVolumeCount.textContent = `Volume Count: ${selectedManga.volumeCount}`;

    mangaDetailsElement.appendChild(mangaName);
    mangaDetailsElement.appendChild(mangaCover);
    mangaDetailsElement.appendChild(mangaDescription);
    mangaDetailsElement.appendChild(mangaRating);
    mangaDetailsElement.appendChild(mangaDates);
    mangaDetailsElement.appendChild(mangaPopularityRank);
    mangaDetailsElement.appendChild(mangaRatingRank);
    mangaDetailsElement.appendChild(mangaAgeRating);
    mangaDetailsElement.appendChild(mangaVolumeCount);
  }

  const backButton = document.querySelector('.button');
  const backButton1 = document.querySelector('.button1');

  backButton.addEventListener('click', function() {
    window.location.href = 'manga.html';
  });
  backButton1.addEventListener('click', function() {
    window.location.href = 'manga.html';
  });
});
