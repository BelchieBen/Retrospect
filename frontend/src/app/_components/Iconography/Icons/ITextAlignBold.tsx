import HelixPalette from "~/styles/palette";

export const ITextAlignBold = ({
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
        d="M7 6H10.778C12.499 6 13.749 6.242 14.527 6.726C15.304 7.21 15.693 7.98 15.693 9.037C15.693 9.753 15.523 10.341 15.183 10.801C14.842 11.261 14.39 11.537 13.825 11.63V11.712C14.594 11.882 15.15 12.199 15.49 12.665C15.83 13.129 16 13.748 16 14.519C16 15.614 15.6 16.467 14.8 17.081C14 17.693 12.914 18 11.542 18H7V6ZM9.57422 12.771V15.898H11.2512C11.9602 15.898 12.4832 15.764 12.8212 15.496C13.1582 15.228 13.3262 14.818 13.3262 14.265C13.3262 13.269 12.6082 12.771 11.1682 12.771H9.57422ZM11.0692 10.752H9.57422V8.08401H10.9282C11.6632 8.08401 12.2012 8.18401 12.5422 8.38401C12.8832 8.58401 13.0532 8.91301 13.0532 9.37301C13.0532 9.86502 12.8972 10.218 12.5832 10.432C12.2712 10.645 11.7662 10.752 11.0692 10.752Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default ITextAlignBold;
