interface SearchResult {
  title: string;
  description: string;
  url: string;
  category: string;
  score: number;
}

export function searchArticles(query: string, articles: any[]): SearchResult[] {
  const searchTerms = query.toLowerCase().split(' ');
  
  return articles
    .map(article => {
      const titleScore = getMatchScore(article.title.toLowerCase(), searchTerms);
      const descriptionScore = getMatchScore(article.description.toLowerCase(), searchTerms);
      const categoryScore = getMatchScore(article.category.toLowerCase(), searchTerms);
      
      const totalScore = titleScore * 3 + descriptionScore * 2 + categoryScore;
      
      return {
        ...article,
        score: totalScore
      };
    })
    .filter(article => article.score > 0)
    .sort((a, b) => b.score - a.score);
}

function getMatchScore(text: string, searchTerms: string[]): number {
  return searchTerms.reduce((score, term) => {
    if (text.includes(term)) {
      // Exact match gets higher score
      score += term.length * 2;
      
      // Bonus for word boundary matches
      if (new RegExp(`\\b${term}\\b`).test(text)) {
        score += 5;
      }
    }
    return score;
  }, 0);
}

export function highlightMatches(text: string, query: string): string {
  if (!query) return text;
  
  const searchTerms = query.toLowerCase().split(' ');
  let highlightedText = text;
  
  searchTerms.forEach(term => {
    const regex = new RegExp(`(${term})`, 'gi');
    highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
  });
  
  return highlightedText;
}
