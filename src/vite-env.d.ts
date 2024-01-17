/// <reference types="vite/client" />

type Language = {
    name: string;
    code: LangType;
    details: string;
};

type LangType = "hi" | "ja" | "es" | "fr" | "ur";

type WordType = {
    word: string;
    meaning: string;
    options: string[];
};

type StateType = {
    loading: boolean;
    result: string[];
    words: WordType[];
    error?: string;
};

type generatedWord = {
    text: string;
};

type translatedType = {
    text: string;
    to: string;
};

type fetchedDataType = {
    detectionLanguage: {
        language: string;
        score: number;
    };
    translations: translatedType[];
};
