import HelixPalette from "~/styles/palette";

export const IExpandToolbarRight = ({
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
      <path d="M9.65625 8.16797C9.98315 7.92404 10.4555 7.94602 10.7559 8.23438L10.8252 8.30957C11.0793 8.62334 11.0561 9.07684 10.7559 9.36523L8.0127 12L10.7559 14.6348L10.8252 14.71C11.0793 15.0238 11.0562 15.4773 10.7559 15.7656C10.4304 16.078 9.90258 16.078 9.57715 15.7656L6.24414 12.5654L6.1748 12.4902C5.92067 12.1764 5.94384 11.723 6.24414 11.4346L9.57715 8.23438L9.65625 8.16797Z"></path>
      <path
        d="M20 2C21.1046 2 22 2.89543 22 4V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V4C2 2.89543 2.89543 2 4 2H20ZM5 4C4.44772 4 4 4.44772 4 5V19C4 19.5523 4.44772 20 5 20H14V4H5ZM16 20H19C19.5523 20 20 19.5523 20 19V5C20 4.44772 19.5523 4 19 4H16V20Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IExpandToolbarRight;
