import HelixPalette from "~/styles/palette";

export const IDisclose = ({
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
        d="M5.27744 3H12.3985C17.5334 3 21.3662 6.95466 21.3662 12.047C21.3662 16.5771 18.3334 20.2058 14.0499 20.953C13.9633 20.9677 13.8752 20.9398 13.8121 20.8782L11.0391 18.1566C10.8615 17.9834 10.9848 17.6824 11.2329 17.6824H12.3999C15.6192 17.6824 17.8548 15.3822 17.8548 12.0484C17.8548 8.71473 15.6192 6.41298 12.3999 6.41298H8.95172C8.79906 6.41298 8.67428 6.53629 8.67428 6.69043V15.1766C8.67428 15.4218 8.37922 15.5466 8.20307 15.3748L5.00147 12.2334V3.27891C5.00147 3.12624 5.12478 3.00147 5.27891 3.00147L5.27744 3Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path
        d="M11.6381 20.5244C11.8157 20.6976 11.6939 21 11.4458 21H5.27744C5.12478 21 5 20.8767 5 20.7226V14.7319C5 14.4867 5.29359 14.3619 5.46974 14.5337L11.6381 20.5244Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IDisclose;
