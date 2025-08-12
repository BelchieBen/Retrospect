import HelixPalette from "~/styles/palette";

export const IPlayNext = ({
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
      <path d="M12.1346 11.3105C12.4679 11.503 12.4679 11.9841 12.1346 12.1765L8.25 14.4193C7.91667 14.6118 7.5 14.3712 7.5 13.9863V9.50075C7.5 9.11585 7.91667 8.87528 8.25 9.06773L12.1346 11.3105Z"></path>
      <path d="M17.3141 11.3105C17.6474 11.503 17.6474 11.9841 17.3141 12.1766L13.4295 14.4193C13.0962 14.6118 12.6795 14.3712 12.6795 13.9863V9.50077C12.6795 9.11587 13.0962 8.87531 13.4295 9.06776L17.3141 11.3105Z"></path>
      <path
        d="M12 22C17.523 22 22 17.523 22 12C22 6.478 17.523 2 12 2C6.478 2 2 6.478 2 12C2 17.523 6.478 22 12 22ZM12 4C7.589 4 4 7.589 4 12C4 16.411 7.589 20 12 20C16.411 20 20 16.411 20 12C20 7.589 16.411 4 12 4Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IPlayNext;
