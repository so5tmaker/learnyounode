
// ## BABY STEPS(Задача 2 из 13)  

//   Реализуйте программу, которая принимает на вход один или более аргументов  
//   и выводит их сумму в консоль(stdout).  

//  ─────────────────────────────────────────────────────────────────────────────  

//  ## ИНФОРМАЦИЯ  

//   Вы можете получить доступ к аргументам командной строки через глобальный  
//   объект process. Объект process имеет свойство argv, которое представляет  
//   из себя массив аргументов командной строки, например process.argv.  

//   Для начала реализуйте программу, которая содержит:

// console.log(process.argv)  

//   Запустите ее с помощью node program.js добавив несколько чисел в качестве
// аргументов, например:  

//      $ node program.js 1 2 3  

//   В данном случае вывод должен быть массивом вида:

// ['node', '/path/to/your/program.js', '1', '2', '3']  

//   Ваша задача пройтись по этому массиву для того чтобы Вы смогли получить  
//   сумму только переданных аргументов.Первый аргумент process.argv всегда
//   node, второй - это путь до файла program.js, таким образом Вам нужно  
//   начать с 3го элемента(индекс 2) и добавлять каждый элемент к искомой  
//   сумме до тех пор пока не дойдете до конца массива.  

//   Так же примите во внимание то, что все элементы process.argv имеют  
//   строковый тип, поэтому возможно Вам придется конвертировать их в числа.Вы  
//   можете сделать это добавлением префикса + к элементу или передать его в  
//   функцию Number(), например + process.argv[2] or Number(process.argv[2]).  

//   learnyounode будет подставлять аргументы в Вашу программу самостоятельно,
//     когда Вы вызовите learnyounode verify program.js, таким образом Вы не  
//   должны беспокоится об этом.Для того что бы протестировать программу без  
//   проверки Вы можете вызвать learnyounode run program.js.Когда Вы  
//   используете run, то программа будет запущена в тестовом окружении, которое  
//   learnyounode создает для каждого задания.


const array = process.argv;
let sum = 0;
for (let index = 2; index < array.length; index++) {
    sum += Number(array[index]);
}
console.log(sum);