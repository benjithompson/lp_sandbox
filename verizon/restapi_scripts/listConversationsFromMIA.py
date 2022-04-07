import requests
import json
import time as t

DEBUG = 0
SAM = 0 #single line csv, else \n delimited

#Query parameters (don't need to change)
LIMIT = 100
OFFSET = 0
BEARER = 'd16fd2ceb740f09a177cfd3ff74974dc6b6017248bfb78284f7b3950c8e038f5'
SITEID = 23979466
url = "https://va.msghist.liveperson.net/messaging_history/api/account/{}/conversations/search?source=jlistConversationsFromMIA&offset={}&limit={}&NC=true&sort=responseTime:asc".format(str(SITEID), str(OFFSET), str(LIMIT))
headers = {
  'Authorization': 'Bearer {}'.format(BEARER),
  'Content-Type': 'application/json'
}

#It's easiest to grab the payload from CCUI's devtool's network request from when filtering ALL CONVERSATIONS
payload = json.dumps({"status":["OPEN"],"start":{"from":1648137413977,"to":1648742433957},"responseTime":{"from":1646942213977,"to":1648724213977},"agentIds":[2006180830,2006182430,2006183330,3640469638,3640470638],"contentToRetrieve":["messageRecords","agentParticipants","consumerParticipants","sdes","responseTime","transfers","dialogs","summary","conversationSurveys","unAuthSdes"],"cappingConfiguration":"MessagePublishEvent:1:desc,PersonalInfoEvent:1:desc,CustomerInfoEvent:1:desc,"})


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