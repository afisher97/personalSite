from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route("/", methods=["GET"])
def home():
    return render_template("base.html")

@app.route("/contact", methods=["POST"])
def contact():
    # Here, you'd retrieve form data
    name = request.form.get("name")
    email = request.form.get("email")
    message = request.form.get("message")

    # You can process or store the data as needed (save to DB, send email, etc.)

    # Redirect back to home (or to a "thank you" page)
    return redirect(url_for("home"))

if __name__ == "__main__":
    app.run(debug=True)
