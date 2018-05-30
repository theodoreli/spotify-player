import * as apiConsts from '../constants/apiConstants';

// These values are as per create-react-app documentation.
export const ENV_PROD = 'production';
export const ENV_DEV = 'development';

export let ROUTING_BASE_PATH_MAPPED;
export let AUTH_QUERY_PARAMS_MAPPED;

switch (process.env.NODE_ENV) {
  case ENV_PROD:
    ROUTING_BASE_PATH_MAPPED = apiConsts.ROUTING_BASE_SUB_PATH_PROD;
    AUTH_QUERY_PARAMS_MAPPED = apiConsts.AUTH_QUERY_PARAMS_PROD;
    break;
  case ENV_DEV:
    ROUTING_BASE_PATH_MAPPED = apiConsts.ROUTING_BASE_SUB_PATH_DEV;
    AUTH_QUERY_PARAMS_MAPPED = apiConsts.AUTH_QUERY_PARAMS_DEV;
    break;
  default:
    console.log('Warning, undefined case for process.env');
}
