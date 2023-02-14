// ## HTTP CLIENT(Задача 7 из 13)  

//   Реализуйте программу, которая посылает HTTP GET запрос на URL, который вы  
//   получите в качестве первого аргумента командной строки. Выведите  
//   содержимое каждого события "data" из ответа(response) построчно в консоль
//     (stdout).  

//  ─────────────────────────────────────────────────────────────────────────────  

//  ## ИНФОРМАЦИЯ  

//   Для решения этой задачи Вам понадобится встроенный http модуль.  

//   Документацию для http модуля Вы сможете найти набрав в браузере:
// file:///Users/softmaker/.nvm/versions/node/v18.12.1/lib/node_modules/learnyounode/docs-nodejs/http.html  

// http.get() это упрощенный метод для GET запросов, используйте его в своем
// решении.Первым аргументом может быть URL, куда требуется отправить
// запрос, вторым - функция обратного вызова.  

//   В отличие от других функций обратного вызова, эта функция имеет следующую
// сигнатуру:

// function callback(response) { /* ... */ }  

//   где response это объект типа Stream(поток).Вы можете интерпретировать  
//   потоки как объекты, которые посылают события.Три из них наиболее
// интересны: "data", "error" и "end".Вы можете подписаться на события  
//   следующим образом:

// response.on('data', function (data) { /* ... */ })  

//   Событие "data" посылается, когда часть данных становится доступной и может  
//   быть обработана.Размер этих частей в основном зависит от источника
// данных.

//     Объект / поток response, который Вы можете получить из http.get() так же  
//   имеет метод setEncoding().Если Вы передадите этому методу "utf8", то  
//   событие "data" будет посылать данные строкового типа, нежели Node Buffer,
//     который Вы должны будете постоянно конвертировать в строки.

const http = require('http');

const url = process.argv[2];

http.get(url, (res) => {
    res.setEncoding('utf-8');
    res.on('data', (chunk) => {
        console.log(chunk);
    })
})

// 'use strict'
// const http = require('http')

// http.get(process.argv[2], function (response) {
//     response.setEncoding('utf8')
//     response.on('data', console.log)
//     response.on('error', console.error)
// }).on('error', console.error)