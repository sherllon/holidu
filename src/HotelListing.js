import React from 'react';
import { useSelector } from 'react-redux';
import {Grid, Paper, Typography, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RoomIcon from '@material-ui/icons/Room';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import HotelListingCarousel from './HotelListingCarousel';


const useStyles = makeStyles(theme => ({
  paper: {
    height: '100%',
    padding: theme.spacing(1)
  },
  listingName: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontWeight: 'bold'
  },
  price: {
    fontWeight: 'bold'
  },
  locationContainer: {
    color: theme.palette.primary.main
  },
  location: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
 },
 stars: {
     color: theme.palette.primary.main
 },
 mainInfo: {
     fontWeight: 'bold'
 }
}));

const HotelListing = (props) => {
    const listing = useSelector(state => state.listings.find(listing => listing.id === props.id));
    const { details, price, rating } = listing;
    const styles = useStyles();

    const stars = [];
    const ratingAvg = (rating.value*5/100);

    for(let i=0; i<5; i++) {
        if(ratingAvg>i && ratingAvg<i+1) {
            stars.push(0.5);
        } else if(ratingAvg<i) {
            stars.push(0);
        } else if(ratingAvg>=i+1) {
            stars.push(1);
        }
    }

    const starsIcons = stars.map((star, idx) => {
        if(star===0) {
            return <StarBorderIcon key={idx} />;
        } else if(star === 0.5) {
            return <StarHalfIcon key={idx} />;
        } else {
            return <StarIcon key={idx} />;
        }
    })

    return (
        <Grid item xs={4} lg={3} xl={2}>
            <Paper className={styles.paper}>
                <HotelListingCarousel listingId={listing.id} />
                <Grid container spacing={3}>
                    <Grid item xs={9}>
                        <Typography variant="subtitle1" gutterBottom className={styles.listingName}>{details.name}</Typography>
                        <Grid container alignItems='flex-end' className={styles.locationContainer}>
                            <Grid item xs={1}>
                                <RoomIcon fontSize='small'/>
                            </Grid>
                            <Grid item xs={11} className={styles.location}>
                                <Typography variant='caption'>{listing.location.name}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography className={styles.price}>{`${price.currency === 'EUR' ? '€' :  price.currency} ${price.total}`}</Typography>
                        <Typography variant='caption'>{`${price.nights} night${price.nights > 1 && 's'}`}</Typography>
                    </Grid>
                </Grid>
                <div>
                    <Typography variant='body2' gutterBottom>
                        Up to <span className={styles.mainInfo}>{details.guestsCount}</span> {details.guestsCount > 1 ? 'people' : 'person'}
                    </Typography>
                    <Typography variant='body2' gutterBottom>
                        <span className={styles.mainInfo}>{details.bedroomsCount}</span>
                        {` bedroom${details.bedroomsCount > 1 ? 's' : ''}`}
                        <span className={styles.mainInfo}>
                            {` ${details.area.value}${details.area.unit=== 'UNIT_SM' ? 'm²' : 'ft²'}`}
                        </span>
                    </Typography>
                </div>
                {rating.count > 0 &&
                    <Grid container className={styles.stars} alignItems='center' spacing={1}>
                        <Grid item>{ratingAvg}</Grid>
                        <Grid item>{starsIcons}</Grid>
                    </Grid>
                }
                <Grid container justify="flex-end">
                    <Button variant="contained" color="primary">Book now</Button>
                </Grid>
            </Paper>
        </Grid>
    )
};

export default HotelListing;
