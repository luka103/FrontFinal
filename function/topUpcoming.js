document.addEventListener("DOMContentLoaded", getTopUpcomingAnime);

async function getTopUpcomingAnime() {
  try {
    const response = await fetch("https://kitsu.io/api/edge/anime?filter[status]=upcoming&sort=-averageRating");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    const animeListContainer = document.getElementById("animeList");

    let index = 0;

    function displayNextAnime() {
      const anime = data.data[index];
      const id = anime.id;
      const title = anime.attributes.canonicalTitle;
      const poster = anime.attributes.posterImage.medium;

      animeListContainer.innerHTML = ""; // Clear the container

      const container = document.createElement("div");
      container.classList.add("anime-item");
      const h4 = document.createElement("h4");
      h4.textContent = `${index + 1}. ${title}`;
      container.appendChild(h4);
      const img = document.createElement("img");
      img.src = poster;
      img.alt = title;
      container.appendChild(img);
      animeListContainer.appendChild(container);

      container.addEventListener("click", function () {
        window.location.href = "/pages/animeDetails.html?id=" + id;
      });

      fadeIn(animeListContainer.querySelector("img"), 1000);
      index = (index + 1) % data.data.length;
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

  } catch (error) {
    console.log("Error:", error.message);
  }
}
