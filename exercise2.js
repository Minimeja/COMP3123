// Exercise 2
const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('').toLowerCase();

console.log(capitalize('fooBar')); // Foobar
console.log(capitalize('nodeJs')); // Nodejs

