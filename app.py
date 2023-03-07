from flask import Flask, jsonify, request
from flask_cors import CORS

fake_db = [
    {
        "id": 1,
        "name": "Calabresa",
        "value": 24.76,
        "ingredients": ['queijo', 'calabresa', 'molho']
    },
    {
        "id": 2,
        "name": "Quatro queijos",
        "value": 29.76,
        "ingredients": ['queijo', 'molho']
    },
    {
        "id": 3,
        "name": "Bahiana",
        "value": 23.76,
        "ingredients": ['queijo', 'pimenta', 'molho']
    },
    {
        "id": 4,
        "name": "Atum",
        "value": 25,
        "ingredients": ['queijo', 'atum', 'molho']
    },
]

app = Flask(__name__, static_folder='./frontend/dist', static_url_path='/')

CORS(app)


def get_pizza(pizzaId: int):
    for selectedPizza in fake_db:
        if selectedPizza['id'] == pizzaId:
            return jsonify(selectedPizza)
    else:
        return jsonify({"error": {"message": "Não foi possível concluir as atualizações, ID não encontrado."}})


def edit_pizza(pizza_id):
    for selectedPizza in fake_db:
        if selectedPizza['id'] == pizza_id:
            selectedPizza['name'] = request.json.get(
                'name', selectedPizza['name'])
            selectedPizza['value'] = request.json.get(
                'value', selectedPizza['value'])
            selectedPizza['ingredients'] = request.json.get(
                'ingredients', selectedPizza['ingredients'])
            return jsonify(selectedPizza)
    else:
        return jsonify({"error": {"message": "Não foi possível concluir as atualizações, ID não encontrado."}})


@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.get('/cardapio')
def get_cardapio():
    return jsonify(list(fake_db))


@app.route('/cardapio/<int:pizza_id>', methods=['GET', 'PUT'])
def cardapio_route(pizza_id):
    if request.method == 'GET':
        return get_pizza(pizza_id)
    elif request.method == "PUT":
        return edit_pizza(pizza_id)


app.run()
