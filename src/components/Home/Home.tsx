import { useState } from "react";
import { Link } from "react-router-dom";
import { MouseEvent } from "react";
import { fetchWords } from "../../redux/slices/slices";
import { useAppDispatch } from "../../redux/store";

const languages: Language[] = [
    {
        name: "Japanese",
        code: "ja",
        details:
            "Japanese is the principal language of the Japonic language family spoken by the Japanese people. It has around 128 million speakers, primarily in Japan, the only country where it is the national language, and within the Japanese diaspora worldwide. The Japonic family also includes the Ryukyuan languages and the variously classified Hachijō language. There have been many attempts to group the Japonic languages with other families such as the Ainu, Austroasiatic, Koreanic, and the now-discredited Altaic, but none of these proposals has gained widespread acceptance. ",
    },
    {
        name: "Hindi",
        code: "hi",
        details:
            "Modern Standard Hindi, commonly referred to as Hindi, is an Indo-Aryan language spoken chiefly in North India, and serves as the lingua franca of the Hindi Belt region encompassing parts of northern, central, eastern, and western India. Hindi has been described as a standardised and Sanskritised register of the Hindustani language, which itself is based primarily on the Khariboli dialect of Delhi and neighbouring areas of North India. Hindi, written in the Devanagari script, is one of the two official languages of the Government of India, along with English. It is an official language in nine states and three union territories and an additional official language in three other states. Hindi is also one of the 22 scheduled languages of the Republic of India.",
    },
    {
        name: "Urdu",
        code: "ur",
        details:
            "Urdu is an Indo-Aryan language spoken chiefly in South Asia. It is the national language and lingua franca of Pakistan, where it is also an official language alongside English. In India, Urdu is an Eighth Schedule language whose status and cultural heritage is recognised by the Constitution of India and it also has an official status in several Indian states. In Nepal, Urdu is a registered regional dialect and in South Africa it is a protected language in the constitution. It is also spoken as a minority language in Afghanistan and Bangladesh, with no official status. ",
    },
    {
        name: "Spanish",
        code: "es",
        details:
            "Spanish (español) or Castilian (castellano) is a Romance language of the Indo-European language family that evolved from the Vulgar Latin spoken on the Iberian Peninsula of Europe. Today, it is a global language with about 500 million native speakers, mainly in the Americas and Spain, and circa 600 million when including speakers as a second language. Spanish is the official language of 20 countries. It is also one of the six official languages of United Nations. Spanish is the world's second-most spoken native language after Mandarin Chinese, the world's fourth-most spoken language overall after English, Mandarin Chinese, and Hindustani (Hindi-Urdu); and the world's most widely spoken Romance language. The country with the largest population of native speakers is Mexico.",
    },
    {
        name: "French",
        code: "fr",
        details:
            "French is a Romance language of the Indo-European family. It descended from the Vulgar Latin of the Roman Empire, as did all Romance languages. French evolved from Gallo-Romance, the Latin spoken in Gaul, and more specifically in Northern Gaul. Its closest relatives are the other langues d'oïl—languages historically spoken in northern France and in southern Belgium, which French (Francien) largely supplanted. French was also influenced by native Celtic languages of Northern Roman Gaul like Gallia Belgica and by the (Germanic) Frankish language of the post-Roman Frankish invaders. Today, owing to the French colonial empire, there are numerous French-based creole languages, most notably Haitian Creole. A French-speaking person or nation may be referred to as Francophone in both English and French. ",
    },
];

function Home() {
    const [languageDetail, setLanguageDetail] = useState<string>("");

    const dispatch = useAppDispatch();

    const appendDetail = function (
        e: MouseEvent<HTMLAnchorElement>,
        langDetail: string
    ): void {
        e.preventDefault();
        setLanguageDetail(langDetail);
    };

    const fetchAndSetState = function (langCode: LangType) {
        dispatch(fetchWords(langCode));
    };

    return (
        <>
            <div className="home flex  flex-col items-center justify-center px-3 text-center font-mono">
                <h1 className="mb-5 mt-10  max-w-[500px] text-wrap text-4xl font-bold">
                    Welcome! Begin your Journey of learning.
                </h1>
                <div className="lang-btn-container flex flex-wrap items-center justify-center gap-5">
                    {languages.map((lang) => {
                        return (
                            <Link
                                to={`/learn?language=${lang.code}`}
                                className="btn"
                                key={lang.code}
                                onClick={() => fetchAndSetState(lang.code)}
                                onMouseOver={(
                                    e: MouseEvent<HTMLAnchorElement>
                                ) => appendDetail(e, lang.details)}
                            >
                                {lang.name}
                            </Link>
                        );
                    })}
                </div>
                <p className="my-5">Choose language you want to learn.</p>
                <div className="lang-detail mt-5 max-w-[600px] px-2 pb-10 md:py-2">
                    <p>{languageDetail}</p>
                </div>
            </div>
        </>
    );
}

export default Home;
