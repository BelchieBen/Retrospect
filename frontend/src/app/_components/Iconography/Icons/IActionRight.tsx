import HelixPalette from "~/styles/palette";

export const IActionRight = ({
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
      <path d="M10.2097 15.3871C9.90468 15.7794 9.93241 16.3466 10.2929 16.7071C10.6834 17.0976 11.3166 17.0976 11.7071 16.7071L15.7071 12.7071L15.7903 12.6129C16.0953 12.2206 16.0676 11.6534 15.7071 11.2929L11.7071 7.29289L11.6129 7.2097C11.2206 6.90468 10.6534 6.93241 10.2929 7.29289L10.2097 7.3871C9.90468 7.77939 9.93241 8.34662 10.2929 8.70711L13.585 12L10.2929 15.2929L10.2097 15.3871Z"></path>
      <path
        d="M2 12C2 17.522 6.478 22 12 22C17.523 22 22 17.522 22 12C22 6.477 17.523 2 12 2C6.478 2 2 6.477 2 12ZM4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20C7.589 20 4 16.411 4 12Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IActionRight;
