import HelixPalette from "~/styles/palette";

export const ILogout = ({
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
      <path d="M5 4H17C17.5523 4 18 4.44772 18 5C18 5.55228 17.5523 6 17 6H6C5.44775 6 5 6.44775 5 7V17C5 17.5522 5.44775 18 6 18H17C17.5523 18 18 18.4477 18 19C18 19.5523 17.5523 20 17 20H5C3.89551 20 3 19.1046 3 18V6C3 4.89539 3.89551 4 5 4Z"></path>
      <path d="M16.3678 9.2903C16.1238 8.97647 16.1459 8.52268 16.4343 8.2343C16.7467 7.92188 17.2533 7.92188 17.5657 8.2343L20.7657 11.4343L20.8322 11.5097C21.0763 11.8235 21.0541 12.2773 20.7657 12.5657L17.5657 15.7657L17.4903 15.8322C17.1765 16.0762 16.7227 16.0541 16.4343 15.7657L16.3678 15.6903C16.1238 15.3765 16.1459 14.9227 16.4343 14.6343L18.0682 13L10.0061 13L10 13C9.44772 13 9 12.5523 9 12C9 11.4477 9.44772 11 10 11L18.0683 11L16.4343 9.36567L16.3678 9.2903Z"></path>
    </svg>
  );
};

export default ILogout;
