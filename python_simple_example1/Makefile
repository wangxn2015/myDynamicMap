SHELL							:= /bin/bash
THISDIR							:= $(dir $(realpath $(firstword $(MAKEFILE_LIST))))
WORKSPACE						?= $(THISDIR)/workspace
BUILD							?= $(WORKSPACE)/build
VENV							?= $(BUILD)/flaskenv

	

# Step 0: ----need to install proto compiler seperately from this make file
# Step 1: run "make setup"   -----make sure python3 is installed first
setup:
	sudo apt update; sudo apt install -y python3.8 python3.8-dev python3.8-venv
# Step 2: run "make install_venv"   ----create python3.8 virtual env and install Flask and grpcio-tools within the virtual env
install_venv: 
	mkdir -p $(BUILD)
	cd $(BUILD) && \
	$(shell which python3.8) -m venv flaskenv && \
	source "$(VENV)/bin/activate" && \
	pip install --upgrade pip && \
	pip install Flask && \
	pip install grpcio-tools

# generate protobuf python file
gen: 
	source $(VENV)/bin/activate && \
	python -m grpc_tools.protoc -I proto --python_out=. --grpc_python_out=. proto/msg.proto
# run python server
server: 
	source $(VENV)/bin/activate && \
	python server.py
# run the flask client to show dynamic position on brower UI
app: 
	source $(VENV)/bin/activate && \
	python app.py
