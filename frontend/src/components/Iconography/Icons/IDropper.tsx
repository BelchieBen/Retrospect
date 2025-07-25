import HelixPalette from "../../../styles/palette";

export const IDropper = ({
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
      <path d="M15.2915 3.9795C16.5975 2.6735 18.7145 2.6735 20.0205 3.9795C21.3265 5.2855 21.3265 7.4025 20.0205 8.7085L17.6565 11.0725L18.4445 11.8605L16.8685 13.4375L10.5625 7.1315L12.1395 5.5555L12.9275 6.3435L15.2915 3.9795Z"></path>
      <path d="M5.74551 18.2545L7.84651 17.7295L13.7155 11.8605L15.2915 13.4375L8.98651 19.7425L3.95551 21.0005L2.99951 20.0445L4.25751 15.0135L10.5625 8.7085L12.1385 10.2845L6.27051 16.1535L5.74551 18.2545Z"></path>
    </svg>
  );
};

export default IDropper;
