const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const DAY_SHORT = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};

function clockMinutes(value) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(String(value || "").trim());
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours === 24 && minutes === 0) return 24 * 60;
  if (hours > 23 || minutes > 59) return null;
  return hours * 60 + minutes;
}

function coversAllDay(opens, closes) {
  const open = clockMinutes(opens);
  const close = clockMinutes(closes);
  if (open == null || close == null) return false;
  return open === 0 && (close >= 23 * 60 + 59 || close === 24 * 60);
}

/** True only when every weekday is covered by an all-day window. */
function isOpen24Hours7Days(weekly) {
  if (!Array.isArray(weekly) || weekly.length === 0) return false;
  const covered = new Set();
  for (const row of weekly) {
    if (!row || !coversAllDay(row.opens, row.closes)) return false;
    covered.add(row.dayOfWeek);
  }
  return WEEKDAYS.every((day) => covered.has(day));
}

function formatTvHours(weekly, summary) {
  if (!Array.isArray(weekly) || weekly.length === 0) {
    return typeof summary === "string" ? summary.trim() : "";
  }
  const groups = [];
  for (const row of weekly) {
    const label = typeof row?.label === "string" ? row.label.trim() : "";
    const day = DAY_SHORT[row?.dayOfWeek] || "";
    if (!label || !day) continue;
    const last = groups[groups.length - 1];
    if (last && last.label === label) last.days.push(day);
    else groups.push({ label, days: [day] });
  }
  if (!groups.length) return typeof summary === "string" ? summary.trim() : "";
  return groups
    .map((group) => {
      const span = group.days.length > 1 ? `${group.days[0]}–${group.days[group.days.length - 1]}` : group.days[0];
      return `${span} ${group.label}`;
    })
    .join(" · ");
}

function buildTvStore({ name, streetAddress, city, weekly, summary }) {
  const shortAddress = [streetAddress, city].map((part) => (typeof part === "string" ? part.trim() : "")).filter(Boolean).join(", ");
  return {
    name: typeof name === "string" ? name.trim() : "",
    shortAddress,
    hours: formatTvHours(weekly, summary),
    open24Hours7Days: isOpen24Hours7Days(weekly),
  };
}

module.exports = {
  WEEKDAYS,
  isOpen24Hours7Days,
  formatTvHours,
  buildTvStore,
};
