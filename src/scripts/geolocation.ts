import * as request from "superagent";

//TODO remove hardcoded key
const appId = "YKXp7WGeg0GYfDvclA2i"; //process.env.APP_ID
const appCode = "c7bC2pg6dcKRYGbequ9fSA"; //process.env.APP_CODE

interface ISearchGeolocationParams {
  street: string;
  postalCode: string;
  city: string;
  country: string;
}

export default function getGeolocation({ street, postalCode, city, country }) {
  request
    .get(
      `https://geocoder.api.here.com/6.2/geocode.json?app_id=${appId}&app_code=${appCode}&searchtext=${street}+${postalCode}+${city}+${country}`
    )
    .then(res => console.log(res.body.Response.View[0].Result[0].Location))
    .catch(console.error);
}
