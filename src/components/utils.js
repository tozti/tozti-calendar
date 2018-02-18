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

// do a class ?
export function dateAdd(a, b) {
    let temp = {
        day: a.day + b.day,
        time: a.time + b.time
    }
    if (temp.time >= 24*60) {
        temp.day += (temp.time / (24*60)) | 0
        temp.time %= 24*60
    }
    return temp
}

export function dateSub(a, b) {
    let temp = {
        day: a.day - b.day,
        time: a.time - b.time
    }
    /*if (temp.time < 0) {
        temp.day += (temp.time / (24*60)) | 0
        temp.time %= 24*60
    }*/
    return temp
}

export function dateCopy(a) {
    return {
        day: a.day,
        time: a.time
    }
}
