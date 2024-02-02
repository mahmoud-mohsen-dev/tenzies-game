/* eslint-disable react/prop-types */
function Die({ Dice, hold }) {
    return (
        <div
            className={`tenzies__number ${Dice.held ? "active" : ""}`}
            onClick={() => hold(Dice.id)}
        >
            {Dice.number}
        </div>
    );
}

export default Die;
