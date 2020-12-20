import React from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';

export default function NotFound(){
    return(
        <>
            <Helmet>
                <title>Marvel Wiki - 404</title>
            </Helmet>
            <section className="notFound">
                <div className="container">
                    <img src="../img/404.jpg" alt="" data-aos="zoom-in"/>
                    <h1 data-aos="fade-up">Error 404</h1>
                    <p data-aos="fade-up">Unfortunately, the page you are looking has been removed by Thanos snap and now it doesn't exists anymore. But there is still hope and many other pages to visit, where you will find the greatest heroes, terrible villains and countless stories to be discover.</p>
                    <Link to="/" className="btn red" data-aos="fade-up">Go Home</Link>
                </div>
            </section>
        </>
    )
}