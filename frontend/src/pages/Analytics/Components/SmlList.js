import React from 'react';
import SmlShow from './Sml-Show'

const data = [
    {
        "impact_index": "Medium",
        "virality": "High",
        "severity": "Low",
        "updated_at": "2022-03-22 15:00:00",
        "sentiment": "Negative",
        "three_digit_country_code": "GBR",
        "two_digit_country_code": "GB",
        "source": "twitter",
        "url": "http://twitter.com/velvetgh0st/statuses/1506278011963850768",
        "mention_id": "fe6341995e396d4dcb097685f457a933",
        "snippet": "@georgiamariexo Nellie will only eat royal canin kibbles, he’s super fussy too but RC is really good for them and they have so many options for breed/health issues which he has so i can’t complain! Maybe try a treat sized bag? ??",
        "all_combined_wt": 1.49,
        "mention_updated_date": "2022-03-22 14:40:56.917",
        "brand": "Royal Canin",
        "country_name": "United Kingdom of Great Britain & Northern Ireland",
        "theme": "Health/Diet",
        "originalURL": "http://twitter.com/velvetgh0st/statuses/1506278011963850768"
    },
    {
        "impact_index": "Medium",
        "virality": "Low",
        "severity": "Low",
        "updated_at": "2022-03-22 17:57:51.280",
        "sentiment": "Neutral",
        "three_digit_country_code": "GBR",
        "two_digit_country_code": "GB",
        "source": "twitter",
        "url": "http://twitter.com/mieniaisacat/statuses/1506328474440675340",
        "mention_id": "310e66b8a8c3be0c3933707c1ef26eca",
        "snippet": "Like It?? from Dogs in Amazon SalesRank No.3?? IAMS PROACTIVE HEALTH Adult Minichunks … Adult Dry Dog Food: Give your dog the nutrition they need in the small kibble si… https://t.co/VlCZAmlBW4",
        "all_combined_wt": 1.39,
        "mention_updated_date": "2022-03-22 14:40:56.817",
        "brand": " IAMS",
        "country_name": "United Kingdom of Great Britain & Northern Ireland",
        "theme": "Health/Diet",
        "originalURL": "http://twitter.com/mieniaisacat/statuses/1506328474440675340"
    },
    {
        "impact_index": "Low",
        "virality": "Medium",
        "severity": "Low",
        "updated_at": "2022-03-22 17:43:58.183",
        "sentiment": "Positive",
        "three_digit_country_code": "GBR",
        "two_digit_country_code": "GB",
        "source": "twitter",
        "url": "http://twitter.com/IAMS/statuses/1506324910158790666",
        "mention_id": "3189ccc20212b8454d0a28e48ff16fc9",
        "snippet": "@Nutshidaddy Hello! We would love for you to reach out to us via DM if there are any questions that we could get answered for you.",
        "all_combined_wt": 1.29,
        "mention_updated_date": "2022-03-22 17:43:59.817",
        "brand": " Other",
        "country_name": "United Kingdom of Great Britain & Northern Ireland",
        "theme": "Sponsorship/Donation",
        "originalURL": "http://twitter.com/IAMS/statuses/1506324910158790666"
    },
    {
        "impact_index": "Medium",
        "virality": "Low",
        "severity": "Low",
        "updated_at": "2022-03-22 17:36:36.910",
        "sentiment": "Neutral",
        "three_digit_country_code": "USA",
        "two_digit_country_code": "US",
        "source": "news",
        "url": "http://www.shipnc.com/online_features/family_living/article_0540d5e2-8ccc-5f43-801d-b4013877f66c.html",
        "mention_id": "ede890d5c597514d4d4788c7b96f1918",
        "snippet": "..., seasonal foods, your fur baby can have quality time on patios with you, too. To help make pets welcome in more places, Mars Petcare established the BETTER CITIES FOR PETS™ program, which works with local businesses and governments to encourage pet-friendliness. 4. Make New Friends – Give your pet the freedom to run around a dog park and socialize...",
        "all_combined_wt": 1.19,
        "mention_updated_date": "2022-03-22 17:36:37.910",
        "brand": " Other",
        "country_name": "United States of America",
        "theme": "Sponsorship/Donation",
        "originalURL": "http://www.shipnc.com/online_features/family_living/article_0540d5e2-8ccc-5f43-801d-b4013877f66c.html"
    },
    {
        "impact_index": "Low",
        "virality": "High",
        "severity": "Low",
        "updated_at": "2022-03-23 02:00:00",
        "sentiment": "Neutral",
        "three_digit_country_code": "IND",
        "two_digit_country_code": "IN",
        "source": "twitter",
        "url": "http://twitter.com/ZeroT_H/statuses/1506454136509804544",
        "mention_id": "1933d7f6975ab741307c499c59bae0bd",
        "snippet": "@puppkittyfan1 Don't care,worth it if i can pet smol puppo",
        "all_combined_wt": 1,
        "mention_updated_date": "2022-03-23 02:17:50.237",
        "brand": "Puppo",
        "country_name": "India",
        "theme": "Availability",
        "originalURL": "http://twitter.com/ZeroT_H/statuses/1506454136509804544"
    }
];

const SmlList = () => {
    let count = data.length
    return (
        <div>
            <div className='smlHeading'>
                <p>Live Trending Verbatims - SML</p>
                <p>Count: {count}</p>
            </div>
            <div>
            {data.map((item, index) => (
                <SmlShow key={index} item={item} />
            ))}
            </div>
        </div>
    );
}

export default SmlList;
