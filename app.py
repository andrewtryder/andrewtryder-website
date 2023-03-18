from flask import Flask, render_template
app = Flask(__name__, template_folder='templates', 
                      static_url_path='',
                      static_folder='static')


@app.route("/")
def home():
    return render_template('index.html')

@app.route('/form')
def form():
    return render_template('form.html')


if __name__ == '__main__':
    app.run(debug=True)