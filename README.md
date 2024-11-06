# Flickr Elastic Image Search Based on Tags

This project sets up a development environment for searching images from the **Flickr Creative Commons dataset** using **Elasticsearch**, **Kibana**, and **Logstash**. This configuration is intended for development purposes only and does not include authentication parameters suitable for production use.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Setup Instructions](#setup-instructions)
   1. [Create a Docker Network](#create-a-docker-network)
   2. [Run Elasticsearch](#run-elasticsearch)
   3. [Run Kibana](#run-kibana)
   4. [Set Up Index Mapping](#set-up-index-mapping)
   5. [Ingest Data Using Logstash](#ingest-data-using-logstash)
3. [Using Docker Compose](#using-docker-compose)
4. [Build Search Interface](#build-search-interface)

---

## Prerequisites

Before setting up the environment, ensure you have the following:

- **Docker** installed on your machine.
- Basic knowledge of Docker commands and configurations.

---

## Setup Instructions

Follow these steps to set up your environment.

### 1. Create a Docker Network

Create a dedicated Docker network for **Elasticsearch** and **Kibana**:

```bash
docker network create elastic
```

### 2. Run Elasticsearch

Pull the Elasticsearch image:

```bash
docker pull docker.elastic.co/elasticsearch/elasticsearch:7.17.24
```

Run Elasticsearch with the following command:

```bash
docker run --name es01-test --net elastic -p 127.0.0.1:9200:9200 -p 127.0.0.1:9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.17.24
```

### 3. Run Kibana

Pull the Kibana image:

```bash
docker pull docker.elastic.co/kibana/kibana:7.17.24
```

Run Kibana with the following command:

```bash
docker run --name kib01-test --net elastic -p 127.0.0.1:5601:5601 -e "ELASTICSEARCH_HOSTS=http://es01-test:9200" docker.elastic.co/kibana/kibana:7.17.24
```

### 4. Set Up Index Mapping

Use **Kibana's Dev Tools** to set up the index mapping for your Elasticsearch index.

### 5. Ingest Data Using Logstash

Pull the Logstash image:

```bash
docker pull docker.elastic.co/logstash/logstash:8.15.1
```

Create a `logstash.conf` file to define how data will be ingested into your Elasticsearch index.

Run **Logstash** with the following command, ensuring to mount your configuration and data files:

#### PowerShell Command (Ensure the correct file paths)

```bash
docker run --rm -it --net elastic -v C:\Users\youss\OneDrive\Bureau\flickr-elastic-image-search\logstash.conf:/usr/share/logstash/pipeline/logstash.conf -v C:\Users\youss\OneDrive\Bureau\flickr-elastic-image-search\data.csv:/usr/share/logstash/data/data.csv docker.elastic.co/logstash/logstash:8.15.1
```

This command will parse your CSV file and inject the data into the `data` index in Elasticsearch.

---

## Using Docker Compose

For a more structured and efficient setup, use **Docker Compose** to manage and run multiple containers.

Run the following command to start all the services defined in your `docker-compose.yml`:

```bash
docker-compose up
```

---

## Build Search Interface

After setting up the backend services (Elasticsearch, Kibana, and Logstash), you can build a search interface using **Flask** to search images based on tags.

### Install Dependencies

Install the necessary Python libraries:

```bash
pip install Flask
pip install elasticsearch
```

### Run the Flask App

Start the Flask application by running:

```bash
python app.py
```

---

### Additional Notes:

- The project can be extended to include additional features such as filtering by date, location, and other metadata in the Flickr dataset.
- For production use, ensure you configure authentication and secure connections for Elasticsearch and Kibana.

---
