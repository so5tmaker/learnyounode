// ## MY FIRST ASYNC I / O!(Задача 4 из 13)

//   Реализуйте программу, которая асинхронно прочитает файл и выведет  
//   количество строк, содержащихся в файле, в консоль(stdout) точно так же,
//     как это сделала бы команда cat file | wc - l.  

//   Полный путь до файла будет передан в качестве первого аргумента командной
// строки.  

// ## ИНФОРМАЦИЯ  

//   Решение этой задачи практически такое же, как и предущее, только Вы должны  
//   сделать это в стиле Node.js: асинхронно.  

//   Вместо fs.readFileSync() нужно использовать fs.readFile(), и вместо того,
//     чтобы просто вернуть результат этого метода, Вы должны собрать вывод из  
//   функции обратного вызова, которую Вы передадите вторым аргументом.Для  
//   получения большей информации о функциях обратного вызова, воспользуйтесь:
// (https://github.com/maxogden/art-of-node#callbacks).  

//     Примите во внимание то, что характерные для Node.js функции обратного  
//   вызова имеют следующую сигнатуру:

//         function callback (err, data) { /* ... */ }  

//   Таким образом Вы можете узнать о наличии ошибки с помощью проверки первого  
//   аргумента функции на истинность.Если ошибки нет, то Вы должны получить  
//   объект Buffer в качестве второго аргумента.Как и с readFileSync() Вы  
//   можете указать вторым аргументом 'utf8' и передать функцию обратного  
//   вызова в третий аргумент и получить результат типа 'String' вместо
// 'Buffer'.  

//   Документацию для fs модуля Вы сможете найти набрав в браузере:
//   file:///Users/softmaker/.nvm/versions/node/v18.12.1/lib/node_modules/learnyounode/docs-nodejs/fs.html  

const fs = require('fs');

const array = process.argv;

fs.readFile(array[2], 'utf-8', (err, data) => {
    if (err) return console.log('Error');
    console.log(data.split('\n').length - 1);
})

// ПОЧЕМУ ТРЕТИЙ АРГУМЕНТ? ПОТОМУ ЧТО ДВА ПЕРВЫХ ЭТО ВСЕГА "NODE" И ПУТЬ К ЭТОМУ ФАЙЛУ read-file-async.js

// Поэтому в консоли пишем: node read-file-async.js Описание.txt

// const fs = require('fs')
// const file = process.argv[2]

// fs.readFile(file, function (err, contents) {
//     if (err) {
//         return console.log(err)
//     }
//     // также можно использовать fs.readFile(file, 'utf8', callback)
//     const lines = contents.toString().split('\n').length - 1
//     console.log(lines)
// })