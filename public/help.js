let currentRating = 0;
const stars = document.querySelectorAll('.star');
stars.forEach(star => {
    star.addEventListener('click', () => {
        currentRating = star.getAttribute('data-value');
        updateStars(currentRating);
    });
});

function updateStars(rating) {
    stars.forEach(s => {
        s.classList.toggle('selected', s.getAttribute('data-value') <= rating);
    });
}

document.getElementById('addMovieBtn').addEventListener('click', () => {
    const title = document.getElementById('movieTitle').value;
    const genre = document.getElementById('movieGenre').value;

    if (!title || !genre || currentRating === 0) {
        alert("Please fill all fields and select a rating.");
        return;
    }

    const newMovie = { title, genre, rating: currentRating };

    let movies = JSON.parse(localStorage.getItem('movieData')) || [];
    movies.push(newMovie);

    localStorage.setItem('movieData', JSON.stringify(movies));

    displayMovies();
    resetForm();
});

function displayMovies() {
    const list = document.getElementById('listContainer');
    const movies = JSON.parse(localStorage.getItem('movieData')) || [];
    
    list.innerHTML = movies.map(m => `
        <li>
            <strong>${m.title}</strong> (${m.genre}) - 
            <span style="color: gold;">${'★'.repeat(m.rating)}</span>
        </li>
    `).join('');
}

function resetForm() {
    document.getElementById('movieTitle').value = '';
    document.getElementById('movieGenre').value = '';
    currentRating = 0;
    updateStars(0);
}

displayMovies();
