// import DataFrame from 'dataframe-js';
// import DataFrame, { Row } from 'dataframe-js';
// // es5
// var DataFrame = require('dataframe-js').DataFrame;
// // Browser
// var DataFrame = dfjs.DataFrame;

function httpGetFullTable() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", 'http://localhost:8089/graphs/get', false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}


function getAllResources() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", 'http://localhost:8089/tables/getFullTable', false);
    xmlHttp.send(null);
    document.getElementById("table_content").innerHTML = xmlHttp.responseText

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", 'http://localhost:8089/graphs/getAllClassifiersGraphs', false);
    xmlHttp.send(null);
    jsonObj = JSON.parse(JSON.parse(xmlHttp.responseText));
    parentElement = document.getElementById("AllClassifiersGraphs");
    EvaluateByAucGraphs = jsonObj['Evaluated by AUC'];
    for (var key in EvaluateByAucGraphs) {
        newPlot = document.createElement(key);
        Plotly.newPlot(newPlot, JSON.parse(jsonObj['Evaluated by AUC'][key]));
        parentElement.appendChild(newPlot)
    }
    EvaluateByRuntimeGraphs = jsonObj['Evaluated by Runtime'];
    for (var key in EvaluateByRuntimeGraphs) {
        newPlot = document.createElement(key, {height : 400, width : 400});
        Plotly.newPlot(newPlot, JSON.parse(jsonObj['Evaluated by Runtime'][key]));
        parentElement.appendChild(newPlot)
    }

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", 'http://localhost:8089/graphs/getTopThreeGraphs', false);
    xmlHttp.send(null);
    jsonObj = JSON.parse(JSON.parse(xmlHttp.responseText));
    parentElement = document.getElementById("TopThreeGraphs");
    for (var key in jsonObj) {
        newPlot = document.createElement(key);
        Plotly.newPlot(newPlot, JSON.parse(jsonObj[key]));
        parentElement.appendChild(newPlot);
    }

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", 'http://localhost:8089/graphs/getClassifersOptions', false);
    xmlHttp.send(null);
    jsonObj = JSON.parse(JSON.parse(xmlHttp.responseText));
    var sel = document.getElementById("setClassifier");
    let newOpt;
    for (var key in jsonObj) {
        newOpt = new Option(jsonObj[key], jsonObj[key]);
        sel.appendChild(newOpt);
    }

}

function getClassifiersGraphs(){
    var select = document.getElementById("setClassifier");
    var result = [];
    var options = select && select.options;
    var opt;

    for (var i=0, iLen=options.length; i<iLen; i++) {
        opt = options[i];

        if (opt.selected) {
            result.push(opt.value || opt.text);
        }
    }
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", 'http://localhost:8089/graphs/getSpecificClassifierGraphs', false);
    reqBody = {"Classifiers" : result}
    xmlHttp.setRequestHeader("Classifiers", JSON.stringify(result));
    xmlHttp.send(reqBody);
    jsonObj = JSON.parse(JSON.parse(xmlHttp.responseText));
    parentElement = document.getElementById("GraphByClassifiers");
    for (var key in jsonObj) {
        newPlot = document.createElement(key);
        Plotly.newPlot(newPlot, JSON.parse(jsonObj[key]));
        parentElement.appendChild(newPlot);
    }
}

