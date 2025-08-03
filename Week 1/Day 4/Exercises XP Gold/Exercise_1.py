
class BankAccount:
  def __init__(self, balance=0, username = '', password = ''):
    self.balance = balance
    self.username = username
    self.password = password
    self.authenticated = False
  
  def deposit(self, amount):
    if not self.authenticated:
      raise Exception("Access denied: You must be authenticated to deposit.")
    else:
      if amount > 0:
        self.balance += amount
        print(f"Deposited: {amount}. New balance: {self.balance}")
      else:
        raise Exception("Deposit amount must be positive")
  
  def withdraw(self, amount):
    if self.authenticated == False:
      raise Exception("Access denied: You must be authenticated to deposit.")
    else:
      if amount <= 0:
        raise Exception("withdrawl amount must be positive")
      elif amount > self.balance:
        raise Exception("Insufficient funds")
      
      self.balance -= amount
      print(f"withdrew: {amount}. New balance: {self.balance}")
  
  def authenticate(self, username, password):
    if username == self.username and password == self.password:
      self.authenticated = True
      print("Authentication successful.")
    else:
      print("Authentication failed.")


class MinimumBalanceAccount(BankAccount):
  def __init__(self, minimum_balance = 0):
    super().__init__()
    self.minimum_balance = minimum_balance
  
  def withdraw(self, amount):
    if self.authenticated == False:
      raise Exception("Access denied: You must be authenticated to deposit.")
    else:
      if amount <= 0:
        raise Exception("Withdrawl amount must be positive.")
      elif amount > self.balance:
        raise Exception("Insufficient funds.")
      elif self.balance - amount < self.minimum_balance:
        raise Exception("Withdrawl would fall below minimum balance")

      self.balance -= amount
      print(f"withdrew: {amount}. New balance: {self.balance}")
  

account = BankAccount(balance=100, username="ayoub", password="1234")
account.authenticate('ayoub', '1234')
account2 = MinimumBalanceAccount(minimum_balance = 50)

account.deposit(50)

account.withdraw(130)