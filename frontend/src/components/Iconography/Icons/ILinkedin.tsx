import HelixPalette from "../../../styles/palette";

export const ILinkedin = ({
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
        d="M5 3H19C20.105 3 21 3.92214 21 5.05834V19.4667C21 20.604 20.105 21.5251 19 21.5251H5C3.896 21.5251 3 20.604 3 19.4667V5.05834C3 3.92214 3.896 3 5 3ZM5.45605 7.14336C5.45605 8.0233 6.14805 8.73651 7.00406 8.73651C7.85705 8.73651 8.55105 8.0233 8.55105 7.14336C8.55105 6.26445 7.85705 5.55123 7.00406 5.55123C6.14805 5.55123 5.45605 6.26445 5.45605 7.14336ZM8.33897 18.7855H5.66797V9.94595H8.33897V18.7855ZM18.3367 18.7853H15.6697V14.4864C15.6697 13.4614 15.6507 12.142 14.2827 12.142C12.8937 12.142 12.6817 13.2586 12.6817 14.4123V18.7853H10.0127V9.94574H12.5737V11.153H12.6107C12.9667 10.4583 13.8377 9.72549 15.1367 9.72549C17.8377 9.72549 18.3367 11.5554 18.3367 13.9369V18.7853Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default ILinkedin;
