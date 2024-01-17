import { useState, MouseEvent, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { IRootState, useAppDispatch } from "../../redux/store";
import Loader from "../Loader";
import { clearAll } from "../../redux/slices/slices";
import { convertTextToSpeach } from "../../utils/features";

function Learning() {
    const [questionCount, setQuestionCount] = useState<number>(0);
    const params = useSearchParams()[0].get("language") as LangType;
    const [audioString, setAudioString] = useState<string>("");
    const navigate = useNavigate();

    const audioRef = useRef(null);

    const { loading, words, error } = useSelector(
        (state: IRootState) => state.root
    );

    const dispatch = useAppDispatch();

    const nextHandler = function (e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setQuestionCount((prev) => prev + 1);
        setAudioString("");
    };

    useEffect(() => {
        if (error) {
            dispatch(clearAll());
        }
    }, []);

    const audioHandler = async function (): Promise<void> {
        const player: HTMLAudioElement = audioRef.current!;
        if (player) {
            player.play();
        } else {
            try {
                const data = await convertTextToSpeach(
                    words[questionCount]?.word,
                    params
                );

                setAudioString(data);
            } catch (error) {
                console.log("An Error Occured while getting audio from API.");
            }
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <div className="learnContainer flex flex-col  items-center justify-center px-5 py-5">
                <div>
                    <button
                        className="self-start text-mountbattenPink drop-shadow-lg"
                        onClick={() =>
                            questionCount === 0
                                ? navigate("/")
                                : setQuestionCount((prev) => prev - 1)
                        }
                    >
                        <IoArrowBackOutline size={25} />
                    </button>
                    <p className="my-3 text-sm">Learning Made Easy</p>
                </div>

                {audioString && (
                    <audio src={audioString} autoPlay ref={audioRef}></audio>
                )}

                <div className="langWordContainer my-4 flex items-center justify-center gap-2">
                    <p>
                        {questionCount + 1}- {words[questionCount]?.meaning} :
                    </p>
                    <p className="font-bold text-mountbattenPink">
                        {words[questionCount]?.word}
                    </p>
                    {params !== "ur" ? (
                        <button
                            onClick={audioHandler}
                            className="ml-3 mt-1 text-mountbattenPink drop-shadow-lg hover:scale-105 hover:brightness-110"
                        >
                            <HiMiniSpeakerWave size={20} />
                        </button>
                    ) : null}
                </div>
                <button
                    className="btn w-full min-w-[200px] max-w-[400px]"
                    onClick={(e: MouseEvent<HTMLButtonElement>) =>
                        questionCount + 1 === words.length
                            ? navigate("/quiz")
                            : nextHandler(e)
                    }
                >
                    {questionCount + 1 === words.length
                        ? "To the Quiz"
                        : "Next"}
                </button>
            </div>
        </>
    );
}
export default Learning;
