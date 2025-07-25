import HelixPalette from "../../../styles/palette";

export const ITextSelect = ({
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
      <path d="M9 18H5V6H9V18Z"></path>
      <path d="M15 7.00031L16 6.00031H19.001V8.00031H16V16.0003H19.001V18.0003H16L15 17.0003L14 18.0003H11.001V16.0003H14V8.00031H11.001V6.00031H14L15 7.00031Z"></path>
    </svg>
  );
};

export default ITextSelect;
