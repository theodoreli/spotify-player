import { ObjectModel } from 'objectmodel'

export const Track = new ObjectModel({
  albumImgSrc: String,
  artist: String,
  audioSrc: String,
  trackName: String,
});

// in our action where we get this data,
// make a util that parses the json into this model

