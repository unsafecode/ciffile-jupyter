from dataclasses import dataclass

# Una classe Person che ha un attributo name, surname, birth_date e una property full_name e una age
@dataclass
class Person:
    name: str
    surname: str
    birth_date: str

    @property
    def full_name(self):
        return f"{self.name} {self.surname}"

    @property
    def age(self):
        return 2020 - int(self.birth_date)