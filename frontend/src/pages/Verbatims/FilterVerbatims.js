// filterVerbatims.js

const filterVerbatims = (verbatimData, filters) => {
    return verbatimData.filter((item) => {
      const brandMatch = filters.brands.includes(item.brand);
      const regionMatch = filters.regions.includes(item.location);
      const sourceMatch = filters.sources.includes(item.icon);
      const sentimentMatch = filters.sentiments.includes(item.sentiment);
      const viralityMatch = filters.viralities.includes(item.virality);
      const severityMatch = filters.severities.includes(item.severity);
      const languageMatch = filters.languages.includes(item.language);
  
      return (
        brandMatch &&
        regionMatch &&
        sourceMatch &&
        sentimentMatch &&
        viralityMatch &&
        severityMatch &&
        languageMatch
      );
    });
  };
  
  export default filterVerbatims;
  