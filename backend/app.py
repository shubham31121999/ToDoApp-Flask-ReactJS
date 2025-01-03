from flask_migrate import Migrate
from backend import create_app, db
from flask_cors import CORS


app = create_app()
CORS(app)  # Enable CORS for all routes
migrate = Migrate(app, db)  # Initialize Flask-Migrate

# Custom CLI command for initializing the database
@app.cli.command('init-db')
def init_db():
    with app.app_context():
        db.create_all()  # Initialize the database schema
        print("Database initialized.")

if __name__ == '__main__':
    app.run(debug=True)  # Running the Flask app

