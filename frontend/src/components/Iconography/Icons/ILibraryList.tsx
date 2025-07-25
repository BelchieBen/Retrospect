import HelixPalette from "../../../styles/palette";

export const ILibraryList = ({
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
      <path d="M5 22H3V2H5V22Z"></path>
      <path d="M9 22H7V2H9V22Z"></path>
      <path d="M12.2227 18.5C12.8971 18.5002 13.4443 19.0601 13.4443 19.75C13.4443 20.4399 12.8971 20.9998 12.2227 21C11.548 21 11 20.44 11 19.75C11 19.06 11.548 18.5 12.2227 18.5Z"></path>
      <path d="M22 20.375H14.667V19.125H22V20.375Z"></path>
      <path d="M12.2227 14.75C12.8971 14.7502 13.4443 15.3101 13.4443 16C13.4443 16.6899 12.8971 17.2498 12.2227 17.25C11.548 17.25 11 16.69 11 16C11 15.31 11.548 14.75 12.2227 14.75Z"></path>
      <path d="M22 16.625H14.667V15.375H22V16.625Z"></path>
      <path d="M12.2227 11C12.8971 11.0002 13.4443 11.5601 13.4443 12.25C13.4443 12.9399 12.8971 13.4998 12.2227 13.5C11.548 13.5 11 12.94 11 12.25C11 11.56 11.548 11 12.2227 11Z"></path>
      <path d="M22 12.875H14.667V11.624H22V12.875Z"></path>
      <path d="M14.0537 10H11.9834L10 2.59961L11.9316 2.08203L14.0537 10Z"></path>
    </svg>
  );
};

export default ILibraryList;
