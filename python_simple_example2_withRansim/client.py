import sys
import grpc

import msg_pb2
import msg_pb2_grpc

def run():
    channel = grpc.insecure_channel('localhost:50051')
    try:
        grpc.channel_ready_future(channel).result(timeout=10)
    except grpc.FutureTimeoutError:
        sys.exit('Error connecting to server')
    else:
        stub = msg_pb2_grpc.UEsStub(channel)

        request = msg_pb2.UERequest(
            procesureCode=1
        )
        response = stub.GetUEs(request)
        for resp in response:
            print(resp)


if __name__ == '__main__':
    run()    