import HelixPalette from "../../../styles/palette";

export const IGlobalFile = ({
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
      <path d="M14.5861 2C14.8511 2.00002 15.1052 2.10499 15.2932 2.29297L16.9997 4H18C19.104 4.00003 19.9998 4.89602 19.9998 6V10H18V6H5.99973V20H10.9995V22H5.99973C4.89585 21.9999 4 21.1039 4 20V6C4 4.89609 4.89585 4.00015 5.99973 4H7.00008L8.70657 2.29297C8.89449 2.10504 9.14879 2.00008 9.41368 2H14.5861Z"></path>
      <path d="M10.0002 16H8.00043V14H10.0002V16Z"></path>
      <path d="M11.9999 12H8.00043V10H11.9999V12Z"></path>
      <path
        d="M24 17C24 20.3137 21.3137 23 18 23C14.6863 23 12 20.3137 12 17C12 13.6863 14.6863 11 18 11C21.3137 11 24 13.6863 24 17ZM18.6 21.7629C18.4034 21.7874 18.2032 21.8 18 21.8C15.349 21.8 13.2 19.651 13.2 17L15 19.1L15.9 17H14.7V15.8L15.6 15.2H16.2L17.1 13.7H18.3L19.2 12.5V12.3512C20.5071 12.6877 21.5988 13.5608 22.226 14.7218L19.8 15.8V17.6L20.4 18.8L19.5 19.7L18.6 20V21.7629Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IGlobalFile;
