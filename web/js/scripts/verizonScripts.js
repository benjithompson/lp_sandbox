window.onload = function () {
    console.log("Bind lpTag events RENDERER_STUB and AFTER_CREATE_ENGAGEMENT_INSTANCE");

    window.lpTag.events.bind(
        "RENDERER_STUB",
        "AFTER_CREATE_ENGAGEMENT_INSTANCE",
        function (data) {

            lpEngagementID = data.eng.engData.engagementId;
            if (data.conf.skillName.split(":").length > 1) {
                coLpPriorityLevel = data.conf.skillName.split(":")[1].trim();
            }
            // lpchatWelcomeMessageChange("error");
            coLpEngagementID = data.eng.engData.engagementId;
            coEngagementName = data.eng.conf.name;
            if (lpNBXLcAvailable == "Y" && !lpBauFlow && !isLpChatDisplayed) {
                displayLPChatButton();
                isLpChatDisplayed = true;
            }
            try {
                if (lpChatShownSiteCatalystObj.isLpChatShown && lpChatShownSiteCatalystObj.engagementAddedAfterChatShown.indexOf(data.eng.conf.name) == -1 && lpChatShownSiteCatalystObj.engagementAddedBeforeChatShown.indexOf(data.eng.conf.name) == -1) {
                    lpChatShownSiteCatalystObj.engagementAddedAfterChatShown.push(data.eng.conf.name);
                    lpChatShownSiteCatalystObj.engagementIdAddedAfterChatShown.push(data.eng.engData.engagementId);
                    // sendLPEngagementsData(data.eng.conf.name); 
                    var lpBauCoEngagementName = data.eng.conf.name;
                    var lpButtonTypeValue = "";
                    lpButtonTypeValue = lpBauCoEngagementName.split("-")[lpBauCoEngagementName.split("-").length - 1];

                    if (typeof lpBauCoEngagementName != "undefined" && lpBauCoEngagementName != null && lpBauCoEngagementName != "" && lpButtonTypeValue != "") {
                        if (lpButtonTypeValue.toLowerCase() == "s") {
                            nbxReporting("event245", "LPSalesExposed", lpBauCoEngagementName, "");
                        }
                        if (lpButtonTypeValue.toLowerCase() == "e") {
                            nbxReporting("event244", "LPSalesExposed", lpBauCoEngagementName, "");
                        }
                        if (lpButtonTypeValue.toLowerCase() == "o") {
                            nbxReporting("event246", "LPSalesExposed", lpBauCoEngagementName, "");
                            if (isSOIChatOfferShown) {
                                nbxReporting("event259", "LPSalesExposed", lpBauCoEngagementName, "");
                            }
                        }
                    }
                }
            }
            catch (e) { }
            try {
                if (lpChatTargetSiteCatalystArray.indexOf(data.eng.conf.name) == -1) {
                    lpChatTargetSiteCatalystArray.push(data.eng.conf.name);
                    // sendLPEngagementsTargetData(data.eng.conf.name);
                    var lpBauCoEngagementName = data.eng.conf.name;
                    var lpButtonTypeValue = "";
                    lpButtonTypeValue = lpBauCoEngagementName.split("-")[lpBauCoEngagementName.split("-").length - 1];
                    if (typeof lpBauCoEngagementName != "undefined" && lpBauCoEngagementName != null && lpBauCoEngagementName != "" && lpButtonTypeValue != "") {
                        if (lpButtonTypeValue.toLowerCase() == 's') {
                            nbxReporting("event242", "LPSalesTargeted", lpBauCoEngagementName, "");
                        }
                        if (lpButtonTypeValue.toLowerCase() == 'e') {
                            nbxReporting("event241", "LPSalesTargeted", lpBauCoEngagementName, "");
                        }
                        if (lpButtonTypeValue.toLowerCase() == 'o') {
                            nbxReporting("event243", "LPSalesTargeted", lpBauCoEngagementName, "");
                        }
                    }
                }
            } catch (e) { }
            if (stopInfinite > 0) {
                return;
            }
            try {
                checkHideChatButtonTimer();
            } catch (arrer) {
                console.log("error setTimeoutAA" + arrer);
            }
            console.log(data.eng.engData.engagementType);
            var lpSkillName = data.conf.skillName;
            if (lpSkillNameInTimer != data.conf.skillName) {
                lpSkillNameInTimer = data.conf.skillName;
            }
            if (lpSkillName === null || lpSkillName === "") {
                return;
            }
            var secQData = "VZW";
            try {
                visitorUniqueID = VZ_Chat.getCookie("LPVID");
                secQData =
                    secQData +
                    document.URL.split(".com")[1].split("?")[0].split("/").join("_");
            } catch (err) { }
            var lpSkillNameQhealthRequest = data.conf.skillName.split(":")[0].replace("~", "");
            try {
                if (lpSkillNameQhealthRequest.indexOf("4G/5G") != -1) {
                    lpSkillNameQhealthRequest = "Mobile Sales 4G 5G Home Internet";
                }
            } catch (err) { }
            var req = {
                RequestParams: {
                    skillAliasName: lpSkillNameQhealthRequest,
                    UniqueId: visitorUniqueID,
                    engagementName: data.eng.conf.name,
                    section: secQData,
                },
            };
            if (data.conf.skillName.split(":").length > 1) {
                var priorityFilter = data.conf.skillName
                    .split(":")[1]
                    .split("P")[1];
                if (priorityFilter > priorityTest) {
                    priorityTest = priorityFilter;
                    priorityInTimer = data.conf.skillName.replace("~", "");
                    engInTimer = data.eng.conf.name;
                }

                if (data.eng.conf.name.indexOf("-O") != -1) {
                    console.log("engagement Type" + data.eng.conf.name);
                    console.log("Skill Name" + data.conf.skillName);
                    if (
                        proActivePriority !=
                        data.conf.skillName.split(":")[1].split(" ")[1]
                    ) {
                        proActivePriority = data.conf.skillName
                            .split(":")[1]
                            .split(" ")[1];
                    }
                    try {
                        if (VZ_Chat.getCookie("proActiveDisableOverlaytrial") == "true") {
                            if ((typeof proActivePriority != "undefined" && proActivePriority != null && proActivePriority != '')
                                && (proActivePriority == "P1" || proActivePriority == "P2")) {
                                if (lpTag.section.includes("overlaytrial") != true) {
                                    lpTag.section.push("overlaytrial");
                                    lpNewPageCall();
                                }
                            }
                        }
                    } catch (e) {
                    }
                }
                req.RequestParams.priority = data.conf.skillName.replace("~", "");
            }
            try {
                if (data.conf.skillName.split(":").length > 1 && parseInt(lpprioritylevel.split("P")[1]) < parseInt(data.conf.skillName.split(":")[1].trim().split("P")[1])) {
                    lpprioritylevel = data.conf.skillName.split(":")[1].trim();
                }
            } catch (e) { }
            function apiCallTimer() {
                var lpSkillNameQhealthRequestTimer = lpSkillNameInTimer.split(":")[0].replace("~", "");
                try {
                    if (lpSkillNameQhealthRequestTimer.indexOf("4G/5G") != -1) {
                        lpSkillNameQhealthRequestTimer = "Mobile Sales 4G 5G Home Internet";
                    }
                } catch (err) { }
                var reqInTimer = {
                    RequestParams: {
                        skillAliasName: lpSkillNameQhealthRequestTimer,
                        UniqueId: visitorUniqueID,
                        engagementName: engInTimer,
                        section: secQData,
                    },
                };
                if (priorityInTimer != undefined || priorityInTimer != null) {
                    reqInTimer.RequestParams.priority = priorityInTimer;
                }
                if (document.location.pathname.toLowerCase().indexOf('/stores/video-assist') != -1 || (typeof videoChat_Lp_Flow_Indicator != "undefined" && videoChat_Lp_Flow_Indicator != null && videoChat_Lp_Flow_Indicator != "")) {
                    return;
                }
                var responseData = fetch(lpQueueHealthURL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(reqInTimer),
                }
                );
                // result.available == true ||
                // result.available == "true" ||
                // (result.metrics.waitTimeForAgentAssignment_90thPercentile >
                //   1200000 &&
                //   result.metrics.unassignedConversations < 50)

                responseData.then(function (res) {
                    res.json().then(function (result) {
                        try {
                            var lpAgentAssignment = 0;
                            var lpUnassignedConversation = 0;
                            if (typeof result != "undefined" && result != null && typeof result.metrics != "undefined" && result.metrics != null && result.metrics.waitTimeForAgentAssignment_90thPercentile != null && typeof result.metrics.waitTimeForAgentAssignment_90thPercentile != "undefined") {
                                lpAgentAssignment = result.metrics.waitTimeForAgentAssignment_90thPercentile;
                            }
                            if (typeof result != "undefined" && result != null && typeof result.metrics != "undefined" && result.metrics != null && result.metrics.unassignedConversations != null && typeof result.metrics.unassignedConversations != "undefined") {
                                lpUnassignedConversation = result.metrics.unassignedConversations;
                            }
                            // if (
                            //   checkLPChatAvailability(
                            //     lpprioritylevel,
                            //     lpAgentAssignment,
                            //     lpUnassignedConversation
                            //   )
                            // ) {
                            if (typeof result != "undefined" && result != null && typeof result.metrics != "undefined" && result.metrics != null && typeof result.available != "undefined" && result.available != null) {
                                lpAgentAvailabilityValue = result.available;
                            }
                            if (lpAgentAvailabilityValue) {
                                try {
                                    lpChatShownSiteCatalystObj.isLpChatShown = true;
                                    if (lpChatShownSiteCatalystObj.engagementAddedAfterChatShown.indexOf(data.eng.conf.name) == -1 && lpChatShownSiteCatalystObj.engagementAddedBeforeChatShown.indexOf(data.eng.conf.name) == -1) {
                                        lpChatShownSiteCatalystObj.engagementAddedAfterChatShown.push(data.eng.conf.name);
                                        lpChatShownSiteCatalystObj.engagementIdAddedAfterChatShown.push(data.eng.engData.engagementId);
                                        // sendLPEngagementsData(data.eng.conf.name);
                                        var lpBauCoEngagementName = data.eng.conf.name;
                                        var lpButtonTypeValue = "";
                                        lpButtonTypeValue = lpBauCoEngagementName.split("-")[lpBauCoEngagementName.split("-").length - 1];

                                        if (typeof lpBauCoEngagementName != "undefined" && lpBauCoEngagementName != null && lpBauCoEngagementName != "" && lpButtonTypeValue != "") {
                                            if (lpButtonTypeValue.toLowerCase() == "s") {
                                                nbxReporting("event245", "LPSalesExposed", lpBauCoEngagementName, "");
                                            }
                                            if (lpButtonTypeValue.toLowerCase() == "e") {
                                                nbxReporting("event244", "LPSalesExposed", lpBauCoEngagementName, "");
                                            }
                                            if (lpButtonTypeValue.toLowerCase() == "o") {
                                                nbxReporting("event246", "LPSalesExposed", lpBauCoEngagementName, "");
                                                if (isSOIChatOfferShown) {
                                                    nbxReporting("event259", "LPSalesExposed", lpBauCoEngagementName, "");
                                                }
                                            }
                                        }
                                    }
                                } catch (e) { }
                                clearInterval(apiInterval);
                                if (lpButtonHided == true) {
                                    lpButtonHided = false;
                                    stopInfinite = stopInfinite + 1;
                                    displayLPChatButton();
                                }
                                try {
                                    // if (lpTag.device.familyName() !== "Desktop") {
                                    //   return false;
                                    // }

                                    if ((typeof vzwDL != "undefined" && vzwDL != null && vzwDL != "" &&
                                        typeof vzwDL.page != "undefined" && vzwDL.page != null && vzwDL.page != "" &&
                                        typeof vzwDL.page.fireProactiveChat != "undefined" && vzwDL.page.fireProactiveChat != null && vzwDL.page.fireProactiveChat != "" && vzwDL.page.fireProactiveChat.toLowerCase() == "y") ||
                                        (typeof vzdl != "undefined" && vzdl != null && vzdl != "" &&
                                            typeof vzdl.page != "undefined" && vzdl.page != null && vzdl.page != "" &&
                                            typeof vzdl.page.fireProactiveChat != "undefined" && vzdl.page.fireProactiveChat != null && vzdl.page.fireProactiveChat != "" && vzdl.page.fireProactiveChat.toLowerCase() == "y")
                                    ) {
                                        if (typeof lpTag != 'undefined' && lpTag != null && Object.keys(lpTag).length != 0) {
                                            if (lpTag && lpTag.section && lpTag.section.indexOf('CMP:5GHomeQR') <= -1) {
                                                var section = (window.lpTag && window.lpTag.section) || [];
                                                section.push('CMP:5GHomeQR');
                                                if (typeof lpTag != "undefined" && lpTag != null && Object.keys(lpTag).length > 0 &&
                                                    typeof lpTag.newPage != "undefined" && lpTag.newPage != null && lpTag.newPage != "") {
                                                    window.lpTag.newPage(document.URL, {
                                                        section: section,
                                                        sdes: [],
                                                        taglets: {},
                                                    });
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        if (lpTag.device.familyName() !== "Desktop") {
                                            return false;
                                        }
                                        if (
                                            !(
                                                data &&
                                                data.eng &&
                                                data.eng.engData &&
                                                data.eng.engData.engagementType === 1
                                            )
                                        ) {
                                            return false;
                                        }
                                    }
                                    // if ((VZ_Chat.getCookie("lpProactiveChatDisable") == "true")) 
                                    // {
                                    //   return false;
                                    // }
                                    if (isLPProactiveChatOpened && checkLPVzdlThrottleList() && vzdl.page.throttleList.indexOf("C_LPP") != -1) {
                                        return false;
                                    }
                                    if (
                                        (VZ_Chat.getCookie(
                                            "proActiveDisable" + proActivePriority
                                        ) == "true" ||
                                            closeProActiveonPage == true) &&
                                        errorPageProAvctive == false
                                    ) {
                                        return false;
                                    }
                                    window.setTimeout(function () {
                                        var pageInputDom = document.querySelector("input");
                                        var pageUrl = window.document.URL.toLowerCase();
                                        if (typeof pageInputDom != "undefined" && pageInputDom != null && pageInputDom != "" &&
                                            (pageUrl.indexOf("personalinfo.html") != -1 || pageUrl.indexOf("creditcheck-v2.html") != -1 ||
                                                pageUrl.indexOf("contactinfo.html") != -1 || pageUrl.indexOf("creditcheck.html") != -1)) { }
                                        else {
                                            isLPProactiveChat = true;
                                            lpTag.taglets.rendererStub.click(
                                                data.eng.engData.engagementId
                                            );
                                            isLPProactiveChatOpened = true;
                                            proAutoOpenedFlag = true;
                                            errorPageProAvctive = false;
                                        }
                                    }, 100);
                                } catch (proActiveerr) {
                                    console.log(proActiveerr + "proactive error");
                                }
                            }
                            else {
                                try {
                                    if (lpChatShownSiteCatalystObj.engagementAddedAfterChatShown.indexOf(data.eng.conf.name) == -1 && lpChatShownSiteCatalystObj.engagementAddedBeforeChatShown.indexOf(data.eng.conf.name) == -1) {
                                        lpChatShownSiteCatalystObj.engagementAddedBeforeChatShown.push(data.eng.conf.name);
                                        lpChatShownSiteCatalystObj.engagementIdAddedBeforeChatShown.push(data.eng.engData.engagementId);
                                        // sendLPEngagementsData(data.eng.conf.name);
                                    }
                                } catch (e) { }
                            }
                        } catch (queueHealthAPIerror) {
                            console.log("queueHealthAPIerror " + queueHealthAPIerror);
                        }
                    });
                });
            }
            if (document.location.pathname.toLowerCase().indexOf('/stores/video-assist') != -1 || (typeof videoChat_Lp_Flow_Indicator != "undefined" && videoChat_Lp_Flow_Indicator != null && videoChat_Lp_Flow_Indicator != "")) {
                return;
            }
            var response = fetch(lpQueueHealthURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(req),
            }
            );

            response.then(function (res) {
                res.json().then(function (result) {
                    var showChat = false;
                    var lpAgentAssignment = 0;
                    var lpUnassignedConversation = 0;
                    if (typeof result != "undefined" && result != null && typeof result.metrics != "undefined" && result.metrics != null && result.metrics.waitTimeForAgentAssignment_90thPercentile != null && typeof result.metrics.waitTimeForAgentAssignment_90thPercentile != "undefined") {
                        lpAgentAssignment = result.metrics.waitTimeForAgentAssignment_90thPercentile;
                    }
                    if (typeof result != "undefined" && result != null && typeof result.metrics != "undefined" && result.metrics != null && result.metrics.unassignedConversations != null && typeof result.metrics.unassignedConversations != "undefined") {
                        lpUnassignedConversation = result.metrics.unassignedConversations;
                    }
                    if (typeof result != "undefined" && result != null && typeof result.metrics != "undefined" && result.metrics != null && typeof result.available != "undefined" && result.available != null) {
                        lpAgentAvailabilityValue = result.available;
                    }
                    // if (
                    //   result.metrics.waitTimeForAgentAssignment_90thPercentile >
                    //     1200000 &&
                    //   result.metrics.unassignedConversations < 50
                    // ) {
                    //   showChat = true;
                    // }
                    //                (result.available == false || result.available == "false")
                    try {
                        // if (
                        //   !checkLPChatAvailability(
                        //     lpprioritylevel,
                        //     lpAgentAssignment,
                        //     lpUnassignedConversation
                        //   )
                        // ) {
                        if (!lpAgentAvailabilityValue) {
                            try {
                                if (lpChatShownSiteCatalystObj.engagementAddedAfterChatShown.indexOf(data.eng.conf.name) == -1 && lpChatShownSiteCatalystObj.engagementAddedBeforeChatShown.indexOf(data.eng.conf.name) == -1) {
                                    lpChatShownSiteCatalystObj.engagementAddedBeforeChatShown.push(data.eng.conf.name);
                                    lpChatShownSiteCatalystObj.engagementIdAddedBeforeChatShown.push(data.eng.engData.engagementId);
                                    // sendLPEngagementsData(data.eng.conf.name);
                                }
                            } catch (e) { }
                            if (timerCallCount == true || timerCallCount == "true") {
                                apiInterval = setInterval(apiCallTimer, 30000);
                            }
                            timerCallCount = false;
                            lpButtonHided = true;
                            hideLPChatButton();
                        } else {
                            try {
                                lpChatShownSiteCatalystObj.isLpChatShown = true;
                                if (lpChatShownSiteCatalystObj.engagementAddedAfterChatShown.indexOf(data.eng.conf.name) == -1 && lpChatShownSiteCatalystObj.engagementAddedBeforeChatShown.indexOf(data.eng.conf.name) == -1) {
                                    lpChatShownSiteCatalystObj.engagementAddedAfterChatShown.push(data.eng.conf.name);
                                    lpChatShownSiteCatalystObj.engagementIdAddedAfterChatShown.push(data.eng.engData.engagementId);
                                    // sendLPEngagementsData(data.eng.conf.name);
                                    var lpBauCoEngagementName = data.eng.conf.name;
                                    var lpButtonTypeValue = "";
                                    lpButtonTypeValue = lpBauCoEngagementName.split("-")[lpBauCoEngagementName.split("-").length - 1];

                                    if (typeof lpBauCoEngagementName != "undefined" && lpBauCoEngagementName != null && lpBauCoEngagementName != "" && lpButtonTypeValue != "") {
                                        if (lpButtonTypeValue.toLowerCase() == "s") {
                                            nbxReporting("event245", "LPSalesExposed", lpBauCoEngagementName, "");
                                        }
                                        if (lpButtonTypeValue.toLowerCase() == "e") {
                                            nbxReporting("event244", "LPSalesExposed", lpBauCoEngagementName, "");
                                        }
                                        if (lpButtonTypeValue.toLowerCase() == "o") {
                                            nbxReporting("event246", "LPSalesExposed", lpBauCoEngagementName, "");
                                            if (isSOIChatOfferShown) {
                                                nbxReporting("event259", "LPSalesExposed", lpBauCoEngagementName, "");
                                            }
                                        }
                                    }
                                }
                            } catch (e) { }
                            clearInterval(apiInterval);
                            if (lpButtonHided == true) {
                                lpButtonHided = false;
                                stopInfinite = stopInfinite + 1;
                                displayLPChatButton();
                            }
                            try {
                                // if (lpTag.device.familyName() !== "Desktop") {
                                //   return false;
                                // }
                                if ((typeof vzwDL != "undefined" && vzwDL != null && vzwDL != "" &&
                                    typeof vzwDL.page != "undefined" && vzwDL.page != null && vzwDL.page != "" &&
                                    typeof vzwDL.page.fireProactiveChat != "undefined" && vzwDL.page.fireProactiveChat != null && vzwDL.page.fireProactiveChat != "" && vzwDL.page.fireProactiveChat.toLowerCase() == "y") ||
                                    (typeof vzdl != "undefined" && vzdl != null && vzdl != "" &&
                                        typeof vzdl.page != "undefined" && vzdl.page != null && vzdl.page != "" &&
                                        typeof vzdl.page.fireProactiveChat != "undefined" && vzdl.page.fireProactiveChat != null && vzdl.page.fireProactiveChat != "" && vzdl.page.fireProactiveChat.toLowerCase() == "y")
                                ) {
                                    if (typeof lpTag != 'undefined' && lpTag != null && Object.keys(lpTag).length != 0) {
                                        if (lpTag && lpTag.section && lpTag.section.indexOf('CMP:5GHomeQR') <= -1) {
                                            var section = (window.lpTag && window.lpTag.section) || [];
                                            section.push('CMP:5GHomeQR');
                                            if (typeof lpTag != "undefined" && lpTag != null && Object.keys(lpTag).length > 0 &&
                                                typeof lpTag.newPage != "undefined" && lpTag.newPage != null && lpTag.newPage != "") {
                                                window.lpTag.newPage(document.URL, {
                                                    section: section,
                                                    sdes: [],
                                                    taglets: {},
                                                });
                                            }
                                        }
                                    }
                                }
                                else {
                                    if (lpTag.device.familyName() !== "Desktop") {
                                        return false;
                                    }
                                    if (
                                        !(
                                            data &&
                                            data.eng &&
                                            data.eng.engData &&
                                            data.eng.engData.engagementType === 1
                                        )
                                    ) {
                                        return false;
                                    }
                                }
                                // if ((VZ_Chat.getCookie("lpProactiveChatDisable") == "true")) 
                                // {
                                //   return false;
                                // }
                                if (isLPProactiveChatOpened && checkLPVzdlThrottleList() && vzdl.page.throttleList.indexOf("C_LPP") != -1) {
                                    return false;
                                }
                                if (
                                    (VZ_Chat.getCookie(
                                        "proActiveDisable" + proActivePriority
                                    ) == "true" ||
                                        closeProActiveonPage == true) &&
                                    errorPageProAvctive == false
                                ) {
                                    return false;
                                }

                                //if (lpTag.external.autoClickProactive.campaignWhiteList.indexOf(data.eng.engData.campaignId) < 0) return false;
                                //if (cookieExistsIndicatingVisitorHasReceivedThisProactiveRecently()) return false;
                                window.setTimeout(function () {
                                    var pageInputDom = document.querySelector("input");
                                    var pageUrl = window.document.URL.toLowerCase();
                                    if (typeof pageInputDom != "undefined" && pageInputDom != null && pageInputDom != "" &&
                                        (pageUrl.indexOf("personalinfo.html") != -1 || pageUrl.indexOf("creditcheck-v2.html") != -1 ||
                                            pageUrl.indexOf("contactinfo.html") != -1 || pageUrl.indexOf("creditcheck.html") != -1)) { }
                                    else {
                                        isLPProactiveChat = true;
                                        lpTag.taglets.rendererStub.click(
                                            data.eng.engData.engagementId
                                        );
                                        isLPProactiveChatOpened = true;
                                        proAutoOpenedFlag = true;
                                        errorPageProAvctive = false;
                                    }
                                }, 100);
                            } catch (proActiveerr) {
                                console.log(proActiveerr + "proactive error");
                            }
                        }
                    }
                    catch (queueHealthAPIerror) {
                        console.log("queueHealthAPIerror " + queueHealthAPIerror);
                    }
                });
            });
        }
    );
};


//display chat button
function displayLPChatButton() {
    lpBauFlow = true;
    isLpTagBlocked = false;
    try {
        if (lpBauFlow) {
            // if (lpChatShownSiteCatalystObj.engagementAddedBeforeChatShown.length > 1) {
            //     for (var i = 0; i < lpChatShownSiteCatalystObj.engagementAddedBeforeChatShown.length; i++) {
            //         var lpEngagement = lpChatShownSiteCatalystObj.engagementAddedBeforeChatShown[i];
            //         var lpEngagementIdInDisplayFun = lpChatShownSiteCatalystObj.engagementIdAddedBeforeChatShown[i];
            //         // sendLPEngagementsData(lpEngagement);
            //         var lpButtonTypeValue = "";
            //         lpButtonTypeValue = lpEngagement.split("-")[lpEngagement.split("-").length - 1];

            //         if (typeof lpEngagement != "undefined" && lpEngagement != null && lpEngagement != "" && lpButtonTypeValue != "") {
            //             if (lpButtonTypeValue.toLowerCase() == "s") {
            //                 nbxReporting("event245", "LPSalesExposed", lpEngagement, "");
            //             }
            //             if (lpButtonTypeValue.toLowerCase() == "e") {
            //                 nbxReporting("event244", "LPSalesExposed", lpEngagement, "");
            //             }
            //             if (lpButtonTypeValue.toLowerCase() == "o") {
            //                 nbxReporting("event246", "LPSalesExposed", lpEngagement, "");
            //                 if (isSOIChatOfferShown) {
            //                     nbxReporting("event259", "LPSalesExposed", lpEngagement, "");
            //                 }
            //             }
            //         }
            //     }
            // }

            if (isLpTagBlocked == true) {
                VZ_Chat.init({
                    debugMode: true,
                    scrubber: VZ_Chat.LPMobileDataScrubber,
                    builder: VZ_Chat.TCMobileDataBuilder,
                });
            }
            var section = (window.lpTag && window.lpTag.section) || [];
            if (typeof lpTag != "undefined" && lpTag != null && Object.keys(lpTag).length > 0 &&
                typeof lpTag.newPage != "undefined" && lpTag.newPage != null && lpTag.newPage != "") {
                window.lpTag.newPage(document.URL, {
                    section: section,
                    sdes: [],
                    taglets: {},
                });
                console.log("newPage Done");
            }
        }
        else {
            try {
                if (lpNBXObject.LC_Available.length == 0 || lpNBXObject.LC_Available.indexOf("false") != -1) {
                    lpNBXObject.LC_Available.unshift("true");
                }
            } catch (e) { }
            nbxLpExposedData()
            var lpNBXStickyButtonDom = document.getElementById("vzChatWithUs");
            var lpNBXEmbeddedButtonDom = document.getElementById("vzChat");
            if (typeof lpNBXStickyButtonDom != "undefined" && lpNBXStickyButtonDom != null) {
                lpNBXStickyButtonDom.style.display = ""
            }
            if (typeof lpNBXEmbeddedButtonDom != "undefined" && lpNBXEmbeddedButtonDom != null) {
                lpNBXEmbeddedButtonDom.style.display = ""
            }
            if (!lpZineoneFblViewedEventSent && !lpBauFlow && !isUserAuthenticated() && lpZineOneResponseList &&
                (VZ_Chat.getCookie("lpZineOneProViewedCodeFBLFlag") == null ||
                    VZ_Chat.getCookie("lpZineOneProViewedCodeFBLFlag") == '' ||
                    VZ_Chat.getCookie("lpZineOneProViewedCodeFBLFlag") == 'false')) {
                lpZineOneFeedbackLoopCall(lpZineOneFBLReqObj);
                lpZineoneFblViewedEventSent = true;
                document.cookie = "lpZineOneProViewedCodeFBLFlag=" + true + "; domain=.verizon.com; path=/;";
                document.cookie = "lpZineOneProViewedCodeFBLFlag=" + true + "; domain=.verizonwireless.com; path=/;";
            }
            lpNbxEnableProactiveChat(lpNBXObject);
        }
    } catch (e) {
        console.log(e);
    }
}

function hideLPChatButton() {
    lpBauFlow = true;
    try {
        if (lpBauFlow) {
            lpTag.events.hasFired('RENDERER_STUB', 'AFTER_CREATE_ENGAGEMENT_INSTANCE').forEach(function (e) {
                var chatEngagementDiv = document.getElementById(e.data.eng.mainContainer.id);
                if (typeof chatEngagementDiv != "undefined" && chatEngagementDiv != null) {
                    chatEngagementDiv.style.display = "none";
                }
            });
        }
        else {
            if (window.lpTag) {
                window.lpTag.events.trigger("LP_OFFERS", "HIDE");
            }
        }
    }
    catch (e) {
        console.log(e);
    }
}
