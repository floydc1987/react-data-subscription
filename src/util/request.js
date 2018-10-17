/* global fetch */
import config from "./config";

export default (url, params) => {
  const {
    transformPayload,
    transformUrl,
    ...defaultParams
  } = config.get("request");
  
  const {
    transformResponse,
    transformError,
  } = config.get("response");
  
  const fetchParams = {...defaultParams, ...params};
  
  return fetch(transformUrl(url, fetchParams), {
    ...fetchParams,
    body: transformPayload(params.body, fetchParams) 
  })
  .then(response => {
    if (response.ok) return transformResponse(response);
    throw transformError(response);
  })
};