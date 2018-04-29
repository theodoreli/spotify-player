import axios from 'axios';
import { push } from 'react-router-redux';

export const addAccessToken = token => ({
  type: 'ADD_ACCESS_TOKEN',
  token
});

export const addTTL = value => ({
  type: 'ADD_TTL',
  value
});

export const addTracks = value => ({
  type: 'ADD_TRACKS',
  value
});

export const addErrorMessageQuery = value => ({
  type: 'ADD_ERROR_MESSAGE_QUERY',
  value
});


export const fetchTracks = query => async (dispatch, getState) => {
  if (query === '') {
    const msg = 'Oops! Looks like there wasn\'t any search terms.';
    dispatch(addErrorMessageQuery(msg));
    return;
  }

  const state = getState();
  const { accessToken } = getState();
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
      dispatch(addAccessToken(null));
      dispatch(push('/'))
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
  dispatch(push('/logged-in/player'));
};
