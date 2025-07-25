import HelixPalette from "../../../styles/palette";

export const IPlay = ({
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
      <path d="M10.25 15.8971L16.25 12.433C16.5833 12.2406 16.5833 11.7594 16.25 11.567L10.25 8.10289C9.91667 7.91044 9.5 8.151 9.5 8.5359L9.5 15.4641C9.5 15.849 9.91667 16.0896 10.25 15.8971Z"></path>
      <path
        d="M12 2C6.477 2 2 6.477 2 12C2 17.522 6.477 22 12 22C17.522 22 22 17.522 22 12C22 6.477 17.522 2 12 2ZM12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IPlay;
