import HelixPalette from "../../../styles/palette";

export const ITextSuperscript = ({
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
      <path d="M17.016 9H21V7.948H18.517V7.892L19.25 7.175C19.738 6.711 20.079 6.354 20.272 6.103C20.467 5.853 20.609 5.607 20.702 5.369C20.794 5.13 20.84 4.875 20.84 4.602C20.84 4.29 20.765 4.011 20.614 3.769C20.464 3.526 20.251 3.337 19.979 3.202C19.706 3.067 19.392 3 19.035 3C18.765 3 18.521 3.028 18.302 3.083C18.084 3.138 17.883 3.217 17.698 3.32C17.513 3.422 17.28 3.598 17 3.846L17.655 4.651C17.881 4.457 18.098 4.307 18.306 4.202C18.514 4.096 18.729 4.044 18.949 4.044C19.16 4.044 19.328 4.102 19.454 4.218C19.58 4.334 19.644 4.511 19.644 4.748C19.644 4.907 19.614 5.061 19.558 5.209C19.5 5.357 19.407 5.519 19.276 5.692C19.146 5.867 18.87 6.179 18.446 6.629L17.016 8.13V9Z"></path>
      <path d="M13.23 6H16L11.385 12L16 18H13.23L10 13.8L6.769 18H4L8.615 12L4 6H6.769L10 10.2L13.23 6Z"></path>
    </svg>
  );
};

export default ITextSuperscript;
