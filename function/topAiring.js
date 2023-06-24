document.addEventListener('DOMContentLoaded', getTopAiringAnimes);

function getTopAiringAnimes() {
  fetch('https://kitsu.io/api/edge/anime?filter[status]=current&sort=popularityRank&page[limit]=10')
    .then(response => response.json())
    .then(data => {
      const animeList = document.getElementById('anime-list');
      animeList.style.listStyleType = 'none'; 

      let index = 0;

      function displayNextAnime() {
        const anime = data.data[index];

        animeList.innerHTML = ""; // Clear the list

        const animeItem = document.createElement('li');
        animeItem.classList.add('anime-item');

        const animeTitle = document.createElement('h4');
        animeTitle.textContent = `${index + 1}. ${anime.attributes.canonicalTitle}`;
        animeItem.appendChild(animeTitle);

        const animeImageContainer = document.createElement('div');
        animeImageContainer.classList.add('anime-image-container');

        const animeImage = document.createElement('img');
        animeImage.src = anime.attributes.posterImage.medium;
        animeImageContainer.appendChild(animeImage);

        animeItem.appendChild(animeImageContainer);

        animeList.appendChild(animeItem);

        animeItem.addEventListener('click', () => {
          window.location.href = '/pages/animeDetails.html?id=' + anime.id;
        });

        index = (index + 1) % data.data.length;

        fadeIn(animeItem, 1000);
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
    .catch(error => {
      console.error('Error:', error);
    });
}
