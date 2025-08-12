import HelixPalette from "~/styles/palette";

export const IPlatform = ({
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
      <path d="M23 7.53404V19.3162C23 19.7323 22.5551 19.9907 22.1964 19.7754L19.2831 18.0963C19.0248 17.9528 18.8669 17.6658 18.8669 17.3788V9.91629L11.9928 5.95543L5.11872 9.93064V17.4505C5.11872 17.7089 4.97521 17.9528 4.75995 18.082L1.7606 19.8184C1.41618 20.0194 1 19.7754 1 19.3736V7.54839L11.9928 1.19092L23 7.53404Z"></path>
      <path d="M10.3281 11.4375H13.6432C14.0307 11.4375 14.3464 11.7532 14.3464 12.1407V19.144C14.3464 19.5314 14.0307 19.8471 13.6432 19.8471H10.3281C9.94065 19.8471 9.62493 19.5314 9.62493 19.144V12.1407C9.62493 11.7532 9.94065 11.4375 10.3281 11.4375Z"></path>
    </svg>
  );
};

export default IPlatform;
