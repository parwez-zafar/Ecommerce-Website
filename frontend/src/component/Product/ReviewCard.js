import React from 'react';
import ReactStarts from 'react-rating-stars-component';
// import profilePng from '../../images/Profile.png'
const ReviewCard = ({ review }) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activecolor: 'tomato',
        size: window.innerWidth < 600 ? 20 : 25,
        value: review.rating,
        isHalf: true,
    }
    // console.log("rev is ", review);
    return (
        <>
            <div className="reviewCard">
                <img src={review.image} alt="User" />
                <p>{review.name}</p>
                <ReactStarts {...options} />
                <span>{review.comment}</span>
            </div>
        </>
    )
}

export default ReviewCard;