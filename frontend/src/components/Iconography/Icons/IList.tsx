import HelixPalette from "../../../styles/palette";

export const IList = ({
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
      <path d="M5 8C6.104 8 7 7.104 7 6C7 4.896 6.104 4 5 4C3.896 4 3 4.896 3 6C3 7.104 3.896 8 5 8Z"></path>
      <path d="M9 6.99999H21V4.99899H9V6.99999Z"></path>
      <path d="M21 13H9V11H21V13Z"></path>
      <path d="M9 19H21V17H9V19Z"></path>
      <path d="M7 12C7 13.104 6.104 14 5 14C3.896 14 3 13.104 3 12C3 10.896 3.896 10 5 10C6.104 10 7 10.896 7 12Z"></path>
      <path d="M5 20C6.104 20 7 19.104 7 18C7 16.896 6.104 16 5 16C3.896 16 3 16.896 3 18C3 19.104 3.896 20 5 20Z"></path>
    </svg>
  );
};

export default IList;
