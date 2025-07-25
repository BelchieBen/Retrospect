import HelixPalette from "../../../styles/palette";

export const IPatientfirst = ({
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
        d="M14.3285 7.76831C14.8841 7.15365 15.2269 6.33805 15.2269 5.45153C15.2269 3.54846 13.6784 2 11.7754 2C9.87229 2 8.32383 3.54846 8.32383 5.45153C8.32383 6.33805 8.6548 7.15365 9.21035 7.75649L14.3285 7.76831ZM2 9.60037H6.57446C6.57446 9.60037 11.9882 10.1796 11.9882 15.546V21.9999H9.82504V15.806C9.82504 15.806 9.78958 12.3781 6.11346 11.8462H2V9.60037ZM21.397 9.60037H10.2977C11.6571 10.5815 12.4963 11.8344 12.4963 11.8344H21.397V9.60037ZM17.5084 14.3994H13.4304V16.7398H17.5084V14.3994ZM13.6075 19.695H15.8415V21.9999H13.6075V19.695Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default IPatientfirst;
