document.addEventListener('DOMContentLoaded', () => {
  const luckyDipButton = document.getElementById('lucky-dip-button');
  const filmDetails = document.getElementById('film-details');

  // Event listener for the lucky dip button
  luckyDipButton.addEventListener('click', () => {
    fetch('https://tsiprojectback.azurewebsites.net/api/films/random')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching random film');
        }
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return response.json();
        } else {
          throw new Error('Invalid response format');
        }
      })
      .then((data) => {
        // Display the film details in the HTML
        filmDetails.innerHTML = `
          <h3>${data.title}</h3>
          <p>Description: ${data.description}</p>
          <p>Release Year: ${data.release_year}</p>
          <p>Length: ${data.length} minutes</p>
          <!-- Display other film details as needed -->
        `;
      })
      .catch((error) => {
        console.error(error);
        filmDetails.innerHTML = 'Error fetching film details.';
      });
  });
});

  