import React from 'react';
import {useSelector} from 'react-redux';
import Carousel from 'react-material-ui-carousel'

const HotelListingCarousel = (props) => {
    const listing = useSelector(state => state.listings.find(listing => listing.id === props.listingId));

    return (
        <Carousel autoPlay={false} indicators={false}>
            {listing.photos.map(photo => (
                <img src={photo.t} key={photo.t} alt={`${listing.details.name}`} style={{width: '100%'}}/>
            ))}
        </Carousel>
    )
};

export default HotelListingCarousel;
