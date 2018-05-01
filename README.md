<div style="display: flex; vertical-align: center; justify-content: center;">
  <a href="https://theodoreli.github.io/spotify-player/">
    <img src="https://raw.githubusercontent.com/theodoreli/spotify-player/master/docs/search.png"/>
    <img src="https://raw.githubusercontent.com/theodoreli/spotify-player/master/docs/player.png"/>
  </a>
</div>

<h1 style="text-align: center; font-size: 36px;">
  <a href="https://theodoreli.github.io/spotify-player/" style="color: black; text-decoration: none;">Spotify Web Client</a>
</h1>
---
<h4 align="center">
  Browser client to stream free (previewable) songs from Spotify. Built with React & Redux.
</h4>

<p align="center">
  <a href="https://theodoreli.github.io/spotify-pla
yer/">Click here</a> to try this web app
</p>


## What is this?
This is a in browser client that can play free 30 second clips of songs. It connects to the Spotify API so this will require you to login into your Spotify account. Don't worry, your credentials go directly to Spotify and not through my app.

## Key design patterns
- Redux: connected components allow for Store State and dispatchable actions to be passed in as props into React components
- Redux: use of fat Actions and slim Reducers
  - fat Actions are where business logic reside
- React-Router-Redux: alpha middleware to allow for routing to take place within our `redux-thunk`'s
- JSS: for CSS scoping and reuseability
- React views are mostly dumb components that just render presentation

## Next goals
- Use React Proptypes to provide static safety. Key as we are relying on props to deliver Store State and dispatchable Actions
- Add tests
- Make the player more interactive
  - slider to navigate within the song
  - ability to preview next and previous song


---
[Click here](https://theodoreli.github.io/spotify-player/) to try this web app

