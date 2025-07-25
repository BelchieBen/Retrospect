import HelixPalette from "../../../styles/palette";

export const IMatrix = ({
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
      <path d="M11 17C11 19.2091 9.20914 21 7 21C4.79086 21 3 19.2091 3 17C3 14.7909 4.79086 13 7 13C9.20914 13 11 14.7909 11 17Z"></path>
      <path
        d="M13 7C13 9.20914 14.7909 11 17 11C19.2091 11 21 9.20914 21 7C21 4.79086 19.2091 3 17 3C14.7909 3 13 4.79086 13 7ZM17 9C18.1046 9 19 8.10457 19 7C19 5.89543 18.1046 5 17 5C15.8954 5 15 5.89543 15 7C15 8.10457 15.8954 9 17 9ZM5 3H9C10.104 3 11 3.896 11 5V9C11 10.104 10.104 11 9 11H5C3.896 11 3 10.104 3 9V5C3 3.896 3.896 3 5 3ZM5 9V5H9V9H5ZM13 15C13 13.896 13.896 13 15 13H19C20.104 13 21 13.896 21 15V19C21 20.104 20.104 21 19 21H15C13.896 21 13 20.104 13 19V15ZM11 17C11 19.2091 9.20914 21 7 21C4.79086 21 3 19.2091 3 17C3 14.7909 4.79086 13 7 13C9.20914 13 11 14.7909 11 17ZM15 19V15H19V19H15Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IMatrix;
