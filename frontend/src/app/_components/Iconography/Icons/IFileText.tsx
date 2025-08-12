import HelixPalette from "~/styles/palette";

export const IFileText = ({
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
      <path d="M14 17V15H8V17H14Z"></path>
      <path d="M16 13V11H8V13H16Z"></path>
      <path
        d="M16.586 2.586C16.211 2.211 15.702 2 15.172 2H6C4.896 2 4 2.896 4 4V20C4 21.104 4.896 22 6 22H18C19.104 22 20 21.104 20 20V6.829C20 6.298 19.789 5.789 19.414 5.414L16.586 2.586ZM18 20H6V4H14V8H18V20Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IFileText;
