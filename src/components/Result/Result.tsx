import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { useEffect } from "react";
import { getNumOfCorrectAnswers } from "../../utils/features";
import { useAppDispatch } from "../../redux/store";
import { clearAll } from "../../redux/slices/slices";
import { useNavigate } from "react-router-dom";

function Result() {
    const { result, words } = useSelector((state: IRootState) => state.root);

    const numOfCorrectAnswers = getNumOfCorrectAnswers(
        result,
        words.map((word) => word.meaning)
    );

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const percentage: number = Math.floor(
        (numOfCorrectAnswers / words.length) * 100
    );

    useEffect(() => {
        console.log(result);
    });

    const resetToMain = function (): void {
        dispatch(clearAll());
        navigate("/");
    };

    return (
        <>
            <div className="resultMain mt-10 flex flex-col items-center justify-center px-4 font-mono">
                <div>
                    <h2 className="text-3xl font-bold text-mountbattenPink">
                        Result
                    </h2>
                    <p className="my-5 self-start">
                        You got {numOfCorrectAnswers} out of {words.length}
                    </p>
                    <div className="my-5 grid grid-cols-6 gap-10 p-3">
                        <div className="col-span-3 ">
                            <h5 className="my-2">Your Answers:</h5>
                            <ul>
                                {result.map((answer: string, idx: number) => {
                                    return (
                                        <li
                                            className={
                                                answer === words[idx].meaning
                                                    ? "text-green-500"
                                                    : "text-red-600"
                                            }
                                            key={idx}
                                        >
                                            {answer}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="col-span-3 ">
                            <h5 className="my-2">Correct Words:</h5>
                            <ul>
                                {words.map((answer: WordType, idx: number) => {
                                    return (
                                        <li key={idx}>
                                            {answer.meaning} - {answer.word}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                    <p
                        className={`mb-5 mt-10 ${
                            percentage < 50
                                ? " text-red-600"
                                : " text-green-500"
                        }`}
                    >
                        {percentage < 50
                            ? "Opssie! you have Failed the test."
                            : "Congrats! you have passed the test."}
                    </p>
                    <button
                        className={`redBtn ${
                            percentage < 50 ? "bg-red-500" : "bg-green-400"
                        }`}
                        onClick={resetToMain}
                    >
                        Reset
                    </button>
                </div>
            </div>
        </>
    );
}
export default Result;
