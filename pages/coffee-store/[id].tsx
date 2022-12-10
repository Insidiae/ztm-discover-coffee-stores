import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { getCoffeeStores } from "../../lib/coffee-stores";

import type {
	GetStaticProps,
	InferGetStaticPropsType,
	GetStaticPaths,
} from "next";
import type { CoffeeStoreData } from "../../lib/coffee-stores";

export const getStaticPaths: GetStaticPaths = async () => {
	const coffeeStores = await getCoffeeStores({
		lat: 14.581850805315819,
		lng: 120.97703241286848,
	});

	const paths = coffeeStores.map((storeData) => {
		return {
			params: {
				id: storeData.id,
			},
		};
	});

	return {
		paths,
		fallback: "blocking",
	};
};

export const getStaticProps: GetStaticProps<{
	coffeeStore: CoffeeStoreData;
}> = async (context) => {
	const coffeeStores = await getCoffeeStores({
		lat: 14.581850805315819,
		lng: 120.97703241286848,
	});

	const coffeeStore = coffeeStores.find(
		(storeData) => storeData.id === context.params?.id
	);

	if (!coffeeStore) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			coffeeStore,
		},
	};
};

const styles: any = {};

export default function CoffeeShop(
	props: InferGetStaticPropsType<typeof getStaticProps>
) {
	const router = useRouter();

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	function handleUpvote() {
		console.log("Upvote");
	}

	return (
		<div className="h-full sm:px-4 md:px-10 lg:h-screen lg:px-10">
			<Head>
				<title>{props.coffeeStore.name}</title>
			</Head>

			<div className="grid py-7 pl-7 pr-3 sm:w-full lg:grid-cols-2">
				<div className="place-content-center">
					<div className="mt-24 mb-2 text-lg font-bold">
						<Link href="/">← Back to home</Link>
					</div>
					<div className="my-4">
						<h1 className="overflow-hidden text-ellipsis whitespace-normal text-4xl font-bold text-white-100">
							{props.coffeeStore.name}
						</h1>
					</div>
					<Image
						src={
							props.coffeeStore.imgUrl ??
							"https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
						}
						width={600}
						height={360}
						alt={props.coffeeStore.name}
						className="h-[360px] w-[600px] max-w-full rounded-xl border-none object-cover align-middle shadow-2xl"
					/>
				</div>

				<div className="mt-16 ml-2 flex flex-col self-center rounded-2xl border border-white border-opacity-20 bg-white bg-opacity-40 p-4 text-purple-darker backdrop-blur-[10px] transition-colors hover:border-opacity-100 hover:bg-opacity-70 lg:w-3/4">
					{props.coffeeStore.address ? (
						<div className="mb-4 flex">
							<Image
								src="/static/icons/places.svg"
								alt=""
								width={24}
								height={24}
							/>
							<p className="m-0 pl-2 text-2xl font-bold">
								{props.coffeeStore.address}
							</p>
						</div>
					) : null}
					{props.coffeeStore.neighborhood ? (
						<div className="mb-4 flex">
							<Image
								src="/static/icons/nearMe.svg"
								alt=""
								width={24}
								height={24}
							/>
							<p className="m-0 pl-2 text-2xl font-bold">
								{props.coffeeStore.neighborhood}
							</p>
						</div>
					) : null}
					<div className="mb-4 flex">
						<Image src="/static/icons/star.svg" alt="" width={24} height={24} />
						<p className="m-0 pl-2 text-2xl font-bold">1</p>
					</div>

					<button
						className="my-4 w-fit cursor-pointer border-none bg-purple-dark p-2 text-base font-semibold leading-[normal] text-white outline-none hover:bg-purple focus:bg-purple focus:outline-dotted focus:outline-4 focus:outline-current"
						onClick={handleUpvote}
					>
						Up vote!
					</button>
				</div>
			</div>
		</div>
	);
}
