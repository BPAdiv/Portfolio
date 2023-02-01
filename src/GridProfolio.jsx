import React from 'react'

function GridProfolio() {
    return (
        <div>
            <div className='hero'>
                <div className='hero-heading'>
                    <h1>Adiv Balas</h1>
                    <h3>Portfolio</h3>
                </div>
            </div>
            <div className='about-me'>
                <p>"Hello, I am a self-taught full stack developer with a passion for building dynamic and user-friendly web applications. I have a strong foundation in HTML, CSS, JavaScript, and one back-end programming language [insert language]. I am eager to continue learning and honing my skills, and I am excited to take on new challenges in the field of full stack development.</p>
            </div>
            <div >
                <h2 className='projects'>Projects I made</h2>
                <div className='sub-projects '>
                    <p> you have designed and built a web-based music player application with multiple functionalities, including a search feature, playlist area, favorites section, and history section. The application likely utilizes front-end technologies such as HTML, CSS, and JavaScript</p>
                </div>
                <div className='sub-projects music-player'>
                    <p>As a full-stack developer, your project involves creating a web-based application for tracking workout progress and searching exercises. It has a front-end interface where users can interact with the application and a back-end to store and manage the data. The front-end includes features such as searching for workouts by difficulty or muscle group, marking workouts as complete, and viewing progress over time. The back-end includes a database to store user information and workout data, and a server-side component to handle data retrieval and storage, as well as user authentication. The application utilizes technologies such as HTML, CSS, JavaScript, and a back-end framework such as Node.js or Ruby on Rails.</p>
                    <p>As a fullstack developer, your project is a web application that uses both front-end and back-end technologies to provide a complete solution for workout tracking and exercise search. The front-end technology might be using HTML, CSS, and JavaScript to create a user-friendly interface that allows the user to search and perform workouts. The back-end technology could be using a database such as MySQL or MongoDB to store workout information and user progress, and a server-side language such as Node.js or Django to handle server-side logic and API calls. The application might also have authentication to allow users to log in and save their workout progress.</p>                </div>
            </div>
        </div>
    )
}

export default GridProfolio