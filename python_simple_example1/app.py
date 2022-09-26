from flask import Flask, render_template, Response

import msg_pb2
import msg_pb2_grpc
from google.protobuf.json_format import MessageToJson
from client_wrapper import ServiceClient
import json

# from pykafka import KafkaClient

# def get_kafka_client():
#     return KafkaClient(hosts='127.0.0.1:9092')


app = Flask(__name__)

@app.route('/')
def index():
    return(render_template('index.html'))

@app.route('/ues')
def ues_get():
    # app.config['ues'] = ServiceClient(msg_pb2_grpc, 'UEsStub', 'UEs', 50051)
    app.config['ues'] = ServiceClient(msg_pb2_grpc, 'UEsStub', 'localhost', 50051)
    request = msg_pb2.UERequest(
            procesureCode=1
        )
    def get_ues():
        response = app.config['ues'].GetUEs(request)
        for resp in response:
            # yield MessageToJson(resp)
            info = MessageToJson(resp)
            info1 = json.dumps(json.loads(info))
            print('data:{0}\n\n'.format(info1))
            yield 'data:{0}\n\n'.format(info1)

    # return Response(get_ues(), content_type='application/json')
    return Response(get_ues(), mimetype='text/event-stream')




# #Consumer API
# @app.route('/topic/<topicname>')
# def get_messages(topicname):
#     client = get_kafka_client()
#     def events():
#         for i in client.topics[topicname].get_simple_consumer():
#             yield 'data:{0}\n\n'.format(i.value.decode())
#     return Response(events(), mimetype="text/event-stream")

if __name__ == '__main__':
    app.run(debug=True, port=5001)