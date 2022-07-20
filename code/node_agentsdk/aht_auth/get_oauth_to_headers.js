const OAuth = require('oauth-1.0a');
const crypto = require('crypto');

function getOauthToHeaders(siteObject, url, method) {
    const key = siteObject.appKey;
    const secret = siteObject.secret;
    const oauth = OAuth({
      consumer: {key, secret},
      signature_method: 'HMAC-SHA1',
      hash_function(base_string, currentKey) {
        return crypto
          .createHmac('sha1', currentKey)
          .update(base_string)
          .digest('base64');
      },
    });
    const token = {
      key: siteObject.accessToken,
      secret: siteObject.accessTokenSecret,
    };
    const requestData = {url, method};
    return oauth.toHeader(oauth.authorize(requestData, token));
  
  }
  
  module.exports = getOauthToHeaders;