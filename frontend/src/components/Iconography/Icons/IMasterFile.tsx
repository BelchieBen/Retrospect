import HelixPalette from "../../../styles/palette";

export const IMasterFile = ({
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
      <path d="M7.64878 11.7366C7.42596 11.5695 7.11551 11.7698 7.17593 12.0417L8.44779 17.7651C8.4783 17.9023 8.60004 18 8.74065 18H15.2593C15.4 18 15.5217 17.9023 15.5522 17.7651L16.8241 12.0417C16.8845 11.7698 16.574 11.5695 16.3512 11.7366L14.3012 13.2741C14.147 13.3897 13.9254 13.3321 13.8471 13.1559L12.2741 9.61682C12.1686 9.37928 11.8314 9.37928 11.7259 9.61682L10.1529 13.1559C10.0746 13.3321 9.85297 13.3897 9.69878 13.2741L7.64878 11.7366Z"></path>
      <path
        d="M16.586 2.586C16.211 2.211 15.702 2 15.172 2H6C4.896 2 4 2.896 4 4V20C4 21.104 4.896 22 6 22H18C19.104 22 20 21.104 20 20V6.829C20 6.298 19.789 5.789 19.414 5.414L16.586 2.586ZM18 20H6V4H14V8H18V20Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IMasterFile;
