from sqlite3 import Cursor
from flask import Flask, jsonify, request, abort
import psycopg2
import os
from db import get_db_connection

app = Flask(__name__)


def fetch_all_games():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT id, player_x, player_o, winner, moves, played_at FROM games ORDER BY played_at DESC')
    games = cursor.fetchall()
    cursor.close()
    conn.close()
    return [
        {
            'id': g[0],
            'player_x': g[1],
            'player_o': g[2],
            'winner': g[3],
            'moves': g[4],
            'played_at': g[5].isoformat()
        } for g in games
    ]
def fetch_game_by_id(game_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT id, player_x, player_o, winner, moves, played_at FROM games WHERE id = %s', (game_id,))
    g = cursor.fetchone()
    cursor.close()
    conn.close()
    if not g:
        return None
    return {
            'id': g[0],
            'player_x': g[1],
            'player_o': g[2],
            'winner': g[3],
            'moves': g[4],
            'played_at': g[5].isoformat()
        }

def fetch_scores():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT winner, COUNT(*) FROM games WHERE winner IS NOT NULL GROUP BY winner')
    scores = cursor.fetchall()
    cursor.close()
    conn.close()
    return {row[0]: row[1] for row in scores}


@app.route('/scores', methods=['GET'])
def get_scores():
    return jsonify(fetch_scores())

@app.route('/games', methods=['GET'])
def get_games():
    return jsonify(fetch_all_games())

@app.route('/games/<int:games_id>', methods=['GET'])
def get_game(game_id):
    game = fetch_game_by_id(game_id)
    if not game:
        abort(404, description='Game not found')
    return jsonify(game)

if __name__ == '__main__':
    app.run(debug=True)

