import { ObjectModel } from 'objectmodel'

export const Track = new ObjectModel({
  albumImgSrc: String,
  artist: String,
  audioSrc: String,
  trackName: String,
});
