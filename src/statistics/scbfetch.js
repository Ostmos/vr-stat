function DataObject() {
    this.yLabels = [];
    this.xLabels = [];
    this.yValues = []; 
    this.getSize = function() {
        return this.xLabels.length * this.yLabels.length;
    }
}

// This should be moved somewhere
var jsonObj = {
	"query": [
	  {
		"code": "Alder",
		"selection": {
		  "filter": "agg:Ålder10år",
		  "values": [
			"25-34",
			"35-44"
		  ]
		}
	  },
	  {
		"code": "Tid",
		"selection": {
		  "filter": "item",
		  "values": [
			"2013",
			"2014",
			"2015",
			"2016"
		  ]
		}
	  }
	],
	"response": {
	  "format": "json"
	}
  }

var jsonObj2 = {
    "query": [
      {
        "code": "Alder",
        "selection": {
          "filter": "agg:Ålder5år",
          "values": [
            "-4",
            "5-9",
            "10-14",
            "15-19",
            "20-24",
            "25-29",
            "30-34",
            "35-39",
            "40-44",
            "45-49",
            "50-54",
            "55-59",
            "60-64",
            "65-69",
            "70-74",
            "75-79",
            "80-84",
            "85-89",
            "90-94",
            "95-99",
            "100+"
          ]
        }
      }
    ],
    "response": {
      "format": "json"
    }
  }

let testData = new DataObject();
// http://www.statistikdatabasen.scb.se/pxweb/sv/ssd/START__BE__BE0101__BE0101A/BefolkningR1860/table/tableViewLayout1/?rxid=c8454c80-d379-481b-bf82-369f75815d3a
fetch('http://api.scb.se/OV0104/v1/doris/sv/ssd/START/BE/BE0101/BE0101A/BefolkningR1860', {
    method: 'post',
    headers: {
        "Content-type" : "application/x-www-form-urlencoded; charset=UTF-8"
    },
    // For more stats use jsonObj2 instead of jsonObj
    body: JSON.stringify(jsonObj2) 
})
.then(response => response.json())
.then(function(json){
    for(var i = 0; i < json.data.length; i++) {
        // This is really ineffective, will change
        var newItemY = json.data[i].key[0];
        var newItemX = json.data[i].key[1];
        if (testData.yLabels.indexOf(newItemY) === -1) {
            testData.yLabels.push(newItemY);
        }
        if (testData.xLabels.indexOf(newItemX) === -1) {
            testData.xLabels.push(newItemX);
        }
        testData.yValues[i] = parseInt(json.data[i].values[0]);
    }
    console.log(testData);
    callback();
})
.catch(function(error) {
    console.log('Request failed', error);
})