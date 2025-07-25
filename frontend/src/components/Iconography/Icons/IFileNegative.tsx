import HelixPalette from "../../../styles/palette";

export const IFileNegative = ({
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
        d="M15.172 2C15.702 2 16.211 2.211 16.586 2.586L19.414 5.414C19.789 5.789 20 6.298 20 6.829V20C20 21.104 19.104 22 18 22H6C4.896 22 4 21.104 4 20V4C4 2.896 4.896 2 6 2H15.172ZM6 20H18V8H14V4H6V20Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path d="M14.2104 17.688L12 15.4776L9.79056 17.687L9.78361 17.694C9.37558 18.102 8.71404 18.102 8.30602 17.694C7.898 17.286 7.89799 16.6245 8.30601 16.2164L10.5224 14L8.306 11.7836C7.89799 11.3756 7.89802 10.714 8.30604 10.306C8.71407 9.89799 9.3756 9.89799 9.78363 10.306L9.79049 10.3129L12 12.5224L14.2045 10.3179L14.2161 10.3061C14.6242 9.89804 15.2857 9.89804 15.6937 10.3061C16.1017 10.7141 16.1018 11.3755 15.6938 11.7836L13.4776 14L15.6939 16.2164C16.1019 16.6244 16.1019 17.286 15.6939 17.694C15.2859 18.102 14.6243 18.102 14.2163 17.694L14.2104 17.688Z"></path>
    </svg>
  );
};

export default IFileNegative;
