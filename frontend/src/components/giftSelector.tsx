"use client";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Grid } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";
const GIPHY_API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY;

let gf: GiphyFetch;
if (GIPHY_API_KEY) {
  gf = new GiphyFetch(GIPHY_API_KEY);
}

export function GifSelector({
  onSelect,
}: {
  onSelect: (gifUrl: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const fetchGifs = (offset: number) =>
    gf.search(searchTerm, { offset, limit: 10 });

  const handleGifClick = (gifUrl: string) => {
    onSelect(gifUrl);
    setSearchTerm("");
  };

  return (
    <div className="gif-selector space-y-3">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for GIFs"
      />
      <Button onClick={() => fetchGifs(0)}>Search</Button>
      <div
        className="gif-results"
        style={{ maxHeight: "300px", overflowY: "scroll" }}
      >
        <Grid
          width={400}
          columns={3}
          gutter={6}
          fetchGifs={fetchGifs}
          key={searchTerm}
          onGifClick={(gif, e) => {
            e.preventDefault();
            handleGifClick(gif.images.fixed_height.url);
          }}
        />
      </div>
    </div>
  );
}
