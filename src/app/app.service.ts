import { Injectable } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';


import { PANGRAM } from './app.constants';
import { generateLorem } from './util';

export interface SentenceStats {
  sentence: string;
  totalAlphas: number;
  totalVowels: number;
  totalConsonants: number;
  isPangram: boolean;
  isLipogram: boolean;
  lipogramLetter: string | null;
  lettersWithHighestCount: string[];
  letterCount: { [key: string]: number};
}

export interface LetterStats {
  char: string;
  count: number;
  hasHighestCount: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AppService {

  changeSentence(input: string) {
  }

  changeActive(active: LetterStats) {
  }


  generateSentence() {
    const newSentence = generateLorem(150) || PANGRAM;
  }
}