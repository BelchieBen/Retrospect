import HelixPalette from "~/styles/palette";

export const IDocumentAlert = ({
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
      <path d="M12 15C11.448 15 11 14.552 11 14V9C11 8.448 11.448 8 12 8C12.552 8 13 8.448 13 9V14C13 14.552 12.552 15 12 15Z"></path>
      <path d="M12 18C11.448 18 11 17.552 11 17C11 16.448 11.448 16 12 16C12.552 16 13 16.448 13 17C13 17.552 12.552 18 12 18Z"></path>
      <path
        d="M16.586 2.586C16.211 2.211 15.702 2 15.172 2H6C4.896 2 4 2.896 4 4V20C4 21.104 4.896 22 6 22H18C19.104 22 20 21.104 20 20V6.829C20 6.298 19.789 5.789 19.414 5.414L16.586 2.586ZM18 8V20H6V4H14V8H18Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IDocumentAlert;
