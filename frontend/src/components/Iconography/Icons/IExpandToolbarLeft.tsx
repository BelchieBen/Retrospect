import HelixPalette from "../../../styles/palette";

export const IExpandToolbarLeft = ({
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
      <path d="M14.3438 8.16797C14.0168 7.92404 13.5445 7.94602 13.2441 8.23438L13.1748 8.30957C12.9207 8.62334 12.9439 9.07684 13.2441 9.36523L15.9873 12L13.2441 14.6348L13.1748 14.71C12.9207 15.0238 12.9438 15.4773 13.2441 15.7656C13.5696 16.078 14.0974 16.078 14.4229 15.7656L17.7559 12.5654L17.8252 12.4902C18.0793 12.1764 18.0562 11.723 17.7559 11.4346L14.4229 8.23438L14.3438 8.16797Z"></path>
      <path
        d="M4 2C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V4C22 2.89543 21.1046 2 20 2H4ZM19 4C19.5523 4 20 4.44772 20 5V19C20 19.5523 19.5523 20 19 20H10V4H19ZM8 20H5C4.44772 20 4 19.5523 4 19V5C4 4.44772 4.44772 4 5 4H8V20Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IExpandToolbarLeft;
