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
            <img src={poster_url} alt='Movie poster'/>
            <div className='card-text'>
                <div className='card-header'>
                    <h2>{days_until}</h2> {days_until > 0 ? 'Days until':'Days since'}
                </div>
                    <span className="no-break">
                        <h3>{title}</h3> 
                        <i>({type})</i>
                    </span>
                        <br></br>
                    <span className="no-break">
                        {days_until > 0 ? 'Releases on' : 'Released on'} <b>{releaseDate}</b>
                    </span>
                    <p>{overview}</p>
            </div>
        </div>
    );
}

export default Card;