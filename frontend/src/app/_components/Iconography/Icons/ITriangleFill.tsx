import HelixPalette from "~/styles/palette";

export const ITriangleFill = ({
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
      <path d="M9.85243 4.24138C10.8069 2.58621 13.1931 2.58621 14.1476 4.24138L21.6641 17.2759C22.6185 18.931 21.4255 21 19.5165 21H4.4835C2.57455 21 1.38145 18.931 2.33593 17.2759L9.85243 4.24138Z"></path>
    </svg>
  );
};

export default ITriangleFill;
