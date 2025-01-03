from flask import Blueprint, request, jsonify
from datetime import date
from models import db, ToDo



bp = Blueprint('todos', __name__, url_prefix='/api/todos')

@bp.route('', methods=['GET'])
def get_todos():
    todos = ToDo.query.all()
    return jsonify([todo.to_dict() for todo in todos])

@bp.route('/<int:todo_id>', methods=['GET'])
def get_todo(todo_id):
    todo = ToDo.query.get_or_404(todo_id)
    return jsonify(todo.to_dict())

@bp.route('', methods=['POST'])
def create_todo():
    data = request.get_json()
    if not data or 'title' not in data:
        return jsonify({'error': 'Title is required'}), 400

    todo = ToDo(title=data['title'], description=data.get('description', ''))
    db.session.add(todo)
    db.session.commit()
    return jsonify(todo.to_dict()), 201

# In your routes.py or wherever you handle API endpoints

@bp.route('/api/todos/<int:id>', methods=['PUT'])
def update_todo(id):
    todo = ToDo.query.get(id)
    if not todo:
        return jsonify({'error': 'Todo not found'}), 404
    
    data = request.get_json()
    if 'done' in data:
        todo.done = data['done']
    db.session.commit()
    
    return jsonify(todo.to_dict())


@bp.route('/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    todo = ToDo.query.get_or_404(todo_id)
    db.session.delete(todo)
    db.session.commit()
    return jsonify({'message': 'ToDo item deleted'})

# In routes.py (or wherever your routes are defined)

 # Assuming your models are in models.py

@bp.route('/api/todos/stats/daily', methods=['GET'])
def get_stats():
    total_todos = ToDo.query.count()  # Total number of todos
    completed_todos = ToDo.query.filter_by(done=True).count()  # Completed todos
    completion_rate = 0
    if total_todos > 0:
        completion_rate = (completed_todos / total_todos) * 100  # Completion rate in percentage
    
    stats = {
        'total': total_todos,
        'completed': completed_todos,
        'completionRate': completion_rate
    }
    
    return jsonify(stats)

