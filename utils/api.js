import axios from 'axios';
/*
 * @params {request} extracted from request response, {setLocalhost} your localhost address
 * @return {object} objects of protocol, host and origin
 */
export function absoluteUrl(req) {
  let protocol = 'https:';
  let host = req
    ? req.headers['x-forwarded-host'] || req.headers['host']
    : window.location.host;
  if (host.indexOf('localhost') > -1) {
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

export function getProductsList(req) {
  const { access_token } = req.cookies;
  return axios
    .get(getResourceUrl(req, 'product'), {
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
