document.addEventListener("DOMContentLoaded", getTrendingAnime);

async function getTrendingAnime() {
  try {
    const response = await fetch("https://kitsu.io/api/edge/trending/anime");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    const animeListContainer = document.getElementById("anime-list");
  
    data.data.forEach((anime, index) => {
      const title = anime.attributes.canonicalTitle;
      const poster = anime.attributes.posterImage.medium;

      const animeElement = document.createElement("div");
      animeElement.classList.add("anime");

      const titleElement = document.createElement("h2");
      titleElement.innerText = `${index + 1}. ${title}`;

      const posterElement = document.createElement("img");
      posterElement.src = poster;

      animeElement.appendChild(titleElement);
      animeElement.appendChild(posterElement);

      animeListContainer.appendChild(animeElement);
    });
  } catch (error) {
    console.log("Error:", error.message);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Bootstrap scrollspy
  var scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#navbarSupportedContent'
  });

  // Smooth scrolling
  var scroll = new SmoothScroll('a[href*="#"]');
});