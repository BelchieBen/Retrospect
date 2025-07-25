import HelixPalette from "../../../styles/palette";

export const ICertificate = ({
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
        d="M17 12C19.2091 12 21 13.7909 21 16C21 17.4802 20.1951 18.7712 19 19.4629V23L17 21L15 23V19.4629C13.8049 18.7712 13 17.4802 13 16C13 13.7909 14.7909 12 17 12ZM17 14C15.8954 14 15 14.8954 15 16C15 17.1046 15.8954 18 17 18C18.1046 18 19 17.1046 19 16C19 14.8954 18.1046 14 17 14Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path d="M15.1719 2C15.7018 2 16.2109 2.21098 16.5859 2.58594L19.4141 5.41406C19.789 5.78906 20 6.29813 20 6.8291V10.8037C19.3925 10.4523 18.718 10.2045 18 10.084V8H14V4H6V20H12.5303C12.6783 20.1652 12.8347 20.3227 13 20.4707V22H6C4.896 22 4 21.104 4 20V4C4 2.896 4.896 2 6 2H15.1719Z"></path>
    </svg>
  );
};

export default ICertificate;
