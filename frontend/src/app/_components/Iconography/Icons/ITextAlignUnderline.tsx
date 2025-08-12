import HelixPalette from "~/styles/palette";

export const ITextAlignUnderline = ({
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
      <path d="M16 12.383V6H13.94V12.026C13.94 12.791 13.787 13.352 13.483 13.709C13.179 14.067 12.688 14.246 12.013 14.246C11.315 14.246 10.816 14.068 10.513 13.713C10.211 13.357 10.06 12.8 10.06 12.04V6H8V12.356C8 13.485 8.347 14.375 9.041 15.025C9.733 15.675 10.707 16 11.96 16C12.791 16 13.51 15.854 14.12 15.562C14.729 15.27 15.194 14.849 15.517 14.3C15.839 13.751 16 13.112 16 12.383Z"></path>
      <path d="M17 18H7V17H17V18Z"></path>
    </svg>
  );
};

export default ITextAlignUnderline;
