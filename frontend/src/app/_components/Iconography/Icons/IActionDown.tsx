import HelixPalette from "~/styles/palette";

export const IActionDown = ({
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
      <path d="M8.6129 10.2097C8.22061 9.90468 7.65338 9.93241 7.29289 10.2929C6.90237 10.6834 6.90237 11.3166 7.29289 11.7071L11.2929 15.7071L11.3871 15.7903C11.7794 16.0953 12.3466 16.0676 12.7071 15.7071L16.7071 11.7071L16.7903 11.6129C17.0953 11.2206 17.0676 10.6534 16.7071 10.2929L16.6129 10.2097C16.2206 9.90468 15.6534 9.93241 15.2929 10.2929L12 13.585L8.70711 10.2929L8.6129 10.2097Z"></path>
      <path
        d="M12 2C6.478 2 2 6.478 2 12C2 17.523 6.478 22 12 22C17.523 22 22 17.523 22 12C22 6.478 17.523 2 12 2ZM12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IActionDown;
