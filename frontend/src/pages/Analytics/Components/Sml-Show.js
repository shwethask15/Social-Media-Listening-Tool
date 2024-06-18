import React from 'react';
import '../style//smlShow.css';
import twitterLogo from '../assets/twitter.png';

const getIconWithTooltip = (type, value) => {
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
        <span title={description} >
            {icon}
        </span>
    );
};

const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split('T')[0];
    const formattedTime = date.toLocaleTimeString();
    return `${formattedDate} ${formattedTime}`;
};

const smlShow = ({ item }) => {
    const { sentiment, mention_updated_date, impact_index, virality, severity, snippet, country_name, two_digit_country_code, url } = item;

    return (
        <div className="sml-show">
      <div className="sml-show-header">
        <span>
          <img src={twitterLogo} alt="Twitter Logo" style={{ width: '10px', height: '10px', marginRight: '5px' }} />
          {formatDateTime(mention_updated_date)} |
          {getIconWithTooltip('severity', severity)} |
          {getIconWithTooltip('virality', virality)} |
          {getIconWithTooltip('sentiment', sentiment)}
        </span>
      </div>
      <div className="sml-show-content">
        <p>{snippet}</p>
      </div>
      <div className="sml-show-footer">
        {/* <span>{country_name || 'Unknown'}</span> */}
        <span>{two_digit_country_code || 'Unknown'}</span>
        <a href={url} target="_blank" rel="noopener noreferrer">🔗</a>
      </div>
    </div>
    );
}

export default smlShow;