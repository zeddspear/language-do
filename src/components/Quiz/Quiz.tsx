import { useState, ChangeEvent, useEffect } from "react";
import { IRootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import { saveResult } from "../../redux/slices/slices";
import { useNavigate } from "react-router-dom";

function Quiz() {
    const [resultState, setResultState] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [count, setCount] = useState<number>(0);

    const { words } = useSelector((state: IRootState) => state.root);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(saveResult(resultState));
    }, [count]);

    const handleSelection = function (e: ChangeEvent<HTMLInputElement>): void {
        setSelectedOption(e.currentTarget.value);
    };

    const nextHandler = function (): void {
        setResultState((prev) => [...prev, selectedOption]);
        setCount((prev) => prev + 1);
        setSelectedOption("");
    };

    return (
        <>
            <div className="quizContainer mt-10 flex flex-col items-center justify-center px-5 font-mono md:px-3">
                {resultState.length < words.length ? (
                    <div className="quizMain w-fit py-5 sm:px-2 ">
                        <h2 className="my-3 text-2xl font-bold">Quiz</h2>
                        <div className="my-10 flex items-center  justify-center gap-1 md:gap-5">
                            <p className=" text-2xl sm:text-6xl">
                                {count + 1} -
                            </p>
                            <p className="text-2xl font-bold text-mountbattenPink sm:text-6xl">
                                {words[count].word}
                            </p>
                        </div>
                        <p
                            className={` mt-10 text-lg font-bold ${
                                selectedOption === ""
                                    ? ""
                                    : "font-outline-4 text-columbiaBlue"
                            }`}
                        >
                            Meaning
                        </p>
                        <ul className=" mt-2 ">
                            {words[count].options.map(
                                (opt: string, idx: number) => {
                                    return (
                                        <li key={idx}>
                                            <label htmlFor={opt}>{opt}</label>
                                            <input
                                                className="ml-3"
                                                id={opt}
                                                name="word-selection"
                                                value={opt}
                                                type="radio"
                                                checked={selectedOption === opt}
                                                onChange={handleSelection}
                                            />
                                        </li>
                                    );
                                }
                            )}
                        </ul>
                    </div>
                ) : (
                    <div className="quizDone">
                        <h2 className="my-3 text-2xl font-bold">All Done</h2>
                        <p className="mt-10 text-lg font-bold">
                            Do you want to see your result?
                            <br />
                            If yes click the button below
                        </p>
                        <button
                            className="btn my-8 w-full min-w-[200px] max-w-[400px]"
                            onClick={(): void => navigate("/result")}
                        >
                            Click Here
                        </button>
                    </div>
                )}

                {resultState.length === words.length ? null : (
                    <button
                        disabled={selectedOption === "" ? true : false}
                        className={`btn my-8 w-full min-w-[200px] max-w-[400px] ${
                            selectedOption === "" ? "disable" : ""
                        }`}
                        onClick={nextHandler}
                    >
                        Next
                    </button>
                )}
            </div>
        </>
    );
}
export default Quiz;
