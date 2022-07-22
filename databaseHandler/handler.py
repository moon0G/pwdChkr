import csv
import sqlite3 as sql
import os

class handler:
    def __init__(self):    
        if not os.path.exists("../data/cpudata.db"):
            open("../data/cpudata.db", 'w')
            
            self.conn = sql.connect("cpudata.db")

            self.conn.cursor().execute("""\
                CREATE TABLE cpus(
                    ID INTEGER PRIMARY KEY UNIQUE,
                    CPU TEXT,
                    CodeName TEXT,
                    RevealDate TEXT,
                    Clock TEXT,
                    SocketArch TEXT,
                    Process TEXT,
                    Cache TEXT,
                    Wattage TEXT,
                    ReleaseDate TEXT
                );
            """)

            with open("../data/cpudata.csv", 'r') as cf:
                reader = csv.DictReader(cf)
                query = "INSERT INTO cpus VALUES (?,?,?,?,?,?,?,?,?,?)"

                for row in reader:
                    self.conn.execute(query,(
                                      row["ID"], row["CPU"],
                                      row["CodeName"], row["RevealDate"],
                                      row["Clock"], row["SocketArch"],
                                      row["Process"], row["Cache"],
                                      row["Wattage"], row["ReleaseDate"]
                    ))
                self.conn.commit()
        else:
            self.conn = sql.connect("cpudata.db")

    def query(self, query):
        if os.path.exists("../data/cpudata.db"):
            exe = "SELECT * FROM cpus WHERE CPU LIKE '%" + query + "%'"
            res = self.conn.cursor().execute(exe).fetchall()
            for row in res:
                print(f"{row[1]}: {row[4]}")