
# Flickr Elastic Image Search Based on tags

This project sets up a development environment for searching images from the Flickr Creative Commons dataset using Elasticsearch, Kibana, and Logstash. This configuration is intended for development purposes only and does not include authentication parameters suitable for production use.

## Prerequisites

- Docker installed on your machine
- Basic knowledge of Docker commands


## Setup Instructions 

1. **Create a Docker Network**
   
   Create a dedicated Docker network for Elasticsearch and Kibana:

   `docker network create elastic`

2. **Run Elasticsearch**

   Pull the Elasticsearch image:

   `docker pull docker.elastic.co/elasticsearch/elasticsearch:7.17.24`

   Run Elasticsearch:

   
   `docker run --name es01-test --net elastic -p 127.0.0.1:9200:9200 -p 127.0.0.1:9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.17.24`

3. **Run Kibana**

   Pull the Kibana image:

  
   `docker pull docker.elastic.co/kibana/kibana:7.17.24`

   Run Kibana:

  
   `docker run --name kib01-test --net elastic -p 127.0.0.1:5601:5601 -e "ELASTICSEARCH_HOSTS=http://es01-test:9200" docker.elastic.co/kibana/kibana:7.17.24`

4. **Set Up Index Mapping**

   Use Kibana's Dev Tools to set up the index mapping for your Elasticsearch index.

5. **Ingest Data into Elasticsearch Using Logstash**

   Pull the Logstash image:


   `docker pull docker.elastic.co/logstash/logstash:8.15.1`

   Create a `logstash.conf` file to define how data will be ingested into your Elasticsearch index.

   Run Logstash with the following command, ensuring to mount your configuration and data files:

* Powershell running command :**Ensure the put the full path of the files** :

    `docker run --rm -it  --net elastic -v C:\Users\youss\OneDrive\Bureau\flickr-elastic-image-search\logstash.conf:/usr/share/logstash/pipeline/logstash.conf -v C:\Users\youss\OneDrive\Bureau\flickr-elastic-image-search\data.csv:/usr/share/logstash/data/data.csv docker.elastic.co/logstash/logstash:8.15.1`


This command will parse your CSV file and inject the data into the `data` index in Elasticsearch.


# Now u can use docker compose for more structured task to run multiple containers .

Run   
`docker-compose up`

# Build search interface based on text (tags)

`pip install Flask`
`pip install elasticsearch`
RUN:

`python app.py`
