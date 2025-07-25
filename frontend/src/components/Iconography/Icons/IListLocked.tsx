import HelixPalette from "../../../styles/palette";

export const IListLocked = ({
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
      <path d="M7 6C7 7.104 6.104 8 5 8C3.896 8 3 7.104 3 6C3 4.896 3.896 4 5 4C6.104 4 7 4.896 7 6Z"></path>
      <path d="M9 6.99999H21V4.99899H9V6.99999Z"></path>
      <path d="M9 13H13V11H9V13Z"></path>
      <path d="M13 19H9V17H13V19Z"></path>
      <path d="M5 14C6.104 14 7 13.104 7 12C7 10.896 6.104 10 5 10C3.896 10 3 10.896 3 12C3 13.104 3.896 14 5 14Z"></path>
      <path d="M7 18C7 19.104 6.104 20 5 20C3.896 20 3 19.104 3 18C3 16.896 3.896 16 5 16C6.104 16 7 16.896 7 18Z"></path>
      <path
        d="M20 12V14C20.553 14 21 14.447 21 15V19C21 19.553 20.553 20 20 20H16C15.447 20 15 19.553 15 19V15C15 14.447 15.447 14 16 14V12C16 11.448 16.447 11 17 11H19C19.553 11 20 11.448 20 12ZM17 12V14H19V12H17ZM17 17C17 17.553 17.447 18 18 18C18.553 18 19 17.553 19 17C19 16.447 18.553 16 18 16C17.447 16 17 16.447 17 17Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IListLocked;
