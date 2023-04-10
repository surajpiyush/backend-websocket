import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";




@WebSocketGateway(4000,{cors:'*'})
export class ChatGateway implements OnGatewayConnection,OnGatewayDisconnect{
    @WebSocketServer() server;
    users:number=0;

    handleConnection() {
        this.users++;

        this.server.emit('users',this.users);
        
    }
    handleDisconnect() {
        this.users--;

        this.server.emit('users',this.users)
    }
   

   @SubscribeMessage('message')
   handleMessage (@MessageBody() message:string):void{
    console.log(message);
    this.server.emit('message',message)
   }
}