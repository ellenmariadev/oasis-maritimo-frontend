export function convertDate(inputFormat: string) {
  if (!inputFormat || !/^(\d{2})\/(\d{2})\/(\d{4})$/.test(inputFormat)) {
    return inputFormat;
  }

  const [day, month, year] = inputFormat.split("/");
  return `${year}-${month}-${day}`;
}
