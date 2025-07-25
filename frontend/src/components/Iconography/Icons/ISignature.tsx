import HelixPalette from "../../../styles/palette";

export const ISignature = ({
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
        d="M22 2V10H20.571L22 15L17 22H16L11 15L12.429 10H11V2H22ZM17 18.559L19.812 14.622L18.491 10H14.509L13.188 14.622L16 18.559V15.408C15.419 15.201 15 14.652 15 14C15 13.172 15.672 12.5 16.5 12.5C17.328 12.5 18 13.172 18 14C18 14.652 17.581 15.201 17 15.408V18.559ZM13 8H20V4H13V8Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path d="M2 18V16C4.696 16 6.187 17.091 7.503 18.054C8.87 19.055 10.162 20 13 20V22C9.3863 22 7.5773 20.6762 6.12336 19.6123C4.89336 18.7113 3.92 18 2 18Z"></path>
    </svg>
  );
};

export default ISignature;
