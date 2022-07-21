"use strict";
// Delay SDK initialization by this many ms
const initDelay = 250;
const dataSources = {
      chatInfo: { bound: null },
      chattingAgentInfo: { bound: null },
      agentInfo: { bound: null },
      chatTranscript: { bound: null },
      surveyQuestions: { bound: null },
      visitorInfo: { bound: null },
      campaignInfo: { bound: null },
      engagementInfo: { bound: null },
      visitorJourney: { bound: null },
      SDE: { bound: null },
      authenticatedData: { bound: null },
      claimsAndAuthType: { bound: null },
      customVariables: { bound: null },
      splitSession: { bound: null }
  };

const urlParams = {};
const lastValue = {};
const bindJSONOptions = { collapsed: true };

const sdkInit = () => {
    // initialize the SDK
    lpTag.agentSDK.init({});

    // bind all data sources
    bindDataSources().then(() => {
        printLogLine(`[sdkInit] all data sources bound`)
    }).catch(e => {
        printLogLine(`[sdkInit] ERROR failed to bind data sources: ${e}`);
    });
};

// bind all data sources
const bindDataSources = () => {
    // concurrently, for each data source run 'bindDataSource'
    return Promise.all(Object.keys(dataSources).map(source => {
        return bindDataSource(source)
    }));
};

// return a promise that will bind a specific data source
const bindDataSource = (path) => {
    return new Promise((resolve, reject) => {
        // bind printData to the specified data source / path
        lpTag.agentSDK.bind(path,
          printData,
          (err) => {
            // when finished
              if (err) {
                  // if there was an error binding update the bind state indicator and reject the promise
                  updateBindIndicator(path);
                  reject(err);
              } else {
                  // if the bind succeeded set the bind state to true, update the indicator, and resolve the promise
                  dataSources[path].bound = true;
                  updateBindIndicator(path);
                  resolve(true)
              }
          })
    });
};

// unbind all data sources
const unbindDataSources = () => {
    // concurrently, for each data source run 'unbindDataSource'
    return Promise.all(Object.keys(dataSources).map(source => {
        return unbindDataSource(source)
    }));
};

// return a promise that will unbind a specific data source
const unbindDataSource = (path) => {
    return new Promise((resolve, reject) => {
        // unbind printData from the specified data source / path
        lpTag.agentSDK.unbind(path,
          printData,
          (err) => {
            // when finished
              if (err) {
                  // if there was an error unbinding update the bind state indicator and reject the promise
                  updateBindIndicator(path);
                  reject(err)
              } else {
                  // if the unbind succeeded set the bind state to false, update the indicator, and resolve the promise
                  dataSources[path].bound = false;
                  updateBindIndicator(path);
                  resolve(true)
              }
          })
    });
};

// print data to log on update
const printData = (data) => {
    // check whether data changed since last update
    let unchanged;
    if (_.isEqual(data.newValue, lastValue[data.key])) {
        unchanged = true;
    } else {
        lastValue[data.key] = data.newValue
    }

    // create a new line for the log
    let newEntry = $('<tr>').addClass(data.key).addClass('bindingOutputRow')
      .append($('<td>').text(timeString(new Date())))
      .append($('<td>').text(data.key))
      .append($('<td>').jsonViewer(data.newValue, bindJSONOptions));
    // if data is unchanged add relevant class
    if (unchanged) newEntry.addClass('unchanged');
    // get the filter value
    // add it to the top of the list
    $('tbody#bindOutput').prepend(newEntry)
};


const printLogLine = (logLine) => {
    let line = $('<span>').text(timeString(new Date())+' '+logLine+'\n');
    $('pre#logOutput').prepend(line)
};


// format a Date as a time string
const timeString = (date) => {
    return `${date.getHours()}:${('0'+date.getMinutes()).slice(-2)}:${('0'+date.getSeconds()).slice(-2)}.${date.getMilliseconds()}`
};

const sdkDispose = () => {
    // unbind all data sources
    unbindDataSources().then(() => {
        printLogLine('[sdkDispose] all data sources unbound');
    }).catch(e => {
        printLogLine(`[sdkDispose] ERROR failed to unbind data sources: ${e}`);
    }).finally(() => {
        // use the SDK 'dispose' method
        lpTag.agentSDK.dispose();
        printLogLine('[sdkDispose] SDK disposed');
        // enable the 'init' button
        $('button#init').removeAttr('disabled');
        // disable the 'dispose' button
        $('button#dispose').attr('disabled', 'disabled');
    });
};

// <editor-fold defaultstate="collapsed" desc="Init">
const init = () => {
    sdkInit();
    addBindIndicators();
    addFilterDropDown();
    bindUnchangedFilter();
    getQueryStringParams();
    printQueryStringParams();
    populateSampleSC();
    createGetButtons();
    printLogLine(`[widget] initialized SDK version ${lpTag.agentSDK.v}`);
};

$(function(){
    printLogLine('[widget] initializing in '+initDelay+' ms...');
    setTimeout(init,initDelay);
});

// </editor-fold>