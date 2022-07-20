/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable camelcase */
const request = require('request');
//const logger = require('../logger');
const OAuth = require('oauth-1.0a');
const crypto = require('crypto');
const _ = require('lodash');
//const converter = require('json-2-csv');
const fs = require('fs');

LP_ACCOUNT_API = 23979466
AHT_AGENT_SEGMENTS_API_DOMAIN = "va.agent-activity.liveperson.net"
AHT_AGENT_SEGMENTS_SOURCE = "ASYNCMSG&path=/year=2022/month=6/day=1/hour=6/accountId=23979466/sequences.1654113886437.20220601160446.00066.json.gz"
AHT_AGENT_SEGMENTS_API_CONSUMER_KEY = "7e19be6a65ea4018b15d8d725ba67515"
AHT_AGENT_SEGMENTS_API_CONSUMER_SECRET = "2741a43f60c9d1a4"
AHT_AGENT_SEGMENTS_API_ACCESS_TOKEN = "66fc90f6ec6b4b4ba333c8bbcc3c9e28"
AHT_AGENT_SEGMENTS_API_ACCESS_TOKEN_SECRET = "564674ecaa8983ff"

// const agentSegmentsAHTModels = require('../db/models/agentSegmentsAHT');
/**
 * Sends a message to the conversation box associated with the given ext_consumer_id
 * @constructor
 * @param {string} fromTimeStamp - Timestamp of Start of date
 * @param {string} toTimeStamp - Timestamp of End of date
 */
function agentSegmentsHTUBreakdown(fromTimeStamp, toTimeStamp) {
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
      oauth: {
        consumer_key: AHT_AGENT_SEGMENTS_API_CONSUMER_KEY,
        consumer_secret: AHT_AGENT_SEGMENTS_API_CONSUMER_SECRET,
        token: AHT_AGENT_SEGMENTS_API_ACCESS_TOKEN,
        token_secret: AHT_AGENT_SEGMENTS_API_ACCESS_TOKEN_SECRET,
      },
      body: option.body,
      json: true
    };
    console.log('agentSegmentsHTUBreakdown Options ' + postData);
    request(postData, async (error, response, body) => {
      console.log('agentSegmentsHTUBreakdown Body ', body);
      if (error) {
        console.log('agentSegmentsHTUBreakdown error ', error);
        return 'retry';
      } else {
        try {
          if (response.statusCode === 200) {
            if (body && _.has(body, 'files') && _.size(body.files) > 0) {
              console.log('agentSegmentsHTUBreakdown Inside If Condition ');
              return body.files;
            } else {
              console.log('agentSegmentsHTUBreakdown Inside Else Condition ', {
                size: _.size(body.files),
                response
              });
              return [];
            }
          } else {
            console.log('agentSegmentsHTUBreakdown Error Retry', response);
            return 'retry';
          }
        } catch (error) {
          console.log('agentSegmentsHTUBreakdown Try Catch Error', response);
          return 'retry';
        }
      }
    });
  }
/**
 * Sends a message to the conversation box associated with the given ext_consumer_id
 * @constructor
 * @param {string} path - Path to download file
 */
async function agentSegmentsHTUDownlaod(path) {
  return new Promise(async => {
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
    //logger.info('agentSegmentsHTUDownlaod Options ', postData);
    request(postData, async (error, response, body) => {
      if (error) {
        //logger.error('agentSegmentsHTUDownlaod error ', error);
        return 'retry';
      } else {
        try {
          if (response.statusCode === 200) {
            if (body) {
              //logger.info('agentSegmentsHTUDownlaod Inside If Condition ');
              return body;
            } else {
              //logger.info('agentSegmentsHTUDownlaod Inside Else Condition ', {
                //size: _.size(body),
                //response
              //});
              return [];
            }
          } else {
            //logger.error('agentSegmentsHTUDownlaod Error Retry', response);
            return 'retry';
          }
        } catch (error) {
          //logger.error('agentSegmentsHTUDownlaod Try Catch Error', response);
          return 'retry';
        }
      }
    });
  });
}

var from = "1654704609000";
var to = "1654791009000";
console.log("start");
agentSegmentsHTUBreakdown(from, to);

module.exports = { agentSegmentsHTUBreakdown, agentSegmentsHTUDownlaod };