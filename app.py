from flask import Flask, render_template, request, jsonify
from elasticsearch import Elasticsearch

app = Flask(__name__)

# Elasticsearch client setup with explicit 'http' scheme
es = Elasticsearch([{'host': 'localhost', 'port': 9200, 'scheme': 'http'}])

# Home route
@app.route('/')
def index():
    return render_template('index.html')

# Search route
@app.route('/search', methods=['POST'])
def search_images():
    tag = request.json.get('tag')

    # Search Elasticsearch for the provided tag
    if tag:
        query_body = {
            "query": {
                "match": {
                    "tags": tag
                }
            }
        }
        res = es.search(index='data', body=query_body)
        return jsonify(res['hits']['hits'])
    else:
        return jsonify({"error": "Tag not provided"}), 400

if __name__ == '__main__':
    app.run(debug=True)
