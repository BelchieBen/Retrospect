import HelixPalette from "../../../styles/palette";

export const ILibraryClipboard = ({
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
        d="M3 2H5V22H3V2ZM7 2H9V22H7V2ZM11.9319 2.08197L10 2.59961L11.9829 10H14.0535L11.9319 2.08197ZM14.0454 11H16.9546C17.1037 11 17.2466 11.0577 17.3523 11.1611L18.3125 12.1H18.875C19.496 12.1 20 12.5928 20 13.2V20.9C20 21.5072 19.496 22 18.875 22H12.125C11.504 22 11 21.5072 11 20.9V13.2C11 12.5928 11.504 12.1 12.125 12.1H12.6875L13.6477 11.1611C13.7534 11.0577 13.8963 11 14.0454 11ZM18.8746 20.9H12.1246V13.2H18.8746V20.9ZM17.7502 16.4999H13.2502V15.3999H17.7502V16.4999ZM16.6254 18.7001H13.2504V17.6001H16.6254V18.7001Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default ILibraryClipboard;
