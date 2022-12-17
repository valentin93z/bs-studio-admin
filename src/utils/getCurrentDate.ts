export const getCurrentDate = (d: number | null) => {

  if (!d) return;

  const date = new Date(d);
    
  const year = date.getFullYear();
  const month = date.getMonth();
  const dayOfMonth = date.getDate();
  const dayOfWeek = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return { year, month, dayOfMonth, dayOfWeek, hours, minutes };

}