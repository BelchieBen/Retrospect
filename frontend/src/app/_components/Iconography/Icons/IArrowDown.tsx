import HelixPalette from "~/styles/palette";

export const IArrowDown = ({
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
      <path d="M8.16777 16.4904C7.92381 16.1766 7.94589 15.7231 8.23417 15.4347L8.30937 15.3683C8.62315 15.1245 9.0767 15.1465 9.36503 15.4347L10.9998 17.0685L10.9998 5.00012L11.0047 4.89758C11.056 4.39346 11.4821 4.00013 11.9998 4.00012C12.5521 4.00012 12.9998 4.44784 12.9998 5.00012V17.0685L14.6346 15.4347L14.7098 15.3683C15.0236 15.1244 15.4771 15.1464 15.7654 15.4347C16.0777 15.747 16.0775 16.2531 15.7654 16.5656L12.5652 19.7657L12.49 19.8322C12.1762 20.0761 11.7228 20.054 11.4344 19.7657L8.23417 16.5656L8.16777 16.4904Z"></path>
    </svg>
  );
};

export default IArrowDown;
