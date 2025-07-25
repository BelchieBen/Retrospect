import HelixPalette from "../../../styles/palette";

export const IFacebook = ({
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
        d="M19 3.07495H5C3.896 3.07495 3 3.99335 3 5.12495V19.475C3 20.6066 3.896 21.525 5 21.525H12.614V14.3797H10.269V11.5958H12.614V9.5427C12.614 7.15855 14.034 5.86193 16.108 5.86193C17.102 5.86193 17.956 5.93675 18.204 5.9716V8.46133L16.766 8.46235C15.638 8.46235 15.42 9.01175 15.42 9.81843V11.5958H18.109L17.76 14.3797H15.42V21.525H19C20.104 21.525 21 20.6066 21 19.475V5.12495C21 3.99335 20.104 3.07495 19 3.07495Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IFacebook;
