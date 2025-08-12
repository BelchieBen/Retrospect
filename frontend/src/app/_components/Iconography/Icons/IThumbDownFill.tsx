import HelixPalette from "~/styles/palette";

export const IThumbDownFill = ({
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
        d="M13.7961 19.5885C12.6181 20.2953 11.0915 19.9349 10.3539 18.776L7.5 14.2912V7C7.5 5.34315 8.84315 4 10.5 4H15.5C16.4443 4 17.3334 4.44458 17.9 5.2L20.5 8.66667V12C20.5 13.6569 19.1569 15 17.5 15H14.118L14.759 16.2819C15.3512 17.4664 14.9317 18.9072 13.7961 19.5885Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path d="M4 13.5V6.49996C4 5.94768 4.44772 5.49996 5 5.49996C5.55228 5.49996 6 5.94768 6 6.49996V13.5C6 14.0522 5.55228 14.5 5 14.5C4.44772 14.5 4 14.0522 4 13.5Z"></path>
    </svg>
  );
};

export default IThumbDownFill;
