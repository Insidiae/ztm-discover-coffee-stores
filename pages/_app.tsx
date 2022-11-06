import type { AppProps } from "next/app";
import { IBM_Plex_Sans } from "@next/font/google";

import "../styles/globals.css";

const ibm = IBM_Plex_Sans({
	weight: ["400", "600", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div className={ibm.className}>
			<Component {...pageProps} />
		</div>
	);
}
