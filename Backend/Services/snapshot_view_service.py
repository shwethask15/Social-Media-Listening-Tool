from collections import defaultdict
from crud.crud_snapshot_view import all_views
from crud import base
import logging
from typing import List,Dict
from sqlalchemy.orm import Session
from models.verbatims_list import Verbatims_List as VerbatimModel
from schemas.verbatims_list_schema import Verbatims_List_create
from schemas.snapshot_view_schema import AggregatedResponse,SentimentCounts,Counts,CountryData,FilteredResponse

class VerbatimService:
    def __init__(self, db: Session):
        self.db = db

    # def get_filtered_verbatims(self, country: str = None, brand: str = None, datasource: str = None, source: str = None) -> List[Verbatims_List_create]:
    #     """
    #     Retrieve verbatims filtered by country, brand, datasource, and source.
    #     """
    #     query = self.db.query(VerbatimModel)

    #     if country:
    #         query = query.filter(VerbatimModel.country == country)
    #     if brand:
    #         query = query.filter(VerbatimModel.brand == brand)
    #     if datasource:
    #         query = query.filter(VerbatimModel.datasource == datasource)
    #     if source:
    #         query = query.filter(VerbatimModel.source == source)

    #     verbatims = query.all()
    #     return [Verbatims_List_create.from_orm(verbatim) for verbatim in verbatims]

#function to fetch particular filter data
    def aggregate_counts(self, data, filter_by) -> FilteredResponse:
        """
        Aggregate counts based on the filter type for each country.
        """
        country_data: Dict[str, Dict[str, int]] = defaultdict(lambda: {
            "High": 0, "Medium": 0, "Low": 0
        } if filter_by != "sentiment" else {"Positive": 0, "Negative": 0,"Neutral":0})

        for verbatim in data:
            country = verbatim.country
            if country:
                if filter_by == "virality" and verbatim.virality in country_data[country]:
                    country_data[country][verbatim.virality] += 1
                elif filter_by == "severity" and verbatim.severity in country_data[country]:
                    country_data[country][verbatim.severity] += 1
                elif filter_by == "sentiment" and verbatim.sentiment in ["Positive", "Negative","Neutral"]:
                    country_data[country][verbatim.sentiment] += 1

        result = [
            CountryData(
                country=country,
                **{f"{filter_by}_counts": Counts(**data) if filter_by != "sentiment" else SentimentCounts(**data)}
            )
            for country, data in country_data.items()
        ]

        return FilteredResponse(**{filter_by: result})
    
   
#function to fetch the data from database
    def get_filtered_data(self, filter_name: str) -> List[VerbatimModel]:
        """
        Retrieve data filtered by the given filter name.
        """
        query = self.db.query(VerbatimModel)
        if filter_name.lower() != "all":
            query = query.filter(getattr(VerbatimModel, filter_name).isnot(None))
        return query.all()
    
#function to fetch the data of all the filters together.
    def aggregate_all_counts(self,data: List[VerbatimModel]) -> AggregatedResponse:
        country_data = defaultdict(lambda: {
            "virality": {"High": 0, "Medium": 0, "Low": 0},
            "severity": {"High": 0, "Medium": 0, "Low": 0},
            "sentiment": {"Positive": 0, "Negative": 0, "Neutral": 0}
        })

        for verbatim in data:
            country = verbatim.country
            if country:
                if verbatim.virality in country_data[country]["virality"]:
                    country_data[country]["virality"][verbatim.virality] += 1
                if verbatim.severity in country_data[country]["severity"]:
                    country_data[country]["severity"][verbatim.severity] += 1
                if verbatim.sentiment in country_data[country]["sentiment"]:
                    country_data[country]["sentiment"][verbatim.sentiment] += 1

        result = [
            CountryData(
                country=country,
                virality_counts=Counts(**data["virality"]),
                severity_counts=Counts(**data["severity"]),
                sentiment_counts=SentimentCounts(**data["sentiment"])
            )
            for country, data in country_data.items()
        ]

        return AggregatedResponse(all=result)
