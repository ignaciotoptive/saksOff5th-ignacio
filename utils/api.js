import axios from 'axios';
import map from 'lodash/map';

/*
 * @params {request} extracted from request response, {setLocalhost} your localhost address
 * @return {object} objects of protocol, host and origin
 */
export function absoluteUrl(req) {
  let protocol = 'https:';
  let host = req
    ? req.headers['x-forwarded-host'] || req.headers['host']
    : window.location.host;
  if (host.indexOf('localhost') > -1 || host.indexOf('192.168.') > -1) {
    protocol = 'http:';
  }
  return {
    protocol: protocol,
    host: host,
    origin: protocol + '//' + host,
    req: req,
  };
}

export function getResourceUrl(req, resource) {
  const { origin } = absoluteUrl(req);
  return `${origin}/api/${resource}`;
}

export function getProductsList(req, query) {
  const { access_token } = req.cookies;
  const queryParams = `?${map(
    query,
    (value, param) => `${param}=${value}`
  ).join('&')}`;
  return axios
    .get(getResourceUrl(req, 'product' + queryParams), {
      headers: { Cookie: `access_token=${access_token};` },
    })
    .then((res) => {
      const products = res.data.products;
      return products;
    })
    .catch((error) => {
      console.log('getProductsList error', error.toString());
      return [];
    });
}
