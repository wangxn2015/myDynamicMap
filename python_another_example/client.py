import sys

import grpc

import message_pb2
import message_pb2_grpc


def run():
    channel = grpc.insecure_channel('127.0.0.1:50051')
    try:
        grpc.channel_ready_future(channel).result(timeout=10)
    except grpc.FutureTimeoutError:
        sys.exit('Error connecting to server')
    else:
        stub = message_pb2_grpc.UesStub(channel)
        request = message_pb2.UePositionRequest(
            process_code=1,
            imsi=[2]
        )
        response = stub.GetUes(request)
        for resp in response:
            print(resp)


if __name__ == '__main__':
    run()
