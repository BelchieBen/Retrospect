import HelixPalette from "~/styles/palette";

export const IProducts = ({
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
      <path d="M6 7H4C3.448 7 3 6.552 3 6V4C3 3.448 3.448 3 4 3H6C6.552 3 7 3.448 7 4V6C7 6.552 6.552 7 6 7Z"></path>
      <path d="M13 7H11C10.448 7 10 6.552 10 6V4C10 3.448 10.448 3 11 3H13C13.553 3 14 3.448 14 4V6C14 6.552 13.553 7 13 7Z"></path>
      <path d="M18 7H20C20.553 7 21 6.552 21 6V4C21 3.448 20.553 3 20 3H18C17.447 3 17 3.448 17 4V6C17 6.552 17.447 7 18 7Z"></path>
      <path d="M6 14H4C3.448 14 3 13.553 3 13V11C3 10.448 3.448 10 4 10H6C6.552 10 7 10.448 7 11V13C7 13.553 6.552 14 6 14Z"></path>
      <path d="M11 14H13C13.553 14 14 13.553 14 13V11C14 10.448 13.553 10 13 10H11C10.448 10 10 10.448 10 11V13C10 13.553 10.448 14 11 14Z"></path>
      <path d="M20 14H18C17.447 14 17 13.553 17 13V11C17 10.448 17.447 10 18 10H20C20.553 10 21 10.448 21 11V13C21 13.553 20.553 14 20 14Z"></path>
      <path d="M4 21H6C6.552 21 7 20.553 7 20V18C7 17.447 6.552 17 6 17H4C3.448 17 3 17.447 3 18V20C3 20.553 3.448 21 4 21Z"></path>
      <path d="M13 21H11C10.448 21 10 20.553 10 20V18C10 17.447 10.448 17 11 17H13C13.553 17 14 17.447 14 18V20C14 20.553 13.553 21 13 21Z"></path>
      <path d="M18 21H20C20.553 21 21 20.553 21 20V18C21 17.447 20.553 17 20 17H18C17.447 17 17 17.447 17 18V20C17 20.553 17.447 21 18 21Z"></path>
    </svg>
  );
};

export default IProducts;
