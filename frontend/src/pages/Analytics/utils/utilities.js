import twitterLogo from '../assets/twitter.png';
import newsLogo from '../assets/news.png';

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toISOString().split('T')[0];
  const formattedTime = date.toLocaleTimeString();
  return `${formattedDate} ${formattedTime}`;
};

export const getIconWithTooltip = (type, value) => {
  let icon;
  let description;

  switch (type) {
    case 'severity':
      switch (value) {
        case 'Low':
          icon = '🟡';
          description = `Low Severity`;
          break;
        case 'Medium':
          icon = '🟠';
          description = `Medium Severity`;
          break;
        case 'High':
          icon = '🔴';
          description = `High Severity`;
          break;
        default:
          icon = '⚪';
          description = `Unknown Severity`;
      }
      break;
    case 'virality':
      switch (value) {
        case 'Low':
          icon = '🔊';
          description = 'Low Virality';
          break;
        case 'Medium':
          icon = '🔊';
          description = 'Medium Virality';
          break;
        case 'High':
          icon = '🔊';
          description = 'High Virality';
          break;
        default:
          icon = '🔊';
          description = 'Unknown Virality';
      }
      break;
    case 'sentiment':
      switch (value) {
        case 'Positive':
          icon = '😊';
          description = 'Positive Sentiment';
          break;
        case 'Negative':
          icon = '😡';
          description = 'Negative Sentiment';
          break;
        case 'Neutral':
        default:
          icon = '😐';
          description = 'Neutral Sentiment';
      }
      break;
    default:
      icon = '⚪';
      description = 'Unknown type';
  }
  return (
    <span title={description}>
      {icon}
    </span>
  );
};

export const getSourceIcon = (source) => {
  switch (source.toLowerCase()) {
    case 'twitter':
      return <img src={twitterLogo} alt="Twitter Logo" className='Sourceicon' title="Twitter" />;
    case 'news':
      return <img src={newsLogo} alt="News Logo" className='Sourceicon' title="News" />;
    default:
      return null;
  }
};
