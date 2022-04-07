import requests
import json
import time as t
import pandas as pd

DEBUG = 1
SAM = 0 #single line csv, else \n delimited

#Query parameters (don't need to change)
LIMIT = 100
OFFSET = 0
SAMPLE = 100
BEARER = 'b0e8b9a9a3bed55b22b4619cc6566310ed643522a84c8ca939b28acedcf12ec1'
SITEID = 23979466
url = "https://va.msghist.liveperson.net/messaging_history/api/account/{}/conversations/search?source=jlistConversationsFromMIA&offset={}&limit={}&NC=true&sort=responseTime:asc".format(str(SITEID), str(OFFSET), str(LIMIT))
headers = {
  'Authorization': 'Bearer {}'.format(BEARER),
  'Content-Type': 'application/json'
}

#It's easiest to grab the payload from CCUI's devtool's network request from when filtering ALL CONVERSATIONS
payload = json.dumps({"status":["CLOSE"],"start":{"from":1646571600000,"to":1647122400000},"skillIds":["1998452330","1998451330"],"surveyBotConversations":"SURVEY_BOT","contentToRetrieve":["summary","conversationSurveys"],"cappingConfiguration":"MessagePublishEvent:1:desc,PersonalInfoEvent:1:desc,CustomerInfoEvent:1:desc,"})    
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
    iterations = int(total / (LIMIT*SAMPLE))

    if(DEBUG):
        print('total Converastions: {}'.format(str(total)))
        
    records = []
    for i in range(0,iterations):
        if (i != 0):
            response = requests.request("POST", url, headers=headers, data=payload)
            responsej = json.loads(response.text)
        for c in range (0,LIMIT):
            convId = responsej["conversationHistoryRecords"][c]["info"]["conversationId"]
            startTimeL = responsej["conversationHistoryRecords"][c]["info"]["startTimeL"]
            endTimeL = responsej["conversationHistoryRecords"][c]["info"]["endTimeL"]
            convoEndTimeL = responsej["conversationHistoryRecords"][c]["info"]["conversationEndTimeL"]
            latestSkillName = responsej["conversationHistoryRecords"][c]["info"]["latestSkillName"]
            surveyStatus = responsej["conversationHistoryRecords"][c]["conversationSurveys"][0]["surveyStatus"]
            surveyDurationL = endTimeL - convoEndTimeL
            records.append([convId, startTimeL, endTimeL, convoEndTimeL, latestSkillName, surveyStatus, surveyDurationL])
        OFFSET = (i*LIMIT)*SAMPLE
        if(DEBUG):
            print(OFFSET)
    #Last iteration
    response = requests.request("POST", url, headers=headers, data=payload)
    responsej = json.loads(response.text)
    for c in range (remainder):
        # print(c+OFFSET)
        convId = responsej["conversationHistoryRecords"][c]["info"]["conversationId"]
        startTimeL = responsej["conversationHistoryRecords"][c]["info"]["startTimeL"]
        endTimeL = responsej["conversationHistoryRecords"][c]["info"]["endTimeL"]
        convoEndTimeL = responsej["conversationHistoryRecords"][c]["info"]["conversationEndTimeL"]
        latestSkillName = responsej["conversationHistoryRecords"][c]["info"]["latestSkillName"]
        surveyStatus = responsej["conversationHistoryRecords"][c]["conversationSurveys"][0]["surveyStatus"]
        surveyDurationL = endTimeL - convoEndTimeL
        records.append([convId, startTimeL, endTimeL, convoEndTimeL, latestSkillName, surveyStatus, surveyDurationL])
   
    
    df = pd.DataFrame(records, columns=["ConversationId", "startTimeL", "endTimeL", "conversationEndTimeL", "latestSkillName", "surveyStatus", "SurveyDuration(ms)"])
    path=r'/Users/bthompson/Documents/Code/python'
    df.to_csv(path + 'surveyconvos.csv', index=False)

if __name__ == "__main__":
    main()