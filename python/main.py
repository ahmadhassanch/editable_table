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

print(waq.name, waq.age)