import HelixPalette from "../../../styles/palette";

export const IDrag = ({
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
      <path d="M14 6C14 5.44772 14.4477 5 15 5H16C16.5523 5 17 5.44772 17 6V7C17 7.55228 16.5523 8 16 8H15C14.4477 8 14 7.55228 14 7V6Z"></path>
      <path d="M14 12C14 11.4477 14.4477 11 15 11H16C16.5523 11 17 11.4477 17 12V13C17 13.5523 16.5523 14 16 14H15C14.4477 14 14 13.5523 14 13V12Z"></path>
      <path d="M9 17C8.44772 17 8 17.4477 8 18V19C8 19.5523 8.44772 20 9 20H10C10.5523 20 11 19.5523 11 19V18C11 17.4477 10.5523 17 10 17H9Z"></path>
      <path d="M15 17C14.4477 17 14 17.4477 14 18V19C14 19.5523 14.4477 20 15 20H16C16.5523 20 17 19.5523 17 19V18C17 17.4477 16.5523 17 16 17H15Z"></path>
      <path d="M9 11C8.44772 11 8 11.4477 8 12V13C8 13.5523 8.44772 14 9 14H10C10.5523 14 11 13.5523 11 13V12C11 11.4477 10.5523 11 10 11H9Z"></path>
      <path d="M9 5C8.44772 5 8 5.44772 8 6V7C8 7.55228 8.44772 8 9 8H10C10.5523 8 11 7.55228 11 7V6C11 5.44772 10.5523 5 10 5H9Z"></path>
    </svg>
  );
};

export default IDrag;
