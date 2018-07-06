const schemaArray = [
    {
        "title": "Structured Data",
        "type": "number",
        "enum": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        "enumNames": ["Airports", "Appliances Data", "Country Code",
            "Electricity Emission", "Flights", "Fuels", "Per Capita", "Poultry", "Trains", "Trees"]
    },
    {
        "title": "Airports",
        "type": "object",
        "required": ["Airport Code", "lat", "lon"],
        "properties": {
            "Airport Code": {
                "title": "Airport Code",
                "type": "string"
            },
            "lat": {
                "title": "Latitude",
                "type": "number"
            },
            "lon": {
                "title": "Longitude",
                "type": "number"
            }
        }
    },
    {
        "title": "Appliances Data",
        "type": "object",
        "required": ["Appliance", "Average_watts (in Wh)"],
        "properties": {
            "Appliance": {
                "title": "Appliance Name",
                "type": "string"
            },
            "Average_watts (in Wh)": {
                "title": "Average_watts (in Wh)",
                "type": "number"
            }
        }
    },
    {
        "title": "Country Code",
        "type": "object",
        "required": ["name", "code"],
        "properties": {
            "name": {
                "title": "Country Name",
                "type": "string"
            },
            "code": {
                "title": "Country Code",
                "type": "string"
            }
        }
    },
    {
        "title": "Electricity Emission",
        "type": "object",
        "required": ["Country", "Generation-CO2", "Generation-CH4", "Generation-N2O", "Td-CH4", "Td-N2O", "Consum-CO2", "Consum-CH4", "Consum-N2O"],
        "properties": {
            "Country": {
                "title": "Country Name",
                "type": "string"
            },
            "Generation-CO2": {
                "title": "Generation-CO2",
                "type": "integer"
            },
            "Generation-CH4": {
                "title": "Generation-CH4",
                "type": "integer"
            },
            "Generation-N2O": {
                "title": "Generation-N2O",
                "type": "integer"
            },
            "Td-CO2": {
                "title": "Td-CO2",
                "type": "integer"
            },
            "Td-CH4": {
                "title": "Td-CH4",
                "type": "integer"
            },
            "Td-N2O": {
                "title": "Td-N2O",
                "type": "integer"
            },
            "Consum-CO2": {
                "title": "Consum-CO2",
                "type": "integer"
            },
            "Consum-CH4": {
                "title": "Consum-CH4",
                "type": "integer"
            },
            "Consum-N2O": {
                "title": "Consum-CH4",
                "type": "integer"
            }
        }
    },
    {
        "title": "Flights",
        "type": "object",
        "required": ["airplane model"],
        "properties": {
            "125": {
                "title": "Emission in 125 nautical miles",
                "type": "number"
            },
            "250": {
                "title": "Emission in 250 nautical miles",
                "type": "number"
            },
            "500": {
                "title": "Emission in 500 nautical miles",
                "type": "number"
            },
            "750": {
                "title": "Emission in 750 nautical miles",
                "type": "number"
            },
            "1000": {
                "title": "Emission in 1000 nautical miles",
                "type": "number"
            },
            "1500": {
                "title": "Emission in 1500 nautical miles",
                "type": "number"
            },
            "2000": {
                "title": "Emission in 2000 nautical miles",
                "type": "number"
            },
            "2500": {
                "title": "Emission in 2500 nautical miles",
                "type": "number"
            },
            "3000": {
                "title": "Emission in 3000 nautical miles",
                "type": "number"
            },
            "3500": {
                "title": "Emission in 3500 nautical miles",
                "type": "number"
            },
            "4000": {
                "title": "Emission in 4000 nautical miles",
                "type": "number"
            },
            "4500": {
                "title": "Emission in 4500 nautical miles",
                "type": "number"
            },
            "5000": {
                "title": "Emission in 5000 nautical miles",
                "type": "number"
            },
            "5500": {
                "title": "Emission in 5500 nautical miles",
                "type": "number"
            },
            "6000": {
                "title": "Emission in 6000 nautical miles",
                "type": "number"
            },
            "6500": {
                "title": "Emission in 6500 nautical miles",
                "type": "number"
            },
            "7000": {
                "title": "Emission in 7000 nautical miles",
                "type": "number"
            },
            "7500": {
                "title": "Emission in 7500 nautical miles",
                "type": "number"
            },
            "8000": {
                "title": "Emission in 8000 nautical miles",
                "type": "number"
            },
            "8500": {
                "title": "Emission in 8500 nautical miles",
                "type": "number"
            },
            "airplane model": {
                "title": "Airoplane Model",
                "type": "string"
            }
        }
    },
    {
        "title": "Fuels",
        "type": "object",
        "required": ["Fuel", "langKey", "measuredBy", "CO2Emission", "CH4Emission", "N2OEmission", "GHGEmission", "_comments"],
        "properties": {
            "Fuel": {
                "title": "Fuel Name",
                "type": "string"
            },
            "langKey": {
                "title": "Language Key",
                "type": "string"
            },
            "measuredBy": {
                "title": "Measured By",
                "type": "string"
            },
            "CO2Emission": {
                "title": "CO2 Emission",
                "type": "number"
            },
            "CH4Emission": {
                "title": "CH4 Emission",
                "type": "number"
            },
            "N2OEmission": {
                "title": "N2O Emission",
                "type": "number"
            },
            "GHGEmission": {
                "title": "GHG Emission",
                "type": "number"
            },
            "_comments": {
                "title": "Comments about the fuel",
                "type": "string"
            }
        }
    },
    {
        "title": "Per Capita",
        "type": "object",
        "required": ["CountryCode", "Country", "SeriesCode"],
        "properties": {
            "1990": {
                "title": "Emission in 1990",
                "type": "integer"
            },
            "1991": {
                "title": "Emission in 1991",
                "type": "integer"
            },
            "1992": {
                "title": "Emission in 1992",
                "type": "integer"
            },
            "1993": {
                "title": "Emission in 1993",
                "type": "integer"
            },
            "1994": {
                "title": "Emission in 1994",
                "type": "integer"
            },
            "1995": {
                "title": "Emission in 1995",
                "type": "integer"
            },
            "1996": {
                "title": "Emission in 1996",
                "type": "integer"
            },
            "1997": {
                "title": "Emission in 1997",
                "type": "integer"
            },
            "1998": {
                "title": "Emission in 1998",
                "type": "integer"
            },
            "1999": {
                "title": "Emission in 1999",
                "type": "integer"
            },
            "2000": {
                "title": "Emission in 2000",
                "type": "integer"
            },
            "2001": {
                "title": "Emission in 2001",
                "type": "integer"
            },
            "2002": {
                "title": "Emission in 2002",
                "type": "integer"
            },
            "2003": {
                "title": "Emission in 2003",
                "type": "integer"
            },
            "2004": {
                "title": "Emission in 2004",
                "type": "integer"
            },
            "2005": {
                "title": "Emission in 2005",
                "type": "integer"
            },
            "2006": {
                "title": "Emission in 2006",
                "type": "integer"
            },
            "2007": {
                "title": "Emission in 2007",
                "type": "integer"
            },
            "2008": {
                "title": "Emission in 2008",
                "type": "integer"
            },
            "2009": {
                "title": "Emission in 2009",
                "type": "integer"
            },
            "2010": {
                "title": "Emission in 2010",
                "type": "integer"
            },
            "2011": {
                "title": "Emission in 2011",
                "type": "integer"
            },
            "2012": {
                "title": "Emission in 2012",
                "type": "integer"
            },
            "2013": {
                "title": "Emission in 2013",
                "type": "integer"
            },
            "2014": {
                "title": "Emission in 2014",
                "type": "integer"
            },
            "2015": {
                "title": "Emission in 2015",
                "type": "integer"
            },
            "2016": {
                "title": "Emission in 2016",
                "type": "integer"
            },
            "2017": {
                "title": "Emission in 2017",
                "type": "integer"
            },
            "CountryCode": {
                "title": "Country Code",
                "type": "number"
            },
            "Country": {
                "title": "Country Name",
                "type": "string"
            },
            "SeriesCode": {
                "title": "Series Code",
                "type": "number"
            }
        }
    },
    {
        "title": "Poultry",
        "type": "object",
        "required": ["type", "region", "pf_emissions", "p_emissions", "wl_factor"],
        "properties": {
            "type": {
                "title": "Type of poultry",
                "type": "string"
            },
            "region": {
                "title": "Region",
                "type": "string"
            },
            "pf_emissions": {
                "title": "pf_emissions",
                "type": "number"
            },
            "p_emissions": {
                "title": "p_emissions",
                "type": "number"
            },
            "wl_factor": {
                "title": "wl_factor",
                "type": "number"
            },
            "ml_factor": {
                "title": "ml_factor",
                "type": "number"
            }
        }
    },
    {
        "title": "Trains",
        "type": "object",
        "required": ["trainType", "region", "quantity"],
        "properties": {
            "trainType": {
                "title": "Train type",
                "type": "string"
            },
            "C02": {
                "title": "CO2 Emission Value (kg/km)",
                "type": "number"
            },
            "NO2": {
                "title": "NO2 Emission Value (kg/km)",
                "type": "number"
            },
            "CH4": {
                "title": "CH4 Emission Value (kg/km)",
                "type": "number"
            },
            "region": {
                "title": "Region",
                "type": "string"
            },
            "quantity": {
                "title": "Quantity",
                "type": "integer"
            },
            "MF": {
                "title": "Multiplying Factor",
                "type": "number"
            }
        }
    },
    {
        "title": "Trees",
        "type": "object",
        "required": ["treename", "emission"],
        "properties": {
            "treename": {
                "title": "Tree Name",
                "type": "string"
            },
            "emission": {
                "title": "CO2 Emission",
                "type": "number"
            }
        }
    }
]

export default schemaArray;