import React from "react";
import "../App.css";
import Footer from "../Footer";

export default function GameRules() {
  return (
    <><div className="intro-container-wrapper">

      <div className="intro-container">
        <h1>Game Rules</h1>
        <img 
                    src="/images/image-rules-1.svg"
                    alt="Rules illustration" 
                    className="image-Rules-controller" />

        <p>
           <strong>Welcome to Quizzki!</strong> To ensure a fair and exciting gaming
          experience for everyone, please familiarize yourself with the
          following rules:
        </p>

        <h2>1. Answering Questions</h2>
        <h3>1.1 Time Limit</h3>
        <p className="header-text-">
          You have <strong>20 seconds</strong> to answer each question. Time is
          of the essence, so think quickly and trust your instincts. If the
          timer runs out before you submit your answer, you will lose the round.
        </p>
        <h3>1.2 Correct Answers</h3>
        <p>
          Select the correct answer to progress to the next question. If your
          answer is correct, you'll move forward in the game.
        </p>
        <h3>1.3 Incorrect Answers</h3>
        <p>
          Be cautious! An incorrect answer results in losing the round. But
          don't worry, you can always restart the game and try again.
        </p>
        <h2>2. Game Progress</h2>
        <h3>2.1 Restarting the Game</h3>
        <p>
          After a loss, you have the option to restart the game. Learn from your
          mistakes, sharpen your skills, and take another shot at climbing the
          ranks.
        </p>
        <h3>2.2 Progress Tracking</h3>
        <p>
          Your progress is important to us! Track your performance and
          improvement through the rank hall. See how you compare to other
          players and strive to reach the top spot.
        </p>
        <h2>3. Rank Hall</h2>
        <h3>3.1 Score Tracking</h3>
        <p>
          Your scores are automatically recorded in the rank hall. Keep an eye
          on your position and challenge yourself to climb higher in the ranks.
        </p>
        <h3>3.2 Global Rankings</h3>
        <p>
          Compete against players worldwide! The rank hall displays global
          rankings, allowing you to see how you stack up against a diverse
          community of quiz enthusiasts.
        </p>
        <h2>4. Fair Play</h2>
        <h3>4.1 Anti-Cheating Measures</h3>
        <p>
          We value fair play. Cheating, exploiting loopholes, or using external
          aids is strictly prohibited. Any violation of fair play may result in
          disqualification or account suspension.
        </p>
        <h3>4.2 Enjoy the Game</h3>
        <p>
          Above all, enjoy the quiz game experience! Challenge yourself, have
          fun, and learn along the way. Quizzki is here to make
          learning entertaining and rewarding.
        </p>
        <p>
          Remember, every round is an opportunity to improve. Good luck, and may
          the best quizzer win!
        </p>
        <h2>5. Browser Etiquette</h2>
        <h3>5.1 New Tab Policy</h3>
        <p>
          To maintain fair play and uphold the integrity of the game, opening a
          new tab during an active game session is strictly prohibited. This
          includes searching for answers or seeking external assistance.
        </p>
        <p>
          If a player opens a new tab during an ongoing game, it will result in
          an automatic loss for that round. We believe in providing a level
          playing field for all participants, and any attempt to seek external
          assistance will not be tolerated.
        </p>
        <h3>5.2 Accountability</h3>
        <p>
          Players are responsible for their actions during the game, and any
          intentional or unintentional breach of the new tab policy will be
          subject to the consequences outlined in Section 4.1.
        </p>
        <p>
          Remember, Quizzki aims to create an enjoyable and fair gaming
          environment for all participants. Let's maintain the spirit of
          friendly competition and uphold the principles of fair play.
        </p>
      </div>
      </div>
      <Footer />
    </>
  );
}
