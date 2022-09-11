from concurrent import futures
import time

import grpc

import message_pb2
import message_pb2_grpc
import random


class UesService(message_pb2_grpc.UesServicer):

    def GetUes(self, request, context):
        for i in range(3):
            loca = message_pb2.Point(
                lat=40.0761946+random.random()/100,
                lng=116.2468865+random.random()/300)
            reply = message_pb2.UePositionReply(imsi=i+2000, point=loca)
            print(reply)
            yield reply
            time.sleep(1)


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=4))
    message_pb2_grpc.add_UesServicer_to_server(UesService(), server)
    server.add_insecure_port('127.0.0.1:50051')
    print('Server start...')
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    serve()
