import HelixPalette from "~/styles/palette";

export const ISave = ({
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
        d="M7 12V17H17V12H7ZM8 13V16H16V13H8Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path
        d="M17.586 3.586C17.211 3.211 16.702 3 16.172 3H5C3.896 3 3 3.896 3 5V19C3 20.104 3.896 21 5 21H19C20.104 21 21 20.104 21 19V7.829C21 7.298 20.789 6.789 20.414 6.414L17.586 3.586ZM5 5V19H19V7.829L16.172 5H14V10H7V5H5ZM12 8H10V5H12V8Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default ISave;
