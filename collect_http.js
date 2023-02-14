// ## HTTP COLLECT(Задача 8 из 13)  

//   Реализуйте программу, которая посылает HTTP GET запрос на URL, который вы  
//   получите в качестве первого аргумента командной строки.Соберите все  
//   данные с сервера(не только первое событие "data") и выведите две строки в
//   консоль(stdout).  

//   Первая строка должна содержать количество символов, полученных с сервера.  
//   А вторая должна непосредственно вывести эти символы.  

// ## ИНФОРМАЦИЯ  

//   Вы можете решить эту задачу двумя путями:

// 1) Собрать данные со всех событий "data" и последовательно добавлять их  
//   для вывода в консоль. Используйте событие "end", для того чтобы понять,
//   когда поток завершится, и Вы сможете вывести результат.  

//   2) Использовать дополнительные библиотеки, для того чтобы абстрагироваться  
//   от сложности сбора потоковых данных. Для этого есть две библиотеки(на  
//   самом деле их больше!), которые решают эту задачу: bl(Buffer List) и
//   concat-stream; выбор за Вами.  

//   < https://npmjs.com/bl> <https://npmjs.com/concat-stream>  

//   Для того чтобы установить библиотеку воспользуйтесь пакетным менеджером  
//   для Node - npm.Просто наберите:  

//      $ npm install bl  

//   Таким образом Вы скачаете и установите последнюю версию этой библиотеки в  
//   поддиректорию node_modules. Любая библиотека, установленная в эту  
//   директорию может быть доступна в вашей программе с помощью конструкции
//   require, без необходимости добавления префикса './':

// const bl = require('bl')  

//   Сначала Node будет искать библиотеку во встроенных модулях, а потом в  
//   директории node_modules, где она и будет находиться.  

//   Если у Вас отсутствует соединение с интернетом, просто создайте директорию  
//   node_modules и скопируйте туда директорию с библиотекой, которую Вы хотите  
//   использовать из learnyounode:

// file:///Users/softmaker/.nvm/versions/node/v18.12.1/lib/node_modules/learn  
// younode / node_modules / bl
// file:///Users/softmaker/.nvm/versions/node/v18.12.1/lib/node_modules/learn  
// younode / node_modules / concat - stream  

//   Обе библиотеки bl и concat - stream могут принимать потоки и собирать из них  
//   данные за Вас. Когда поток будет закончен, будет вызвана функция обратного  
//   вызова переданными данными.

//   response.pipe(bl(function (err, data) { /* ... */ }))
//   or  
//   response.pipe(concatStream(function (data) { /* ... */ }))  

//   Примите во внимание то, что возможно Вам придется использовать
//   data.toString() для конвертации данных из Buffer.  

//   Документацию для обеих библиотек Вы сможете получить, набрав в браузере:

// file:///Users/softmaker/.nvm/versions/node/v18.12.1/lib/node_modules/learn  
// younode / docs / bl.html
// file:///Users/softmaker/.nvm/versions/node/v18.12.1/lib/node_modules/learn  
// younode / docs / concat - stream.html  

'use strict'
const http = require('http')

http.get(process.argv[2], function (response) {
    let rawData = '';
    response.setEncoding('utf8')
    response.on('data', chunk => rawData += chunk)
    response.on('error', console.error)
    response.on('end', () => {
        console.log(rawData.length)
        console.log(rawData)
    })
}).on('error', console.error)


// 'use strict'
// const http = require('http')
// const bl = require('bl')

// http.get(process.argv[2], function (response) {
//     response.pipe(bl(function (err, data) {
//         if (err) {
//             return console.error(err)
//         }
//         data = data.toString()
//         console.log(data.length)
//         console.log(data)
//     }))
// })