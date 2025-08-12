import HelixPalette from "~/styles/palette";

export const IActionLeft = ({
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
      <path d="M13.7903 8.6129C14.0953 8.22061 14.0676 7.65338 13.7071 7.29289C13.3166 6.90237 12.6834 6.90237 12.2929 7.29289L8.29289 11.2929L8.2097 11.3871C7.90468 11.7794 7.93241 12.3466 8.29289 12.7071L12.2929 16.7071L12.3871 16.7903C12.7794 17.0953 13.3466 17.0676 13.7071 16.7071L13.7903 16.6129C14.0953 16.2206 14.0676 15.6534 13.7071 15.2929L10.415 12L13.7071 8.70711L13.7903 8.6129Z"></path>
      <path
        d="M22 12C22 6.478 17.522 2 12 2C6.477 2 2 6.478 2 12C2 17.523 6.477 22 12 22C17.522 22 22 17.523 22 12ZM20 12C20 16.411 16.411 20 12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IActionLeft;
