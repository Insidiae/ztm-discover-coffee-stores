type BannerProps = {
	buttonText: string;
	onButtonClick: () => void;
};

export default function Banner({ buttonText, onButtonClick }: BannerProps) {
	return (
		<div className="mb-4 lg:text-left">
			<h1 className="tracking-tight font-extrabold text-black text-5xl sm:text-5xl md:text-6xl lg:text-7xl">
				<span className="text-slate-50">Coffee</span>
				<span className="block text-purple xl:pl-2 xl:inline">Connoisseur</span>
			</h1>
			<p className="mt-3 text-2xl text-white-100 sm:mt-5 sm:max-w-xl md:mt-5 lg:mx-0">
				Discover your local coffee shops!
			</p>
			<div className="mt-5 sm:flex sm:mt-8 lg:justify-start">
				<button
					className="bg-purple-dark cursor-pointer text-white outline-none border-none py-4 px-10 text-lg hover:bg-purple-dark md:py-4 md:px-10 md:text-lg"
					onClick={onButtonClick}
				>
					{buttonText}
				</button>
			</div>
		</div>
	);
}
