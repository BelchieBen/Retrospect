import HelixPalette from "../../../styles/palette";

export const IError = ({
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
      <path d="M12.2737 7C11.5706 7 11 7.57061 11 8.27368V12.0947C11 12.7991 11.5706 13.3684 12.2737 13.3684C12.9768 13.3684 13.5474 12.7991 13.5474 12.0947V8.27368C13.5474 7.57061 12.9768 7 12.2737 7Z"></path>
      <path d="M13.5474 15.9158C13.5474 16.6201 12.9768 17.1895 12.2737 17.1895C11.5706 17.1895 11 16.6201 11 15.9158C11 15.2114 11.5706 14.6421 12.2737 14.6421C12.9768 14.6421 13.5474 15.2114 13.5474 15.9158Z"></path>
      <path
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IError;
