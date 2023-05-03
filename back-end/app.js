const express = require('express');
const app = express();
const cors = require('cors')
const bookmarkController = require('./controllers/bookmarkController')

const { validateUrl } = require('./validations/checkBookmarks')


app.use(express.json());
app.use(cors());
// app.use(validateUrl);

app.use('/bookmarks', bookmarkController)
// const reviewController = require('./controllers/reviewsController')
// app.use('/reviews', reviewController)

app.get('/', (req, res) => {
    res.send('Welcome to the 9.4 bookmarks server');
});

app.get('*', (req, res) => {
    res.status(404).send('Come back later... idk what to tell you.')
})

module.exports = app;
