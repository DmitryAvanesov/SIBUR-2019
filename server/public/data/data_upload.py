import datetime
import pandas as pd
import time
import pathlib

DATA_DIR = pathlib.Path("./")
start_train_date = '2019-02-13 08:30:00'
delta = (datetime.datetime.now()-pd.to_datetime(start_train_date))
delta = int(delta.round('1min').total_seconds()/60)
skiprows = delta
nrows = 1500
data = pd.read_csv(DATA_DIR.joinpath("activity_train.csv"),
                         parse_dates=["date"], index_col="date",
                        skiprows = range(1, skiprows+1-nrows), nrows = nrows
           )

data.to_csv('data.csv')