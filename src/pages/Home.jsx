import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';

import HomeComicList from '../components/HomeComicList';

export default function Home(){

    useEffect(()=>{
        document.documentElement.scrollTop = 0;
    },[])

    return(
        <>
            <Helmet>
                <title>Marvel Wiki - Home</title>
            </Helmet>
            <h1 className="hidden">Marvel Wiki</h1>
            <header className="homeHeader">
                <img className="background" src="./img/home-background.png" alt=""/>
                <div className="container">
                    <img src="./img/home-header.png" alt="" data-aos="zoom-in"/>
                    <div className="text" data-aos="fade-right" data-aos-delay="250">
                        <div className="title">
                            <h2 className="black">
                                <span>search your</span>
                                character
                            </h2>
                        </div>
                        <p>Heroes and villains, all reunited in a single wiki. Find out the secrets of your favorite heroes, the comics where they showed up and the stories in which they participated and saved us from another cataclysm or supervillain. Don't wait and look out for your favorite hero or villian, they are all in here.</p>
                        <Link className="btn red" to="/characters/1">Search</Link>
                    </div>
                </div>
            </header>
            <section className="homeComics">
                <div className="container">
                    <div className="text">
                        <h2 data-aos="fade-up">
                            <span>readings for</span>
                            fans
                        </h2>
                        <p data-aos="fade-up">Marvel universe is one the greates accomplishments of fiction, getting together thousands of superheroes fighting againts their antagonists and sometimes, even fighting between them in alternative reallities, different timelines and crossovers. Look for your favorites comics or dare to get involve into new ones.</p>
                        <Link className="btn red" to="/comics/1" data-aos="fade-up">Comics</Link>
                    </div>
                    <HomeComicList />
                </div>
            </section>
            <section className="homeStories">
                <div className="container">
                    <div className="text">
                        <h2 data-aos="fade-up">
                            <span>stories...</span>
                            assemble!
                        </h2>
                        <p data-aos="fade-up">If you are here, then you know what you look for. Find your favorite stories and discover what comics and characters were involved into them. Access to the most diverses worlds and storytellings next to your favorite characters and villains.</p>
                        <Link className="btn red" to="/stories/1" data-aos="fade-up">Stories</Link>
                    </div>
                    <div className="image" data-aos="zoom-in">
                        <img src="./img/home-stories.png" alt=""/>
                    </div>
                </div>
            </section>
        </>
    )
}