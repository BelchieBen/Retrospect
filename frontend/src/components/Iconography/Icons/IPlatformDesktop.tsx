import HelixPalette from "../../../styles/palette";

export const IPlatformDesktop = ({
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
        d="M2 4C2 2.89543 2.89543 2 4 2H20C21.1046 2 22 2.89543 22 4V14C22 15.1046 21.1046 16 20 16H4C2.89543 16 2 15.1046 2 14V4ZM4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V13C20 13.5523 19.5523 14 19 14H5C4.44772 14 4 13.5523 4 13V5Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path d="M6.5 20C6.22386 20 6 20.2239 6 20.5V21.5C6 21.7761 6.22386 22 6.5 22H17.5C17.7761 22 18 21.7761 18 21.5V20.5C18 20.2239 17.7761 20 17.5 20H6.5Z"></path>
      <path d="M11 16H13V21H11V16Z"></path>
    </svg>
  );
};

export default IPlatformDesktop;
