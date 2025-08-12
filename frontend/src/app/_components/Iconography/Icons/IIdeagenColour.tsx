import HelixPalette from "~/styles/palette";

export const IIdeagenColour = ({
  color = HelixPalette.neutral90,
  dataId,
  size = 24,
  style,
}: {
  color?: string;
  dataId?: string;
  size?: number;
  style?: React.CSSProperties;
}) => {
  return (
    <svg
      data-id={dataId}
      fill={color}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={style}
    >
      <path
        d="M9.3335 4.33333V7.63129L9.5795 7.63072L9.58114 4.48739L14.6668 7.66667L20.0002 4.33333L14.6668 1L9.3335 4.33333Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path
        d="M14.667 7.66683V13.6668L20.0003 10.3335V4.3335L14.667 7.66683Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path
        d="M4 13.6668V16.9648L4.246 16.9642L4.24764 13.8209L9.33333 17.0002L14.6667 13.6668L9.33333 10.3335L4 13.6668Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path
        d="M9.3335 17.0001V23.0001L14.6668 19.6667V13.6667L9.3335 17.0001Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IIdeagenColour;
