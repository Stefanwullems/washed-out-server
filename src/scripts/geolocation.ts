import * as request from "superagent";
import Location from "../entity/Location";

//TODO remove hardcoded key
const appId = "YKXp7WGeg0GYfDvclA2i"; //process.env.APP_ID
const appCode = "c7bC2pg6dcKRYGbequ9fSA"; //process.env.APP_CODE

export interface ISearchGeolocationParams {
  street: string;
  houseNumber: string;
  addition?: string;
  postalCode: string;
  city: string;
  country: string;
}

export default async function getGeolocation({
  street,
  postalCode,
  city,
  country,
  houseNumber,
  addition
}: ISearchGeolocationParams): Promise<Partial<Location>> {
  const address = addition
    ? street + " " + houseNumber + addition
    : street + " " + houseNumber;
  const res = await request
    .get(
      `https://geocoder.api.here.com/6.2/geocode.json?app_id=${appId}&app_code=${appCode}&searchtext=${address}+${postalCode}+${city}+${country}`
    )
    .then(res => res.body.Response.View[0].Result[0].Location)
    .catch(console.error);
  return {
    locationId: res.LocationId as string,
    streetName: res.Address.Street as string,
    houseNumber: res.Address.HouseNumber as string,
    postalCode: res.Address.PostalCode as string,
    city: res.Address.City as string,
    country: res.Address.Country as string,
    latitude:
      (res.NavigationPosition[0].Latitude as number) ||
      (res.DisplayPosition.Latitude as number),
    longitude:
      (res.NavigationPosition[0].Longitude as number) ||
      (res.DisplayPosition.Longitude as number)
  };
}
