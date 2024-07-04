const person = {
    vorname: 'Susi',
    nachname: 'Müller',
    adressen: [
        { strasse: 'Müllergasse 1', ort: '70111 Müllerstadt' },
        { strasse: 'Mühlenweg 1', ort: '70112 Mühlstedt' },
    ]
}

console.log(person.adressen[1].strasse)