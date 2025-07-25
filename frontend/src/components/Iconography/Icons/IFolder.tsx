import HelixPalette from "../../../styles/palette";

export const IFolder = ({
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
        d="M12 4H20C21.104 4 22 4.896 22 6V18C22 19.104 21.104 20 20 20H4C2.896 20 2 19.104 2 18V2H10L12 4ZM20 6V18H4V6H20Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IFolder;
