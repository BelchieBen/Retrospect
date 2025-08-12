import HelixPalette from "~/styles/palette";

export const IBook = ({
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
        d="M18 4H8C6.89543 4 6 4.89543 6 6V15.1707C6.31278 15.0602 6.64936 15 7 15H18V4ZM19 17V20H20C20 21.1046 19.1046 22 18 22H8C5.79086 22 4 20.2091 4 18V6C4 3.79086 5.79086 2 8 2H18C19.1046 2 20 2.89543 20 4V17H19ZM6 18C6 19.1046 6.89543 20 8 20H17V17H7C6.44772 17 6 17.4477 6 18ZM8 6.5C8 6.22386 8.22386 6 8.5 6H15.5C15.7761 6 16 6.22386 16 6.5V7.5C16 7.77614 15.7761 8 15.5 8H8.5C8.22386 8 8 7.77614 8 7.5V6.5ZM8.5 9C8.22386 9 8 9.22386 8 9.5V10.5C8 10.7761 8.22386 11 8.5 11H15.5C15.7761 11 16 10.7761 16 10.5V9.5C16 9.22386 15.7761 9 15.5 9H8.5Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IBook;
