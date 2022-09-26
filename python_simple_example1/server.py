from concurrent import futures
import time

import grpc

import msg_pb2
import msg_pb2_grpc
import random

class UEServicer(msg_pb2_grpc.UEsServicer):
    
    def GetUEs(self, request, context):
        print("GetUEs Request Made:")
        print(request)

        for j in range (100):
            for i in range(3):
                hello_reply = msg_pb2.UEInfo()
                hello_reply.Imsi = i + 2000
                hello_reply.Loca.Lat = 40.075+(i+1)*0.0005*random.random()
                hello_reply.Loca.Lng = 116.24+(i+1)*0.0005*random.random()
                hello_reply.bearing =10.5+i

                yield hello_reply
            time.sleep(1)        



def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=4))
    msg_pb2_grpc.add_UEsServicer_to_server(UEServicer(), server)
    server.add_insecure_port("localhost:50051")
    print("Start to serve on localhost:50051")
    server.start()
    server.wait_for_termination()

if __name__ == "__main__":
    serve()