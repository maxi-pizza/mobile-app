import levenshtein from 'js-levenshtein';
export function fuzzySearch<El extends Record<string, unknown>>(
  array: El[],
  searchArg: string,
  getValue: (el: El) => string,
) {
  const computeBestScore = (
    el: El,
  ): El & {
    bestScore: number;
    partialMatch: boolean;
  } => {
    let value = getValue(el).toLowerCase();
    let search = searchArg.toLowerCase();

    const words = value.split(' ');
    const searchWords = search.split(' ');

    let bestScore = 1000;
    let partialMatch = false;

    if (value.includes(search)) {
      partialMatch = true;
    }

    for (let i = 0; i < words.length; i++) {
      for (let j = 0; j < searchWords.length; j++) {
        const score = levenshtein(searchWords[j], words[i]);
        if (bestScore > score) {
          bestScore = score;
        }
      }
    }

    return {...el, bestScore, partialMatch};
  };

  return array
    .map(computeBestScore)
    .filter(product => product.partialMatch || product.bestScore)
    .sort((a, b) => a.bestScore - b.bestScore)
    .sort((a, b) =>
      a.partial_match === b.partial_match ? 0 : a.partial_match ? -1 : 1,
    );
}
