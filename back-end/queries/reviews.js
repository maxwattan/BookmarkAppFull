const db = require('../db/dbConfig');


// index query
const getAllReviews = async (bookmarkId) => {
    try {
        const allReviews = await db.any("SELECT * FROM reviews WHERE bookmark_id=$1;", bookmarkId);
        return allReviews;
    } catch (error) {
        return error;
    }
};

// show query
const getAReview = async (id) => {
    try {
        const review = await db.one("SELECT * FROM reviews WHERE id=$1;", id);
        return review;
    } catch (error) {
        return error;
    };
};

const createReview = async (reviewToAdd) => {
    // const { name, url, category, is_favorite } = reviewToAdd;
    try {
        const newReview = await db.one("INSERT INTO reviews (bookmark_id, reviewer, title, content, rating) VALUES ($1, $2, $3, $4, $5) RETURNING *;", [reviewToAdd.bookmark_id, reviewToAdd.reviewer, reviewToAdd.title, reviewToAdd.content, reviewToAdd.rating]);
        return newReview;
    } catch (error) {
        return error;
    };
};

const deleteReview = async (id) => {
    try {
        const deletedReview = await db.one("DELETE FROM reviews WHERE id=$1 RETURNING *", id);
        return deletedReview;
    } catch (error) {
        return error;
    };
};


const updateReview = async (id, review) => {
    try {
      const updatedReview = await db.one(
        "UPDATE reviews SET reviewer=$1, title=$2, content=$3, rating=$4, bookmark_id=$5 where id=$6 RETURNING *",
        [
          review.reviewer,
          review.title,
          review.content,
          review.rating,
          review.bookmark_id,
          id,
        ]
      );
      return updatedReview;
    } catch (error) {
      return error;
    }
  }

// const fakeQuery = async (bookmark) => {
//     const query  = await db.any("SELECT * FROM bookmarks WHERE category=$[id]", {
//         id: bookmark.id
//     })
// }

module.exports = {
    getAllReviews,
    getAReview,
    createReview,
    deleteReview,
    updateReview
}