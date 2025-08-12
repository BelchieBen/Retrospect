import HelixPalette from "~/styles/palette";

export const IBottom = ({
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
      <path d="M16 14.9998C16.5523 14.9998 17 15.4475 17 15.9998C17 16.5521 16.5523 16.9998 16 16.9998H8C7.44772 16.9998 7 16.5521 7 15.9998C7 15.4475 7.44772 14.9998 8 14.9998H16Z"></path>
      <path d="M15.3867 7.20978C15.779 6.90476 16.3465 6.93231 16.707 7.29279C17.0976 7.68332 17.0976 8.31633 16.707 8.70685L12.707 12.7069L12.6133 12.7899C12.221 13.0949 11.6535 13.0673 11.293 12.7069L7.29297 8.70685L7.20996 8.6131C6.90494 8.22081 6.93248 7.65328 7.29297 7.29279L7.38672 7.20978C7.77901 6.90476 8.34655 6.93231 8.70703 7.29279L12 10.5848L15.293 7.29279L15.3867 7.20978Z"></path>
    </svg>
  );
};

export default IBottom;
