from pydantic import BaseModel # type: ignore

class Alert_Create(BaseModel):
    date: str
    originalUrl: str
    mention: str
    theme: str

class Alert_filters(BaseModel):
    AdvertisingORPromotion:str
    Availability:str
    HealthDiet:str
    PAVarietyvariant:str
    PP_Package:str
    SponsorshipDonation:str
    