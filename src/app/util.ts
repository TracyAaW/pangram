import { ALPHABET, CONSONANTS, VOWELS } from "./app.constants";
import { LetterStats } from "./app.service";

export function generateLorem(n = 10) {
  if (typeof n !== 'number' || (typeof n === 'number' && n < 1)) {
    n = 10;
  }

  const words = [
    'lorem',
    'ipsum',
    'dolor',
    'sit',
    'amet',
    'consectetur',
    'adipiscing',
    'elit',
    'vivamus',
    'et',
    'accumsan',
    'augue',
    'duis',
    'eget',
    'nunc',
    'id',
    'sodales',
    'finibus',
    'vestibulum',
    'sagittis',
    'magna',
    'nec',
    'rutrum',
    'volutpat',
    'risus',
    'tincidunt',
    'justo',
    'non',
    'gravida',
    'tortor',
    'enim',
    'in',
    'urna',
    'ut',
    'vel',
    'metus',
    'pellentesque',
    'porttitor',
    'vitae',
    'nisi',
    'nullam',
    'faucibus',
    'condimentum',
    'quam',
    'imperdiet',
    'class',
    'aptent',
    'taciti',
    'sociosqu',
    'ad',
    'litora',
    'torquent',
    'kaput',
    'per',
    'jecur',
    'yatus',
    'conubia',
    'nostra',
    'inceptos',
    'himenaeos',
    'zeta',
    'interdum',
    'malesuada',
    'fames',
    'xenium',
    'ac',
    'ante',
    'primis',
    'curabitur',
    'nibh',
    'warantia',
    'quis',
    'iaculis',
    'cras',
    'mollis',
    'eu',
    'congue',
    'leo',
  ];
  const count = Math.floor(Math.random() * n + 1);
  const sentence: string[] = [];
  const indexes = new Array(count).fill(0).map((index) => {
    return Math.floor(Math.random() * words.length);
  });
  indexes.forEach((index, i) => {
    const word = words[index];
    if (i === 0) {
      sentence.push(word.charAt(0).toUpperCase() + word.substr(1));
    }
    else {
      sentence.push(word);
    }
  });
  return sentence.join(' ').concat('.');
}

export function charCount(phrase: string): number {
  const alphaArray: string[] = ALPHABET.split('');
  const phraseArray: string[] = phrase.replace(' ', '').split('');

  const alphaCount = phraseArray.reduce((acc, cur) => {
    return alphaArray.includes(cur.toLocaleLowerCase()) ? acc + 1 : acc;
  }, 0);
  return alphaCount;
}

export function vowelCount(phrase: string): number {
  const alphaArray: string[] = VOWELS.split('');
  const phraseArray: string[] = phrase.replace(' ', '').split('');

  const alphaCount = phraseArray.reduce((acc, cur) => {
    return alphaArray.includes(cur.toLocaleLowerCase()) ? acc + 1 : acc;
  }, 0);
  return alphaCount;
}

export function consonantCount(phrase: string): number {
  const alphaArray: string[] = CONSONANTS.split('');
  const phraseArray: string[] = phrase.replace(' ', '').split('');

  const alphaCount = phraseArray.reduce((acc, cur) => {
    return alphaArray.includes(cur.toLocaleLowerCase()) ? acc + 1 : acc;
  }, 0);
  return alphaCount;
}

export function letterCount(phrase: string): any {
  const alphaArray: string[] = ALPHABET.split('');
  const phraseArray: string[] = phrase.toLocaleLowerCase().replace(' ', '').split('');

  const alphaCountObj = alphaArray.reduce((acc, cur) => {
    const charArray = phraseArray.filter(char => char === cur);
    return {
      ...acc,
      [cur]: charArray?.length || 0
    }
  }, {});
  return alphaCountObj;
}

export function isPangram(phrase: string) {
  const alphaArray: string[] = ALPHABET.split('');
  const phraseArray: string[] = phrase.toLocaleLowerCase().replace(' ', '').split('');
  const uniqueCharsInPhrase = [...new Set(phraseArray)];
  return alphaArray.every(alpha => uniqueCharsInPhrase.includes(alpha));
}

export function lipogramCharacter(phrase: string): string | null {
  const alphaArray: string[] = ALPHABET.split('');
  const phraseArray: string[] = phrase.toLocaleLowerCase().replace(' ', '').split('');
  const uniqueCharsInPhrase = [...new Set(phraseArray)];
  const missingChars = alphaArray.filter(alpha => !uniqueCharsInPhrase.includes(alpha));
  return missingChars && missingChars.length === 1 ? missingChars[0] : null;
}

export function highestCount(phrase: string): string[] {
  const charCount: {[index: string]: number} = letterCount(phrase);
  let highestCount = 0;
  const highestArray: string[] = Object.keys(charCount).reduce((acc: string[], cur: string) => {
    const currentCount: number = charCount[cur];
    if (currentCount > highestCount) {
      highestCount = currentCount;
      return [
        cur
      ];
    }

    if (currentCount === highestCount && highestCount !== 0) {
      return [
        ...acc,
        cur
      ]
    }
    return [
      ...acc
    ];
  }, [] as string[]);
  return highestArray;
}

export function defaultLetterStats(): LetterStats[] {
  const alphaArray: string[] = ALPHABET.split('');
  const letterStats: LetterStats[] = alphaArray.reduce((acc: LetterStats[], curr: string) => {
    const letterStat: LetterStats = {
      char: curr,
      count: 0,
      hasHighestCount: false
    }
    return [
      ...acc,
      letterStat
    ]
  }, [])

  return letterStats;
}
