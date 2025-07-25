import HelixPalette from "../../../styles/palette";

export const IWorld = ({
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
        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM13 19.9381C12.6724 19.979 12.3387 20 12 20C7.58172 20 4 16.4183 4 12L7 15.5L8.5 12H6.5V10L8 9H9L10.5 6.5H12.5L14 4.5V4.25203C16.1785 4.81275 17.9979 6.26805 19.0433 8.203L15 10V13L16 15L14.5 16.5L13 17V19.9381Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IWorld;
