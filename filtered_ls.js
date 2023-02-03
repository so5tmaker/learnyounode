// ## FILTERED LS(Задача 5 из 13)

//   Реализуйте программу, которая выводит список отфильтрованных по расширению  
//   файлов в заданой директории. Имя директории('/path/to/dir/') будет  
//   передано в качестве первого аргумента к вашей программе, а расширение  
//   файла для фильтрации во втором аргументе.

//     Например, если Вы получили 'txt' в качестве второго аргумента, то Вы  
//   должны вывести только те файлы, которые оканчиваются на.txt в заданой
// директории. Помните о том, что второй аргумент не будет иметь '.' в
// начале.  

//   Список файлов должен быть выведен в консоль построчно (каждый файл на  
//   новой строке).Так же необходимо использовать асинхронный I/O.  

//  ─────────────────────────────────────────────────────────────────────────────  

//  ## ИНФОРМАЦИЯ

// fs.readdir() метод принимает путь к директории в качестве первого  
//   аргумента и функцию обратного вызова в качестве второго. Переданная  
//   функция имеет следующую сигнатуру:

// function callback(err, list) { /* ... */ }  

//   где list это список файлов в директории.  

//   Документацию для fs модуля вы сможете найти набрав в браузере:
// file:///Users/softmaker/.nvm/versions/node/v18.12.1/lib/node_modules/learnyounode/docs-nodejs/fs.html  

//   Так Вам может показаться полезным модуль path, а в особенности extname
// метод.  

//   Документацию для path модуля Вы сможете найти набрав в браузере:
// file:///Users/softmaker/.nvm/versions/node/v18.12.1/lib/node_modules/learnyounode/docs-nodejs/path.html  

const fs = require('fs');
const path = require('path');

const pathToFile = process.argv[2];
const ext = '.' + process.argv[3];

fs.readdir(pathToFile, (err, list) => {
    if (err) return console.error(err);
    for (const item of list) {
        if (path.extname(item) === ext) {
            console.log(item);
        }
    }
})

// 'use strict'
// const fs = require('fs')
// const path = require('path')

// const folder = process.argv[2]
// const ext = '.' + process.argv[3]

// fs.readdir(folder, function (err, files) {
//     if (err) return console.error(err)
//     files.forEach(function (file) {
//         if (path.extname(file) === ext) {
//             console.log(file)
//         }
//     })
// })