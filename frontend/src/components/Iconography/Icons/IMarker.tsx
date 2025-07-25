import HelixPalette from "../../../styles/palette";

export const IMarker = ({
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
        d="M20.0977 5.31488L13.8701 1.71936L5.26758 13.7429L6.40929 15.1942C7.27701 16.2969 7.38594 17.8168 6.68435 19.032L8.69635 20.1936C9.39794 18.9784 10.7687 18.3128 12.1575 18.5129L13.9857 18.7763L20.0977 5.31488ZM14.4411 4.35843L8.17717 13.1134L13.0766 15.9421L17.5267 6.13991L14.4411 4.35843Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path d="M8.30918 20.8643L6.29718 19.7027L5.27475 21.292L8.0306 21.292L8.30918 20.8643Z"></path>
    </svg>
  );
};

export default IMarker;
