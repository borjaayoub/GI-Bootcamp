import math

class Pagination():
    def __init__(self, items=None, page_size=10):
        self.items = items if items is not None else []
        self.page_size = page_size
        self.current_idx = 0
        self.total_pages = math.ceil(len(self.items) / self.page_size)
    
    def get_visible_items(self):
        start = self.current_idx * self.page_size
        end = start + self.page_size
        return self.items[start:end]

    def go_to_page(self, page_num):
        if not (1 <= page_num <= self.total_pages):
            raise ValueError("Page number out of range")
        self.current_idx = page_num - 1
    
    def first_page(self):
        self.current_idx == 0

    def last_page(self):
        self.current_idx = self.total_pages - 1
    
    def next_page(self):
        self.current_idx += 1

    def previous_page(self):
        self.current_idx -= 1
        
        
    def __str__(self):
        return '\n'.join(str(item) for item in self.get_visible_items())
    
    
alphabetList =  list("abcdefghijklmnopqrstuvwxyz")
p = Pagination(alphabetList, 4)

print(str(p))

print("page 1:", p.get_visible_items())

p.next_page()
print("page 2:", p.get_visible_items())

p.last_page()
print("last page:", p.get_visible_items())

p.go_to_page(2)
print(p.current_idx + 1)