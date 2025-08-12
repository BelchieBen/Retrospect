import HelixPalette from "~/styles/palette";

export const ICheckbox = ({
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
      <path d="M10.5535 12.585L15.3905 7.04297L16.9995 8.77197L10.5535 16.043L6.99951 12.236L8.61051 10.507L10.5535 12.585Z"></path>
      <path
        d="M19 3H5C3.896 3 3 3.896 3 5V19C3 20.104 3.896 21 5 21H19C20.104 21 21 20.104 21 19V5C21 3.896 20.104 3 19 3ZM5 19H19V5H5V19Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default ICheckbox;
