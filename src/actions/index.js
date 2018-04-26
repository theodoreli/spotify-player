export const addAccessToken = token => ({
  type: 'ADD_ACCESS_TOKEN',
  token
});

export const addTTL = value => ({
  type: 'ADD_TTL',
  value
});
