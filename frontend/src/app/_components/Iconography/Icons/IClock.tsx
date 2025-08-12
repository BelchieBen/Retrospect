import HelixPalette from "~/styles/palette";

export const IClock = ({
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
      <path d="M15.291 7.29101L15.293 7.29301C15.684 6.90201 16.316 6.90201 16.707 7.29301C17.098 7.68401 17.098 8.31601 16.707 8.70701C16.707 8.70701 16.7038 8.70936 16.7018 8.71039C16.6996 8.71158 16.6971 8.71286 16.695 8.71501L13.925 11.485C13.969 11.65 14 11.821 14 12C14 13.105 13.105 14 12 14C11.262 14 10.624 13.596 10.277 13H7C6.448 13 6 12.552 6 12C6 11.448 6.448 11 7 11H10.277C10.624 10.405 11.262 10 12 10C12.177 10 12.345 10.03 12.508 10.073L15.291 7.29101Z"></path>
      <path
        d="M12 2C6.477 2 2 6.477 2 12C2 17.522 6.477 22 12 22C17.522 22 22 17.522 22 12C22 6.477 17.522 2 12 2ZM12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IClock;
