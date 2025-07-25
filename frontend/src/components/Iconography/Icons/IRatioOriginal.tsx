import HelixPalette from "../../../styles/palette";

export const IRatioOriginal = ({
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
      <path d="M13.3394 9.21634C13.4194 9.10862 13.5806 9.10862 13.6606 9.21634L17.1602 13.9308C17.2581 14.0628 17.1639 14.25 16.9996 14.25H6.80495C6.62861 14.25 6.53857 14.0384 6.66083 13.9113L8.35589 12.1498C8.43457 12.068 8.56544 12.068 8.64412 12.1498L10.0654 13.6269L13.3394 9.21634Z"></path>
      <path
        d="M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5ZM5 5H19V19H5V5Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IRatioOriginal;
