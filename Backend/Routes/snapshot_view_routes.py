from fastapi import APIRouter, Depends, HTTPException, Request, Query # type: ignore
from sqlalchemy.orm import Session # type: ignore
from typing import Optional,Union
from database.session import get_db
from database.session import engine
from schemas.snapshot_view_schema import AggregatedResponse, FilteredResponse
from Services.snapshot_view_service import  VerbatimService
from sqlalchemy import Column, Integer, String, create_engine, text # type: ignore
import re
from collections import Counter
from fastapi.responses import JSONResponse # type: ignore
import nltk
from nltk.corpus import stopwords



router = APIRouter()

    
@router.get("/analytics/snapshot_view/{filter_name}", response_model=Union[AggregatedResponse, FilteredResponse])
async def get_aggregated_verbatims(filter_name: str, db: Session = Depends(get_db)):
    """
    Endpoint to retrieve aggregated counts of all, virality, severity, and sentiment for each country.
    """
    valid_filters = ["all","virality","severity","sentiment"]
    if filter_name.lower() not in valid_filters:
        raise HTTPException(status_code=400, detail="Invalid filter name")
    
    verbatim_service = VerbatimService(db)
    data =await verbatim_service.get_filtered_data(filter_name)
    if filter_name.lower()!="all":
         aggregated_data = await verbatim_service.aggregate_counts(data, filter_by=filter_name)
         return aggregated_data
    else:
        aggregated_data = await verbatim_service.aggregate_all_counts(data)
        return aggregated_data 
  

# Download NLTK stop words data 
# nltk.download('stopwords')
# Set of NLTK English stop words
stop_words = set(stopwords.words('english'))

from nltk.stem import WordNetLemmatizer
# nltk.download('wordnet')

lemmatizer = WordNetLemmatizer()

@router.get("/analytics/snapshot_view/topic_filter/")
async def get_word_counts(request: Request, brand: str = None, theme: str = None,  db: Session = Depends(get_db)):
    # Start with base query to get all verbatims
    query = "SELECT translated_snippet FROM verbatims_list"
    # Apply filters if brand and theme are provided
    if brand:
        query += f" WHERE TRIM(brand)= '{brand.strip()}'"
        if theme:
            query += f" AND TRIM(theme) = '{theme.strip()}'"
    # Execute query
    with engine.connect() as conn:
        result = conn.execute(text(query))
        # Initialize word counter
        word_counter = Counter()


        # Process query results
        for row in result:
            translated_snippet = row[0]  # Access the first element of the tuple
            # Tokenize and filter out numbers, stopwords, and lemmatize using NLTK
            words = re.findall(r'\b[^\d\W]+\b', translated_snippet.lower())
            filtered_words = [lemmatizer.lemmatize(word) for word in words if word not in stop_words and (not brand or word.lower() not in brand.lower())]
            # Update counter with filtered words
            word_counter.update(filtered_words)
    # Sort words by count in descending order
    sorted_word_counts = sorted(word_counter.items(), key=lambda item: item[1], reverse=True)
    # Get top 50 most repeated words (excluding stop words)
    top_50_most_repeated = sorted_word_counts[:50]
    # Prepare response data
    response_data = {
        "top_50_most_repeated_words": top_50_most_repeated
    }
    # Return JSON response
    return JSONResponse(content=response_data)
