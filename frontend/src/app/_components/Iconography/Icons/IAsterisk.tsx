import HelixPalette from "~/styles/palette";

export const IAsterisk = ({
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
        d="M11.002 6V10.444L6.616 9.071L6 10.9L10.386 12.273L7.675 15.87L9.289 17L12 13.404L14.711 17L16.324 15.87L13.614 12.273L17.999 10.9L17.384 9.071L12.997 10.444V6H11.002Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IAsterisk;
