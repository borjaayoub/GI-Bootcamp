class Phone():
    def __init__(self, phone_number):
        self.phone_number = phone_number
        self.call_history = []
        self.messages = []

    def call(self, other_phone):
        call_record = f"This '{self.phone_number}' called '{other_phone.phone_number}'."
        print(call_record)
        self.call_history.append(call_record)
    
    def show_call_history(self):
        print(self.call_history)
    
    def send_message(self, other_phone, content):
        message_record = {
            "to": other_phone.phone_number,
            "from": self.phone_number,
            "content": content
        }
        print(f"'{self.phone_number}' sent a message to '{other_phone.phone_number}' \n the message is '{content}'")
        self.messages.append(message_record)

phone1 = Phone('06 89 65 70 80')
phone2 = Phone('06 33 33 90 33')

phone2.call(phone1)

phone2.show_call_history()

phone1.send_message(phone2, "Hello there, how's it going?")