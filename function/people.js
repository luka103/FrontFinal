document.addEventListener('DOMContentLoaded', function() {
  const resultsElement = document.getElementById('results');
  const prevButton = document.getElementById('prevBtn');
  const nextButton = document.getElementById('nextBtn');
  const peoplePerPage = 20;
  let currentPage = 1;
  let totalPeople = 0;
  const topp = document.getElementById('top');
;
  
  const fetchPeople = (page) => {
    const offset = (page - 1) * peoplePerPage;
    const url = `https://kitsu.io/api/edge/people?page[limit]=${peoplePerPage}&page[offset]=${offset}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const people = data.data;
        totalPeople = data.meta.count;

        resultsElement.innerHTML = '';

        people.forEach(person => {
          const card = document.createElement('div');
          card.classList.add('card');

          const image = document.createElement('img');
          const imageLink = person.attributes.image && person.attributes.image.original;
          if (imageLink) {
            image.src = imageLink;
            image.alt = person.attributes.name;
            image.style.objectFit = 'contain';
          } else {
            image.src = '../img/missing.png';
            image.alt = 'Default Image';
          }

          const name = document.createElement('h3');
          name.textContent = person.attributes.name;

          const description = document.createElement('p');
          const fullDescription = person.attributes.description || 'No description available.';
          const shortDescription = fullDescription.length > 100 ? fullDescription.slice(0, 100) + '...' : fullDescription;
          description.textContent = shortDescription;
          description.classList.add('short-description');

          const descriptionContainer = document.createElement('div');
          descriptionContainer.classList.add('description-container');
          descriptionContainer.appendChild(description);

          if (fullDescription.length > 100) {
            const readMoreButton = document.createElement('button');
            readMoreButton.classList.add('read-more-button');
            readMoreButton.textContent = 'Read More';

            readMoreButton.addEventListener('click', () => {
              
              description.classList.toggle('expanded');
              if (description.classList.contains('expanded')) {
                description.textContent = fullDescription;
                readMoreButton.textContent = 'Read Less';
              } else {
                description.textContent = shortDescription;
                readMoreButton.textContent = 'Read More';
              }
            });

            descriptionContainer.appendChild(readMoreButton);
          }

          document.addEventListener('DOMContentLoaded', function() {
            // Initialize Bootstrap scrollspy
            var scrollSpy = new bootstrap.ScrollSpy(document.body, {
              target: '#navbarSupportedContent'
            });
        
            // Smooth scrolling
            var scroll = new SmoothScroll('a[href*="#"]');
            
          });

          card.appendChild(image);
          card.appendChild(name);
          card.appendChild(descriptionContainer);

          resultsElement.appendChild(card);
        });

        updatePaginationButtons();
      })
      .catch(error => {
        const errorElement = document.createElement('p');
        errorElement.classList.add('error');
        errorElement.textContent = 'An error occurred while fetching data from the API.';
        resultsElement.appendChild(errorElement);
      });
  };

  const updatePaginationButtons = () => {
    const totalPages = Math.ceil(totalPeople / peoplePerPage);
  
    if (currentPage === 1) {
      prevButton.disabled = true;
    } else {
      prevButton.disabled = false;
    }
  
    if (currentPage === totalPages) {
      nextButton.disabled = true;
    } else {
      nextButton.disabled = false;
    }
  
    const pageNumberElement = document.getElementById('pageNumber');
    pageNumberElement.textContent = `Page ${currentPage}`;
  };
  

  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      fetchPeople(currentPage);
      const targetSection = topp;
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });

  nextButton.addEventListener('click', () => {
    const totalPages = Math.ceil(totalPeople / peoplePerPage);

    if (currentPage < totalPages) {
      currentPage++;
      fetchPeople(currentPage);
      const targetSection = topp;
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });

  // Start fetching the people
  fetchPeople(currentPage);
});



