const request = require('request'); //deprecated: 
const config = require('./config');
const logger = require('logger');
const OAuth = require('oauth-1.0a');
const crypto = require('crypto');


LP_ACCOUNT_API = 23979466;
AHT_AGENT_SEGMENTS_SOURCE = 'nodejstest';
AHT_AGENT_SEGMENTS_API_DOMAIN = 'va.agent-activity.liveperson.net';
const path = '/year=2022/month=6/day=1/hour=6/accountId=23979466/sequences.1654113886437.20220601160446.00066.json.gz'
const url = `https://${AHT_AGENT_SEGMENTS_API_DOMAIN}/api/account/${LP_ACCOUNT_API}/agent-segments/files?source=${AHT_AGENT_SEGMENTS_SOURCE}&path=${path}`;

/*using the request module with option 'oauth' with the following format:
const options = {
    method: 'GET',
    oauth: {
        consumer_key: '<key>>',
        consumer_secret: '<secret>',
        token: '<token>',
        token_secret: '<tokensecret>',
    }
}
*/

function run() {
    try {
        request(url, config, (err, res, body) => {
            console.log('statusCode:', res && res.statusCode);
            console.log('body:', body);
        });
    }
    catch (err) {
        console.log('error', err);
    }
}



/**
 * Sends a message to the conversation box associated with the given ext_consumer_id
 * @constructor
 * @param {string} path - Path to download file
 */
 async function run_vz() {
    return new Promise(async resolve => {
      const oauth = OAuth({
        consumer: {
        //   key: AHT_AGENT_SEGMENTS_API_CONSUMER_KEY,
        //   secret: AHT_AGENT_SEGMENTS_API_CONSUMER_SECRET
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
        // key: AHT_AGENT_SEGMENTS_API_ACCESS_TOKEN,
        // secret: AHT_AGENT_SEGMENTS_API_ACCESS_TOKEN_SECRET
      };
  
      const option = {
        method: 'GET',
        url: `https://va.agent-activity.liveperson.net/api/account/23979466/agent-segments/files?source=asyncmsg&path=/year=2022/month=7/day=6/hour=4/accountId=23979466/sequences.1657130790983.20220706140630.00096.json.gz`,
        body: {},
        gzip: true
        // proxy: null
      };
  
      const postData = {
        method: option.method,
        url: option.url,
        oauth: {
          consumer_key: '7e19be6a65ea4018b15d8d725ba67515',
          consumer_secret: '2741a43f60c9d1a4',
          token: '66fc90f6ec6b4b4ba333c8bbcc3c9e28',
          token_secret: '564674ecaa8983ff'
        }
      };
  
      //logger.info('agentSegmentsHTUDownlaod Options ', { postData, path });
      console.log(postData);
      request(postData, async (error, response, body) => {
        if (error) {
          //logger.error('agentSegmentsHTUDownlaod error ', error);
          return resolve('retry');
        } else {
          try {
            console.log("Response code: " + response.statusCode);
            if (response.statusCode === 200) {
              if (body) {
                //logger.info('agentSegmentsHTUDownlaod Inside If Condition ');
                return resolve(body);
              } else {
                // logger.info('agentSegmentsHTUDownlaod Inside Else Condition ', {
                //   size: _.size(body),
                //   response
                // });
                console.log(response);
                return resolve([]);
              }
            } else {
              //logger.error('agentSegmentsHTUDownlaod Error Retry', response);
              return resolve('retry');
            }
          } catch (error) {
            console.log(error);
            //logger.error('agentSegmentsHTUDownlaod Try Catch Error', response);
            return resolve('retry');
          }
        }
      });
  
      //logger.info('agentSegmentsHTUDownlaod After Submit ');
    });
  }

//test either run()(default) or vz_run() to check VZ's implementation

//run();
run_vz();
