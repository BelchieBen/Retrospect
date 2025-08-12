import HelixPalette from "~/styles/palette";

export const ICross = ({
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
      <path d="M6.79524 5.30799L6.80709 5.32002L12 10.513L17.1931 5.31989L17.2047 5.30811C17.6153 4.89746 18.2811 4.89746 18.6918 5.30811C19.1024 5.71873 19.1024 6.38446 18.6919 6.79512L13.4871 12.0001L18.6849 17.1979L18.6919 17.2048C19.1026 17.6155 19.1026 18.2813 18.6919 18.6919C18.2813 19.1026 17.6155 19.1026 17.2048 18.6919L12 13.4872L6.79518 18.692C6.38453 19.1027 5.71864 19.1027 5.30799 18.692C4.89734 18.2814 4.89734 17.6156 5.30799 17.2049L5.315 17.198L10.5129 12.0001L5.30796 6.7951C4.8974 6.38444 4.89752 5.71861 5.30814 5.30799C5.71879 4.89734 6.38459 4.89734 6.79524 5.30799Z"></path>
    </svg>
  );
};

export default ICross;
