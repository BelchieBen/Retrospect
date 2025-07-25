import HelixPalette from "../../../styles/palette";

export const IIdeagenMonochrome = ({
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
      <path d="M9.3335 7.65858V4.34705L14.6668 1L20.0001 4.34705L20.0001 10.3717L14.6668 13.7188V7.69407L9.58113 4.50174L9.5795 7.65801L9.3335 7.65858Z"></path>
      <path d="M4 13.7189V17.0304L4.246 17.0298L4.24764 13.8736L9.33331 17.0659L9.33333 23.0906L14.6666 19.7435L14.6668 13.7188L9.33331 10.3718L4 13.7189Z"></path>
    </svg>
  );
};

export default IIdeagenMonochrome;
