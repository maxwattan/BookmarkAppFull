const express = require('express');
const reviews = express.Router({mergeParams: true});
const { getAllReviews, getAReview, createReview, deleteReview, updateReview } = require('../queries/reviews') 
const { checkRequest, validateURL, checkId } = require('../validations/checkReviews')

// index route
reviews.get("/", async (req, res) => {
    //added below line to match frontend.  Two lines below, added bookmarkId to argument (so () to (bookmarkID))
    const { bookmarkId } = req.params;
    try{
        const allReviews = await getAllReviews(bookmarkId)
        res.json(allReviews)
    }catch (err) {
        res.json(err)
    }
  });
// show route
reviews.get('/:id', async (req, res) => {
    const { id } = req.params;
    const review = getAReview(id);

    if (review) {
        res.status(200).json(review);
    } else {
        res.status(500).json({ error: 'Server Error'});
    };
});

// create route
reviews.post('/',  async (req, res) => {
    const newReview = req.body;
    // const { body } = req;

    try {
        const addedReview = await createReview(newReview)
        res.status(200).json(addedReview)
    } catch (error) {
        res.status(400).json({ error: error})
    }
})

// delete route 
reviews.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedReview = await deleteReview(id);
        res.status(200).json(deletedReview)
    } catch (error) {
        res.status(400).json({ error: error})
    }
});

// update route
reviews.put("/:id", async (req, res) => {
    const { id } = req.params;
    //to update we need to know which one "id", and what we are inserting
    const updatedReview = await updateReview(id, req.body);
    if (updatedReview.id) {
      res.status(200).json(updatedReview);
    } else {
      res.status(404).json("Review not found");
    }
  });

module.exports = reviews;