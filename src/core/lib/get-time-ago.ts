import dayjs, { ConfigType } from "dayjs";
import pluralize from "pluralize";

const ONE_YEAR_SECONDS = 31536000;
const ONE_MONTH_SECONDS = 2592000;
const ONE_DAY_SECONDS = 86400;
const ONE_HOUR_SECONDS = 3600;
const ONE_MINUTE_SECONDS = 60;

export const getTimeAgo = (date: ConfigType) => {
  if (!date) return "";

  let seconds = Math.floor(dayjs().unix() - dayjs(date).unix()),
    interval = Math.floor(seconds / ONE_YEAR_SECONDS);

  if (interval >= 1) return pluralize("year", interval, true);

  interval = Math.floor(seconds / ONE_MONTH_SECONDS);
  if (interval >= 1) return pluralize("month", interval, true);

  interval = Math.floor(seconds / ONE_DAY_SECONDS);
  if (interval >= 1) return pluralize("day", interval, true);

  interval = Math.floor(seconds / ONE_HOUR_SECONDS);
  if (interval >= 1) return pluralize("hour", interval, true);

  interval = Math.floor(seconds / ONE_MINUTE_SECONDS);
  if (interval >= 1) return pluralize("minute", interval, true);

  return pluralize("second", Math.floor(seconds), true);
};
