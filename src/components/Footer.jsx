import React from 'react';

export default function Footer(){
    const year = new Date().getFullYear();
    return(
        <footer>
            <img src="../img/logo-footer.png" alt=""/>
            <p>Copyright {year} © marvel-wiki.com</p>
        </footer>
    )
}