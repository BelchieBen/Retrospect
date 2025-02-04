import React from "react";

export const IIdeagenColor = ({ size }: { size?: number }) => (
  <svg
    width={size ?? "24"}
    height={size ?? "24"}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.3335 4.33333V7.63129L9.5795 7.63072L9.58114 4.48739L14.6668 7.66667L20.0002 4.33333L14.6668 1L9.3335 4.33333Z"
      fill="#E30072"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.667 7.66683V13.6668L20.0003 10.3335V4.3335L14.667 7.66683Z"
      fill="#2B3841"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 13.6668V16.9648L4.246 16.9642L4.24764 13.8209L9.33333 17.0002L14.6667 13.6668L9.33333 10.3335L4 13.6668Z"
      fill="#15CAD2"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.3335 17.0001V23.0001L14.6668 19.6667V13.6667L9.3335 17.0001Z"
      fill="#02838F"
    />
  </svg>
);
