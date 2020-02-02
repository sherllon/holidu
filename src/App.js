import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HotelsList from './HotelsList';
import './App.css';
import {Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(2)
  },
}));

const SEARCH_TERM = 'Mallorca, Spanien';

function App() {

  const isLoading = useSelector(state => state.isLoading);
  const styles = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
      const fetchInitialState = async () => {
          const result = await fetch(`https://api.holidu.com/rest/v6/search/offers?searchTerm=${SEARCH_TERM}`);
          const json = await result.json();
          dispatch({type: 'INITIALIZE', json, isLoading: false})
      };

      fetchInitialState();
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <header>
        <Typography variant='h6'>Results of your search for availability in: {SEARCH_TERM}</Typography>
      </header>
      { isLoading ? 'Loading' : <HotelsList />}
    </div>
  );
}

export default (App);
