import HelixPalette from "../../../styles/palette";

export const ISearch = ({
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
        d="M14.8492 4.94973C17.3428 7.44332 17.5617 11.3502 15.5061 14.092L20.506 19.0919C20.8965 19.4824 20.8965 20.1156 20.506 20.5061C20.1155 20.8966 19.4823 20.8966 19.0918 20.5061L14.0919 15.5062C11.3501 17.5618 7.44326 17.3428 4.94967 14.8492C2.216 12.1156 2.216 7.6834 4.94967 4.94973C7.68334 2.21606 12.1155 2.21606 14.8492 4.94973ZM13.4349 13.435C15.3876 11.4824 15.3876 8.31656 13.4349 6.36394C11.4823 4.41132 8.3165 4.41132 6.36388 6.36394C4.41126 8.31656 4.41126 11.4824 6.36388 13.435C8.3165 15.3876 11.4823 15.3876 13.4349 13.435Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default ISearch;
