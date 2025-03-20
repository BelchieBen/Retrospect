import { env } from "~/env";
import { GiphyFetch } from "@giphy/js-fetch-api";

const giphy = new GiphyFetch(env.NEXT_PUBLIC_GIPHY_API_KEY);
export default giphy;
