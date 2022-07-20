/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable camelcase */
const request = require('request');
const logger = require('../logger');
const OAuth = require('oauth-1.0a');
const crypto = require('crypto');
const _ = require('lodash');
// const converter = require('json-2-csv');
// const fs = require('fs');
const {
  LP_ACCOUNT_API,
  AHT_AGENT_SEGMENTS_API_DOMAIN,
  AHT_AGENT_SEGMENTS_SOURCE,
  AHT_AGENT_SEGMENTS_API_CONSUMER_KEY,
  AHT_AGENT_SEGMENTS_API_CONSUMER_SECRET,
  AHT_AGENT_SEGMENTS_API_ACCESS_TOKEN,
  AHT_AGENT_SEGMENTS_API_ACCESS_TOKEN_SECRET
} = require('./config');
// const agentSegmentsAHTModels = require('../db/models/agentSegmentsAHT');
/**
 * Sends a message to the conversation box associated with the given ext_consumer_id
 * @constructor
 * @param {string} fromTimeStamp - Timestamp of Start of date
 * @param {string} toTimeStamp - Timestamp of End of date
 */
async function agentSegmentsHTUBreakdown(fromTimeStamp, toTimeStamp) {
  return new Promise(async resolve => {
    const oauth = OAuth({
      consumer: {
        key: AHT_AGENT_SEGMENTS_API_CONSUMER_KEY,
        secret: AHT_AGENT_SEGMENTS_API_CONSUMER_SECRET
      },
      signature_method: 'HMAC-SHA1',
      hash_function(base_string, key) {
        return crypto
          .createHmac('sha1', key)
          .update(base_string)
          .digest('base64');
      }
    });
    //creates token used for authorization
    const token = {
      key: AHT_AGENT_SEGMENTS_API_ACCESS_TOKEN,
      secret: AHT_AGENT_SEGMENTS_API_ACCESS_TOKEN_SECRET
    };
    const option = {
      method: 'GET',
      url: `https://${AHT_AGENT_SEGMENTS_API_DOMAIN}/api/account/${LP_ACCOUNT_API}/agent-segments/breakdown?source=${AHT_AGENT_SEGMENTS_SOURCE}&from=${fromTimeStamp}&to=${toTimeStamp}`,
      body: {},
      json: true,
      proxy: null
    };
    const postData = {
      method: option.method,
      url: option.url,
      //headers: oauth.toHeader(oauth.authorize(option, token)),
      oauth: {
        consumer_key: '7e19be6a65ea4018b15d8d725ba67515',
        consumer_secret: '2741a43f60c9d1a4',
        token: '66fc90f6ec6b4b4ba333c8bbcc3c9e28',
        token_secret: '564674ecaa8983ff',
      },
      body: option.body,
      json: true
    };
    logger.info('agentSegmentsHTUBreakdown Options ', postData);
    request(postData, async (error, response, body) => {
      logger.info('agentSegmentsHTUBreakdown Body ', body);
      if (error) {
        logger.error('agentSegmentsHTUBreakdown error ', error);
        return resolve('retry');
      } else {
        try {
          if (response.statusCode === 200) {
            if (body && _.has(body, 'files') && _.size(body.files) > 0) {
              logger.info('agentSegmentsHTUBreakdown Inside If Condition ');
              return resolve(body.files);
            } else {
              logger.info('agentSegmentsHTUBreakdown Inside Else Condition ', {
                size: _.size(body.files),
                response
              });
              return resolve([]);
            }
          } else {
            logger.error('agentSegmentsHTUBreakdown Error Retry', response);
            return resolve('retry');
          }
        } catch (error) {
          logger.error('agentSegmentsHTUBreakdown Try Catch Error', response);
          return resolve('retry');
        }
      }
    });
  });
}
/**
 * Sends a message to the conversation box associated with the given ext_consumer_id
 * @constructor
 * @param {string} path - Path to download file
 */
async function agentSegmentsHTUDownlaod(path) {
  return new Promise(async resolve => {
    const oauth = OAuth({
      consumer: {
        key: AHT_AGENT_SEGMENTS_API_CONSUMER_KEY,
        secret: AHT_AGENT_SEGMENTS_API_CONSUMER_SECRET
      },
      signature_method: 'HMAC-SHA1',
      hash_function(base_string, key) {
        return crypto
          .createHmac('sha1', key)
          .update(base_string)
          .digest('base64');
      }
    });
    //creates token used for authorization
    const token = {
      key: AHT_AGENT_SEGMENTS_API_ACCESS_TOKEN,
      secret: AHT_AGENT_SEGMENTS_API_ACCESS_TOKEN_SECRET
    };
    const option = {
      method: 'GET',
      url: `https://${AHT_AGENT_SEGMENTS_API_DOMAIN}/api/account/${LP_ACCOUNT_API}/agent-segments/files?source=${AHT_AGENT_SEGMENTS_SOURCE}&path=${path}`,
      body: {},
      json: true,
      proxy: null
    };
    const postData = {
      method: option.method,
      url: option.url,
      headers: oauth.toHeader(oauth.authorize(option, token)),
      body: option.body,
      json: true
    };
    postData.headers = {
      ...postData.headers,
      'Content-Encoding': 'gzip',
      'Accept-Encoding': 'gzip, deflate, br'
    };
    logger.info('agentSegmentsHTUDownlaod Options ', postData);
    request(postData, async (error, response, body) => {
      if (error) {
        logger.error('agentSegmentsHTUDownlaod error ', error);
        return resolve('retry');
      } else {
        try {
          if (response.statusCode === 200) {
            if (body) {
              logger.info('agentSegmentsHTUDownlaod Inside If Condition ');
              return resolve(body);
            } else {
              logger.info('agentSegmentsHTUDownlaod Inside Else Condition ', {
                size: _.size(body),
                response
              });
              return resolve([]);
            }
          } else {
            logger.error('agentSegmentsHTUDownlaod Error Retry', response);
            return resolve('retry');
          }
        } catch (error) {
          logger.error('agentSegmentsHTUDownlaod Try Catch Error', response);
          return resolve('retry');
        }
      }
    });
  });
}
module.exports = { agentSegmentsHTUBreakdown, agentSegmentsHTUDownlaod };