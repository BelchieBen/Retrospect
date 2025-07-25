import HelixPalette from "../../../styles/palette";

export const ITxt = ({
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
        d="M16.5855 2.58557C16.2105 2.21057 15.7025 1.99957 15.1715 1.99957H5.99951C4.89551 1.99957 3.99951 2.89557 3.99951 3.99957V9.99957H1.99951V17.9996H3.99951V19.9996C3.99951 21.1046 4.89551 21.9996 5.99951 21.9996H17.9995C19.1045 21.9996 19.9995 21.1046 19.9995 19.9996V6.82857C19.9995 6.29757 19.7885 5.78957 19.4135 5.41357L16.5855 2.58557ZM17.9995 19.9996H5.99951V17.9996H15.9995V9.99957H5.99951V3.99957H13.9995V7.99957H17.9995V19.9996ZM7.09237 12V12.7543H5.9575V16H5.12886V12.7543H4V12H7.09237ZM10.7554 16H9.81268L8.99606 14.6971L8.17943 16H7.24272L8.5277 13.9486L7.30877 12H8.24548L8.99606 13.2L9.74663 12H10.6834L9.46442 13.9429L10.7554 16ZM14 12.7543V12H10.9076V12.7543H12.0365V16H12.8651V12.7543H14Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default ITxt;
