import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import type {
	GetStaticProps,
	InferGetStaticPropsType,
	GetStaticPaths,
} from "next";

import coffeeStoresData from "../../data/coffee-stores.json";

export const getStaticPaths: GetStaticPaths = () => {
	const paths = coffeeStoresData.map((storeData) => {
		return {
			params: {
				id: storeData.id.toString(),
			},
		};
	});

	return {
		paths,
		fallback: true,
	};
};

type CoffeeStoreData = typeof coffeeStoresData[number];

export const getStaticProps: GetStaticProps<{
	coffeeStore: CoffeeStoreData;
}> = (context) => {
	return {
		props: {
			coffeeStore: coffeeStoresData.find(
				(storeData) => storeData.id.toString() === context.params?.id
			) as CoffeeStoreData,
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
						<h1 className="text-white-100 text-4xl font-bold text-ellipsis whitespace-normal overflow-hidden">
							{props.coffeeStore.name}
						</h1>
					</div>
					<Image
						src={props.coffeeStore.imgUrl}
						width={600}
						height={360}
						alt={props.coffeeStore.name}
						className="w-[600px] h-[360px] max-w-full border-none align-middle object-cover rounded-xl shadow-2xl"
					/>
				</div>

				<div className="flex flex-col self-center mt-16 ml-2 p-4 rounded-2xl text-purple-darker bg-white bg-opacity-40 backdrop-blur-[10px] border border-white border-opacity-20 transition-colors hover:bg-opacity-70 hover:border-opacity-100 lg:w-3/4">
					<div className="flex mb-4">
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
					<div className="flex mb-4">
						<Image
							src="/static/icons/nearMe.svg"
							alt=""
							width={24}
							height={24}
						/>
						<p className="m-0 pl-2 text-2xl font-bold">
							{props.coffeeStore.neighbourhood}
						</p>
					</div>
					<div className="flex mb-4">
						<Image src="/static/icons/star.svg" alt="" width={24} height={24} />
						<p className="m-0 pl-2 text-2xl font-bold">1</p>
					</div>

					<button
						className="w-fit my-4 p-2 bg-purple-dark text-base leading-[normal] text-white font-semibold outline-none border-none cursor-pointer hover:bg-purple focus:bg-purple focus:outline-dotted focus:outline-4 focus:outline-current"
						onClick={handleUpvote}
					>
						Up vote!
					</button>
				</div>
			</div>
		</div>
	);
}
