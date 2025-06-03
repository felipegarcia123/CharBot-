from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message', '')

    # Lógica simulada de respuesta del bot
    if 'hola' in user_message.lower():
        response = '¡Hola! ¿En qué puedo ayudarte?'
    elif 'cita' in user_message.lower():
        response = '¿Qué día deseas programar tu cita?'
    else:
        response = 'Lo siento, aún estoy aprendiendo. ¿Puedes reformularlo?'

    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
