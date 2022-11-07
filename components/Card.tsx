import Link from "next/link";
import Image from "next/image";

type CardProps = {
	name: string;
	href: string;
	imgUrl: string;
	imgAlt: string;
};

export default function Card(props: CardProps) {
	return (
		<Link
			href={props.href}
			className="m-auto shadow-xl border-white-100 rounded-xl"
		>
			<div className="pt-1 px-4 pb-5 rounded-xl bg-white bg-opacity-40 backdrop-blur-[10px] border border-white border-opacity-20 transition-colors hover:bg-opacity-70 hover:border-opacity-100">
				<div className="my-3">
					<h2 className="w-64 text-xl font-extrabold overflow-hidden whitespace-nowrap text-ellipsis md:w-64 lg:w-64">
						{props.name}
					</h2>
				</div>
				<div className="text-white-100">
					<Image
						className="rounded-xl w-[260px] h-[160px] object-cover"
						src={props.imgUrl}
						alt={props.imgAlt}
						width={260}
						height={160}
					/>
				</div>
			</div>
		</Link>
	);
}
