import React, {useRef, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HotelListing from './HotelListing';
import {updateSortBy} from './actions/index';

const useStyles = makeStyles((theme) => ({
  sortBy: {
    width: '200px'
  },
  sortContainer: {
      margin: theme.spacing(1, 0),
  }
}));


const HotelsList = (props) => {
    const listings = useSelector(state => state.listings);
    const sortBy = useSelector(state => state.sortBy);
    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    const styles = useStyles();

    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        dispatch(updateSortBy(event.target.value));
    };

    return (
        <>
            <Grid container justify="flex-end" className={styles.sortContainer}>
                <FormControl variant="outlined" className={styles.sortBy}>
                    <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                      Order by
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={sortBy}
                      onChange={handleChange}
                      labelWidth={labelWidth}
                    >
                      <MenuItem value="">
                        <em>Default</em>
                      </MenuItem>
                      <MenuItem value='name'>Name</MenuItem>
                      <MenuItem value='price'>Price</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid container spacing={3}>
                {[...listings].sort((a,b) => {
                    if(sortBy==='name') {
                        if(a.details.name > b.details.name) {
                            return 1;
                        } else if(a.details.name < b.details.name) {
                            return -1;
                        }
                    } else if(sortBy==='price') {
                        return a.price.total - b.price.total;
                    }
                    return 0;
                }).map(listing => (
                    <HotelListing key={listing.id} id={listing.id}></HotelListing>
                ))}
            </Grid>
        </>
    );
};

export default (HotelsList);
