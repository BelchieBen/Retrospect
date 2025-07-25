import HelixPalette from "../../../styles/palette";

export const IApproved = ({
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
      <path d="M22.4902 7.58594L12.5908 17.4854L10 14.8955L11.4141 13.4805L12.5898 14.6562L21.0762 6.17188L22.4902 7.58594Z"></path>
      <path d="M15.1416 7.41406L5.24219 17.3135L1 13.0713L2.41406 11.6572L5.24219 14.4854L13.7275 6L15.1416 7.41406Z"></path>
    </svg>
  );
};

export default IApproved;
