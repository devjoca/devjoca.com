const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const TIME_FORMATTER = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
});

export const formatDatetime = (datetime: string) => {
  const parsedDate = new Date(datetime);

  if (Number.isNaN(parsedDate.getTime())) {
    return {
      date: datetime,
      time: "",
    };
  }

  return {
    date: DATE_FORMATTER.format(parsedDate),
    time: TIME_FORMATTER.format(parsedDate),
  };
};
