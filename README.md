# Spotify Web Client
![search](../master/docs/search.png)
![player](../master/docs/player.png)

[Click here](https://theodoreli.github.io/spotify-player/) to try this web app

---
#### What is this?
This is a in browser client that can play free 30 second clips of songs. It connects to the Spotify API so this will require you to login into your Spotify account. Don't worry, your credentials go directly to Spotify and not through my app.

#### Key design patterns
- Redux: connected components allow for Store State and dispatchable actions to be passed in as props into React components
- Redux: use of fat Actions and slim Reducers
  - fat Actions are where business logic reside
- React-Router-Redux: alpha middleware to allow for routing to take place within our `redux-thunk`'s
- JSS: for CSS scoping and reuseability
- React views are mostly dumb components that just render presentation

#### Next goals
- Use React Proptypes to provide static safety. Key as we are relying on props to deliver Store State and dispatchable Actions
- Add tests
- Make the player more interactive
  - slider to navigate within the song
  - ability to preview next and previous song


---
[Click here](https://theodoreli.github.io/spotify-player/) to try this web app

