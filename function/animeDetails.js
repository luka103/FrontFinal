// Retrieve the anime ID from the query parameter
const urlParams = new URLSearchParams(window.location.search);
const animeId = urlParams.get('id');
const page_name = document.getElementById("page_name");

// Fetch the detailed information of the anime using the animeId
const apiUrl = `https://kitsu.io/api/edge/anime/${animeId}`;
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // Access the detailed anime information from the 'data' object
    const anime = data.data;


    

    // Create the elements for displaying anime details
    const animeDetailsContainer = document.getElementById('anime-details-container');

    const animeTitle = document.createElement('h2');
    animeTitle.className = 'anime-title';
    page_name.textContent = anime.attributes.canonicalTitle;
    animeTitle.textContent = anime.attributes.canonicalTitle;
    animeDetailsContainer.appendChild(animeTitle);

    const animeCoverImage = document.createElement('img');
    animeCoverImage.className = 'anime-cover-image';
    animeCoverImage.src = anime.attributes.posterImage.medium;
    console.log('Cover Image URL:', anime.attributes.posterImage.medium); // Log the cover image URL
    animeDetailsContainer.appendChild(animeCoverImage);
    

    // Create the element for displaying the description
    const description = document.createElement('p');
    description.className = 'anime-detail-value';
    description.innerHTML = `<strong>Description:</strong> ${anime.attributes.description}`;
    animeDetailsContainer.appendChild(description);

    // Create and append other elements for displaying details
    const averageRating = document.createElement('p');
    averageRating.textContent = `Average Rating: ${anime.attributes.averageRating}`;
    animeDetailsContainer.appendChild(averageRating);

    const startDate = document.createElement('p');
    startDate.textContent = `Start Date: ${anime.attributes.startDate}`;
    animeDetailsContainer.appendChild(startDate);

    const endDate = document.createElement('p');
    endDate.textContent = `End Date: ${anime.attributes.endDate}`;
    animeDetailsContainer.appendChild(endDate);

    const popularityRank = document.createElement('p');
    popularityRank.textContent = `Popularity Rank: ${anime.attributes.popularityRank}`;
    animeDetailsContainer.appendChild(popularityRank);

    const ratingRank = document.createElement('p');
    ratingRank.textContent = `Rating Rank: ${anime.attributes.ratingRank}`;
    animeDetailsContainer.appendChild(ratingRank);

    const ageRating = document.createElement('p');
    ageRating.textContent = `Age Rating: ${anime.attributes.ageRating}`;
    animeDetailsContainer.appendChild(ageRating);

    const subtype = document.createElement('p');
    subtype.textContent = `Subtype: ${anime.attributes.subtype}`;
    animeDetailsContainer.appendChild(subtype);

    const episodeCount = document.createElement('p');
    episodeCount.textContent = `Episode Count: ${anime.attributes.episodeCount}`;
    animeDetailsContainer.appendChild(episodeCount);


    // Create the YouTube video iframe for the trailer
    const youtubeVideoId = anime.attributes.youtubeVideoId;
    if (youtubeVideoId) {
      const youtubeContainer = document.createElement('div');
      youtubeContainer.className = 'youtube-container';

      const youtubeFrame = document.createElement('iframe');
      youtubeFrame.src = `https://www.youtube.com/embed/${youtubeVideoId}`;
      youtubeFrame.allowFullscreen = true;
      youtubeContainer.appendChild(youtubeFrame);

      animeDetailsContainer.appendChild(youtubeContainer);
    }
  })
  .catch(error => console.error('Error:', error));
