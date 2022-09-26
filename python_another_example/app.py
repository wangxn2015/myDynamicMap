from flask import Flask, render_template, Response
from google.protobuf.json_format import MessageToJson
from client_wrapper import ServiceClient
import message_pb2
import message_pb2_grpc
import json

app = Flask(__name__)


@app.route("/")
def index():
    return(render_template('index.html'))


@app.route('/topic/<topicname>')
def get_ues(topicname):
    app.config[topicname] = ServiceClient(message_pb2_grpc, 'UesStub', '127.0.0.1', 50051)
    request = message_pb2.UePositionRequest(
        process_code=1,
        imsi=[2]
    )

    def events():
        response = app.config[topicname].GetUes(request)
        for resp in response:
            temp = MessageToJson(resp, indent=0)
            print(type(temp))
            temp = json.dumps(temp)
            print(temp)
            yield 'data:{0}\n\n'.format(temp)
    return Response(events(), mimetype="text/event-stream")


if __name__ == '__main__':
    app.run(debug=True, port=5001)
