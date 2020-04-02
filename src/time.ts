//@ts-ignore
import dayjs from "dayjs";

export const getDateRange = (daterange: any[] | null) => {
  if (!daterange) return [null, null];
  const a = daterange[0]
    ? dayjs(daterange[0])
        .set("hour", 0)
        .set("minute", 0)
        .set("second", 0)
        .set("millisecond", 0)
        .toDate()
    : null;
  const b = daterange[1]
    ? dayjs(daterange[1])
        .set("hour", 23)
        .set("minute", 59)
        .set("second", 59)
        .set("millisecond", 59)
        .toDate()
    : null;

  return [a, b];
};
