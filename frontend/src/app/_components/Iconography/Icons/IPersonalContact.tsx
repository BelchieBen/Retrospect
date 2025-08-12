import HelixPalette from "~/styles/palette";

export const IPersonalContact = ({
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
      <path d="M9 11C10.104 11 11 10.104 11 9C11 7.896 10.104 7 9 7C7.896 7 7 7.896 7 9C7 10.104 7.896 11 9 11Z"></path>
      <path d="M6 14V16H12V14C12 12.896 11.104 12 10 12H8C6.896 12 6 12.896 6 14Z"></path>
      <path d="M13 10H18V8H13V10Z"></path>
      <path
        d="M20 4H14V2H10V4H4C2.896 4 2 4.896 2 6V18C2 19.104 2.896 20 4 20H20C21.104 20 22 19.104 22 18V6C22 4.896 21.104 4 20 4ZM4 6V18H20V6H4Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IPersonalContact;
