import React from 'react';
// import ReactStarts from 'react-rating-stars-component';
// import profilePng from '../../images/Profile.png'
import { Rating } from '@mui/material';
const ReviewCard = ({ review }) => {
    const options = {
        value: review.rating,
        size: "large",
        readOnly: true,
        precision: 0.5
    }
    // console.log("rev is ", review);
    return (
        <>
            <div className="reviewCard">
                <img src={review.image} alt="User" />
                <p>{review.name}</p>
                <Rating {...options} />
                <span className='reviewCardComment' >{review.comment}</span>
            </div>
        </>
    )
}

export default ReviewCard;