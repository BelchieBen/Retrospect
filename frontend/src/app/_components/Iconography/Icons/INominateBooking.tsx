import HelixPalette from "~/styles/palette";

export const INominateBooking = ({
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
        d="M9 5H15V3H17V5H20C21.0537 5 21.9176 5.81629 21.9941 6.85059L22 7V8.5L20 10.5V7H17V9H15V7H9V9H7V7H4V11H19.5L18.5 12H12V19H20V15L22 13V19C22 20.0537 21.1837 20.9176 20.1494 20.9941L20 21H4C2.94627 21 2.08237 20.1837 2.00586 19.1494L2 19V7C2 5.94627 2.81629 5.08237 3.85059 5.00586L4 5H7V3H9V5ZM4 19H7V16H4V19ZM8 19H11V16H8V19ZM4 15H7V12H4V15ZM8 15H11V12H8V15Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path d="M21.1084 10.9434C21.429 10.604 22 10.831 22 11.2979C22 11.4278 21.9506 11.5531 21.8623 11.6484L16.333 17.623L13.4346 14.8584C13.1941 14.6289 13.1836 14.2482 13.4111 14.0059C13.6433 13.7589 14.033 13.7513 14.2754 13.9883L16.333 16L21.1084 10.9434Z"></path>
    </svg>
  );
};

export default INominateBooking;
