from flask import Flask, request, jsonify
from flask_cors import CORS
from stockfish_client import StockfishClient

app = Flask(__name__)
CORS(app)

stockfish_client = StockfishClient()


@app.route('/', methods=['POST', 'OPTIONS'])
def receive_screenshot():
    if request.method == 'OPTIONS':
        response = app.make_default_options_response()
    elif request.method == 'POST':
        formatted = stockfish_client.format_board(request.json)
        next_move_coordinates = stockfish_client.next_move(formatted, request.json['to_move'])
        next_move_coordinates_formatted = [
            next_move_coordinates[0] + next_move_coordinates[1],
            next_move_coordinates[2] + next_move_coordinates[3],
        ]

        response = jsonify({'moves': next_move_coordinates_formatted})
    else:
        response = jsonify({'status': 'error', 'message': 'Method not allowed'})

    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'

    return response


if __name__ == '__main__':
    app.run(port=8000, use_reloader=True)
