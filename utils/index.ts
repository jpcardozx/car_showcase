import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;

  const headers = {
    'x-rapidapi-key': 'b4b608a99emshd16c69c83004790p1ac036jsn9223f11b00d6',
    'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
  };

  const url = new URL("https://cars-by-api-ninjas.p.rapidapi.com/v1/cars");

  if (manufacturer) url.searchParams.append("make", manufacturer);
  if (year) url.searchParams.append("year", String(year));
  if (model) url.searchParams.append("model", model);
  //if (limit) url.searchParams.append("limit", String(limit));
  if (fuel) url.searchParams.append("fuel_type", fuel);

  console.log("🚗 Fetching cars from:", url.toString());

  const response = await fetch(url.toString(), { headers });

  if (!response.ok) {
    const errorDetails = await response.text(); // texto para debugging
    console.error("❌ API ERROR:", response.status, errorDetails);
    throw new Error(`Failed to fetch cars: ${response.statusText}`);
  }

  const result = await response.json();
  return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL('https://cdn.imagin.studio/getimage');

  const { make, year, model } = car;

  url.searchParams.append('customer', 'img');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(' ')[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
}

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value)

  const newPathName =`${window.location.pathname}?${
    searchParams.toString()
  }`

  return newPathName;
}

export const getSearchParam = (param: string | string[] | undefined, defaultValue: string = ''): string => {
  if (Array.isArray(param)) return param[0];
  return param || defaultValue;
};

export const getNumberParam = (param: string | string[] | undefined, defaultValue: number): number => {
  const value = getSearchParam(param);
  return value ? parseInt(value) : defaultValue;
};

//key === 'img'
