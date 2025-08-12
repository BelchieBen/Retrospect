import HelixPalette from "~/styles/palette";

export const IWarning = ({
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
      <path d="M12 11C11.448 11 11 11.448 11 12V15C11 15.553 11.448 16 12 16C12.552 16 13 15.553 13 15V12C13 11.448 12.552 11 12 11Z"></path>
      <path d="M13 18C13 18.553 12.552 19 12 19C11.448 19 11 18.553 11 18C11 17.447 11.448 17 12 17C12.552 17 13 17.447 13 18Z"></path>
      <path
        d="M12.8944 3.78887C12.5259 3.05182 11.4741 3.05182 11.1055 3.78887L2.72356 20.5528C2.39111 21.2177 2.87461 22 3.61799 22H20.3819C21.1253 22 21.6088 21.2177 21.2763 20.5528L12.8944 3.78887ZM11.9998 6.472L18.7638 20H5.23579L11.9998 6.472Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IWarning;
