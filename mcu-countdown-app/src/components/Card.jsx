import React from 'react';

function waitForElement(release_date){
    if(typeof release_date !== "undefined"){
        var yr = release_date.substring(0,4);
        var mt = release_date.substring(5,7);
        var day = release_date.substring(8,10);
        var releaseDate = new Date(yr,mt-1,day);
        return releaseDate.toDateString();
    }
    else{
        setTimeout(waitForElement, 250);
    }
}
function Card({data: {title, release_date, type, days_until, overview, poster_url}}) {
    var releaseDate = waitForElement(release_date);

    return ( 
        <div className='card'>
            <i>{type}</i> <br/>
            <img src={poster_url} alt='Movie poster'/>
            <div>
                <h2>{days_until}</h2> <p>Days until</p> <h3>{title}</h3>
                <p>Releases on <b>{releaseDate}</b></p>
                <p>{overview}</p>
            </div>
        </div>
    );
}

export default Card;