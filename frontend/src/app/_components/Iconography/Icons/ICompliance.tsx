import HelixPalette from "~/styles/palette";

export const ICompliance = ({
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
      <path d="M12 13.9993C13.1042 13.9993 13.9994 13.1042 13.9994 12C13.9994 10.8958 13.1042 10.0007 12 10.0007C10.8958 10.0007 10.0007 10.8958 10.0007 12C10.0007 13.1042 10.8958 13.9993 12 13.9993Z"></path>
      <path
        d="M20.2863 17.5998C20.3271 17.5362 20.5213 17.2375 20.5605 17.1722C20.6094 17.0922 20.6568 17.0122 20.7025 16.9306C21.5283 15.4748 22 13.7921 22 12C22 6.4769 17.5231 2 12 2C6.4769 2 2 6.4769 2 12C2 17.5231 6.4769 22 12 22C14.1234 22 16.0934 21.3374 17.7124 20.2096L14.8072 17.3044C13.97 17.7483 13.0135 17.9997 12 17.9997C8.6868 17.9997 6.00033 15.3132 6.00033 12C6.00033 8.6868 8.6868 6.00033 12 6.00033C15.3132 6.00033 17.9997 8.6868 17.9997 12C17.9997 12.8389 17.8283 13.637 17.5166 14.3617C17.4725 14.4661 17.4235 14.569 17.3746 14.6701L20.2863 17.6014V17.5998Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default ICompliance;
