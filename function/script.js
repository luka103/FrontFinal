  var imageIndex = 0;
  var imagePaths = [
    "./quotes/naruto.jpg",
    "./quotes/roy-mustang.jpg",
    "./quotes/steins-gate.jpg",
    "./quotes/natsu.webp",
    "./quotes/kaneki.jpg",
    "./quotes/itachi.jpg",
    "./quotes/obito.webp",
    "./quotes/kenshin.jpg",
    "./quotes/kenshin2.jpg",
    "./quotes/kirito.jpg",
    "./quotes/naruto2.jpg",
    "./quotes/eren.webp"
  ];

  document.getElementById("change-image-button").addEventListener("click", function() {
    var imgElement = document.getElementById("dynamic-image");
    imageIndex = (imageIndex + 1) % imagePaths.length;
    imgElement.src = imagePaths[imageIndex];
  });

  const runningLine = document.getElementById('running-line');
  let position = 0;
  
  function moveRunningLine() {
    position++;
    runningLine.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(moveRunningLine);
  }
  
  moveRunningLine();