import HelixPalette from "../../../styles/palette";

export const IEllipse = ({
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
        d="M12 20C17.5228 20 22 16.4183 22 12C22 7.58172 17.5228 4 12 4C6.47715 4 2 7.58172 2 12C2 16.4183 6.47715 20 12 20ZM12 18C16.4183 18 20 15.3137 20 12C20 8.68629 16.4183 6 12 6C7.58172 6 4 8.68629 4 12C4 15.3137 7.58172 18 12 18Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IEllipse;
