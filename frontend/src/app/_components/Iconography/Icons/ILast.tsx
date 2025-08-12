import HelixPalette from "~/styles/palette";

export const ILast = ({
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
      <path d="M7.29279 7.29297C7.68332 6.90244 8.31633 6.90244 8.70685 7.29297L12.7069 11.293L12.7899 11.3867C13.0949 11.779 13.0673 12.3465 12.7069 12.707L8.70685 16.707L8.6131 16.79C8.22081 17.0951 7.65328 17.0675 7.29279 16.707L7.20978 16.6133C6.90476 16.221 6.93231 15.6535 7.29279 15.293L10.5848 12L7.29279 8.70703L7.20978 8.61328C6.90476 8.22099 6.93231 7.65345 7.29279 7.29297Z"></path>
      <path d="M15.9998 7C16.5521 7 16.9998 7.44772 16.9998 8V16C16.9998 16.5523 16.5521 17 15.9998 17C15.4475 17 14.9998 16.5523 14.9998 16V8C14.9998 7.44772 15.4475 7 15.9998 7Z"></path>
    </svg>
  );
};

export default ILast;
