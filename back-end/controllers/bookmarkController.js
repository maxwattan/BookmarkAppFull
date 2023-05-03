const express = require('express');
const bookmark = express.Router({mergeParams: true});
const { getAllBookmarks, getABookmark, createBookmark, deleteBookmark, updateBookmark } = require('../queries/bookmarks') 
const { checkRequest, validateURL, checkId } = require('../validations/checkBookmarks')
const reviewsController = require("./reviewsController")



bookmark.use('/:bookmarkId/reviews', reviewsController)


// index route
bookmark.get('/', async (req, res) => {
    const allBookmarks = await getAllBookmarks();

    if (allBookmarks) {
        res.status(200).json(allBookmarks);
    } else {
        res.status(500).json({ error: 'Server Error'})
    }
});

// show route
bookmark.get('/:id', async (req, res) => {
    const { id } = req.params;
    const bookmark = await getABookmark(id);

    if (bookmark) {
        res.status(200).json(bookmark);
    } else {
        res.status(500).json({ error: 'Server Error'});
    };
});

// create route
bookmark.post('/',  async (req, res) => {
    const newBookmark = req.body;
    // const { body } = req;

    try {
        const addedBookmark = await createBookmark(newBookmark)
        res.status(200).json(addedBookmark)
    } catch (error) {
        res.status(400).json({ error: error})
    }
})

// delete route 
bookmark.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBookmark = await deleteBookmark(id);
        res.status(200).json(deletedBookmark)
    } catch (error) {
        res.status(400).json({ error: error})
    }
});

// update route
bookmark.put('/:id', checkRequest, async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    try {
       const updatedBookmark = await updateBookmark(id, body);
       res.status(200).json(updatedBookmark);
    } catch (error) {
        res.status(400).json({ error: error});
    };
});

module.exports = bookmark;