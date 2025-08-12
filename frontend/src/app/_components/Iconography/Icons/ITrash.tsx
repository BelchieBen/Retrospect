import HelixPalette from "~/styles/palette";

export const ITrash = ({
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
      <path d="M17 2.99994H14.625C14.625 2.44768 14.1773 2 13.625 2H10.375C9.82274 2 9.37503 2.44768 9.375 2.99994H7C5.89543 2.99994 5 3.89537 5 4.99994H19C19 3.89537 18.1046 2.99994 17 2.99994Z"></path>
      <path
        d="M5 20C5 21.104 5.896 22 7 22H17C18.104 22 19 21.104 19 20V7H5V20ZM15 20H17V9H15V20ZM11 20H13V9H11V20ZM7 20H9V9H7V20Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default ITrash;
