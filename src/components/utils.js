export function enlarge_container_for_scrollbar (container_class) {
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
