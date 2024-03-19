const person = {
    firstName: 'Horst',
    lastName: 'Schlemmer',
    print() {
        console.log(`Vorname: ${this.firstName}`)
        console.log(`Nachname: ${this.lastName}`)

    }
}

person.alter = 67

person.print()

person.print = function () { console.log('Methode ist ersetzt!') }

person.print()