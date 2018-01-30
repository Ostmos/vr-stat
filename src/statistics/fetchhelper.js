function fetchData(url) {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(
        function(response) {
            if (response.status !== 200) {
                console.log('Status Code: ', response.status);
                return;
            }
            
            response.json().then(function(data) {
                console.log(data.userId);
                console.log(data.id);
                console.log(data.title);
                console.log(data.body);
            });
        }
    )
    .catch(function(err) {
        console.log('Fetch Error: ', err)
    })
}

var jsonObj = {
	"query": [
		{
		"code": "Region",
		"selection": {
			"filter": "vs:RegionLän07",
			"values": [
			"01",
			"03",
			"04",
			"05",
			"06",
			"07",
			"08",
			"09",
			"10",
			"12",
			"13",
			"14",
			"17",
			"18",
			"19",
			"20",
			"21",
			"22",
			"23",
			"24",
			"25"
			]
		}
		},
		{
		"code": "Alder",
		"selection": {
			"filter": "agg:Ålder10år",
			"values": [
			"-4",
			"5-14",
			"15-24",
			"25-34",
			"35-44",
			"45-54",
			"55-64",
			"65-74",
			"75-84",
			"85-94",
			"95+"
			]
		}
		}
	],
	"response": {
		"format": "json"
	}
};

function fetchDataWithPost(url) {
    fetch('http://api.scb.se/OV0104/v1/doris/sv/ssd/START/BE/BE0101/BE0101D/MedelfolkFodelsear', {
        method: 'post',
        headers: {
            "Content-type" : "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: JSON.stringify(jsonObj) 
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(function(error) {
        console.log('Request failed', error);
    })
}

window.onload = fetchDataWithPost();