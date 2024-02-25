export const TimeFormat = (inputDateStr) => {
  const inputDate = new Date(inputDateStr);
  const currentDate = new Date();
  
  // Check if it's today or tomorrow
  if (inputDate.toDateString() === currentDate.toDateString()) {
    return inputDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" });
  } else if (inputDate.toDateString() === new Date(currentDate.getTime() - 86400000).toDateString()) {
    return "Yesterday";
  } else if (currentDate - inputDate < 7 * 24 * 60 * 60 * 1000) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[inputDate.getDay()];
  } else {
    return inputDate.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
  }
};


export const AudioTimeFormat = (time) => {
  if(isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
    
  const timeString = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2,"0")}`;

  return timeString; 
}