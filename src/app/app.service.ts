import { Injectable } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';


import { PANGRAM } from './app.constants';
import { charCount, consonantCount, generateLorem, highestCount, isPangram, letterCount, lipogramCharacter, vowelCount } from './util';
import { BehaviorSubject, Observable, map, scan, withLatestFrom } from 'rxjs';

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

  private sentenceSubject = new BehaviorSubject<string>(PANGRAM);
  public sentence$: Observable<string> = this.sentenceSubject.asObservable();

  private selectedCharSubject = new BehaviorSubject<string>('');
  public selectedChar$: Observable<string> = this.selectedCharSubject.asObservable().pipe(
    scan((acc: string, curr: string) => acc === curr ? '' : curr,'')
  );

  highlightedSentence$: Observable<SafeHtml | undefined> = this.selectedChar$.pipe(
    withLatestFrom(this.sentence$),
    map(([selectedChar, sentence]: [string, string]) => {
      let result = undefined;

      if (selectedChar.trim()) {
        // Match in a case insensitive manner
        const re = new RegExp(selectedChar, 'gi');
        const match = sentence.match(re);
  
        // If there's no match, just return the original value.
        if (match) {
          const replacedValue = sentence.replace(re, (match: string) => {
            return `<mark>${match}</mark>`;
          })
          result = replacedValue as SafeHtml;
        }
      }

      return result;
    })
  )

  sentenceStats$: Observable<SentenceStats> = this.sentence$.pipe(
    map((sentence: string) => {
      const lipo = lipogramCharacter(sentence);
      return {
        sentence,
        totalAlphas: charCount(sentence),
        totalVowels: vowelCount(sentence),
        totalConsonants: consonantCount(sentence),
        isPangram: isPangram(sentence),
        lipogramLetter: lipo,
        isLipogram: !!lipo,
        lettersWithHighestCount: highestCount(sentence),
        letterCount: letterCount(sentence)
      } as SentenceStats
    })
  )

  letterStats$: Observable<LetterStats[]> = this.sentenceStats$.pipe(
    map((sentenceStats: SentenceStats) => {
      const alphas = Object.keys(sentenceStats.letterCount);

      const result: LetterStats[] = alphas.reduce((acc: LetterStats[], curr: string) => {
        const letterStat: LetterStats = {
          char: curr,
          count: sentenceStats.letterCount[curr],
          hasHighestCount: sentenceStats.lettersWithHighestCount.includes(curr)
        }

        return [
          ...acc,
          letterStat
        ]
      }, []);

      return result;
    })
  )

  changeSentence(input: string) {
    this.sentenceSubject.next(input);
  }

  changeActive(active: LetterStats) {
    if (active.count > 0) {
      this.selectedCharSubject.next(active.char);
    }
  }


  generateSentence() {
    const newSentence = generateLorem(150) || PANGRAM;
    this.sentenceSubject.next(newSentence);
    this.selectedCharSubject.next('');
  }
}