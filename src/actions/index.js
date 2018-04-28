import axios from 'axios';

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


export const fetchTracks = query => async (dispatch, getState) => {

  // either return by throwing error or use err, res method.
  console.log(dispatch)
    console.log(getState())
    debugger;
  const headers = {Authorization: `Bearer ${this.props.appStore.accessToken}`};
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
      this.props.dispatch(addTracks(null));
      this.props.dispatch(addAccessToken(null));
      this.props.history.push('/');
    }
  }
};
