// import { Link } from "react-router-dom";

import CardItem from "../CardItem";
import "../Cards.css";
import Footer from "../Footer";

const QuizLanding = () => {


    const cards = [
        {
            id: 1,
            name: "Computer Engineering",
            fileLocation: "db_computer_engineering.json",
            category: "Computer",
            text: "Explore computer systems and hardware principles in Computer Engineering.",
            src:"images/image_card_computerEngineering_1200px.png"
        },
        {
            id: 2,
            name: "Data Structure",
            fileLocation: "db_data_structure.json",
            category: "Computer",
            text: "Dive into data organization and efficient computing for effective problem-solving.",
            src:"images/image_card_dataStructure_1200px.png"
        },
        {
            id: 3,
            name: "Network",
            fileLocation: "db_network.json",
            category: "Computer",
            text: "Understand interconnected systems enabling communication and data transfer.",
            src:"images/image_card_network_1200px.png"
        },
        {
            id: 4,
            name: "Math",
            fileLocation: "db_math.json",
            category: "science",
            text: "Discover fundamental mathematical concepts and their practical applications.",
            src:"images/image_card_math_1200px.png"
        },
        {
            id: 5,
            name: "Algebra",
            fileLocation: "db_algebra.json",
            category: "science",
            text: "Master algebraic equations and structures for versatile problem-solving.",
            src:"images/image_card_algebra_1200px.png"
        },
        {
            id: 6,
            name: "Discrete Structures",
            fileLocation: "db_discrete_computational_structures.json",
            category: "science",
            text: "Master algebraic equations and structures for versatile problem-solving.",
            src:"images/image_card_discrete_structures_1200px.png"
        },
        {
            id: 7,
            name: "Physics",
            fileLocation: "db_physics.json",
            category: "science",
            text: "Explore natural laws and fundamental forces governing the universe.",
            src:"images/image_card_physics_1200px.png"
        },
        {
            id: 8,
            name: "Intelligence Quotient",
            fileLocation: "db_iq.json",
            category: "science",
            text: "Engage in exercises measuring and analyzing cognitive abilities.",
            src:"images/image_card_iq_1200px.png"
        },
        {
            id: 9,
            name: "C Programming Language",
            fileLocation: "db_c.json",
            category: "coding C family",
            text: "Learn foundational programming with a focus on procedural programming.",
            src:"images/image_card_c_1200px.png"
        },
        {
            id: 10,
            name: "C++ Programming Language",
            fileLocation: "db_cpp.json",
            category: "coding C family",
            text: "Extend programming skills with object-oriented concepts in C++ development.",
            src:"images/image_card_cpp_1200px.png"
        },
        {
            id: 11,
            name: "C# Programming Language",
            fileLocation: "db_cSharp.json",
            category: "coding C family",
            text: "Explore versatile C# language for developing various applications.",
            src:"images/image_card_cSharp_1200px.png"
        },
        {
            id: 12,
            name: "Java Programming Language",
            fileLocation: "db_java.json",
            category: "coding",
            text: "Dive into platform-independent programming with the powerful Java language.",
            src:"images/image_card_java_1200px.png"
        },
        {
            id: 13,
            name: "JavaScript Programming Language",
            fileLocation: "db_javaScript.json",
            category: "coding",
            text: "Master scripting language for web development and dynamic content creation.",
            src:"images/image_card_javaScript_1200px.png"
        },
        {
            id: 14,
            name: "Python Programming Language",
            fileLocation: "db_python.json",
            category: "coding",
            text: "Experience simplicity and readability of Python for versatile application development.",
            src:"images/image_card_python_1200px.png"
        },
        {
            id: 15,
            name: "R Programming Language",
            fileLocation: "db_r.json",
            category: "coding",
            text: "Experience simplicity and readability of Python for versatile application development.",
            src:"images/image_card_python_1200px.png"
        },
        {
            id: 16,
            name: "Cryptology",
            fileLocation: "db_cryptology.json",
            category: "Security",
            text: "Experience simplicity and readability of Python for versatile application development.",
            src:"images/image_card_cryptology_1200px.png"
        },
        {
            id: 17,
            name: "Cyber Security",
            fileLocation: "db_cyber_security.json",
            category: "Security",
            text: "Experience simplicity and readability of Python for versatile application development.",
            src:"images/image_card_cyberSecurity_1200px.png"
        },
        {
            id: 18,
            name: "Computer Organisation",
            fileLocation: "db_computer_organisation.json",
            category: "Internal Systems",
            text: "Experience simplicity and readability of Python for versatile application development.",
            src:"images/image_card_computer_organization-1200px.png"
        },
        {
            id: 19,
            name: "Operating Systems",
            fileLocation: "db_operating_systems.json",
            category: "Internal Systems",
            text: "Experience simplicity and readability of Python for versatile application development.",
            src:"images/image_card_operating_systems_1200px.png"
        },
        {
            id: 20,
            name: "Database",
            fileLocation: "db_database.json",
            category: "Internal Systems",
            text: "Experience simplicity and readability of Python for versatile application development.",
            src:"images/image_card_database_1200px.png"
        },
    ];

    // Group cards by category
    const groupedCards = cards.reduce((acc, card) => {
        if (!acc[card.category]) {
            acc[card.category] = [];
        }
        acc[card.category].push(card);
        return acc;
    }, {});

    return (
        <>
        <div className="container" style={{backgroundColor:"var(--primaryDarkBg)"}}>
            <div className="cards">
                <div className="cards__container">
                    <div className="cards__wrapper">
                        {/* Render cards for each category */}
                        {Object.keys(groupedCards).map((category) => (
                            <ul className="cards__items" key={category}>
                                {groupedCards[category].map((card) => (
                                    <CardItem
                                        // Passing the name of card 
                                        card={card}
                                        src={card.src}
                                        text={card.text}
                                        label={card.name}
                                        path={`/quiz-test/${card.name}`}
                                    />
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
            </div>
            <Footer />
        </>
    );
};

export default QuizLanding;
