import HelixPalette from "../../../styles/palette";

export const IHazard = ({
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
      <path d="M12 11H16L12 18V13H8L12 6V11Z"></path>
      <path
        d="M12 2C6.477 2 2 6.477 2 12C2 17.522 6.477 22 12 22C17.522 22 22 17.522 22 12C22 6.477 17.522 2 12 2ZM12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IHazard;
