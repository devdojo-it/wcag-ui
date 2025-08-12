## FE Team

# JS Standards & Conventions

The place for all the JS standards, naming conventions and other amenities.

---

## `camelCase` your variables, functions, properties... everything... except class names!

It's always better to use the same naming convention for all the things.
In the following example you see that class names are in PascalCase while all the other things are in camelCase.

```js
class ClassName extends BaseClassName {
  propertyWithStringValue: '';

  constructor() {

  }

  methodName(argOne = false, argTwo = '') {
    const localScopeVariable = 0;

    ...
  }

  // please: don't use numbers in names, let numbers do the numbers
  // the code below is: NO BUENO!
  // methodName2(arg1 = false, arg2 = '') {
  //   const localScopeVariable = 0;
  //
  //  ...
  // }
}
```

---

## Always "use strict" On

Chances are that if you are using any library/framework or compiler for your JavaScript, "use strict" is on but just in case you are not, remember to add it to the file and/or to the functions.

It will make sure you get errors that would happen silently if you don't include it.

```js
// add this as first line of every js or ts file in the codebase.
'use strict';
```

---

## Never use "eval"

NEVER! It's not necessary, and it's dangerous... and it sucks ;-)

```js
// this is NO BUENO!
eval(anythingYouWant);
```

---

## Use `const` and immutability as much as possible, and please stop using `var`!

Prefer immutability as much as possible.

Constantly changing data and passing it around can make it hard to track bugs and the changes itself.

Work on data copies and avoid side effects.

Declarations with `var` are also hoisted which makes var declarations be accessible before where the declaration happened which is weird, non-obvious behavior, non-proper behavior.

Basically use `const` until your code really requires a `let` and forget the `var` instruction.

---

## Use Function expressions instead of Function Declarations

Unless you want to take advantage of Function behavior and properties, prefer function expressions.

Function declarations are hoisted and although it can be useful sometimes, avoid them as they introduce weird behavior to the code and it is not always obvious what's happening.

Try to make it clear where the function you are using comes from and they come before you use them to avoid weird access.

```js
// prefer this
export const traditionalFunction = function (arg1, arg2) {
  return arg1 + arg2;
};

// instead of this
export function traditionalFn(arg1, arg2) {
  return arg1 + arg2;
}

const traditionalFunction = traditionalFn;
```

---

## Prefer Arrow Functions

By using arrow functions the great advantage is that it's not needed anymore to bind/apply/pass the "this" object in order to access it from inside the function itself... it's just natively there.

It you're interested in a good js arrow functions article take a look at [this](https://medium.com/front-end-weekly/the-real-reason-why-javascript-has-arrow-functions-8a2da3bbb559)

```js
// prefer this
const arrowFunction = (arg1, arg2) => arg1 + arg2;

// instead of this
const traditionalFunction = function (arg1, arg2) {
  return arg1 + arg2;
};
```

---

## Prefer Pure Functions

Continuing on the side effect note, ensure your functions are not changing data they are called with or data in the scope where they are created.

---

## Prefer Class over Constructor (prototype) Functions

Although the constructor function allows you to do some very nice stuff, if you find yourself reaching out for its prototype is a sign you need to use "class" which is supported pretty much anywhere.

It is cleaner and something people are more likely to understand.

---

## Use "destructuring"

Destructuring is elegant and makes it more obvious what you need from arrays and objects and also gives you the opportunity to rename things to help give more sense to your code.

---

## Only work with data you need

Like the above examples, destructuring is a good way to extract the data you need to do the job but, also make it a habit to only call methods and functions with the things they need.

This also goes to the data coming from the API. Extract and cleanup only the data you need before storing or doing anything to it.

---

## Always use `===`

The triple equal checks for value and type and it is something you always want to do.

Make it a habit to always triple-check and avoid undesirable effects.

---

## Avoid Global Variables

Avoiding creating things in global objects unless you are creating a library/framework.

Global property names may collide with third parties or something a colleague also introduced and are hard to debug.

---

## Wrap loose declarations in blocks

You can avoid name clash and loose temporary declarations access by wrapping a quickly logic in its own scope.

---

## Organize your declarations

Be consistent with the way you declare things.

Put all your declarations on top starting with the constants down to the variables.

Make constants all uppercase to indicate they are constants which will prevent developers from trying to change them.

---

## Don't initialize things with "undefined"

Something is "undefined" when it lacks value. Let’s agree that assigning "no value" as a "value" for something is a pretty weird concept right?

Since JavaScript already makes things "undefined" how can you tell whether something is undefined because of you or JavaScript?

It makes it hard to debug why things are "undefined" so prefer setting things to "null" instead.

---

## Always initialize your declarations

For the same reason, you should not give "undefined" as a value to declarations, you should not leave them without a value because they are "undefined" by default.

---

## Lint your code and have a consistent style

Linting your code is the best way to ensure a consistent look and feel of your code and make sure people don't do weird things to it as well.

It puts everyone on the same page.

---

## Use TypeScript

TypeScript can help you a lot in delivering better code.

It will need some getting used to if you never tried a type system but it pays off in the long run.

---

## Functions and methods should do one thing only

It is easy to get carried away with adding extra stuff to function while you are at it and the best way to find out whether a function is doing too much is by looking at its name.

The name should tell what the function does and anything unrelated should go.

---

## Don’t be lazy when naming things

Always put some effort into naming things.

If it is hard to name you probably gave it extra responsibility or do not understand what it is.

Give it at least a 3 letter name with meaning.

---

## Avoid unnecessary declarations

Some declarations can be avoided altogether so only declare when it is strictly necessary.

Too many declarations may hint at a lack of proper code design or declaration consideration

---

## Use default values when possible

Having defaults is more elegant than throwing errors because something wasn't provided.

If you really want to catch not provided values please be sure to make things required that throws an error if no value provided.

---

## Always have a default case for switch statements

Don't leave your switch statements without a default case because something can go wrong and you want to make sure you catch it.

---

## Avoid the "new" keyword

Except for class and constructor functions instancing, you should never use the "new" keyword for anything else.

They can slow compilers down.

---

## Add meaningful comments for non obvious things

Only add comments when you did something not common, weird, or requires context to be understood.

Also, add comments to things that are a hack or may require improvements/fixing later on so the next person knows why.

Add comments in your third parties' modules and modules in your codebase to explain the architecture and the intention behind things.

---

## Keep ternaries simple

Worst case scenario you have two nested ternaries.

Anything longer should be an if statement or switch for readability and easy to debug reasons.

---

## Simplify with optional chaining

Get rid of those nested checks and use the "?" Operator.

---

## Prefer promises over callbacks

Promises are easy to use and anything with a callback can be "promisified".

Callbacks are the functions to call once something is done whether synchronous or not and with promises and async…await you get to do things asynchronous which may speed up your code, especially because JavaScript is single-threaded.

You cant get away with promises only sometimes but promises make it easy to read code as well.

---

## For loops > .forEach sometimes

Don't change things into an array just so you can ".forEach" it.

You are adding extra process to a slow alternative.

For loops are faster and allows you to use the "continue" and "break" keywords to control the looping.

---

## "for…in" and "for…of"

The for-in and for-of loops are very powerful ways to loop.

The "for-of" loop lets you go over the values of the array, strings, Map, Set, etc.

No need to change something into an array to use .forEach.

I would avoid the "for-in" for looping as it is the slowest one and iterates over prototype keys.

---

## Optimize for loops?

For loops are already optimized by the compiler so no need for that kinda of optimization.

---

## Always "try…catch" JSON methods

Don't trust things passed to JSON methods ".stringify" and ".parse".

Try to catch them to make sure they don't fail and break your code.

---

## Prefer template strings

It is that simple. Template strings allow you to inject values into the string and they keep the format that can come in handy.

---

## Avoid nesting or chaining loops

When you chain iteration method or nest loops you are increasing the complexity of the code which may slow things down later on or as your data grows.

Even though some operations may require it, always assess your looping strategy to ensure you don’t have unnecessary loops or loops that can be combined together.

---

## Avoid Weird Unreadable hacks

They are all over the internet because people find them "cool".

They are usually weird, non-conventional, and non-obvious when you look at them.

It is always best to follow the guidelines of the tool you are using to ensure proper performance.

Hacking should be that last alternative.

---

## Prefer the "rest" operator over "arguments"

The "rest" operator will work with arrow functions where "arguments" are not available.

Stick to one way to access your function arguments.

---

## Prefer "globalThis" for global access

Let the JavaScript handle the rest and make sure that your code will work whether it is inside a Web Worker or Backend Node.

---

## Understand JavaScript but Build with Libraries and Frameworks

I recommend investing time in understanding the JavaScript language itself but build with powerful tools like React, Angular or Vue to avoid common mistakes.

Make sure you follow their guidelines since these tools already guard against common mistakes and employ best practices.

---

## Add semicolons, ALWAYS!

You may be surprised to find out that you can get away with not putting a semicolon in the JavaScript code.

Know that the compiler adds them and tools like Babel may easily misread your code and cause a bug to make to production.

So, please: ALWAYS ADD SEMICOLONS!

---

## Readable > Performance unless you need Performance

There are ways to get more performance by doing things that are often hard to read but unless you are desperate for performance at the code level (which is rare), make it readable.

---

## Be careful with "Truthy" and "Falsy" checks

Don’t rely on the "truthy" and "falsy" checks since you can easily introduce bugs to your code.

Try to be specific in your checks as unexpected things may pass as a truthy check.

---

## Prefer Ternary over logical "||" and "&&" checks

The "or" and "and" operators evaluates the "true" and "false" of a value which may result in undesired results.

Also, don’t rely on it to do weird logical condition checks as they are not readable and easy to understand.

---

## Watch out for "undefined" and "null" with the "??" operator

The null-coalescing operator `??` makes sure that null and undefined values are not picked and it is perfect for cases where you want to ensure that there is a value or fallback to a default value.

```js
const fallbackFnExample = (arg) => {
  // this ensures an empty string fallback value to the unknown value param
  const fallbackArg = arg ?? '';

  return fallbackArg;
};

const fallbackFnExampleShorthand = (arg) => arg ?? '';
```

---

## Be careful with automatic type conversions

This is probably another reason to try TypeScript as JavaScript does an automatic type conversion on the fly which may not be what you are expecting.

"Truthy" values become "true" and "Falsy" values become "false".

Doing math between number and string may actually work or result in a string concatenation.

Numbers almost always turn "Falsy" values into "zero" and "Truthy" into "one".

---

## Never trust data you don't create

Whenever you are dealing with data coming from a user or from an API you don't know, make sure it is of the right type and in a format that you can work with before you do any operation on it.

Please be careful and strict when integrating external code, be sure to implement basic anti xss attacks workarounds.

---

## Learn regex and use them to manipulate strings

Regex is super powerful and fun. Avoid weird manipulation like looking for indexes and grabbing things.

Regex allows you to look for complex patterns and achieve amazing results with one single line of code.

Whenever it's possible please use regex to manipulate strings:

1. the regex engine is quite faster than any iterative pattern you could implement
2. the regex includes also logics and allows to avoid lots of conditional and iterative code
3. by using regex the original string will ever stay as it is

---

## IIFE and small utility libraries

IIFE is an excellent way to execute things as early as possible which you can take advantage of to set up some stuff before the rest of the code starts running.

You can also use it to initialize small libraries with a simple API that allows you to encapsulate some complex logic and expose an object you can use to interact.

---

## Avoid repeating yourself with utilities

Always turn things you do repeatedly into small generic functions that you can reuse later on.
You should not be repeating things and small functions make them easy to test and reuse.

---

## Don’t take advantage of weird JavaScript "features"

Things like:

- updating array length property
- using the "with" keyword
- using the void keyword
- updating native Object prototypes like Date, Array, Object, etc. (well there are ways to "safely extend" native Object prototypes which are well accepted)
- passing a string to setTimeout and setInterval

Just because the language allows you to, doesn't mean you should.

---

## Add Unit Tests

Tests are the ultimate way to ensure that your code as error-free as possible.

Jest is an excellent option to start with but there are others out there that are also as simple to use.

---
