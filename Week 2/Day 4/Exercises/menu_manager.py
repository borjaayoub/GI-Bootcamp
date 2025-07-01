import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")

class MenuManager:
    @classmethod
    def get_by_name(cls, name):
        try:
            conn = psycopg2.connect(
                host=DB_HOST,
                user=DB_USER,
                password=DB_PASS,
                dbname=DB_NAME,
                port=DB_PORT
            )
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM menu_items WHERE item_name = %s', (name,))
            item = cursor.fetchone()
            cursor.close()
            conn.close()
            return item if item else None
        except Exception as e:
            print(f"Error fetching item by name: {e}")
            return None

    @classmethod
    def all_items(cls):
        try:
            conn = psycopg2.connect(
                host=DB_HOST,
                user=DB_USER,
                password=DB_PASS,
                dbname=DB_NAME,
                port=DB_PORT
            )
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM menu_items')
            items = cursor.fetchall()
            cursor.close()
            conn.close()
            return items
        except Exception as e:
            print(f"Error fetching all items: {e}")
            return []

