const url = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3080';

const headers = {
  Accept: "application/json"
};

export const getKey = () =>
  fetch(`${url}/auth/key`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("id_token")}`
    }
  })
    .then(res => res.json())
    .then(data => data.apikey);

export const flightData = (key, origin, destination, type, model, passengers) =>
  fetch(`${url}/v1/flight`, {
    method: "POST",
    headers: {
      ...headers,
      "access-key": key,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      origin,
      destination,
      type,
      model,
      passengers: parseInt(passengers)
    })
  }).then(res => res.json());

export const trainData = (key, origin, destination, type, passengers) =>
  fetch(`${url}/v1/trains`, {
    method: "POST",
    headers: {
      ...headers,
      "access-key": key,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      origin,
      destination,
      type,
      passengers: parseInt(passengers)
    })
  }).then(res => {
    return res.json();
  });

export const vehicleData = (
  key,
  origin,
  destination,
  type,
  mileage
) =>
  fetch(`${url}/v1/vehicle`, {
    method: "POST",
    headers: {
      ...headers,
      "access-key": key,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      origin,
      destination,
      type,
      mileage: parseFloat(mileage)
    })
  }).then(res => res.json());

export const poultryData = (key, type, region, quantity) =>
  fetch(`${url}/v1/poultry`, {
    method: "POST",
    headers: {
      ...headers,
      "access-key": key,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      type,
      region,
      quantity: parseInt(quantity)
    })
  }).then(res => {
    return res.json();
  });

export const appliancesData = (
  key,
  appliance,
  quantity,
  running_time
) =>
  fetch(`${url}/v1/appliances`, {
    method: "POST",
    headers: {
      ...headers,
      "access-key": key,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      appliance,
      running_time: parseFloat(running_time),
      quantity: parseInt(quantity)
    })
  }).then(res => {
    return res.json();
  });

export const submitData = (quantity, date) =>
  fetch(`${url}/user/daily-emission`, {
    method: "POST",
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("id_token")}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      quantity: parseFloat(quantity),
      date
    })
  }).then(res => res.json());

export const getData = () =>
  fetch(`${url}/user/daily-emission`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("id_token")}`
    }
  }).then(res => res.json());
