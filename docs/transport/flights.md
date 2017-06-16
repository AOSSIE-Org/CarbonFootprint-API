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
| origin<br><span style="color:red">_required_ </span>   | string | Flight origin airport _ICAO_ code. |
| destination<br><span style="color:red">_required_ </span>     | string | Flight destination airport _ICAO_ code. |
| type     | string | Flight type (International/Domestic). If nothing is specified, flight type would default to International. |
| model     | string | Flight model (e.g A310). If no model is specified, flight model would default to A380 for international flights and A320 for domestic flights. |
| passengers     | number | Pass the number of passengers to get the emissions relative to per person on the flight. |


{% endmethod %}