import React from 'react';

export default function Header({img, title1, title2}){
    return(
        <header className="header" style={{background: `url('${img}')`}}>
            <div className="gradient">
                <h1 data-aos="fade-up">
                    {title1}
                    <span>{title2}</span>
                </h1>
            </div>
        </header>
    )
}