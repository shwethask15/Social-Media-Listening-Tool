const filterVerbatims = (verbatimData, filters) => {
  return verbatimData.filter((item) => {
    const brandMatch = !filters.brands.length || filters.brands.includes(item.brand);
    const regionMatch = !filters.regions.length || filters.regions.includes(item.location);
    const sourceMatch = !filters.sources.length || filters.sources.includes(item.source);
    const sentimentMatch = !filters.sentiments.length || filters.sentiments.includes(item.sentiment);
    const viralityMatch = !filters.viralities.length || filters.viralities.includes(item.virality);
    const severityMatch = !filters.severities.length || filters.severities.includes(item.severity);
    const languageMatch = !filters.languages.length || filters.languages.includes(item.language);

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
