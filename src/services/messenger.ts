import messenger from 'messenger';

// Define types for our messages
interface MessageData {
  type: string;
  payload: any;
}

// Create a singleton class for messenger service
class MessengerService {
  private static instance: MessengerService;
  private speaker: any;
  private listener: any;
  private port: number = 8000;

  private constructor() {
    // Initialize the messenger service
    this.speaker = messenger.createSpeaker(this.port);
    this.listener = messenger.createListener(this.port);
  }

  public static getInstance(): MessengerService {
    if (!MessengerService.instance) {
      MessengerService.instance = new MessengerService();
    }
    return MessengerService.instance;
  }

  // Method to send a message and expect a reply
  public async request(type: string, payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.speaker.request(type, payload, (data: any) => {
        resolve(data);
      });
    });
  }

  // Method to broadcast a message to all listeners
  public shout(type: string, payload: any): void {
    this.speaker.shout(type, payload);
  }

  // Method to send a message without expecting a reply
  public send(type: string, payload: any): void {
    this.speaker.send(type, payload);
  }

  // Method to listen for messages
  public on(type: string, callback: (message: any, data: MessageData) => void): void {
    this.listener.on(type, callback);
  }

  // Method to remove a listener
  public off(type: string, callback: (message: any, data: MessageData) => void): void {
    this.listener.off(type, callback);
  }
}

// Export a singleton instance
export const messengerService = MessengerService.getInstance(); 