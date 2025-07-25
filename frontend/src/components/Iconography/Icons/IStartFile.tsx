import HelixPalette from "../../../styles/palette";

export const IStartFile = ({
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
        d="M14.5861 2C14.8511 2.00002 15.1052 2.10499 15.2932 2.29297L16.9997 4H18C19.104 4.00003 19.9998 4.89602 19.9998 6V20C19.9998 21.104 19.104 22 18 22H5.99973C4.89585 21.9999 4 21.1039 4 20V6C4 4.89609 4.89585 4.00015 5.99973 4H7.00008L8.70657 2.29297C8.89449 2.10504 9.14879 2.00008 9.41368 2H14.5861ZM5.99973 20H18V6H5.99973V20Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path d="M15.7508 12.5674C16.0845 12.7601 16.0845 13.2399 15.7508 13.4325L9.75401 16.8948C9.41925 17.0881 9 16.8476 9 16.4622V9.53775C9 9.15244 9.41925 8.91193 9.75401 9.1052L15.7508 12.5674Z"></path>
    </svg>
  );
};

export default IStartFile;
