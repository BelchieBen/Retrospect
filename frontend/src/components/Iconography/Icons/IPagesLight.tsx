import HelixPalette from "../../../styles/palette";

export const IPagesLight = ({
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
      <path d="M6 2C4.9457 2 4.08229 2.81581 4.00586 3.85059L4 4V20C4 21.0543 4.81581 21.9177 5.85059 21.9941L6 22H4C2.89543 22 2 21.1046 2 20V4C2 2.89543 2.89543 2 4 2H6Z"></path>
      <path d="M15 17H9V15H15V17Z"></path>
      <path d="M17 13H9V11H17V13Z"></path>
      <path
        d="M16.1719 2C16.7018 2 17.2109 2.21098 17.5859 2.58594L20.4141 5.41406C20.789 5.78906 21 6.29813 21 6.8291V20C21 21.104 20.104 22 19 22H7C5.896 22 5 21.104 5 20V4C5 2.896 5.896 2 7 2H16.1719ZM7 20H19V8H15V4H7V20Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IPagesLight;
