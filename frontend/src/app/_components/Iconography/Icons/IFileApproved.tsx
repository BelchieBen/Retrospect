import HelixPalette from "~/styles/palette";

export const IFileApproved = ({
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
      <path d="M14.5861 2C14.8511 2.00002 15.1052 2.10499 15.2932 2.29297L16.9997 4H18C19.104 4.00003 19.9998 4.89602 19.9998 6V12H18V6H5.99973V20H11.0692L11.0476 22H5.99973C4.89585 21.9999 4 21.1039 4 20V6C4 4.89609 4.89585 4.00015 5.99973 4H7.00008L8.70657 2.29297C8.89449 2.10504 9.14879 2.00008 9.41368 2H14.5861Z"></path>
      <path d="M14.0006 16H8.00043V14H14.0006V16Z"></path>
      <path d="M16.0003 12H8.00043V10H16.0003V12Z"></path>
      <path
        d="M22.2114 13.0532C21.6451 12.4892 20.7137 12.535 20.206 13.1518L15.4017 18.9894C15.3408 19.0634 15.2289 19.0685 15.1615 19.0003L13.9612 17.7853C13.4268 17.2444 12.552 17.2408 12.0131 17.7773C11.4789 18.3091 11.4769 19.1708 12.0086 19.7051L14.4968 22.2053C14.9229 22.6334 15.6252 22.6084 16.0194 22.151L22.2813 14.8849C22.7423 14.3499 22.7118 13.5517 22.2114 13.0532Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IFileApproved;
