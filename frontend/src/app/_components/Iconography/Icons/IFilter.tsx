import HelixPalette from "~/styles/palette";

export const IFilter = ({
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
        d="M13.1746 13.9859L20.1379 4.59564C20.6273 3.93574 20.1562 3 19.3347 3H4.66001C3.83846 3 3.36741 3.93574 3.85676 4.59564L10.8217 13.9881V21.9999L13.1746 20.8823V13.9859ZM11.9972 11.1029L7.64603 5.23527L16.3483 5.23527L11.9972 11.1029Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IFilter;
