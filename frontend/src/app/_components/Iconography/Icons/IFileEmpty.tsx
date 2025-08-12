import HelixPalette from "~/styles/palette";

export const IFileEmpty = ({
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
        d="M15.172 2C15.702 2 16.211 2.211 16.586 2.586L19.414 5.414C19.789 5.789 20 6.298 20 6.829V20C20 21.104 19.104 22 18 22H6C4.896 22 4 21.104 4 20V4C4 2.896 4.896 2 6 2H15.172ZM6 20H18V8H14V4H6V20Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IFileEmpty;
