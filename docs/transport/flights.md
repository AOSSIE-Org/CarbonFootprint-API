# Flights

{% method %}
### Get Emissions
Find Emissions for a flight between two airports.
Only [ICAO Airport Codes](https://en.wikipedia.org/wiki/International_Civil_Aviation_Organization_airport_code) are supported.
{% sample lang="http" %}
```
POST /v1/flight
```
**Parameters**

| Name        | Type           | Description  |
| ------------- |-------------| -----|
| origin | string |**Required:** Flight origin airport _ICAO_ code. |
| destination  | string |**Required:** Flight destination airport _ICAO_ code. |
| type     | string | Flight type (`international` or `domestic`). Default is `international`. |
| model     | string | Flight model (e.g A310). If no model is specified, flight model would default to A380 for international flights and A320 for domestic flights. |
| passengers     | number | Pass the number of passengers to get the emissions relative to per person on the flight. |

**Example**
```
{
	"origin": "DEL",
	"destination": "JFK",
	"type": "international",
	"model": "A380",
	"passengers": 840
}
```
**Response**
```
{
	"success": true,
	"emissions": {
		"CO2": 122.192782162
		"unit": "kg CO2/L"
	}
}
```

{% endmethod %}