from sqlalchemy import Column,Integer,String,Float,Boolean # type: ignore

from database.base import Base


class Live_Verbatims_List(Base):
    __tablename__="live_verbatims_list"
    mention_id= Column(String,primary_key=True,nullable=False)
    virality= Column(String, nullable=False)
    severity= Column(String, nullable=False)
    snippet= Column(String, nullable=False)
    impact_index= Column(String, nullable=False)
    all_combined_wt=Column(Float,nullable=False)
    updated_at= Column(String, nullable=False)
    mention_updated_date= Column(String, nullable=False)
    sentiment= Column(String, nullable=False)
    brand= Column(String, nullable=False)
    three_digit_country_code= Column(String, nullable=False)
    country_name= Column(String, nullable=False)
    two_digit_country_code= Column(String, nullable=False)
    theme= Column(String, nullable=False)
    source= Column(String, nullable=False)
    originalURL= Column(String, nullable=False)
    url= Column(String, nullable=False)

    def serialize(self):
        return {
            "mention_id": self.mention_id,
            "virality": self.virality,
            "severity": self.severity,
            "snippet": self.snippet,
            "impact_index":self.impact_index,
            "all_combined_wt":self.all_combined_wt,
            "updated_at":self.updated_at,
            "mention_updated_date":self.mention_updated_date,
            "sentiment":self.sentiment,
            "brand":self.brand,
            "three_digit_country_code":self.three_digit_country_code,
            "country_name":self.country_name,
            "two_digit_country_code":self.two_digit_country_code,
            "theme":self.theme,
            "source":self.source,
            "originalURL":self.originalURL,
            "url":self.url      
        }
