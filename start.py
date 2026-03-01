from flask import Flask, render_template

app = Flask('')

def run():
    app.run(host='0.0.0.0', port=8080)

@app.route('/')
def home():
    return render_template("index.html")

if __name__ == '__main__':
  run()
