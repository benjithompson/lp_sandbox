const request = require('request'); //deprecated: 
const config = require('./config');

LP_ACCOUNT_API = 23979466;
AHT_AGENT_SEGMENTS_SOURCE = 'nodejstest';
AHT_AGENT_SEGMENTS_API_DOMAIN = 'va.agent-activity.liveperson.net';
const path = '/year=2022/month=6/day=1/hour=6/accountId=23979466/sequences.1654113886437.20220601160446.00066.json.gz'
const url =`https://${AHT_AGENT_SEGMENTS_API_DOMAIN}/api/account/${LP_ACCOUNT_API}/agent-segments/files?source=${AHT_AGENT_SEGMENTS_SOURCE}&path=${path}`;

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
run();
