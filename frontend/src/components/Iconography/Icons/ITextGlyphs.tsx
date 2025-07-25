import HelixPalette from "../../../styles/palette";

export const ITextGlyphs = ({
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
      <path d="M12.8283 18V7.32159H13.9307V18H15V6H10.9886C9.96142 6 9.20651 6.27974 8.72391 6.83921C8.2413 7.39868 8 8.2511 8 9.39648C8 10.5022 8.2247 11.3304 8.6741 11.8811C9.1235 12.4317 9.82638 12.707 10.7827 12.707C11.1546 12.707 11.4779 12.6674 11.7524 12.5881V18H12.8283Z"></path>
    </svg>
  );
};

export default ITextGlyphs;
