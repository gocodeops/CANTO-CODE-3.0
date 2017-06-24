import {Component, ViewChild, ChangeDetectorRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events, Content, TextInput } from 'ionic-angular';

import { ChatService, ChatMessage} from "../../providers/chat-service";

@IonicPage()
@Component({
  selector: 'page-assistant',
  templateUrl: 'assistant.html',
})
export class AssistantPage {

  @ViewChild(Content) content: Content;
  @ViewChild('assistant_input') messageInput: TextInput;
  msgList: ChatMessage[] = [];
  userId: string;
  userName: string;
  userImgUrl: string;
  toUserId: string ;
  toUserName: string ;
  editorMsg: string = '';
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public chatService: ChatService,
      public events: Events,
      public ref: ChangeDetectorRef,
  ) {

    // Get the navParams toUserId parameter
    this.toUserId = navParams.get('toUserId');
    this.toUserName = navParams.get('toUserName');
    // Get mock user information
    this.chatService.getUserInfo()
        .then( (res) => {
          this.userId = res.userId;
          this.userName = res.userName;
          this.userImgUrl = res.userImgUrl;
        })
  }

    ionViewDidLoad() {

    }

    ionViewWillLeave(){
     // unsubscribe
     this.events.unsubscribe('chat:received')

    }

    ionViewDidEnter(){
        //get message list
        this.getMsg()
            .then( () => {
                this.scrollToBottom()
            });

        // Subscribe to received  new message events
        this.events.subscribe('chat:received',(msg,time) => {
          this.pushNewMsg(msg);
        })
    }

    _focus(){
        this.content.resize();
        this.scrollToBottom()
    }

    /**
    * @name getMsg
    * @returns {Promise<ChatMessage[]>}
    */
    getMsg(){
    // Get mock message list
    return this.chatService
        .getMsgList()
        .then( res => {
          this.msgList = res;
        })
        .catch(err => {
          console.log(err)
        })
    }

    /**
    * @name sendMsg
    */
    sendMsg(){

        if(!this.editorMsg.trim()) return;

        // Mock message
        const id = Date.now().toString();
        let newMsg: ChatMessage = {
          messageId: Date.now().toString(),
          userId:this.userId,
          userName:this.userName,
          userImgUrl:this.userImgUrl,
          toUserId:this.toUserId,
          time:Date.now(),
          message:this.editorMsg,
          status:'pending'
        };

        this.pushNewMsg(newMsg);
        this.editorMsg = '';


        this.chatService.sendMsg(newMsg)
            .then( () => {
              let index = this.getMsgIndexById(id);
              if(index !== -1){
                this.msgList[index].status = 'success';
              }
            })
    }

    /**
     * @name pushNewMsg
     * @param msg
     */
    pushNewMsg(msg: ChatMessage){
         // Verify user relationships

         console.log(msg.userId);
         console.log(msg.toUserId);

        if(msg.userId === this.userId &&  msg.toUserId === this.toUserId){
          this.msgList.push(msg);
        }else if (msg.toUserId === this.userId && msg.userId === this.toUserId){
          this.msgList.push(msg);
        }
        this.scrollToBottom();
  }

    getMsgIndexById(id:string){
        return this.msgList.findIndex( e => e.messageId === id)
    }

    scrollToBottom() {
        setTimeout(() => {
          if(this.content.scrollToBottom){
              this.content.scrollToBottom();
          }
        },400)
    }
}
