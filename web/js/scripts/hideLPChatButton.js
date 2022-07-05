function hideLPChatButton(){
    try {
        if(lpBauFlow){
          if (document.getElementById("inqC2CImgContainer_Fixed1")) {
            document.getElementById("inqC2CImgContainer_Fixed1").style.display = "none";
          }
          if (document.getElementById("nuance-chat-container-1")) {
            document.getElementById("nuance-chat-container-1").style.display = "none";
          }
          if (document.getElementById("LPMcontainer-1597421234268-4")) {
            document.getElementById("LPMcontainer-1597421234268-4").style.display =
              "none";
          }
    
          if (document.getElementById("nuance-chat-container-2")) {
            document.getElementById("nuance-chat-container-2").style.display = "none";
          }
          try {
            lpTag.events.hasFired('RENDERER_STUB', 'AFTER_CREATE_ENGAGEMENT_INSTANCE').forEach(function (e) {
              var chatEngagementDiv = document.getElementById(e.data.eng.mainContainer.id);
              if (typeof chatEngagementDiv != "undefined" && chatEngagementDiv != null) {
                chatEngagementDiv.style.display = "none";
              }
            });
          }
          catch (e) { }
          if (window.lpTag) {
            window.lpTag.events.trigger("LP_OFFERS", "HIDE");
          }
        }
        else {
          var lpNBXStickyButtonDom = document.getElementById("vzChatWithUs");
          var lpNBXEmbeddedButtonDom = document.getElementById("vzChat");
          if(typeof lpNBXStickyButtonDom != "undefined" && lpNBXStickyButtonDom != null){
            lpNBXStickyButtonDom.style.display = "none"
          }
          if(typeof lpNBXEmbeddedButtonDom != "undefined" && lpNBXEmbeddedButtonDom != null){
            lpNBXEmbeddedButtonDom.style.display = "none"
          }
        }  
      }
      catch (e) {
    
      }
}
  