import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ChatbotmessageService } from '../service/chatbot/chatbotmessage.service';
import { Subscription } from 'rxjs';
import { MessageDetails } from '../model/chatbot/message-details';
import Speech from 'speak-tts'
import { SpeechRecognizerService, SpeechNotification, SpeechError } from '../service/chatbot/speech-recognizer.service';
import { ActionContext } from '../service/chatbot/strategy/ActionContext';
import { RouterExtService } from '../service/router-ext.service';
import { Location } from '@angular/common';

const speech = new Speech();

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
})
export class ChatbotComponent implements OnInit {

  messageList: MessageDetails[] = [];
  message: string = "Hi, How can i help you?";
  subscription: Subscription;
  
  // speech to text
  finalTranscript = '';
  recognizing = true;
  notification: string;
  languages: string[] =  ['en-US', 'es-ES'];
  currentLanguage: string;
  actionContext: ActionContext = new ActionContext();
  chatbotMessageService: ChatbotmessageService = new ChatbotmessageService();

  // private routerExtService: RouterExtService, private location: Location
  constructor(private changeDetector: ChangeDetectorRef,
    private speechRecognizer: SpeechRecognizerService) {
      if (speech.hasBrowserSupport()) { // returns a boolean
        console.log("speech synthesis supported")
      }
      console.log("inside construtor");
  
      // speech to text
      this.currentLanguage = this.languages[0];
      this.speechRecognizer.initialize(this.currentLanguage);
      this.initRecognition();
      this.notification = null;
     }

    //  public back(): void {
    //   this.location.back();
    // }
  
    // //Strange name, but it makes sense. Behind the scenes, we are pushing to history the previous url
    // public goToPrevious(): void {
    //   let previous = this.routerExtService.getPreviousUrl();
  
    //   if(previous)
    //     this.routerExtService.router.navigateByUrl(previous);
    // }

     ngOnInit() {
      this.chatbotMessageService.getMessage().subscribe(message => {
        console.log("ngOnInit getMessage");
        console.log(message);
        var msgDetails: MessageDetails = new MessageDetails();
        if (message) {
          this.messageList.push(message);
          if (this.messageList.length > 1) {
            // call watson assistance service call ands set msg in msgDetails.message
            msgDetails.message = "hello.";
            msgDetails.userType = "robot";
            this.messageList.push(msgDetails);
          }
        } else {
          // clear messages when empty message received
          this.messageList = [];
        }
        this.readText(msgDetails.message);
      });
      this.initSpeechConfig();
      this.messageList = [];
      this.chatbotMessageService.clearMessages();
      console.log(this.messageList.length);
      if (this.messageList.length < 1) {
        this.chatbotMessageService.sendMessage(this.message);
        this.readText(this.message);
        this.message = "";
      }
      this.speechRecognizer.start(1);
    }
  
    ngOnDestroy() {
      console.log("inside ngOnDestroy");
      this.messageList= [];
      this.chatbotMessageService.clearMessages();
    }
  
  
    initSpeechConfig() {
      speech.init({
        'volume': 1,
        'lang': 'en-GB',
        'rate': 1,
        'pitch': 1,
        'voice': 'Google UK English Male',
        'splitSentences': true,
        'listeners': {
          'onvoiceschanged': (voices) => {
            console.log("Event voiceschanged", voices)
          }
        }
      });
    }
  
    readText(msg: string) {
      speech.speak({
        text: msg,
        queue: true, // current speech will be interrupted,
        listeners: {
          onstart: () => {
            console.log("Start utterance")
          },
          onend: () => {
            console.log("End utterance")
          },
          onresume: () => {
            console.log("Resume utterance")
          },
          onboundary: (event) => {
            console.log(event.name + ' boundary reached after ' + event.elapsedTime + ' milliseconds.')
          }
        }
      }).then(() => {
        console.log("Success !")
      }).catch(e => {
        console.error("An error occurred :", e)
      })
    }
   
    sendMsg() {
      if (this.message) {
        this.chatbotMessageService.sendMessage(this.message);
        this.message = "";
  
      }
    }
    closeChatBot() {
      // this.navbarService.hide();
      this.ngOnDestroy();
    }
  
    //Speech to text
    startButton(event) {
      // if (this.recognizing) {
      //   this.speechRecognizer.stop();
      //   return;
      // }
  
      this.speechRecognizer.start(1);
    }
  
    onSelectLanguage(language: string) {
      this.currentLanguage = language;
      this.speechRecognizer.setLanguage(this.currentLanguage);
    }
  
    private initRecognition() {
      this.speechRecognizer.onStart()
        .subscribe(data => {
          this.recognizing = true;
          this.notification = 'I\'m listening...';
          this.detectChanges();
        });
  
      this.speechRecognizer.onEnd()
        .subscribe(data => {
          // this.recognizing = false;
          this.detectChanges();
          this.notification = null;
        });
  
      this.speechRecognizer.onResult()
        .subscribe((data: SpeechNotification) => {
          const message = data.content.trim();
          if (data.info === 'final_transcript' && message.length > 0) {
            this.message = `${this.message}\n${message}`;
            this.sendMsg();
            this.actionContext.processMessage(message, this.currentLanguage);
            this.detectChanges();
            this.actionContext.runAction(message, this.currentLanguage);
          }
        });
  
      this.speechRecognizer.onError()
        .subscribe(data => {
          switch (data.error) {
            case SpeechError.BLOCKED:
            case SpeechError.NOT_ALLOWED:
              this.notification = `Cannot run the demo.
              Your browser is not authorized to access your microphone. Verify that your browser has access to your microphone and try again.
              `;
              break;
            case SpeechError.NO_SPEECH:
              this.notification = `No speech has been detected. Please try again.`;
              break;
            case SpeechError.NO_MICROPHONE:
              this.notification = `Microphone is not available. Plese verify the connection of your microphone and try again.`;
              break;
            default:
              this.notification = null;
              break;
          }
          this.recognizing = false;
          this.detectChanges();
        });
    }
  
    detectChanges() {
      if (!this.changeDetector['destroyed']) {
        this.changeDetector.detectChanges();
      }
    }
    eventHandler(event){
      var input = document.getElementById('msginput');
      if(event.keyCode==13){
        this.sendMsg();
      }
    }
}
