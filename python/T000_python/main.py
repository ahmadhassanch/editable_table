import json

for i in range(0,10):
	print(i)

print(i)

arr = []
arr.append("I")
arr.append("am")
arr.append("Ali")

print(arr)

for item in arr:
	print(item)

d = {
	"ali" : "Ali Khan",
	"akram" : "Akram Khan",
}

print("=============")
for key in d:
	print(key, d[key])


class Person():
	def __init__(self, name, age):
		self.name = name
		self.age = age

	def print(self):
		print(self.name, self.age)

class Student(Person):
	def __init__(self, name, age):
		Person.__init__(self, name, age)


waq = Person("Waqas", 20)
waq2 = Student("Waqas2", 22)

waq.print()
waq2.print()

def func1(*arguments):
	a = arguments[0]
	b = arguments[1]
	print(a, b)

def func2(**data):
	print(data["name"], data["last"])

def func3(name, last):
	print(name, last)


func1("Ali ", "khan1")
func1(*["Ali ", "khan2"])
func2(name = "Ali ", last = "khan3")
func2(**{"name": "Ali ", "last": "khan4"})
func3(**{"name": "Ali4 ", "last": "khan5"})

#func({"name" : "Ali ", "last" : "khan"})

r = {'is_claimed': 'True', 'rating': 3.5}
r = json.dumps(r) #converts dict to string
print(r)
loaded_r = json.loads(r) #converts string to dict
loaded_r['rating'] #Output 3.5
print(type(r)) #Output str
print(type(loaded_r) )
