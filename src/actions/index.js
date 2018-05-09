import axios from 'axios';
import { push } from 'react-router-redux';
import querystring from 'querystring';

import * as types from '../constants/actionTypes.js';
import * as apiConsts from '../constants/apiConstants.js';
import {
  ROUTING_BASE_PATH_MAPPED as basePath,
  AUTH_QUERY_PARAMS_MAPPED as queryParams,
} from '../constants/envMappedConstants.js';
import { getAccessToken } from '../selectors';
import getTrackCollection from '../parsers/tracks.js';

export const addTracks = value => ({
  type: types.FETCH_TRACKS,
  value
});

export const addErrorMessageQuery = value => ({
  type: types.SET_ERROR_MESSAGE_QUERY,
  value
});

export const setAccessToken = value => ({
  type: types.SET_ACCESS_TOKEN,
  value
});

const redirectToSpotifyLogin = () => {
  const redirectUrl = apiConsts.AUTH_REDIRECT_BASE_URL +
                       querystring.stringify(queryParams);
  window.location.replace(redirectUrl);
};

const isAccessTokenValid = async (dispatch, getState) => {
  const state = getState();
  const accessToken = getAccessToken(state);
  if (!accessToken) {
    return new Promise(resolve => resolve(false));
  }

  try {
    // Test that accessToken actually works. This is important since we have
    // Redux middleware that saves state to localstorage.
    // This saved accessToken in localstorage could be stale upon access
    await axios.get('https://api.spotify.com/v1/search', {
                  params: {
                    'q': 'justin',
                    'type': 'track',
                    'limit': '1',
                  },
                  headers: {
                    'Authorization': `Bearer ${accessToken}`
                  }
                });

    return new Promise(resolve => resolve(true));
  } catch (err) {
    if (err.response.status === 401) {
      dispatch(setAccessToken(null));
    } else {
      console.log('Error in requesting track search from Spotify API:')
      console.log(err)
    }
    return new Promise(resolve => resolve(false));
  }
};

export const isQueryParamsValid = (dispatch, getState) => {
  /*
   * After the user logs in through the Spotify website,
   * they are redirected to this app.
   * Embedded in the redirect URL are query parameters that most importantly
   * contains an accessToken we need for
   * valid future requests to the Spotify API.
   */
  const url = window.location.href;

  // Check '#' as it has been seen that Spotify uses that in place of the
  // expected '?'.
  let queryParams = url.split('?', 2)[1] || url.split('#', 2)[1];
  if (!queryParams) {
    return false
  }

  const parsed = querystring.parse(queryParams);
  const { access_token: accessToken, error } = parsed;

  if (error || !accessToken) {
    return false;
  } else {
    dispatch(setAccessToken(accessToken));
    return true
  }
};

export const loginIfNeeded = () => async (dispatch, getState) => {
  const args = [dispatch, getState];
  if (isQueryParamsValid.apply(this, args) || await isAccessTokenValid.apply(this, args)) {
    dispatch(push(`${basePath}search`));
  } else {
    redirectToSpotifyLogin();
  }
};

export const fetchTracks = query => async (dispatch, getState) => {
  if (query === '') {
    const msg = 'Oops! Looks like there wasn\'t any search terms.';
    dispatch(addErrorMessageQuery(msg));
    return;
  }

  const accessToken = getAccessToken(getState());

  let response;
  try {
    response = await axios.get('https://api.spotify.com/v1/search', {
                  params: {
                    'q': query,
                    'type': 'track',
                    'limit': '50',
                  },
                  headers: {
                    'Authorization': `Bearer ${accessToken}`
                  }
                });

  } catch (err) {
    if (err.response.status === 401) {
      /* If we are unauthorized, get the user to login again. It is likely that their
       * token has expired.
       */
      dispatch(addTracks(null));
      dispatch(setAccessToken(null));
      //dispatch(push(`${basePath}`))
      redirectToSpotifyLogin();
    }
  }

  if (response.data.tracks.items.length === 0) {
    const msg = `Looks like your search "${query}" `
                  + `didn't return any tracks. Try another search term`
    dispatch(addErrorMessageQuery(msg));
    return;
  }

  const trackCollection = getTrackCollection(response.data);
  dispatch(addTracks(trackCollection));

  // XXX: Bandaid. Need to dispatch this twice otherwise we do not reroute
  dispatch(push(`${basePath}player`));
  dispatch(push(`${basePath}player`));
};
