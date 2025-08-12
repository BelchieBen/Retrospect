import HelixPalette from "~/styles/palette";

export const IDiamond = ({
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
      <path d="M9.97768 2.82872C11.0404 1.72376 12.9596 1.72376 14.0223 2.82872L21.3595 10.4573C22.2135 11.3452 22.2135 12.6548 21.3595 13.5427L14.0223 21.1713C12.9596 22.2762 11.0404 22.2762 9.97768 21.1713L2.64046 13.5427C1.78651 12.6548 1.78651 11.3452 2.64046 10.4573L9.97768 2.82872Z"></path>
    </svg>
  );
};

export default IDiamond;
