import HelixPalette from "../../../styles/palette";

export const IUpload = ({
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
      <path d="M9.29032 7.63224C8.97649 7.87626 8.5227 7.85407 8.23431 7.56569C7.92189 7.25327 7.92189 6.74673 8.23431 6.43431L11.4343 3.23431L11.5097 3.16776C11.8235 2.92374 12.2773 2.94593 12.5657 3.23431L15.7657 6.43431L15.8322 6.50968C16.0763 6.82351 16.0541 7.2773 15.7657 7.56569L15.6903 7.63224C15.3765 7.87626 14.9227 7.85407 14.6343 7.56569L13 5.93176V10.9993C13 11.5516 12.5523 12 12 12C11.4477 12 11 11.5523 11 11L11 5.93176L9.36568 7.56569L9.29032 7.63224Z"></path>
      <path d="M10 16C9.448 16 9 16.447 9 17C9 17.553 9.448 18 10 18C10.552 18 11 17.553 11 17C11 16.447 10.552 16 10 16Z"></path>
      <path d="M6 17C6 16.447 6.448 16 7 16C7.552 16 8 16.447 8 17C8 17.553 7.552 18 7 18C6.448 18 6 17.553 6 17Z"></path>
      <path
        d="M5 13C3.896 13 3 13.896 3 15V19C3 20.104 3.896 21 5 21H19C20.104 21 21 20.104 21 19V15C21 13.896 20.104 13 19 13H5ZM5 19H19V15H5V19Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IUpload;
