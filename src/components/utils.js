export function enlargeContainerForScrollbar (container_class) {
    // As on Firefox and Chrome the scrollbar takes rooms inside the element,
    // to keep everything align we must enlarge the element by the size of the scrollbar.
    // Unfortunately, the size of the scrollbar isn't knowed until the page 
    // is displayed (it is dependant on the browser
    // this function will:
    // - compute the size
    // - enlarge elements containing a specific class
    let div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.visibility = 'hidden';
    document.body.appendChild(div);
    let s = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);

    for (let e of document.getElementsByClassName(container_class)) {
        e.style.marginRight = "-" + s + "px" 
    }
}

export function pauseEvent(e) {
    if(e.stopPropagation) e.stopPropagation();
    if(e.preventDefault) e.preventDefault();
    e.cancelBubble=true;
    e.returnValue=false;
}

export function getMousePos(e) {
    let mousex = e.pageX || e.clientX + document.documentElement.scrollLeft
    let mousey = e.pageY || e.clientY + document.documentElement.scrollTop
    return {'x': mousex, 'y': mousey}
}

export function elementContains(el, pos) {
    const bounds = el.getBoundingClientRect()

    return (bounds.x <= pos.x && pos.x < bounds.x + bounds.width)
            && (bounds.y <= pos.y && pos.y < bounds.y + bounds.height)
}

export function computeTimeRange(startTime, endTime) {
    let out = []
    let s = startTime
    while (s <= endTime) {
        s.setDate(s.getDate() + 1)
        out.push(new Date(s.getTime()))
    }
    return out
}

export function createOffsetDate(year, month, day, hour, minutes) {
    let offset = new Date(0)
    if (year != 0) {
        offset.setFullYear(offset.getFullYear() + year)
    }
    if (month != 0) {
        offset.setMonth(offset.getMonth() + month)
    }
    if (day != 0) {
        offset.setDate(offset.getDate() + ay)
    }
    if (hour != 0) {
        offset.setHours(offset.getHours() + hour)
    }
    if (minutes != 0) {
        offset.setMinutes(offset.getMinutes() + minutes)
    }
    return offset
}
