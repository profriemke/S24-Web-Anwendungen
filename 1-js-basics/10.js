const person = {
    name: 'Horst',
    alter: 23,
    beruf: 'Bäcker'
}
function gebeAlteraus({ alter }) {
    console.log(alter)
}

const { name, alter, beruf } = person

console.log(beruf)
gebeAlteraus(person)