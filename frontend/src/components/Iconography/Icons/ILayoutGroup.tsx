import HelixPalette from "../../../styles/palette";

export const ILayoutGroup = ({
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
      <path
        d="M9 3H5C3.896 3 3 3.896 3 5V9C3 10.104 3.896 11 5 11H9C10.104 11 11 10.104 11 9V5C11 3.896 10.104 3 9 3ZM5 9H9V5H5V9Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path
        d="M19 3H15C13.896 3 13 3.896 13 5V9C13 10.104 13.896 11 15 11H19C20.104 11 21 10.104 21 9V5C21 3.896 20.104 3 19 3ZM15 9H19V5H15V9Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path
        d="M5 13H9C10.104 13 11 13.896 11 15V19C11 20.104 10.104 21 9 21H5C3.896 21 3 20.104 3 19V15C3 13.896 3.896 13 5 13ZM9 19H5V15H9V19Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path
        d="M19 13H15C13.896 13 13 13.896 13 15V19C13 20.104 13.896 21 15 21H19C20.104 21 21 20.104 21 19V15C21 13.896 20.104 13 19 13ZM15 19H19V15H15V19Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default ILayoutGroup;
