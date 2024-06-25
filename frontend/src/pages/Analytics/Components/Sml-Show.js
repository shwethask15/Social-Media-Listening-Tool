import React from 'react';
import { formatDateTime, getIconWithTooltip, getSourceIcon } from '../utils/utilities';
import '../style/smlShow.css';

const SmlShow = ({ item }) => {
    const { sentiment, mention_updated_date, impact_index, virality, severity, snippet, country_name, two_digit_country_code, url, source } = item;

    return (
        <div className="sml-show">
            <div className="sml-show-header">
                <span>
                    {getSourceIcon(source)} |
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
                <span>🌎 {country_name || 'Unknown'}</span>
                <a href={url} target="_blank" rel="noopener noreferrer">🔗</a>
            </div>
        </div>
    );
};

export default SmlShow;
