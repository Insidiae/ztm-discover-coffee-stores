import { createApi } from "unsplash-js";

const unsplashApi = createApi({
	accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

export type CoffeeStoreData = {
	id: string;
	address: string | null;
	name: string;
	neighborhood: string | null;
	imgUrl: string | null;
};

type FoursquareData = {
	fsq_id: string;
	name: string;
	location: {
		address?: string;
		neighborhood?: string[];
	};
};

type FoursquareApiResponse = {
	results: FoursquareData[];
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

	const data = (await res.json()) as FoursquareApiResponse;

	const photos = await getCoffeeStorePhotos();

	return data.results.map((result, idx) => {
		return {
			id: result.fsq_id,
			address: result.location.address ?? null,
			name: result.name,
			neighborhood: result.location.neighborhood?.[0] ?? null,
			imgUrl: photos?.[idx] ?? null,
		};
	});
}

export async function getCoffeeStorePhotos() {
	const res = await unsplashApi.search.getPhotos({
		query: "coffee shop",
		perPage: 30,
	});

	return res.response?.results.map((result) => result.urls["small"]);
}
