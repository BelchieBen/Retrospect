import HelixPalette from "~/styles/palette";

export const IPrincipalRisk = ({
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
      <path d="M12 11H15L12 18V13H9L12 6V11Z"></path>
      <path
        d="M21 5V11C21 16.55 17.16 21.74 12 23C6.84 21.74 3 16.55 3 11V5L12 1L21 5ZM5 6.2998V11C5 15.52 7.98004 19.6897 12 20.9297C16.02 19.6897 19 15.52 19 11V6.2998L12 3.19043L5 6.2998Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IPrincipalRisk;
