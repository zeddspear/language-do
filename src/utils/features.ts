import axios from "axios";
import { generate } from "random-words";
import _ from "lodash";
const RAPID_AI_KEY = import.meta.env.VITE_RAPID_AI_KEY;
const VOICE_RSS_KEY = import.meta.env.VITE_VOICE_RSS_KEY;

export const generateOpt = function (
    optWords: generatedWord[],
    idx: number
): string[] {
    const correctWord: string = optWords[idx].text;

    const incorrectWordsOpt: generatedWord[] = optWords.filter(
        (word) => word.text !== correctWord
    );

    const incorrectWords: string[] = _.sampleSize(incorrectWordsOpt, 3).map(
        (word) => word.text
    );

    return _.shuffle([...incorrectWords, correctWord]);
};

export const getNumOfCorrectAnswers = function (
    results: string[],
    words: string[]
): number {
    if (words.length !== results.length)
        throw new Error("Words and Result arrays are not equal");

    let correctAnswers: number = 0;
    for (let i = 0; i < words.length; i++) {
        if (results[i] === words[i]) {
            correctAnswers++;
        }
    }
    return correctAnswers;
};

export const genAndTransWords = async (
    translateTo: LangType
): Promise<WordType[]> => {
    const words: generatedWord[] = generate(8).map((word) => {
        return {
            text: word,
        };
    });

    try {
        const { data } = await axios.post(
            "https://microsoft-translator-text.p.rapidapi.com/translate",
            words,
            {
                params: {
                    "api-version": "3.0",
                    "to[0]": translateTo,
                    textType: "plain",
                    profanityAction: "NoAction",
                },
                headers: {
                    "content-type": "application/json",
                    "X-RapidAPI-Key": RAPID_AI_KEY,
                    "X-RapidAPI-Host":
                        "microsoft-translator-text.p.rapidapi.com",
                },
            }
        );

        const fetchedData: WordType[] = [];

        data.forEach((ele: fetchedDataType, idx: number) => {
            const options: string[] = generateOpt(words, idx);

            fetchedData.push({
                word: ele.translations[0].text,
                meaning: words[idx].text,
                options: options,
            });
        });
        return fetchedData;
    } catch (error: any) {
        console.log(error);
        return error;
        // throw new Error("Some Error Happened!");
    }
};

export const convertTextToSpeach = async function (
    word: string,
    wordCode: LangType
): Promise<string> {
    const encodedParams = new URLSearchParams({
        f: "8khz_8bit_mono",
        c: "mp3",
        r: "0",
        src: word,
        b64: "true",
    });

    switch (wordCode) {
        case "ja":
            encodedParams.set("hl", "ja-jp");
            break;
        case "es":
            encodedParams.set("hl", "es-es");
            break;
        case "fr":
            encodedParams.set("hl", "fr-fr");
            break;
        case "hi":
            encodedParams.set("hl", "hi-in");
            break;
        case "ur":
            encodedParams.set("hl", "hi-in");
            break;
        default:
            break;
    }

    try {
        const { data }: { data: string } = await axios.post(
            "https://voicerss-text-to-speech.p.rapidapi.com/",
            encodedParams,
            {
                params: { key: VOICE_RSS_KEY },
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    "X-RapidAPI-Key": RAPID_AI_KEY,
                    "X-RapidAPI-Host": "voicerss-text-to-speech.p.rapidapi.com",
                },
            }
        );

        return data;
    } catch (error) {
        console.log(error);
        throw new Error("An error occured");
    }
};
