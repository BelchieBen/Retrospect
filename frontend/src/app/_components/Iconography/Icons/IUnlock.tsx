import HelixPalette from "~/styles/palette";

export const IUnlock = ({
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
      <path d="M13 15C13 14.4477 12.5523 14 12 14C11.4477 14 11 14.4477 11 15V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V15Z"></path>
      <path
        d="M6 6C6 3.23858 8.23858 1 11 1H13C15.4212 1 17.4405 2.72096 17.9013 5.00638C18.0104 5.54777 17.5523 6 17 6H16.8182C16.2659 6 15.8345 5.54 15.6538 5.01811C15.2471 3.84347 14.1312 3 12.8182 3H11.1818C9.52496 3 8.18182 4.34315 8.18182 6V6.99909L8.18 7.00091V9H18C19.1046 9 20 9.89543 20 11V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V11C4 9.89543 4.89543 9 6 9V6ZM7 11C6.44772 11 6 11.4477 6 12V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V12C18 11.4477 17.5523 11 17 11H7Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IUnlock;
