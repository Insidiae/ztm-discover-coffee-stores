export type CoffeeStoreData = {
	fsq_id: string;
	name: string;
	location: {
		address: string;
		region: string;
		neighborhood: string[];
	};
	imgUrl: never;
};

const FOURSQUARE_API_BASE_URL = "https://api.foursquare.com/v3/places/search";

type GetCoffeeStoresOptions = {
	query?: string;
	lat: number;
	lng: number;
	limit?: number;
};
export async function getCoffeeStores({
	query = "coffee",
	lat,
	lng,
	limit = 6,
}: GetCoffeeStoresOptions): Promise<CoffeeStoreData[]> {
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: process.env.FOURSQUARE_API_KEY,
		},
	};

	const res = await fetch(
		`${FOURSQUARE_API_BASE_URL}?query=${query}&ll=${lat}%2C${lng}&limit=${limit}`,
		options
	);

	const data = await res.json();

	return data.results as CoffeeStoreData[];
}
