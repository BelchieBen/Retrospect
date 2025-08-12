import HelixPalette from "~/styles/palette";

export const ILogin = ({
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
      <path d="M5 4H17C17.5523 4 18 4.44772 18 5C18 5.55228 17.5523 6 17 6H6C5.44772 6 5 6.44772 5 7V17C5 17.5523 5.44772 18 6 18H17C17.5523 18 18 18.4477 18 19C18 19.5523 17.5523 20 17 20H5C3.89543 20 3 19.1046 3 18V6C3 4.89543 3.89543 4 5 4Z"></path>
      <path d="M13.6322 14.7097C13.8762 15.0235 13.8541 15.4773 13.5657 15.7657C13.2533 16.0781 12.7467 16.0781 12.4343 15.7657L9.2343 12.5657L9.16775 12.4903C8.92373 12.1765 8.94592 11.7227 9.2343 11.4343L12.4343 8.23433L12.5097 8.16778C12.8235 7.92376 13.2773 7.94594 13.5657 8.23433L13.6322 8.3097C13.8762 8.62353 13.8541 9.07731 13.5657 9.3657L11.9318 11L19.9939 11L20 11C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13L11.9317 13L13.5657 14.6343L13.6322 14.7097Z"></path>
    </svg>
  );
};

export default ILogin;
