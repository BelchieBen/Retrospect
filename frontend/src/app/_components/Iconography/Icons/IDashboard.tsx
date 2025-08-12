import HelixPalette from "~/styles/palette";

export const IDashboard = ({
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
      <path d="M15.291 9.29101L15.293 9.29301C15.684 8.90201 16.316 8.90201 16.707 9.29301C17.098 9.68401 17.098 10.316 16.707 10.707C16.707 10.707 16.7038 10.7094 16.7018 10.7104C16.6996 10.7116 16.6971 10.7129 16.695 10.715L13.925 13.485C13.969 13.65 14 13.821 14 14C14 15.105 13.105 16 12 16C10.896 16 10 15.105 10 14C10 12.896 10.896 12 12 12C12.177 12 12.345 12.03 12.508 12.073L15.291 9.29101Z"></path>
      <path
        d="M12 4C6.477 4 2 8.477 2 14C2 16.246 2.75 18.312 4 19.981V20H20V19.981C21.25 18.312 22 16.246 22 14C22 8.477 17.523 4 12 4ZM5.079 18C4.396 16.823 4 15.459 4 14C4 9.582 7.582 6 12 6C16.418 6 20 9.582 20 14C20 15.459 19.605 16.823 18.921 18H5.079Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IDashboard;
