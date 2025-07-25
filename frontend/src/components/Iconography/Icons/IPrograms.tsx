import HelixPalette from "../../../styles/palette";

export const IPrograms = ({
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
        d="M4 4V6H20V4H4ZM3 2C2.44772 2 2 2.44772 2 3V7C2 7.55228 2.44772 8 3 8H21C21.5523 8 22 7.55228 22 7V3C22 2.44772 21.5523 2 21 2H3Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path d="M13 4H15V6H13V4Z"></path>
      <path
        d="M4 11V13H20V11H4ZM3 9C2.44772 9 2 9.44772 2 10V14C2 14.5523 2.44772 15 3 15H21C21.5523 15 22 14.5523 22 14V10C22 9.44772 21.5523 9 21 9H3Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path d="M13 11H15V13H13V11Z"></path>
      <path
        d="M4 18V20H20V18H4ZM3 16C2.44772 16 2 16.4477 2 17V21C2 21.5523 2.44772 22 3 22H21C21.5523 22 22 21.5523 22 21V17C22 16.4477 21.5523 16 21 16H3Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path d="M13 18H15V20H13V18Z"></path>
    </svg>
  );
};

export default IPrograms;
