import HelixPalette from "../../../styles/palette";

export const ICalendarDay = ({
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
      <path d="M11.8918 16.488C11.8918 15.767 11.4088 15.277 10.7718 15.088L11.6888 13.898V13.1H8.60878V14.003H10.5268L9.56078 15.263L9.93178 15.823H10.1418C10.6458 15.823 10.9258 16.096 10.9258 16.488C10.9258 16.887 10.6458 17.153 10.1418 17.153C9.67978 17.153 9.40678 16.95 9.28778 16.586L8.46178 17.062C8.74178 17.762 9.40678 18.098 10.1418 18.098C11.0658 18.098 11.8918 17.538 11.8918 16.488Z"></path>
      <path d="M15.1972 13.1H14.3572L13.0692 13.555L13.3072 14.381L14.2312 14.122V18H15.1972V13.1Z"></path>
      <path
        d="M20 4.22222H17V2H15V4.22222H9V2H7V4.22222H4C2.896 4.22222 2 5.21778 2 6.44444V19.7778C2 21.0044 2.896 22 4 22H20C21.104 22 22 21.0044 22 19.7778V6.44444C22 5.21778 21.104 4.22222 20 4.22222ZM4 10.8889H20V6.44444H17V8.66667H15V6.44444H9V8.66667H7V6.44444H4V10.8889ZM20 19.7778H4V12H20V19.7778Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  );
};

export default ICalendarDay;
