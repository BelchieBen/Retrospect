import HelixPalette from "~/styles/palette";

export const IHexagon = ({
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
      <path d="M11.7499 1.14438C11.9046 1.05506 12.0952 1.05506 12.2499 1.14438L21.2762 6.3557C21.4309 6.44502 21.5262 6.61009 21.5262 6.78872V17.2114C21.5262 17.39 21.4309 17.5551 21.2762 17.6444L12.2499 22.8557C12.0952 22.945 11.9046 22.945 11.7499 22.8557L2.72363 17.6444C2.56893 17.5551 2.47363 17.39 2.47363 17.2114V6.78872C2.47363 6.61009 2.56893 6.44502 2.72363 6.3557L11.7499 1.14438Z"></path>
    </svg>
  );
};

export default IHexagon;
