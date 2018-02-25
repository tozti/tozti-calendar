function leapYear(year)
{
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

function daysInMonth(anyDateInMonth) {
    return new Date(anyDateInMonth.getYear(), 
                    anyDateInMonth.getMonth()+1, 
                    0).getDate();}

export function computeFifthWeek(date) {
    let daysleft = (daysInMonth(date)-28)
    let out = [,]
    if (daysleft >= 0) {}
    if (daysleft >= 1) {
        out.push(29)
    }
    if (daysleft >= 2) {
        out.push(30)
    }
    if (daysleft >= 3){
        out.push(31)
    }
    return out
}

// one of Poeschsel's utils functions
export function elementContains(el, pos) {
    const bounds = el.getBoundingClientRect()

    return (bounds.x <= pos.x && pos.x < bounds.x + bounds.width)
        && (bounds.y <= pos.y && pos.y < bounds.y + bounds.height)
}
