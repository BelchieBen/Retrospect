import HelixPalette from "../../../styles/palette";

export const IRewind = ({
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
      <path d="M11.8654 11.3105C11.5321 11.503 11.5321 11.9841 11.8654 12.1765L15.75 14.4193C16.0833 14.6118 16.5 14.3712 16.5 13.9863V9.50075C16.5 9.11585 16.0833 8.87528 15.75 9.06773L11.8654 11.3105Z"></path>
      <path d="M6.6859 11.3105C6.35256 11.503 6.35256 11.9841 6.6859 12.1766L10.5705 14.4193C10.9038 14.6118 11.3205 14.3712 11.3205 13.9863V9.50077C11.3205 9.11587 10.9038 8.87531 10.5705 9.06776L6.6859 11.3105Z"></path>
      <path
        d="M12 22C6.477 22 2 17.523 2 12C2 6.478 6.477 2 12 2C17.522 2 22 6.478 22 12C22 17.523 17.522 22 12 22ZM12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IRewind;
