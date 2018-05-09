import _ from 'lodash';

import { Track } from '../types';

const _getArtists = artists => {
  let result = artists[0].name;

  if (artists.length === 1) {
    return result
  }

  const featuredArtists = artists.slice(1).map(artist => artist.name).join(', ');
  result += ' feat. ' + featuredArtists;

  return result
};

const getTrackCollection = (response) => {
  let trackCollection = _.get(response, ['tracks', 'items'], undefined);

  if (!trackCollection) {
    throw new Error('Spotify track response parsing error. See if Spotify has changed their API.')
  }

  const toReturn = [];

  trackCollection.forEach(el => {
    try {
      const artistCollection = _.get(el, ['artists'], undefined);
      const artist = _getArtists(artistCollection);

      const track = Track({
        albumImgSrc: _.get(el, ['album', 'images', 1, 'url'], undefined),
        artist,
        audioSrc: _.get(el, ['preview_url'], undefined),
        trackName: _.get(el, ['name'], undefined),
      });

      toReturn.push(track);
    } catch (e) {
      // TODO: batch this up into an array and send it off for error analysis.
      console.log(e);
    }
  });

  return toReturn;
};

export default getTrackCollection;
