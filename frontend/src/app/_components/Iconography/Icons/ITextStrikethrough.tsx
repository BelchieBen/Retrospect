import HelixPalette from "~/styles/palette";

export const ITextStrikethrough = ({
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
      <path d="M15.8027 13C16.0089 13.4001 16.126 13.875 16.126 14.4502C16.1259 16.6641 14.3435 18.0684 11.7695 18.0684C9.37578 18.0682 7.66596 16.8616 7 14.9717L8.44043 14.1436C8.8904 15.5295 9.96987 16.4296 11.8057 16.4297C13.5875 16.4297 14.4696 15.6202 14.4697 14.4863C14.4697 13.796 14.1523 13.3524 13.5762 13H15.8027Z"></path>
      <path d="M20 12.5H4V11.5H20V12.5Z"></path>
      <path d="M11.5 5C13.5699 5 15.0636 6.17002 15.7656 7.75391L14.3623 8.56445C13.9123 7.48445 13.03 6.62012 11.5 6.62012C10.15 6.62012 9.21387 7.34019 9.21387 8.49219C9.21396 9.66205 10.0964 10.0944 11.8604 10.6523C12.2113 10.7674 12.5589 10.881 12.8955 11H8.75293C8.02111 10.4696 7.54016 9.72846 7.54004 8.56445C7.54004 6.29645 9.394 5 11.5 5Z"></path>
    </svg>
  );
};

export default ITextStrikethrough;
