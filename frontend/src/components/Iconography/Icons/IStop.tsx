import HelixPalette from "../../../styles/palette";

export const IStop = ({
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
        d="M2 12C2 6.477 6.477 2 12 2C17.522 2 22 6.477 22 12C22 17.522 17.522 22 12 22C6.477 22 2 17.522 2 12ZM5.688 16.897C4.634 15.543 4 13.846 4 12C4 7.589 7.589 4 12 4C13.846 4 15.543 4.634 16.897 5.688L5.688 16.897ZM12 20C10.154 20 8.45803 19.365 7.10303 18.312L18.312 7.10303C19.365 8.45803 20 10.154 20 12C20 16.411 16.411 20 12 20Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IStop;
