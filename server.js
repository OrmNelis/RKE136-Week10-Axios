const {default: axios} = require('axios');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('public'));


app.get('/', (req, res) => {

    
    let url = 'https://api.themoviedb.org/3/movie/550988?api_key=4ca94f8b470d7e34bd3f59c3914295c8';
    axios.get(url)
    .then(response => {
        console.log(response.data.title);
        let data = response.data;
        let releaseDate = new Date(data.release_date).getFullYear();
        let genresToDisplay = '';

        data.genres.forEach(genre => {
            genresToDisplay = genresToDisplay + `${genre.name}, `;
        });

        
        let genresUpdated = genresToDisplay.slice(0, -2) + '.';
        moviePoster = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${data.poster_path}`;
        console.log(genresUpdated);
        let currentYear = new Date().getFullYear();
        res.render('index', {
            movieData: data, 
            releaseDate: releaseDate, 
            genres: genresUpdated, 
            poster: moviePoster, 
            year: currentYear});
    });
    
})

app.listen(process.env.PORT || 3000, () => {
    console.log('server is running on Port 3000');
});