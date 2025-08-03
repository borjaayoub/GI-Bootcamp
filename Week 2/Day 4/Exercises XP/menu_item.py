import psycopg2
from dotenv import load_dotenv
import os
from menu_manager import MenuManager

load_dotenv()

DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")

class MenuItem:
    def __init__(self, name, price):
        self.name = name
        self.price = price
    
    def save(self):
        try:
            conn = psycopg2.connect(
                dbname=DB_NAME,
                user=DB_USER,
                password=DB_PASS,
                host=DB_HOST,
                port=DB_PORT
            )
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO menu_items (item_name, item_price) VALUES (%s, %s) RETURNING *;",
                (self.name, self.price)
            )
            item = cursor.fetchone()
            conn.commit()
            cursor.close()
            conn.close()
            return item if item else None
        except Exception as e:
            print(f"Error saving item: {e}")
            return None

    def delete(self):
        try:
            conn = psycopg2.connect(
                dbname=DB_NAME,
                user=DB_USER,
                password=DB_PASS,
                host=DB_HOST,
                port=DB_PORT
            )
            cursor = conn.cursor()
            cursor.execute(
                "DELETE FROM menu_items WHERE item_name = %s AND item_price = %s RETURNING *;",
                (self.name, self.price)
            )
            deleted_item = cursor.fetchone()
            conn.commit()
            cursor.close()
            conn.close()
            return deleted_item if deleted_item else None
        except Exception as e:
            print(f"Error deleting item: {e}")
            return None

    def update(self, new_name, new_price):
        try:
            conn = psycopg2.connect(
                dbname=DB_NAME,
                user=DB_USER,
                password=DB_PASS,
                host=DB_HOST,
                port=DB_PORT
            )
            cursor = conn.cursor()
            cursor.execute(
                "UPDATE menu_items SET item_name = %s, item_price = %s WHERE item_name = %s AND item_price = %s RETURNING *;",
                (new_name, new_price, self.name, self.price)
            )
            updated_item = cursor.fetchone()
            conn.commit()
            cursor.close()
            conn.close()
            if updated_item:
                self.name = new_name
                self.price = new_price
            return updated_item if updated_item else None
        except Exception as e:
            print(f"Error updating item: {e}")
            return None


item = MenuItem('Burger', 35)
# item.save()
# item.delete()
# item.update('Veggie Burger', 37)
# item2 = MenuManager.get_by_name('Beef Stew')
items = MenuManager.all_items()

print(items)
