  let imageIndex = 0;
  const imagePaths = [
    "./quotes/naruto.jpg",
    "./quotes/roy-mustang.jpg",
    "./quotes/steins-gate.jpg",
    "./quotes/natsu.webp",
    "./quotes/kaneki.jpg",
    "./quotes/kenshin.jpg",
    "./quotes/kenshin2.jpg",
    "./quotes/naruto2.jpg",
    "./quotes/rin.webp",
    "./quotes/elite.jpg",
    "./quotes/ghoul.jpg",
    "./quotes/giyu.jpg",
    "./quotes/goku.jpg",
    "./quotes/itachi2.jpg",
    "./quotes/ken.jpg",
    "./quotes/luffy.jpg",
    "./quotes/musashi.jpg",
    "./quotes/samurai.jpg",
    "./quotes/sabito.jpg"


  ];

  let imageIndex1 = 0;
  const imagePaths1 = [
    "./quotesSad/obito.webp",
    "./quotesSad/eren.webp",
    "./quotesSad/itachi.jpg",
    "./quotesSad/kirito.jpg",
    "./quotesSad/bebop.jpg",
    "./quotesSad/deep.jpg",
    "./quotesSad/garou.jpg",
    "./quotesSad/gate.jpg",
    "./quotesSad/heren.jpg",
    "./quotesSad/madara.jpg",
    "./quotesSad/oreki.jpg",
    "./quotesSad/pain.jpg",
    "./quotesSad/rin.jpg",
    "./quotesSad/sad.jpg",
    "./quotesSad/violet.jpg"


  ];


  document.getElementById("dynamic-image1").addEventListener("click", function() {
    const imgElement1 = document.getElementById("dynamic-image1");
    imageIndex1 = getRandomNumber1();
    imgElement1.src = imagePaths1[imageIndex1];
  });

  document.getElementById("dynamic-image").addEventListener("click", function() {
    const imgElement = document.getElementById("dynamic-image");
    imageIndex = getRandomNumber();
    imgElement.src = imagePaths[imageIndex];
  });

  document.getElementById("rickRoll").addEventListener("click", function() {
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley";
    });


  function getRandomNumber() {
    return Math.floor(Math.random() * imagePaths.length);
  }

  function getRandomNumber1() {
    return Math.floor(Math.random() * imagePaths1.length);
  }



  
document.addEventListener("DOMContentLoaded", getTrendingAnime);

async function getTrendingAnime() {
  try {
    const response = await fetch("https://kitsu.io/api/edge/trending/anime");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    const animeListContainer = document.getElementById("trendingHome");

    const dictionary = {

    };

    data.data.forEach((anime, index) => {
      const title = anime.attributes.canonicalTitle;
      const poster = anime.attributes.posterImage.small;
      const namee = `${index + 1}. ${title}`;
      const img = `${poster}`;
      dictionary[namee] = img;

    });
    function setBanner() {
      const keys = Object.keys(dictionary);
      let index = 0;
    
      function processNextKey() {
        if (index === 10){
          index = 0
        }
        if (index < keys.length) {
          const key = keys[index];
          const value = dictionary[key];
          animeListContainer.innerHTML = `
            <h4>${key}</h4>
            <img src="${value}">
          `;
          index++;
          setTimeout(processNextKey, 2500); // Delay of 2 seconds (2000 milliseconds)
        }
      }
    
      processNextKey();
    }
    
    setBanner();
    
  } catch (error) {
    console.log("Error:", error.message);
  }
}

