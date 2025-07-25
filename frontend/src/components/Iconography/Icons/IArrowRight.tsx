import HelixPalette from "../../../styles/palette";

export const IArrowRight = ({
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
      <path d="M16.4902 15.8323C16.1764 16.0762 15.723 16.0541 15.4346 15.7659L15.3682 15.6907C15.1243 15.3769 15.1464 14.9233 15.4346 14.635L17.0684 13.0002L5 13.0002L4.89746 12.9954C4.39334 12.944 4.00001 12.5179 4 12.0002C4 11.448 4.44772 11.0002 5 11.0002L17.0684 11.0002L15.4346 9.36547L15.3682 9.29028C15.1243 8.97646 15.1463 8.52294 15.4346 8.23461C15.7469 7.92239 16.253 7.92251 16.5654 8.23461L19.7656 11.4348L19.832 11.51C20.076 11.8238 20.0539 12.2773 19.7656 12.5657L16.5654 15.7659L16.4902 15.8323Z"></path>
    </svg>
  );
};

export default IArrowRight;
