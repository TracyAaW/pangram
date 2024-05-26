import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Observable, combineLatest, map, of, tap, withLatestFrom, zip } from 'rxjs';

import { SafeHtmlPipe } from './safe-html.pipe';
import { AppService, LetterStats, SentenceStats } from './app.service';
import { SafeHtml } from '@angular/platform-browser';
import { defaultLetterStats } from './util';

export interface VM {
  sentenceStats: SentenceStats;
  letterStats: LetterStats[];
  selectedChar: string;
  highlightedSentence: SafeHtml | undefined;
}

const VMDefault: VM = {
  sentenceStats: { 
    sentence: '',
    totalAlphas: 0,
    totalVowels: 0,
    totalConsonants: 0,
    isPangram: false,
    isLipogram: false,
    lipogramLetter: null,
    lettersWithHighestCount: [],
    letterCount: { }
  },
  letterStats: defaultLetterStats(),
  selectedChar: '',
  highlightedSentence: undefined
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    SafeHtmlPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pangram';

  private appService: AppService = inject(AppService);

  stats$: Observable<VM> = of(VMDefault);

  ngOnInit(): void {
  }

  letterClicked(letter: LetterStats) {
    this.appService.changeActive(letter);
  }

  inputChanged(evt: any) {
    this.appService.changeSentence(evt.target.value);
  }
 
  generateNewSentence() {
    this.appService.generateSentence();
  }
}
