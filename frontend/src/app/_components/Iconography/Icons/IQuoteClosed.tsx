import HelixPalette from "~/styles/palette";

export const IQuoteClosed = ({
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
      <path d="M6.00049 17.366C7.65449 15.985 8.69349 14.098 8.69349 12H5.00049V6H11.0005V12C11.0005 14.769 9.57549 17.255 7.30749 19L6.00049 17.366Z"></path>
      <path d="M14.0005 17.366C15.6545 15.985 16.6935 14.098 16.6935 12H13.0005V6H19.0005V12C19.0005 14.769 17.5755 17.255 15.3075 19L14.0005 17.366Z"></path>
    </svg>
  );
};

export default IQuoteClosed;
