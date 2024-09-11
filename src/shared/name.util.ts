import { alphabets } from "./constants";

export const getNameFirstLetter=(name:string)=>{
    const firstLetter = name.charAt(0).toLowerCase();
    return alphabets.filter((item: {letter: string, bgColor: string}) => (item.letter)?.toLowerCase() === firstLetter)[0];
}