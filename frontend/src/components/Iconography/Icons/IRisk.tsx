import HelixPalette from "../../../styles/palette";

export const IRisk = ({
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
      <path d="M12 13.65H14.5L12 18.9V15.15H9.5L12 9.9V13.65Z"></path>
      <path
        d="M12.8944 3.78887C12.5259 3.05182 11.4741 3.05182 11.1055 3.78887L2.72356 20.5528C2.39111 21.2177 2.87461 22 3.61799 22H20.3819C21.1253 22 21.6088 21.2177 21.2763 20.5528L12.8944 3.78887ZM11.9998 6.472L18.7638 20H5.23579L11.9998 6.472Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IRisk;
