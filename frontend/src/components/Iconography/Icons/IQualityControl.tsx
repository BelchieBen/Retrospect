import HelixPalette from "../../../styles/palette";

export const IQualityControl = ({
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
        d="M21.9971 16.3363H9.74636C7.78141 15.9209 6.30255 14.115 6.30255 11.9498C6.30255 9.47813 8.23067 7.47489 10.608 7.47489C12.9854 7.47489 14.9135 9.47813 14.9135 11.9498C14.9135 12.7584 14.7073 13.517 14.3464 14.1725C14.233 14.3787 14.3671 14.635 14.5968 14.635H18.6048C18.7359 14.635 18.8523 14.5466 18.8891 14.4155C19.1041 13.6319 19.2205 12.8041 19.2205 11.9498C19.2205 7.00648 15.3657 3 10.611 3C5.85624 3 2 7.00648 2 11.9498C2 16.5911 5.39815 20.4076 9.7493 20.8554L22 20.8539"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IQualityControl;
