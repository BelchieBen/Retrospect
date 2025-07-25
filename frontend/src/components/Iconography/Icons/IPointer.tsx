import HelixPalette from "../../../styles/palette";

export const IPointer = ({
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
        d="M5.29292 5.29292C5.58206 5.00378 6.01811 4.91981 6.39395 5.08088L18.3939 10.2237C18.7756 10.3873 19.0164 10.7696 18.9992 11.1844C18.9819 11.5993 18.7101 11.9603 18.3163 12.0916L13.6477 13.6477L12.0916 18.3163C11.9603 18.7101 11.5993 18.9819 11.1844 18.9992C10.7696 19.0164 10.3873 18.7756 10.2237 18.3939L5.08088 6.39395C4.91981 6.01811 5.00378 5.58206 5.29292 5.29292ZM7.90397 7.90397L11.0259 15.1886L11.9085 12.5409C12.008 12.2423 12.2423 12.008 12.5409 11.9085L15.1886 11.0259L7.90397 7.90397Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IPointer;
