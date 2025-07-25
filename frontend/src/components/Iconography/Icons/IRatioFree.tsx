import HelixPalette from "../../../styles/palette";

export const IRatioFree = ({
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
      <path d="M10 3H5C3.89543 3 3 3.89543 3 5V10H5.25V6.25C5.25 5.69772 5.69772 5.25 6.25 5.25H10V3Z"></path>
      <path d="M10 18.75H6.25C5.69772 18.75 5.25 18.3023 5.25 17.75V14H3V19C3 20.1046 3.89543 21 5 21H10V18.75Z"></path>
      <path d="M14 21V18.75H17.75C18.3023 18.75 18.75 18.3023 18.75 17.75V14H21V19C21 20.1046 20.1046 21 19 21H14Z"></path>
      <path d="M14 5.25V3H19C20.1046 3 21 3.89543 21 5V10H18.75V6.25C18.75 5.69772 18.3023 5.25 17.75 5.25H14Z"></path>
    </svg>
  );
};

export default IRatioFree;
