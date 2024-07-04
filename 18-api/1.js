const person = {
    vorname: "Horst",
    nachname: "Meier"
}

const json = JSON.stringify(person)

console.log(json)

const data = JSON.parse(json)

console.log(data.vorname)