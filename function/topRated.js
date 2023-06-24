document.addEventListener('DOMContentLoaded', getTopAnime);

function getTopAnime() {
  fetch('https://kitsu.io/api/edge/anime?sort=-averageRating&page[limit]=10')
    .then(response => response.json())
    .then(data => {
      const animeList = data.data;
      const animeListContainer = document.getElementById('anime_list');
      let index = 0;

      function displayNextAnime() {
        animeListContainer.innerHTML = ""; // Clear the container

        const anime = animeList[index];

        const animeCard = document.createElement('div');
        animeCard.className = 'anime-card';

        const title = document.createElement('h2');
        title.textContent = `${index + 1}. ${anime.attributes.canonicalTitle}`;
        animeCard.appendChild(title);

        const image = document.createElement('img');
        image.src = anime.attributes.posterImage.medium;
        image.alt = anime.attributes.canonicalTitle;
        animeCard.appendChild(image);

        animeCard.addEventListener('click', () => {
          window.location.href = '/pages/animeDetails.html?id=' + anime.id;
        });

        animeListContainer.appendChild(animeCard);

        index = (index + 1) % animeList.length; 

        fadeIn(animeCard, 1000);
        setTimeout(displayNextAnime, 4000); 
      }

      function fadeIn(element, duration) {
        let opacity = 0;
        const interval = 10;
        const gap = interval / duration;

        function updateOpacity() {
          if (opacity < 1) {
            opacity += gap;
            element.style.opacity = opacity;
            setTimeout(updateOpacity, interval);
          }
        }

        updateOpacity();
      }

      displayNextAnime();
    })
    .catch(error => console.log(error));
}
