## Letter case styles
1.	UPPERCASE
2.	lowercase
3.	camelCase
4.	PascalCase
5.	train-case
6.	snake_case
Reference: https://en.wikipedia.org/wiki/Letter_case#Case_styles

## HTML style guide
1.	All html element in lowercase
2.	Attribute naming
```html
<input
type="text"
name="sectionheader" //lowercase
class="section-header" //train-case
id="section-header" //train-case
>```
### Reference: https://www.w3schools.com/html/html5_syntax.asp

## CSS style guide
```css
.section-header { //train-case
    color: red;
    text-align: center;
}
#section-header { //train-case
    color: red;
    text-align: center;
}
```
### Reference: http://codeguide.co/
https://google.github.io/styleguide/htmlcssguide.html#ID_and_Class_Name_Delimiters
https://stackoverflow.com/questions/1696864/naming-class-and-id-html-attributes-dashes-vs-underlines

## JavaScript style guide
JavaScript Object Notation:
** Use singular/plural for single and multiple records don’t add suffix as list or array.
E.g.
```javascript
car – singular naming convention, cars – plural naming convention.
let cars = []; //variable name in camelCase
let person = { //camelCase
    firstName:"John", //attribute name in camelCase
    lastName:"Doe",
    age:50,
    eyeColor:"blue"
    isActive: true
}

JSON notation:
let person = { //camelCase
    "name": "John", //attribute name in camelCase
    "age":30,
    "cars": {
        "car1":"Ford",
        "car2":"BMW",
        "car3":"Fiat"
    }
 }
Class Name:
ClassName { //PascalName
}
Function Name:
functionName = { } //camelCase
```
## React style guide /ES 6 (Folder structure)
### Reference:
https://github.com/airbnb/javascript#types
https://www.w3schools.com/js/js_conventions.asp
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
https://hackernoon.com/the-100-correct-way-to-structure-a-react-app-or-why-theres-no-such-thing-3ede534ef1ed

### Project Structure
There are numerous ways to structure your React project. One common layout for components:
Components are located in src/components/ComponentName.js.
Component-specific CSS is located in src/components/ComponentName.css.
Component tests are located in src/components/__tests__/ComponentName.test.js.
Component stories are located in src/components/__stories__/ComponentName.stories.js
React Styleguidist component examples (if applicable) are located in src/components/__examples__/ComponentName.md

If you're using redux:
Code to initialize your store is located in src/reducers/store.js
Reducers and Action creators are located in src/reducers
Selectors are located in src/selectors
Action constants are located in src/reducers/types.js
Try and limit the number of files in the root src folder but be careful not to overdo your folder structure. There is nothing wrong with lots of files in one folder (Facebook use a monorepo: they have over 30,000 components in a single folder!)

Another layout involves a separate folder with each component containing the source code, CSS, tests, stories and any other component-specific files. For this to be manageable you need to also add an index.js that imports the component and this is not recommended for beginners.
### Summary
It's just JavaScript.
Use functional programming patterns and techniques where possible.
Use containers/presentational components.
Always declare your prop types.
Take advantage of ES6 and ESNext.
Use immutable data.
Use snapshot testing.
Use the function form of setState if you need access to the previous state or props.
Favour small components and composition when building your UI.
Don't ignore console warnings.

Reference:
https://reactjs.org/docs/faq-structure.html