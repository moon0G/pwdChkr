import csv
import sqlite3 as sql
import os

class handler:
    def __init__(self):
        self.path = os.path.dirname(os.path.realpath(__file__)).replace("databaseHandler", "data")

        if not os.path.exists(self.path + "\\cpudata.db"):
            open(self.path + "\\cpudata.db", 'w')
            
            self.conn = sql.connect(self.path + "\\cpudata.db")

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

            with open(self.path + "\\cpudata.csv", 'r') as cf:
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
            self.conn = sql.connect(self.path + "\\cpudata.db")

    def query(self, query, spec):
        if os.path.exists(self.path + "\\cpudata.db"):
            exe = "SELECT * FROM cpus WHERE CPU LIKE '%" + query + "%'"
            res = self.conn.cursor().execute(exe).fetchall()

            ret = []
            if spec < 0:
                for row in res:
                    ret.append(row)
            else:
                for row in res:
                    ret.append((row[1], row[spec]))

        return ret