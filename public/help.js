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
  const title  = document.getElementById('title').value.trim();
  const year   = document.getElementById('year').value.trim();
  const genre  = document.getElementById('genre').value;
  const rating = String(selectedRating);

  if (!title)              { alert('Please enter a movie title.'); return; }
  if (!year)               { alert('Please enter a release year.'); return; }
  if (selectedRating === 0){ alert('Please select a rating.'); return; }

  const movie = { title, year, genre, rating };

  const existing = localStorage.getItem('movies');
  const movies = existing ? JSON.parse(existing) : [];

  movies.push(movie);
  localStorage.setItem('movies', JSON.stringify(movies));

  renderMovieList();
  resetForm();
}

function renderMovieList() {
  const listEl = document.getElementById('movie-list');
  const existing = localStorage.getItem('movies');
  const movies = existing ? JSON.parse(existing) : [];

  if (movies.length === 0) {
    listEl.innerHTML = '<p class="empty-msg">No movies added yet.</p>';
    return;
  }

  listEl.innerHTML = movies.map(m => {
    const filled = '★'.repeat(parseInt(m.rating));
    const empty  = '★'.repeat(5 - parseInt(m.rating));
    return `
      <div class="movie-item">
        <span><strong>${m.title}</strong> (${m.year}) - ${m.genre}, Rating:</span>
        <span class="movie-stars">
          ${filled}<span class="empty-star">${empty}</span>
        </span>
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