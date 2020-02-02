This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Development process

In the `App.js` I've made the call to the API endpoint in order to collect the search result and from there
dispatch an action to populate the redux state.<br />
In `HotelsList.js` we use the `useSelector` hook in order to get the list of offers from the state to create
the actual list display. Note on the render that we're not sorting the list itself in order to keep it immutable
if we change from one sort method to the other.<br />
In `HotelListing.js` we gather the offer data from the state and display it's information with the badge.<br />
Note: in the `Carousel` we're again getting the offer data from the store, we could have passed it down the tree
but decided to do this way so the component is reusable.


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
