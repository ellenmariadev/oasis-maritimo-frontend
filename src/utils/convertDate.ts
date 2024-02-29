import { format, parseISO } from "date-fns";

export function convertDate(inputFormat: string) {
  if (!inputFormat || !/^(\d{2})\/(\d{2})\/(\d{4})$/.test(inputFormat)) {
    return inputFormat;
  }

  const [day, month, year] = inputFormat.split("/");
  return `${year}-${month}-${day}`;
}

export function formatDateHours(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, "dd/MM/yyyy HH:mm");
}
