export const AUTH_REDIRECT_BASE_URL = 'https://accounts.spotify.com/authorize?';
export const AUTH_QUERY_PARAMS_DEV = {
  client_id: 'b0a17325663147199c8e921ffb85d000',
  response_type: 'token',
  redirect_uri: 'https://localhost:3000',
};
export const AUTH_QUERY_PARAMS_PROD = {
  client_id: 'b0a17325663147199c8e921ffb85d000',
  response_type: 'token',
  redirect_uri: 'https://theodoreli.github.io/spotify-player/',
};
export const ENV_PROD = 'production';
export const ENV_DEV = 'development';
export const ROUTING_BASE_SUB_PATH_PROD = '/spotify-player/';
export const ROUTING_BASE_SUB_PATH_DEV = '/';
