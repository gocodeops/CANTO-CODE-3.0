import {
  Component,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';
import {
  Events,
  Content,
  TextInput
} from 'ionic-angular';

import {
  ChatService,
  ChatMessage
} from "../../providers/chat-service";

import ConversationV1 from "watson-developer-cloud/conversation/v1";

@IonicPage()
@Component({
  selector: 'page-assistant',
  templateUrl: 'assistant.html',
})
export class AssistantPage {

  botResponse: any;
  endConversation: boolean = false;
  i: number = 0;
  input = {
    userInput: ''
  };
  oldInput = '';
  items = [];

  conversation = new ConversationV1({
    username: '85fdf5fa-3bea-4c41-a3a7-a94b193beb5a', // replace with username from service key
    password: '2ayt2CmUtFXF', // replace with password from service key
    path: {
      workspace_id: '430b471c-958b-4e3a-b987-0328f92eaf98'
    }, // replace with workspace ID
    version_date: '2017-07-22',
    headers: {
      "X-Watson-Learning-Opt-Out": true
    }
  });

  @ViewChild(Content) content: Content;
  @ViewChild('assistant_input') messageInput: TextInput;
  msgList: ChatMessage[] = [];
  userId: string;
  userName: string;
  userImgUrl: string;
  toUserId: string;
  toUserName: string;
  editorMsg: string = '';
  botMsg: string = '';
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
      .then((res) => {
        this.userId = res.userId;
        this.userName = res.userName;
        this.userImgUrl = res.userImgUrl;
      })
  }

  processResponse = (err, response) => {
    this.i++;

    console.log('Watson request, #' + this.i);

    if (this.i >= 2) {
      if (response.output.action === 'display_time') {
        // when action is returned
      } else {
        // Display the output from dialog, if any.
        if (response.output.text.length != 0) {
          console.log('Bot response => ' + response.output.text[0]);
          // mock message of the bot
          const id = Date.now().toString();
          let newBotMsg: ChatMessage = {
            messageId: Date.now().toString(),
            userId: this.toUserId,
            userName: this.userName,
            userImgUrl: this.userImgUrl,
            toUserId: this.userId,
            time: Date.now(),
            message: response.output.text[0],
            status: 'pending'
          };

          this.pushNewMsg(newBotMsg);

          this.chatService.sendMsg(newBotMsg)
            .then(() => {
              let index = this.getMsgIndexById(id);
              if (index !== -1) {
                this.msgList[index].status = 'success';
              }
            })
        }
      }
      this.endConversation = true;
      this.i = 0;
    }

    // If we're not done, prompt for the next round of input.
    if (!this.endConversation) {
      this.conversation.message({
        input: {
          text: this.botMsg.trim()
        },
        // Send back the context to maintain state.
        context: response.context,
      }, this.processResponse);
    }
  }

  ionViewDidLoad() {

  }

  ionViewWillLeave() {
    // unsubscribe
    this.events.unsubscribe('chat:received')

  }

  ionViewDidEnter() {
    //get message list
    this.getMsg()
      .then(() => {
        this.scrollToBottom()
      });

    // Subscribe to received  new message events
    this.events.subscribe('chat:received', (msg, time) => {
      this.pushNewMsg(msg);
    })
  }

  _focus() {
    this.content.resize();
    this.scrollToBottom()
  }

  /**
   * @name getMsg
   * @returns {Promise<ChatMessage[]>}
   */
  getMsg() {
    // Get mock message list
    return this.chatService
      .getMsgList()
      .then(res => {
        this.msgList = res;
      })
      .catch(err => {
        console.log(err)
      })
  }

  /**
   * @name sendMsg
   */
  sendMsg = () => {

    if (!this.editorMsg.trim()) return;
    // if (!this.botMsg.trim()) return;

    // chatbot
    this.botMsg = this.editorMsg;
    // console.log(this.botMsg);
    this.endConversation = false;
    this.conversation.message({}, this.processResponse);

    // Mock message
    const id = Date.now().toString();
    let newMsg: ChatMessage = {
      messageId: Date.now().toString(),
      userId: this.userId,
      userName: this.userName,
      userImgUrl: this.userImgUrl,
      toUserId: this.toUserId,
      time: Date.now(),
      message: this.editorMsg,
      status: 'pending'
    };

    this.pushNewMsg(newMsg);

    this.editorMsg = '';

    this.chatService.sendMsg(newMsg)
      .then(() => {
        let index = this.getMsgIndexById(id);
        if (index !== -1) {
          this.msgList[index].status = 'success';
        }
      })

  }

  /**
   * @name pushNewMsg
   * @param msg
   */
  pushNewMsg(msg: ChatMessage) {
    // Verify user relationships

    // console.log(msg.userId);
    // console.log(msg.toUserId);

    if (msg.userId === this.userId && msg.toUserId === this.toUserId) {
      this.msgList.push(msg);
    } else if (msg.toUserId === this.userId && msg.userId === this.toUserId) {
      this.msgList.push(msg);
    }
    this.scrollToBottom();
  }

  getMsgIndexById(id: string) {
    return this.msgList.findIndex(e => e.messageId === id)
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }
}
