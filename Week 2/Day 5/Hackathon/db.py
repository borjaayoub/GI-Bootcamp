import psycopg2
from psycopg2 import sql
from datetime import datetime
from dotenv import load_dotenv
import os

load_dotenv()

DB_NAME = os.getenv("DB_NAME")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_USER = os.getenv("DB_USER") 
DB_PASS = os.getenv("DB_PASS")

def get_db_connection():
    return psycopg2.connect(
        dbname=DB_NAME,
        host=DB_HOST,
        port=DB_PORT,
        user=DB_USER,
        password=DB_PASS
    )

def create_games_table():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
                CREATE TABLE IF NOT EXISTS games (
                    id SERIAL PRIMARY KEY,
                    player_x TEXT NOT NULL,
                    player_o TEXT NOT NULL,
                    winner TEXT,
                    moves TEXT NOT NULL,
                    played_at TIMESTAMP NOT NULL DEFAULT NOW()
                );
            """)
    conn.commit()
    cursor.close()
    conn.close()

def insert_game(player_x, player_o, winner, moves):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
            """INSERT INTO games (player_x, player_o, winner, moves, played_at) VALUES (%s, %s, %s, %s, %s)""",
            (player_x, player_o, winner, moves, datetime.now())
        )
    conn.commit()
    cursor.close()
    conn.close()


if __name__ == "__main__":
    create_games_table()
    print("Table created successfully")