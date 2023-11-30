import React from "react";
import "../App.css";
import Footer from "../Footer";

function AboutUs() {
    return (
        <>
            <div className="intro-container">
                <h1>About Us</h1>
                <h2>Welcome to Quizzki</h2>
                <p className="header-text-">
                    Greetings! We're thrilled to have you here at Quizzki, the brainchild
                    of a passionate fourth-year Computer Engineering student who believes
                    in the power of knowledge and the joy of learning. Allow us to
                    introduce ourselves and shed some light on the journey that led to the
                    creation of this interactive and engaging quiz game.
                </p>
                <h2>Our Mission</h2>
                <p>
                    At Quizzki, our mission is simple yet profound: to make learning an
                    enjoyable and accessible experience for everyone. We believe that
                    education can be entertaining, and quizzes are an excellent way to
                    reinforce concepts, challenge your intellect, and have fun all at
                    once.
                </p>
                <h2>Meet the Creator</h2>
                <p>
                    Yusef Rayyan, a fourth-year student pursuing a degree in Computer
                    Engineering, is the mastermind behind this project. Fueled by a
                    passion for both technology and education, Yusef Rayyan envisioned a
                    platform where learning doesn't feel like a chore but rather a
                    thrilling adventure. With a keen eye for innovation and a dedication
                    to user experience, Yusef Rayyan has meticulously crafted Quizzki to
                    offer an immersive and educational gaming experience.
                </p>
                <h2>Why Quizzki?</h2>
                <ul>
                    <li>
                        <strong>Engaging Content: </strong> Our quizzes are designed to
                        captivate your attention and stimulate your mind. Whether you're a
                        student looking for a study aid or just someone who enjoys a good
                        challenge, Quizzki has something for everyone.
                    </li>
                    <br />
                    <li>
                        <strong>Accessibility:</strong> Learning should know no bounds.
                        That's why Quizzki is accessible across various devices, ensuring
                        that knowledge is just a click away, anytime, anywhere.
                    </li>
                    <br />
                    <li>
                        <strong>Continuous Improvement: </strong> We're committed to
                        enhancing your experience. Regular updates and new quiz categories
                        will keep the content fresh, ensuring that there's always something
                        new to discover.
                    </li>
                </ul>
                <h2>Join Us on the Learning Journey</h2>
                <p>
                    Embark on a learning journey like never before with Quizzki. Challenge
                    yourself, compete with friends, and unlock the vast world of knowledge
                    in an interactive and enjoyable way.
                </p>
                <p>
                    Thank you for being a part of Quizzki. Together, let's redefine the
                    way we learn and make education an adventure!
                </p>
                <p>
                    If you have any questions, suggestions, or just want to say hello,
                    feel free to reach out at <strong>quizzki@hello.com</strong>.
                </p>
                <p>Happy quizzing!</p>
            </div>
            <Footer />
        </>
    );
}

export default AboutUs;
