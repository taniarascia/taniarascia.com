---
date: 2019-05-16
title: 'Getting Started with Vue - An Overview and Walkthrough Tutorial'
template: post
thumbnail: '../thumbnails/vue.png'
slug: getting-started-with-vue
categories:
  - JavaScript
  - Popular
tags:
  - javascript
  - vue
  - library
---

We're in a golden era of JavaScript libraries and frameworks. More and more companies are building out full, dynamic web apps in addition to - or in lieu of - traditional desktop applications. This means things are constantly changing and frameworks are going in and out of vogue, but the core concepts of what we're trying to accomplish remain similar.

Previously, I wrote a [Getting Started with React](/getting-started-with-react) guide that helped out a lot of beginner and intermediate developers. [Vue.js](https://github.com/vuejs/vue) is going toe-to-toe with React for popularity among JavaScript developers, so I'd like to offer the same straightforward and concise introduction for those who'd like to learn Vue as well. Let's get started!

#### Prerequisites

- Knowledge of [HTML & CSS](https://internetingishard.com/)
- Knowledge of basic [JavaScript](/javascript-day-one/)
- Familiarity of [ES6+ features and syntax](/es6-syntax-and-feature-overview/)
- [Node.js and npm](/how-to-install-and-use-node-js-and-npm-mac-and-windows/) (or yarn) installed globally
- Familiarity with [REST APIs](https://code.tutsplus.com/tutorials/code-your-first-api-with-nodejs-and-express-understanding-rest-apis--cms-31697) would be helpful, but we'll go over it.

#### Goals

We're going to create a small application with Vue. The app will be a simple employee database and we'll learn:

- How to **set up** Vue
- The **anatomy** of a Vue file
- How to work with **data, methods, conditional statements, and events** in Vue
- How to **create, update, view, and delete** users (employees) from the system
- How to **make API calls** for each of the above actions
- How to use **tables, forms**, and form **validation**
- How to host a Vue build on GitHub pages

I've created a live demo and put the source up on GitHub.

- [View demo](https://taniarascia.github.io/vue-tutorial/)
- [View source](https://github.com/taniarascia/vue-tutorial)

(You can also [view the demo on CodeSandbox](https://codesandbox.io/s/xwj445z6w).)

## What is Vue?

- Vue (or Vue.js) is an open-source front-end JavaScript framework
- Vue is the **view** layer of an MVC application (Model View Controller)
- Vue is currently [one of the most popular](https://github.com/vuejs/vue) JavaScript libraries/frameworks
- Unlike other popular JavaScript projects, Vue is not backed by a large corporation like React (Facebook) or Angular (Google). Vue was originally written by [Evan You](https://github.com/yyx990803) and the open-source community.

## Setup and Installation

There are two main ways to set up Vue - in a Node project, or directly injected into a static HTML file. I'd first like to take a look at setting up Vue in an HTML file, as it's the simplest setup and introduction. Those who have only ever used a library like jQuery will be most familiar with this method. If you've already used React or another JavaScript framework, feel free to skip to the next section.

We can just create a basic HTML file and add a link to a Vue CDN in the head, and create a `<div>` with an id of `app`.

### Static HTML File

<div class="filename">index.html</div>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

    <title>Vue App</title>
  </head>

  <body>
    <div id="app"></div>
  </body>
</html>
```

We can create a simple "Hello World" with Vue. Using double brackets, we'll render `message` in `app`. In the `<script>` tag, we'll link the data and the DOM. We create a new `Vue`, and the `message` property on `data` will

<div class="filename">index.html</div>

```html
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

    <title>Vue App</title>
  </head>

  <body>
    <div id="app">{{message}}</div>

    <script>
      const App = new Vue({
        el: '#app',
        data: {
          message: 'Hello Vue!',
        },
      })
    </script>
  </body>
</html>
```

We can see the data render.

![](../images/vue1.png)

At this point, it's not very impressive, and it's what you'll learn in [the introduction of the documentation](https://vuejs.org/v2/guide/), but it drives home the important point that Vue is just JavaScript, and there's no need to get nervous about Node, Babel, Webpack, and so on.

### Vue CLI

More often, you won't be injecting Vue into a static HTML file, but you'll be taking advantage of the Node ecosystem. The easiest way we can do this is vue [Vue CLI](https://cli.vuejs.org/), or the Vue Command Line Interface. As mentioned in the prerequisites, you should be familiar with Node and npm/yarn and how to work with local and global packages.

First, we'll install Vue CLI.

```bash
# install with npm
npm i -g @vue/cli @vue/cli-service-global

# install with yarn
yarn global add @vue/cli @vue/cli-service-global
```

Now that we have Vue CLI installed globally, we can use the `vue` command anywhere. We'll use [vue create](https://cli.vuejs.org/guide/creating-a-project.html#vue-create) to start a new project.

> `vue create` is the equivalent to `create-react-app`.

```bash
vue create vue-app
```

You'll be given an option to do default or manual, and we can just select default.

```terminal
Vue CLI v3.7.0
? Please pick a preset: (Use arrow keys)
❯ default (babel, eslint)
  Manually select features
```

Once that's done, you can move to the new app that's been created and `serve` to run the dev server.

```bash
cd vue-app
npm run serve
# or
yarn serve
```

Once that's done, you can navigate to `http://localhost:8080/` to see the default page.

![](../images/vue2.png)

At this point, you're all set up and ready to go with Vue. If you're using Visual Studio Code, install the [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) plugin for syntax highlighting, formatting, and so on.

### Vue DevTools

One final thing to have in your toolbelt while working with Vue is Vue DevTools. It's an add-on to regular DeveloperTools which will show you all the information about your components - their state, methods, etc.

- [Vue DevTools on Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en)
- [Vue DevTools on FireFox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

![](../images/vue3.png)

## Getting Started

Congrats, you're all set up! You have a new Vue boilerplate app. In the project files, you have a `public` folder which contains `index.html`, and an `src` folder with `main.js` as the entry point. We're introduced to `.vue` files, with the `HelloWorld.vue` and `App.vue` components.

![](../images/vue4.png)

### Entry point

In `main.js`, we're bringing in `Vue` and rendering the App to our app div in `index.html`. This file won't need to change.

<div class="filename">src/main.js</div>

```js
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```

## Anatomy of a Vue file

Anything else we make will be a `.vue` file, which always consists of three things:

- `<template>`
- `<script>`
- `<style>`

And looks like this:

<div class="filename">example.vue</div>

```html
<template></template>

<script>
  export default {
    name: 'component-name',
  }
</script>

<style scoped></style>
```

This may seem strange to you, as it did to me at first. I originally learned front end coding with a focus on separation of concerns for HTML, CSS, and JavaScript, and here we have all three together. Yet JavaScript and the way we design apps has evolved, and keeping our styles and view and component coupled together is generally considered an advantage and improves maintainability.

The data and logic for the component goes in the `<script>` tag, but only `name` is required. The `<style>` tag is just CSS. We have the advantage of being able to scope the CSS so it only applies to this component and not globally with the `scoped` attribute.

Now let's start actually building this app.

As always, this tutorial is about functionality, not styles, so I'm just going to link to [Primitive UI](https://github.com/taniarascia/primitive) in the `index.html` file to add some easy default styles.

```html
<link rel="stylesheet" href="https://unpkg.com/primitive-ui/dist/css/main.css" />
```

## Creating a Component

Create a file called `EmployeeTable.vue` in `src/components`. We're going to create a table with some static data in here.

<div class="filename">src/components/EmployeeTable.vue</div>

```html
<template>
  <div id="employee-table">
    <table>
      <thead>
        <tr>
          <th>Employee name</th>
          <th>Employee email</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Richard Hendricks</td>
          <td>richard@piedpiper.com</td>
        </tr>
        <tr>
          <td>Bertram Gilfoyle</td>
          <td>gilfoyle@piedpiper.com</td>
        </tr>
        <tr>
          <td>Dinesh Chugtai</td>
          <td>dinesh@piedpiper.com</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'employee-table',
  }
</script>

<style scoped></style>
```

In Vue, the convention is that the filename and import will be in PascalCase, such as `EmployeeTable`, but when used in a template, this will translate to kebab-case, `<employee-table>`. This uses the proper conventions for JavaScript and HTML respectively.

> I'm wrapping the template in a `div` which isn't strictly necessary, but a template can only have one root child element, so this makes it easy to add additional elements going forward.

We're exporting `EmployeeTable` and importing it into `App.vue`. In our `import`, we can use `@` to reference the `src` folder. `App.vue` knows which components it can use via the `components` property. All imported components must be added there. I've also added in some global styles.

<div class="filename">src/App.vue</div>

```html
<template>
  <div id="app" class="small-container">
    <h1>Employees</h1>

    <employee-table />
  </div>
</template>

<script>
  import EmployeeTable from '@/components/EmployeeTable.vue'

  export default {
    name: 'app',
    components: {
      EmployeeTable,
    },
  }
</script>

<style>
  button {
    background: #009435;
    border: 1px solid #009435;
  }

  .small-container {
    max-width: 680px;
  }
</style>
```

So here's what we have so far.

![](../images/vue5.png)

We want to refactor this already to use data in the form of arrays and object as opposed to hard coding all our values into the table. So let's add a `data()` method, and return an `employees` array. We're also going to add IDs to each one to make them uniquely identifiable.

<div class="filename">App.vue</div>

```js
import EmployeeTable from '@/components/EmployeeTable.vue'

export default {
  name: 'app',
  components: {
    EmployeeTable,
  },
  data() {
    return {
      employees: [
        {
          id: 1,
          name: 'Richard Hendricks',
          email: 'richard@piedpiper.com',
        },
        {
          id: 2,
          name: 'Bertram Gilfoyle',
          email: 'gilfoyle@piedpiper.com',
        },
        {
          id: 3,
          name: 'Dinesh Chugtai',
          email: 'dinesh@piedpiper.com',
        },
      ],
    }
  },
}
```

> Data is like React state.

Now we have this data on `App.vue`, but we want to pass it to `EmployeeTable`. We can do that by passing the data down as a property. An attribute that begins with a colon `:` will allow you to pass data. The more verbose version would be `v-bind`. In this case we'll pass our `employees` array.

```html
<employee-table :employees="employees" />

<!-- this is the same thing -->
<employee-table v-bind:employees="employees" />
```

Now on the `EmployeeTable` side, we want to retrieve that data, so we tell the component that it will receive props, in this case an `Array`.

<div class="filename">EmployeeTable.vue</div>

```js
export default {
  name: 'employee-table',
  props: {
    employees: Array,
  },
}
```

> You might also see an array of strings instead of each value and type for props, like `props: [ 'employees' ]`, which also works but is less explicit.

### Loops

Now that we have the data, we want to loop through the data and display the DOM nodes accordingly. We'll do this with the `v-for` attribute. Now that we can retrieve `employees` in `EmployeeTable`, we'll display one table row per employee.

<div class="filename">EmployeeTable.vue</div>

```html
<template>
  <div id="employee-table">
    <table>
      <!-- ...thead... -->
      <tbody>
        <tr v-for="employee in employees" :key="employee.id">
          <td>{{ employee.name }}</td>
          <td>{{ employee.email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
```

Vue (like React) has a requirement for uniquely identifying any element in an array, so we'll use `:key` on the table row and set it to a unique value.

Now our table hasn't changed from a view perspective, but it is now set up to work with data more efficiently.

![](../images/vue5.png)

## Working with Forms

Now we're successfully accomplishing the "Read" portion of a CRUD app, but the next most important thing to do is add the ability to create a new employee. We're going to create an add employee form.

Make `EmployeeForm.vue` and set it up a field to enter name, email, and a button to submit. I'll go ahead and create an `employee` data property with `name` and `email` on it.

<div class="filename">src/components/EmployeeForm.vue</div>

```html
<template>
  <div id="employee-form">
    <form>
      <label>Employee name</label>
      <input type="text" />
      <label>Employee Email</label>
      <input type="text" />
      <button>Add Employee</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'employee-form',
    data() {
      return {
        employee: {
          name: '',
          email: '',
        },
      }
    },
  }
</script>

<style scoped>
  form {
    margin-bottom: 2rem;
  }
</style>
```

![](../images/vue6.png)

Now we have to figure out how to get the data that we're writing in the input into Vue's component state. To do that we'll use `v-model`. [v-model](https://vuejs.org/v2/guide/forms.html) is some built-in Vue syntactic sugar for updating an input value with an onchange event.

<div class="filename">EmployeeForm.vue</div>

```html
<template>
  <div id="employee-form">
    <form>
      <label>Employee name</label>
      <input v-model="employee.name" type="text" />
      <label>Employee Email</label>
      <input v-model="employee.email" type="text" />
      <button>Add Employee</button>
    </form>
  </div>
</template>
```

Now that you've added this, you can see in Vue DevTools that the state of the component changes. We just need to submit these values and update the parent (App) state with the new employee object.

### Event listeners

We want to do an `onsubmit` event on the form. We can do that with `v-on:submit`, or `@submit` for short. This convention with be the same for `@click`/`v-on:click` or any other similar event. The `submit` event also has a handy `prevent` we can add to it, which is the same as putting `event.preventDefault()` inside the submit function, since we won't be using the default GET/POST methods provided by forms.

Let's add this to the form, and reference a `handleSubmit` method we'll make.

<div class="filename">EmployeeForm.vue</div>

```html
<form @submit.prevent="handleSubmit"></form>
```

### Methods

Now we're going to create our first method on a component. Below `data()`, we can create a `methods` object, which will contain all the custom methods we create. Let's add `handleSubmit` there.

<div class="filename">EmployeeForm.vue</div>

```js
export default {
  name: 'employee-form',
  data() {
    return {
      employee: {
        name: '',
        email: '',
      },
    }
  },
  methods: {
    handleSubmit() {
      console.log('testing handleSubmit')
    },
  },
}
```

### Emitting events to the parent

Now if you try to submit the form, you'll see the message logged in the console. We know the form submit method is working properly, so we can pass the data up to `App` now. We'll do this using `$emit`.

Emit broadcasts a name of an event and data to its parent component, like so.

```js
this.$emit('name-of-emitted-event', dataToPass)
```

In our case, we'll create an event called `add:employee`, and pass `this.employee`.

<div class="filename">EmployeeForm.vue</div>

```js
handleSubmit() {
  this.$emit('add:employee', this.employee)
}
```

> The `add:employee` syntax (as opposed to `add-employee` or something else) is recommended in [the Vue documentation](https://vuejs.org/v2/guide/components-custom-events.html#sync-Modifier)

Once you add this, click to add form button and go to Vue DevTools. You'll see a notification for a new event, and it will tell you the name, source, and payload, which in this case is an object we created.

![](../images/vue7.png)

### Retrieving events from the child

Now `employee-form` is broadcasting its emitted event, but we need to capture the event and value in the parent to work with it.

The first thing we need to do is make `employee-form` acknowledge and handle the emitted event, and invoke a new method. It will look like this:

```html
<component @name-of-emitted-event="methodToCallOnceEmitted"></component>
```

So let's add that to `App.vue`.

<div class="filename">App.vue</div>

```html
<employee-form @add:employee="addEmployee" />
```

Now we just have to create the `addEmployee` method on `App.vue`, which will modify the employees array by adding a new item to it. That will essentially look like this:

<div class="filename">App.vue</div>

```js
methods: {
  addEmployee(employee) {
    this.employees = [...this.employees, employee]
  }
}
```

Since I have to make an `id` as well, I'll just write some code to get the new employees ID based on number of items in the array. Note that in a real database, this ID would be uniquely generated or auto incremented.

```js
addEmployee(employee) {
  const lastId =
    this.employees.length > 0
      ? this.employees[this.employees.length - 1].id
      : 0;
  const id = lastId + 1;
  const newEmployee = { ...employee, id };

  this.employees = [...this.employees, newEmployee];
}
```

Now with this, you can add new employees. Note that the new employee will not persist, as it is front end only and not connected to a database.

![](../images/vue8.png)

## Basic form validation

This technically works, but we can clean it up a little. We want to...

- Show a success message if everything went through
- Show an error message if something was missing
- Highlight the inputs that have invalid data
- Clear the inputs after the form is done submitting properly, and
- Focus on the first item in the input after successful submission

### Computed properties

In Vue, we can use [computed properties](https://vuejs.org/v2/guide/computed.html), which are functions that are automatically computed when something changes. This way we can avoid putting complex logic in the Vue template itself. I'm just going to put a basic check to make sure the field isn't empty for both fields.

<div class="filename">EmployeeForm.vue</div>

```js
computed: {
  invalidName() {
    return this.employee.name === ''
  },

  invalidEmail() {
    return this.employee.email === ''
  },
},
```

To set all this up, I'm going to add a `submitting` state, to check whether or not the form is currently being submitted, an `error` state if something went wrong, and a `success` state if it went through properly.

<div class="filename">EmployeeForm.vue</div>

```js
data() {
  return {
    submitting: false,
    error: false,
    success: false,
    employee: {
      name: '',
      email: '',
    }
  }
}
```

The submit function will first clear whether or not `success` or `error` have been set, the start submitting. It'll check our computed properties, and if either is true, an `error` will be set. If not, we can submit, and set all the states back to default.

<div class="filename">EmployeeForm.vue</div>

```js
methods: {
  handleSubmit() {
    this.submitting = true
    this.clearStatus()

    if (this.invalidName || this.invalidEmail) {
      this.error = true
      return
    }

    this.$emit('add:employee', this.employee)
    this.employee = {
      name: '',
      email: '',
    }
    this.error = false
    this.success = true
    this.submitting = false
  },

  clearStatus() {
    this.success = false
    this.error = false
  }
}
```

Since we want an error message and a success message, I'll set up the CSS for that.

<div class="filename">EmployeeForm.vue</div>

```html
<style scoped>
  form {
    margin-bottom: 2rem;
  }

  [class*='-message'] {
    font-weight: 500;
  }

  .error-message {
    color: #d33c40;
  }

  .success-message {
    color: #32a95d;
  }
</style>
```

Finally, we'll set up the form. If the form is submitting and one of the computed properties is invalid, we want to set a `has-error` class on the input. Using `:class=` ensures that the class will be treated as JavaScript instead of a plain string. We can make sure the statuses get cleared on focus and keypress events, and we have success and error messages displayed accordingly at the bottom.

<div class="filename">EmployeeForm.vue</div>

```html
<form @submit.prevent="handleSubmit">
  <label>Employee name</label>
  <input
    ref="first"
    type="text"
    :class="{ 'has-error': submitting && invalidName }"
    v-model="employee.name"
    @focus="clearStatus"
    @keypress="clearStatus"
  />
  <label>Employee Email</label>
  <input
    type="text"
    :class="{ 'has-error': submitting && invalidEmail }"
    v-model="employee.email"
    @focus="clearStatus"
  />
  <p v-if="error && submitting" class="error-message">
    ❗Please fill out all required fields
  </p>
  <p v-if="success" class="success-message">
    ✅ Employee successfully added
  </p>
  <button>Add Employee</button>
</form>
```

### Conditonals

You'll notice a `v-if` property. This is a [conditional in Vue](https://vuejs.org/v2/guide/conditional.html). In this case, the `<p>` element will only be displayed if the condition is true.

There is also a `v-else-if`, and `v-else` property, which work the same as their vanilla JS counterparts.

Now that that's complete, we can see these conditionally rendered elements. Here's the error message on a missing field.

![](../images/vue9.png)

And here's the success message.

![](../images/vue10.png)

### Adding a reference

There's one more small improvement we can make. After submitting the form, it would be nice if the focus went back on the first item to make it easy to add many items without clicking around. We can do that with [refs](https://vuejs.org/v2/api/#vm-refs), which we can use to target a specific element.

We can just add a ref to the first input...

<div class="filename">EmployeeForm.vue</div>

```html
<input ref="first" ... />
```

And `focus` that ref after submitting the form in `handleSubmit`.

<div class="filename">EmployeeForm.vue</div>

```js
this.$emit('add:employee', this.employee)
this.$refs.first.focus()
```

Now after you submit the focus will automatically go to the first field in the form. The `@keypress` event to `clearStatus` we added to it before will ensure the success or error message goes away once you start typing.

> Our `EmployeeForm` file is complete, and you can [view the source](https://github.com/taniarascia/vue-tutorial/blob/master/src/components/EmployeeForm.vue) of the completed file in case you got lost along the way.

## Deleting Items

Now that the form is done, we have to finish the other actions on the table - editing and deleting. We'll start with deleting, which is an easier operation.

First, we'll update the table to have an "Actions" row, and add buttons for editing and deleting.

<div class="filename">EmployeeTable.vue</div>

```html
<template>
  <div id="employee-table">
    <table>
      <thead>
        <tr>
          <th>Employee name</th>
          <th>Employee email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id">
          <td>{{ employee.name }}</td>
          <td>{{ employee.email }}</td>
          <td>
            <button>Edit</button>
            <button>Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
  button {
    margin: 0 0.5rem 0 0;
  }
</style>
```

We'll emit an event like before, this time called `deleteEmployee`. We can pass the `id` of the employee as the payload.

<div class="filename">EmployeeTable.vue</div>

```html
<button @click="$emit('delete:employee', employee.id)">Delete</button>
```

Back in `App.vue`, we have to tell `employee-table` to perform an action on `delete-employee`...

<div class="filename">App.vue</div>

```html
<employee-table :employees="employees" @delete:employee="deleteEmployee" />
```

And we'll filter the deleted row out.

<div class="filename">App.vue</div>

```js
methods: {
  addEmployee(employee) {...},
  deleteEmployee(id) {
    this.employees = this.employees.filter(
      employee => employee.id !== id
    )
  }
}
```

Now you'll notice you can delete items. Let's just add a message in case there are no employees.

<div class="filename">EmployeeTable.vue</div>

```html
<div id="employee-table">
  <p v-if="employees.length < 1" class="empty-table">
    No employees
  </p>
  <table v-else>
    ...
  </table>
</div>
```

We can successfully add and delete employees now.

![](../images/vue11.png)

### Editing Items

Editing is a little more complex than deleting. The setup from `App.vue` is simple though, so we'll do that first. Just add the `edit:employee` event that we'll be making:

<div class="filename">App.vue</div>

```html
<employee-table
  :employees="employees"
  @delete:employee="deleteEmployee"
  @edit:employee="editEmployee"
/>
```

And create the `editEmployee` method, which will take `id` and `updatedEmployee` parameters, map through the `employees` array, and update the correct employee.

<div class="filename">App.vue</div>

```js
editEmployee(id, updatedEmployee) {
  this.employees = this.employees.map(employee =>
    employee.id === id ? updatedEmployee : employee
  )
}
```

Simple enough.

Now back in `EmployeeTable.vue`, we'll basically want to make an "edit mode" that is enabled when the button is pressed.

<div class="filename">EmployeeTable.vue</div>

```html
<button @click="editMode(employee.id)">Edit</button>
```

We'll create an `editing` state that will get set to the `id` of the row that's currently being edited when `editMode` is enabled. `EmployeeTable` will have it's own local `editEmployee` method, which emits `edit:employee` to `App` if the fields aren't empty, and resets the `editing` state.

<div class="filename">EmployeeTable.vue</div>

```js
data() {
  return {
    editing: null,
  }
},
methods: {
  editMode(id) {
    this.editing = id
  },

  editEmployee(employee) {
    if (employee.name === '' || employee.email === '') return
    this.$emit('edit:employee', employee.id, employee)
    this.editing = null
  }
}
```

Here's the current state of our table row - we're just displaying the values.

```html
<tr v-for="employee in employees" :key="employee.id">
  <td>{{ employee.name }}</td>
  <td>{{ employee.email }}</td>
  <td>
    <button @click="editMode(employee.id)">Edit</button>
    <button @click="$emit('delete:employee', employee.id)">
      Delete
    </button>
  </td>
</tr>
```

To make it editable, we'll check if `editing === employee.id` is true for a particular row, and display and input instead. We'll also add a cancel button that will cancel the editing by setting it to null.

```html
<tr v-for="employee in employees" :key="employee.id">
  <td v-if="editing === employee.id">
    <input type="text" v-model="employee.name" />
  </td>
  <td v-else>{{employee.name}}</td>
  <td v-if="editing === employee.id">
    <input type="text" v-model="employee.email" />
  </td>
  <td v-else>{{employee.email}}</td>
  <td v-if="editing === employee.id">
    <button @click="editEmployee(employee)">Save</button>
    <button class="muted-button" @click="editing = null">Cancel</button>
  </td>
  <td v-else>
    <button @click="editMode(employee.id)">Edit</button>
    <button @click="$emit('delete:employee', employee.id)">Delete</button>
  </td>
</tr>
```

And now I can edit a single row at a time!

![](../images/vue12.png)

Editing works, but you still can't cancel the state from updating with this code, even if the new values don't get sent to the API call. We'll create `cancelEdit`, and make the cancel button call ` @click="cancelEdit(employee)"` and remove `.id` from the edit button. We'll make a cached employee that we can return to.

```js
editMode(employee) {
  this.cachedEmployee = Object.assign({}, employee)
  this.editing = employee.id
},
cancelEdit(employee) {
  Object.assign(employee, this.cachedEmployee)
  this.editing = null;
}
```

At this point, the app is technically complete, but a real production app will probably be making API calls to a back end database, so we'll make a mock version of that.

> If you'd like to view a completed version of the app before we get into the API calls, you can [view this CodeSandbox demo](https://codesandbox.io/s/m3126z3w8p)].

## Making Asynchronous REST API Calls

We're going to use [JSON Placeholder](https://jsonplaceholder.typicode.com) to make fake API calls that will give us real responses. We can `GET` values (for example, visit [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users) to see the `users` JSON we'll be using), and we can make `POST`, `PUT`, and `DELETE` requests. These requests will not persist in a real database because they're for example purposes.

> If you're not familiar with REST, please [read this article](https://code.tutsplus.com/tutorials/code-your-first-api-with-nodejs-and-express-understanding-rest-apis--cms-31697)

An asynchronous method with [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) will look something like this, using a [try/catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) block.

> We'll use the built-in [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) that Node and the browser have access to, however other options like [Axios](https://www.axios.com/) are available and popular. I just prefer to use Fetch because it's one less dependency to install for example purposes.

```js
async asynchronousMethod() {
  try {
    const response = await fetch('url')
    const data = await response.json()

    // do something with `data`
  } catch (error) {
    // do something with `error`
  }
}
```

So at this point, I'll replace all our CRUD methods with `async` methods, and update the data via the API as well as the front end.

### Lifecycle methods

With GET, we'll want to remove all the pre-populated data we have in the `employees` array, and replace it with the data from the API. We'll call that `GET` in the `mounted` [lifecycle method](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram).

> If you're familiar with React, you'll know about lifecycle methods already, and this is the Vue equivalent of `componentDidMount`.

[`mounted`](https://vuejs.org/v2/api/#mounted) tells our component to perform the action once the component is actually inserted to the DOM. This is a common way to display data from an API. (Some use the `created` lifecycle for this task.)

<div class="filename">App.vue</div>

```js
export default {
  name: 'app',
  components: {
    EmployeeTable,
    EmployeeForm,
  },
  data() {
    return {
      employees: [],
    }
  },

  mounted() {
    this.getEmployees()
  },
}
```

So now we can update all our CRUD methods with their asynchronous API-call equivalents.

### GET

Retrieve a resource.

<div class="filename">App.vue</div>

```js
async getEmployees() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await response.json()
    this.employees = data
  } catch (error) {
    console.error(error)
  }
}
```

### POST

Create a new resource (non-idempotent).

<div class="filename">App.vue</div>

```js
async addEmployee(employee) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify(employee),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
    const data = await response.json()
    this.employees = [...this.employees, data]
  } catch (error) {
    console.error(error)
  }
}
```

### PUT

Update an exiting resource (idempotent).

<div class="filename">App.vue</div>

```js
async editEmployee(id, updatedEmployee) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedEmployee),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
    const data = await response.json()
    this.employees = this.employees.map(employee => (employee.id === id ? data : employee))
  } catch (error) {
    console.error(error)
  }
}
```

### DELETE

Remove an existing resource.

<div class="filename">App.vue</div>

```js
async deleteEmployee(id) {
  try {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE"
    });
    this.employees = this.employees.filter(employee => employee.id !== id);
  } catch (error) {
    console.error(error);
  }
}
```

Okay, all API calls should be working properly, and we're getting data from JSON Placeholder instead of our own, static data.

![](../images/vue13.png)

And the app is complete! You can [check out the live demo](https://taniarascia.github.io/vue-tutorial/) or [view the source](https://github.com/taniarascia/vue-tutorial).

## Deploying a Build to GitHub Pages

You might want to deploy your newly completed app to GitHub pages, a static site host. Assuming you've already created a repository and committed to master, using the steps below...

```bash
git remote add origin https://github.com/username/vue-app
git add .
git commit -m "initial commit"
git push -u origin master
```

You can commit the build with the following steps:

Create a `gh-pages` branch.

```bash
git checkout -b gh-pages
```

Remove the `dist` directory from `.gitignore`.

Create `vue.config.js` and add the `publicPath` of your GitHub

<div class="filename">vue.config.js</div>

```js
module.exports = {
  publicPath: 'vue-app',
}
```

Create a build, which will output the `dist` folder.

```bash
npm run build
# or
yarn build
```

Add the build, commit, and send it to `gh-pages` on GitHub.

```bash
git add dist
git commit -m "gh-pages commit"
git subtree push --prefix dist origin gh-pages
```

And within a minute or two, it should be all hosted!

## Conclusion

Wow, that was a lot. We learned what Vue is, how to set up a Vue project via static HTML or Vue Cli, and how to make a complete CRUD app in Vue. We learned about Vue components, data, methods, computed methods, lifecycles, conditionals, events, form handling, and building. If you went through and did this whole tutorial, you should feel pretty good starting to build your own apps from scratch in Vue.

From here, you might want to look into [Vuex](https://vuex.vuejs.org/) for state management (similar to React's Redux), and [Vue Router](https://router.vuejs.org/) for front-end routing (similar to React Router DOM). The great part about the Vue environment is that it's batteries optional, but official batteries also included should you need it.

A lot of work went into creating this app and tutorial, and if you enjoyed it I hope you share it with anyone you think might benefit from it! If you see any mistakes, please let me know.

- [View Source](https://github.com/taniarascia/vue-tutorial)
- [View Demo](https://taniarascia.github.io/vue-tutorial/)
