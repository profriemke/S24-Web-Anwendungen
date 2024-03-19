let a = ['Hund', 'Katze', 'Maus']

console.log(a[2])

a[3] = 'Elefant'
console.log(a)

a[0] = 'Pferd'
console.log(a)


a[4] = true
console.log(a)

a.push('Kuh')
console.log(a)

a.unshift('Huhn')
console.log(a)

console.log(a.pop())

for (let i = 0; i < a.length; i++) {
    console.log(a[i])
}

for (let e of a) {
    console.log(e)
}   