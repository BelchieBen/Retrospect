import HelixPalette from "../../../styles/palette";

export const ITextColour = ({
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
        d="M15.1639 15.9999L14.2629 13.1549H9.73697L8.83697 15.9999H6L10.383 4H13.6009L17.9999 15.9999H15.1639ZM13.6344 11.0299C12.8024 8.45196 12.3334 6.99497 12.2294 6.65597C12.1234 6.31898 12.0494 6.05098 12.0044 5.85498C11.8174 6.55297 11.2814 8.27796 10.3984 11.0299H13.6344Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path d="M20 18H4V20H20V18Z"></path>
    </svg>
  );
};

export default ITextColour;
