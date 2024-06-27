from crud.crud_trend_analysis import verbatim_count,virality_count,sentiment_count,severity_count
from sqlalchemy.orm import Session

async def get_trend_analysis1(type : str,db : Session):
    if type == "verbatim_count":
        data = verbatim_count.get_all(db=db)
        temp = {"april":[],"may":[],"june":[]}
        for i in data:
            temp1 = i.__dict__
            # print(temp["april"])
            if temp1["date"][4] == "4":
                temp["april"].append(i)
            elif temp1["date"][4] == "5":
                temp["may"].append(i)
            elif temp1["date"][4] == "6":
                temp["june"].append(i)
        return temp
    elif type == "virality_count":
        data = virality_count.get_all(db=db)
        temp = {"april":[],"may":[],"june":[]}
        for i in data:
            temp1 = i.__dict__
            # print(temp["april"])
            if temp1["date"][4] == "4":
                temp["april"].append(i)
            elif temp1["date"][4] == "5":
                temp["may"].append(i)
            elif temp1["date"][4] == "6":
                temp["june"].append(i)
        return temp
    elif type == "severity_count":
        data = severity_count.get_all(db=db)
        temp = {"april":[],"may":[],"june":[]}
        for i in data:
            temp1 = i.__dict__
            # print(temp["april"])
            if temp1["date"][4] == "4":
                temp["april"].append(i)
            elif temp1["date"][4] == "5":
                temp["may"].append(i)
            elif temp1["date"][4] == "6":
                temp["june"].append(i)
        return temp
    elif type == "sentiment_count":
        data = sentiment_count.get_all(db=db)
        temp = {"april":[],"may":[],"june":[]}
        for i in data:
            temp1 = i.__dict__
            # print(temp["april"])
            if temp1["date"][4] == "4":
                temp["april"].append(i)
            elif temp1["date"][4] == "5":
                temp["may"].append(i)
            elif temp1["date"][4] == "6":
                temp["june"].append(i)
        return temp