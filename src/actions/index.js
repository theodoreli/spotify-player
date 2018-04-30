import axios from 'axios';
import { push } from 'react-router-redux';
import querystring from 'querystring';

import * as types from '../constants/actionTypes.js';
import * as apiConsts from '../constants/apiConstants.js';
import { getAccessToken } from '../selectors';

let baseUrl;

if (process.env.NODE_ENV === apiConsts.ENV_PROD) {
  baseUrl = apiConsts.ROUTING_BASE_SUB_PATH_PROD;
} else {
  baseUrl = apiConsts.ROUTING_BASE_SUB_PATH_DEV;
}

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
      dispatch(push(`${baseUrl}`))
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
  dispatch(push(`${baseUrl}player`));
  dispatch(push(`${baseUrl}player`));
};

