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
    let s = new Date(startTime.getTime())
    s.setHours(0, 0, 0, 0)
    while (s <= endTime) {
        out.push(new Date(s.getTime()))
        s.setDate(s.getDate() + 1)
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
        offset.setDate(offset.getDate() + day)
    }
    if (hour != 0) {
        offset.setHours(offset.getHours() + hour)
    }
    if (minutes != 0) {
        offset.setMinutes(offset.getMinutes() + minutes)
    }
    return offset
}

export function arrangeEvents(events) {
    // put the input in a format we can manipulate
    let Ev = []
    for (let i = 0; i < events.length; ++i) {
        Ev.push({
            Id: i,
            uid_event: events[i].uid_event,
            uid_part: events[i].uid_part,
            Start: Math.floor((events[i].start.getHours() * 60 + events[i].start.getMinutes()) / 15) * 15,
            End: Math.ceil((events[i].end.getHours() * 60 + events[i].end.getMinutes()) / 15) * 15,
            Pos: {
                Init: 0,
                Su: 1,
                Sd: 1,
                Nb: 0,
            }
        })
    }


    var discretStep = 15; // precision d'un quart d'heure
    var i = 0;
    var j = 0;
    var k = 0;

    var step = 0;
    var eventArray = [];       // tableau contenant les evenement en cours lors d'un quart d'heure.

    while(step < 1440) {       // initialise notre tableau 
        eventArray.push([[]]); // la première case sert a donner les positions deja utilisé par un autre evenement.
        step+=discretStep;
    }
    
    for (i = 0; i < Ev.length; i++) {
        for(j = Ev[i].Start ; j < Ev[i].End ; j += discretStep) {
            eventArray[Math.trunc(j/discretStep)].push(Ev[i].Id); // on remplis notre tableau avec les evenements.
        }
    }


    // calcul de la position des evenements


    for (i = 0; i < Ev.length; i++) { // Première boucle sur le nombre d'evenement, place les evenement les un par rapport aux autres
        var pos = 0;
        for(j = Ev[i].Start ; j < Ev[i].End ; j += discretStep) { // boucle sur la durée des evenements
            while(eventArray[Math.trunc(j/discretStep)][0].indexOf(pos) != -1) { //boucle sur le nombre d'intersection sur un quart-d'heure.
                pos++; //si la variable pos est déja utilisé, on incremente pos
                j = Ev[i].Start; // on reprend notre boucle for a 0 pour bien balayer toute la durée de l'evenement avec notre nouveau pos.
            }
        }
        for(j = Ev[i].Start ; j < Ev[i].End ; j += discretStep) { // boucle sur la durée des evenements
            eventArray[Math.trunc(j/discretStep)][0].push(pos);
            Ev[i].Pos.Nb = pos;
        }
    }


    // calcul de la taille des evenements :
    
    
    for (i = Ev.length - 1; i >= 0; i--) { // boucle sur le nombre d'evenement, calcul la taille de chaque evenements part 1
        var elemIntersec = Array(Ev.length);
        var taille = 0;

        for(j = Ev[i].Start ; j < Ev[i].End ; j += discretStep) { // boucle sur la durée des evenements
            for(k = 0 ; k < eventArray[Math.trunc(j/discretStep)][0].length ; k++) { // boucle sur les intersections (position)
                if(elemIntersec[eventArray[Math.trunc(j/discretStep)][0][k]] != 1) {
                    taille++;
                }
                elemIntersec[eventArray[Math.trunc(j/discretStep)][0][k]] = 1;
            }        
        }
        Ev[i].Pos.Sd = taille;
    }

    for (i = Ev.length - 1; i >= 0; i--) { // boucle sur le nombre d'evenement, calcul la taille de chaque evenements part 2
        var elemIntersec = Array(Ev.length);
        var minTailleIntersec = 0; 
        for(j = Ev[i].Start ; j < Ev[i].End ; j += discretStep) { // boucle sur la durée des evenements
            for(k = 1 ; k < eventArray[Math.trunc(j/discretStep)].length ; k++) { // boucle sur les intersections (Id des element qui intersecte)
                if(elemIntersec[eventArray[Math.trunc(j/discretStep)][k]] != 1) {
                    if(Ev[eventArray[Math.trunc(j/discretStep)][k]].Pos.Sd > minTailleIntersec) {
                        minTailleIntersec = Ev[eventArray[Math.trunc(j/discretStep)][k]].Pos.Sd;
                    }
                }
                elemIntersec[eventArray[Math.trunc(j/discretStep)][k]] = 1;
            }
        }
        if(Ev[i].Pos.Sd <= minTailleIntersec){
            Ev[i].Pos.Sd = minTailleIntersec;
        }
        Ev[i].Pos.Init = 1;
    } 
    return Ev;
}
