from kivy.lang import Builder
from kivymd.app import MDApp
from kivy.clock import Clock
from kivy.properties import ListProperty
import requests
import websocket
import threading
import json

class ChatApp(MDApp):
    messages = ListProperty([])

    def build(self):
        Builder.load_file("chat.kv")
        Clock.schedule_once(self.start_websocket, 1)
        return self.root

    def start_websocket(self, *args):
        def run_ws():
            try:
                ws = websocket.WebSocketApp(
                    "ws://localhost:3001",
                    on_message=self.on_message
                )
                ws.run_forever()
            except Exception as e:
                print("Errore WebSocket:", e)

        threading.Thread(target=run_ws, daemon=True).start()

    def on_message(self, ws, message):
        data = json.loads(message)
        formatted = f"[{data['timestamp']}] {data['nickname']}: {data['message']}"
        Clock.schedule_once(lambda dt: self.update_chat(formatted))

    def update_chat(self, text):
        self.messages.append(text)
        self.root.ids.chat_area.text = "\n".join(self.messages[-50:])

    def send_message(self):
        nickname = self.root.ids.nickname.text.strip()
        message = self.root.ids.message_input.text.strip()

        if not nickname or not message:
            print("Nickname e messaggio richiesti.")
            return

        payload = {
            "nickname": nickname,
            "message": message
        }

        try:
            requests.post("http://localhost:3000/messages", json=payload)
            self.root.ids.message_input.text = ""
        except Exception as e:
            print("Errore invio messaggio:", e)

if __name__ == "__main__":
    ChatApp().run()
