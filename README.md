# Bitlite Server Configuration

This guild will help to setup Bitlite Server on your local machine for development using docker.

## Run Locally

Clone the project

```bash
  git clone https://github.com/SEGRR/BitLite-server
```

Go to the project directory

```bash
  cd Bitlite-server
```

Run in docker

```bash
  docker-compose up -d
```

Stop containers using

```bash
  docker-compose down
```

## Other IMP commands

After starting the containers. All services can be listed using

```bash
    docker ps
```

Look at the Logs of each individual container.

- influxdb
- mosquitto
- server

```bash
    docker logs [contianer-name]
```

### Server

This contianer hold code bound with `/server` folder in repository.
When `server` container starts it will use `nodemon` to keep track of code changes.
So you don't need to restart this container everytime.

#### NOTE

For Windows users, you need to clone this repository in WSL and run it there to have this effect. Read [this]("https://www.omgubuntu.co.uk/how-to-install-wsl2-on-windows-10") article to setup WSL.

### Mosquitto

Eclipse Mosquitto is an open source (EPL/EDL licensed) message broker that implements the MQTT protocol versions 5.0, 3.1.1 and 3.1. Mosquitto is lightweight and is suitable for use on all devices from low power single board computers to full servers.. [More about Mosquittio]()

We use Mosquitto version 2 for this project.

#### Mosquitto Configuration

The `mosquitto/Configuration/mosquitto.conf` file holds the Configuration options. Any change in file is mirrored on to the container.

- [Mosquitto configuration Docs]("https://mosquitto.org/man/mosquitto-conf-5.html")

### Influxdb

InfluxDB is an open-source time series database developed by the company InfluxData. It is used for storage and retrieval of time series data

- Initial Configuration is present in the `.env` file
- Goto `http://localhost:8086` to use InfluxDB GUI.
- The data stored in database persists even if the containers are shut-down and deleted

## Authors

- [@SEGRR](https://www.github.com/segrr)

## Support

For support, email segrr2003@gmail.com
