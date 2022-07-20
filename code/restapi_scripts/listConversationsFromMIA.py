import requests
import json
import time as t

DEBUG = 0
SAM = 1 #single line csv, else \n delimited

#Query parameters (don't need to change)
LIMIT = 100
OFFSET = 0
BEARER = 'f57b8c33cc7b0746ba5d883ab6e165fdc12245195578d3cc88dc4f0c424f0f33'
SITEID = 22209379
url = "https://va.msghist.liveperson.net/messaging_history/api/account/{}/conversations/search?source=jlistConversationsFromMIA&offset={}&limit={}&NC=true&sort=responseTime:asc".format(str(SITEID), str(OFFSET), str(LIMIT))
headers = {
  'Authorization': 'Bearer {}'.format(BEARER),
  'Content-Type': 'application/json'
}

#It's easiest to grab the payload from CCUI's devtool's network request from when filtering ALL CONVERSATIONS
payload = json.dumps({"status":["OPEN"],"start":{"from":1650004200000,"to":1657832538435},"responseTime":{"from":793922538435,"to":1657573338435},"contentToRetrieve":["messageRecords","agentParticipants","consumerParticipants","sdes","responseTime","transfers","dialogs","summary","conversationSurveys","unAuthSdes"],"cappingConfiguration":"MessagePublishEvent:1:desc,PersonalInfoEvent:1:desc,CustomerInfoEvent:1:desc,"})
def printconvo(convId):
    if(SAM):
        print(convId, end=', ')
    else:
        print(convId)

def main():

    response = requests.request("POST", url, headers=headers, data=payload)

    if(response.status_code != 200):
        print("HTTP RESPONSE STATUS: " + str(response.status_code))
        return 1

    responsej = json.loads(response.text)

    total = int(responsej["_metadata"]["count"])
    remainder = total % LIMIT
    iterations = int(total / 100)

    if(DEBUG):
        print('total Converastions: {total}')

    for i in range(0,iterations):
        
        if (i != 0):
            response = requests.request("POST", url, headers=headers, data=payload)
            responsej = json.loads(response.text)
        for c in range (0,LIMIT):
            convId = responsej["conversationHistoryRecords"][c]["info"]["conversationId"]
            printconvo(convId)

        OFFSET = i*100

    #Last iteration
    response = requests.request("POST", url, headers=headers, data=payload)
    responsej = json.loads(response.text)
    for c in range (remainder):
        # print(c+OFFSET)
        convId = responsej["conversationHistoryRecords"][c]["info"]["conversationId"]
        printconvo(convId)

if __name__ == "__main__":
    main()