let selectedRating = 0;

const starContainer = document.getElementById('star-rating');
const stars = starContainer.querySelectorAll('span');

stars.forEach(star => {
  star.addEventListener('mouseover', () => {
    const val = parseInt(star.dataset.value);
    stars.forEach(s => {
      s.classList.toggle('active', parseInt(s.dataset.value) <= val);
    });
  });

  star.addEventListener('mouseout', () => {
    stars.forEach(s => {
      s.classList.toggle('active', parseInt(s.dataset.value) <= selectedRating);
    });
  });

  star.addEventListener('click', () => {
    selectedRating = parseInt(star.dataset.value);
    stars.forEach(s => {
      s.classList.toggle('active', parseInt(s.dataset.value) <= selectedRating);
    });
  });
});

document.getElementById('add-btn').addEventListener('click', addMovie);

function addMovie() {
  const title     = document.getElementById('title').value.trim();
  const year      = document.getElementById('year').value.trim();
  const genre     = document.getElementById('genre').value;
  const newRating = selectedRating;

  if (!title)          { alert('Please enter a movie title.'); return; }
  if (!year)           { alert('Please enter a release year.'); return; }
  if (newRating === 0) { alert('Please select a rating.'); return; }

  const existing = localStorage.getItem('movies');
  const movies   = existing ? JSON.parse(existing) : [];

  const idx = movies.findIndex(
    m => m.title.toLowerCase() === title.toLowerCase()
  );

  if (idx !== -1) {
    const oldRating    = parseFloat(movies[idx].rating);
    const avgRating    = ((oldRating + newRating) / 2).toFixed(1);
    movies[idx].year   = year;
    movies[idx].genre  = genre;
    movies[idx].rating = String(avgRating);
  } else {
    movies.push({ title, year, genre, rating: String(newRating) });
  }

  localStorage.setItem('movies', JSON.stringify(movies));
  renderMovieList();
  resetForm();
}
function deleteMovie(index) {
  const confirmed = confirm('Are you sure you want to delete?');
  if (!confirmed) return;

  const existing = localStorage.getItem('movies');
  const movies   = existing ? JSON.parse(existing) : [];

  movies.splice(index, 1);
  localStorage.setItem('movies', JSON.stringify(movies));
  renderMovieList();
}

window.deleteMovie = deleteMovie;

function renderMovieList() {
  const listEl   = document.getElementById('movie-list');
  const existing = localStorage.getItem('movies');
  const movies   = existing ? JSON.parse(existing) : [];

  if (movies.length === 0) {
    listEl.innerHTML = '<p class="empty-msg">No movies added yet.</p>';
    return;
  }

  listEl.innerHTML = movies.map((m, i) => {
    const ratingNum  = parseFloat(m.rating);
    const fullStars  = Math.floor(ratingNum);
    const emptyStars = 5 - fullStars;
    const filled     = '★'.repeat(fullStars);
    const empty      = '★'.repeat(emptyStars);

    return `
      <div class="movie-item">
        <div class="movie-info">
          <span>
            <strong>${m.title}</strong> (${m.year}) - ${m.genre}, Rating:
          </span>
          <span class="movie-stars">
            ${filled}<span class="empty-star">${empty}</span>
          </span>
          <span class="rating-value">(${ratingNum})</span>
        </div>
        <button class="btn-delete" onclick="deleteMovie(${i})">Delete</button>
      </div>`;
  }).join('');
}
function resetForm() {
  document.getElementById('title').value = '';
  document.getElementById('year').value  = '';
  document.getElementById('genre').selectedIndex = 0;
  selectedRating = 0;
  stars.forEach(s => s.classList.remove('active'));
}

renderMovieList();
