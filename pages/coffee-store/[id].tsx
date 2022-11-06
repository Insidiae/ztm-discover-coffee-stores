import { useRouter } from "next/router";
import Link from "next/link";

export default function CoffeeShop() {
	const router = useRouter();

	const { id } = router.query;

	return (
		<div>
			<Link href="/">Back to home</Link>
			<h1>Coffee Shop #{id}</h1>
		</div>
	);
}
