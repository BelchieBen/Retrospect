import HelixPalette from "../../../styles/palette";

export const IImage = ({
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
      <path d="M7.5 11C8.329 11 9 10.329 9 9.5C9 8.671 8.329 8 7.5 8C6.671 8 6 8.671 6 9.5C6 10.329 6.671 11 7.5 11Z"></path>
      <path
        d="M20 4H4C2.896 4 2 4.896 2 6V18C2 19.104 2.896 20 4 20H20C21.104 20 22 19.104 22 18V6C22 4.896 21.104 4 20 4ZM10.485 14.899L15.5 9L20 14.294V6H4V16.667L8 12L10.485 14.899ZM19.9998 17.9999V15.8379L15.4998 10.5439L10.4878 16.4389L7.99983 13.5359L4.17383 17.9999H19.9998Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IImage;
