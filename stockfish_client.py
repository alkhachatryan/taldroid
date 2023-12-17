import chess
import chess.engine


class StockfishClient:
    def __init__(self):
        self.stockfish_path = '/usr/games/stockfish'
        self.engine = chess.engine.SimpleEngine.popen_uci(self.stockfish_path)

    def format_board(self, board):
        pieces_formatted = []
        letter_coordinates = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

        for piece in board['pieces']:
            parts_of_class = piece.replace('piece ', '').replace('square-', '').split(' ')
            parts_of_class.sort()
            piece_letter = parts_of_class[1][1]

            actual_coordinate = letter_coordinates[int(parts_of_class[0][0]) - 1] + parts_of_class[0][1]

            pieces_formatted.append({
                'piece': piece_letter + actual_coordinate,
                'color': parts_of_class[1][0]
            })

        return pieces_formatted

    def next_move(self, position_data, to_move):
        board = chess.Board()
        board = board.empty()
        for piece_info in position_data:
            piece = piece_info['piece']
            color = piece_info['color']

            square_index = chess.SQUARE_NAMES.index(piece[1:])

            piece_type = piece[0].lower()
            piece_instance = chess.Piece.from_symbol(piece_type)
            piece_instance.color = color == 'w'

            board.set_piece_at(square_index, piece_instance)

        if to_move == 'white':
            board.turn = chess.WHITE
        elif to_move == 'black':
            board.turn = chess.BLACK

        result = self.engine.play(board, chess.engine.Limit(depth=30, time=3.0))  # You can adjust the time limit
        return result.move.uci()
