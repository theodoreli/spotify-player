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

export const redirectToSpotifyLoginIfNeeded = () => (dispatch, getState) => {
  const href = window.location.href;
  let queryParams = href.split('?', 2)[1] || href.split('#', 2)[1];
  if (!queryParams) {
    redirectToSpotifyLogin();
  }

  const parsed = querystring.parse(queryParams);
  const accessToken = parsed.access_token;

  if (parsed.error || !accessToken) {
    redirectToSpotifyLogin();
  } else {
    dispatch(setAccessToken(accessToken));
    dispatch(push(`${basePath}search`));
  }

};

export const loginIfNeeded = () => async (dispatch, getState) => {
  const state = getState();
  const accessToken = getAccessToken(state);
  const headers = {
    Authorization: `Bearer ${accessToken}`
  };

  if (accessToken) {
    try {
      // If there exists an accessToken, test that it actually works.
      await axios.get(`https://api.spotify.com/v1/search`
                   + `?q=justin`
                   + `&type=track`
                   + `&limit=1`,
                   {headers})
      dispatch(push(`${basePath}search`));

    } catch (err) {
      if (err.response.status === 401) {
        /* If we are unauthorized, get the user to login again. It is likely that their
         * token has expired.
         */
        dispatch(addTracks(null));
        dispatch(setAccessToken(null));
        dispatch(redirectToSpotifyLoginIfNeeded());
      }
    }
  } else {
    dispatch(redirectToSpotifyLoginIfNeeded());
  }

};
export const fetchAccessToken = query => (dispatch, getState) => {
  /*
   * Spotfy places the access token as a query param.
   */
  const href = window.location.href;
  let queryParams = href.split('?', 2)[1] || href.split('#', 2)[1];
  if (!queryParams) return false

  const parsed = querystring.parse(queryParams);
  const accessToken = parsed.access_token;

  if (parsed.error) {
    // notify user that need to retry
    return false;
  }

  if (accessToken) {
    dispatch(setAccessToken(accessToken));
    return true;
  } else {
    return false
  }
};

export const fetchTracks = query => async (dispatch, getState) => {
  if (query === '') {
    const msg = 'Oops! Looks like there wasn\'t any search terms.';
    dispatch(addErrorMessageQuery(msg));
    return;
  }

  const accessToken = getAccessToken(getState());
  const headers = {
    Authorization: `Bearer ${accessToken}`
  };

  let response;
  try {
    response = await axios.get(`https://api.spotify.com/v1/search`
                 + `?q=${query}`
                 + `&type=track`
                 + `&limit=50`,
                 {headers})
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

  // Only return the tracks that have a previewable song track
  const filtered = response.data.tracks.items.filter((item) => item.preview_url);

  dispatch(addTracks(filtered));

  // XXX: Bandaid. Need to dispatch this twice otherwise we do not reroute
  dispatch(push(`${basePath}player`));
  dispatch(push(`${basePath}player`));
};

