function displayLPChatButton() {
    try {
        if (lpBauFlow) {
            if (lpChatShownSiteCatalystObj.engagementAddedBeforeChatShown.length > 1) {
                for (var i = 0; i < lpChatShownSiteCatalystObj.engagementAddedBeforeChatShown.length; i++) {
                    var lpEngagement = lpChatShownSiteCatalystObj.engagementAddedBeforeChatShown[i];
                    var lpEngagementIdInDisplayFun = lpChatShownSiteCatalystObj.engagementIdAddedBeforeChatShown[i];
                    // sendLPEngagementsData(lpEngagement);
                    var lpButtonTypeValue = "";
                    lpButtonTypeValue = lpEngagement.split("-")[lpEngagement.split("-").length - 1];

                    if (typeof lpEngagement != "undefined" && lpEngagement != null && lpEngagement != "" && lpButtonTypeValue != "") {
                        if (lpButtonTypeValue.toLowerCase() == "s") {
                            nbxReporting("event245", "LPSalesExposed", lpEngagement, "");
                        }
                        if (lpButtonTypeValue.toLowerCase() == "e") {
                            nbxReporting("event244", "LPSalesExposed", lpEngagement, "");
                        }
                        if (lpButtonTypeValue.toLowerCase() == "o") {
                            nbxReporting("event246", "LPSalesExposed", lpEngagement, "");
                            if (isSOIChatOfferShown) {
                                nbxReporting("event259", "LPSalesExposed", lpEngagement, "");
                            }
                        }
                    }
                }
            }
            try {
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
                    console.log("calling newpage 8");
                }
                if (document.getElementById("inqC2CImgContainer_Fixed1")) {
                    document.getElementById("inqC2CImgContainer_Fixed1").style.display =
                        "block";
                }
                if (document.getElementById("nuance-chat-container-1")) {
                    document.getElementById("nuance-chat-container-1").style.display = "block";
                }
                if (document.getElementById("nuance-chat-container-2")) {
                    document.getElementById("nuance-chat-container-2").style.display = "block";
                }
            } catch (e) { }
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
    } catch (e) { }
}