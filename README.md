#jquery.formValidation
A simple, lightweight jQuery plugin for form validation.
This plugin is optimized for *Korean* language.

##Demo
View [simple example](http://yhzion.github.io/formValidation/formValidation.html) on git-hub pages

##Installation
Include script *after* the jQuery library (unless you are packaging scripts somehow else):
```html
<script src="/path/to/jquery.validation.js"></script>
```
**Do not include the script directly from GitHub.** The file is being served as text/plain and as such being blocked in some browsers. GitHub is not a CDN.

##Usage
Change function like this for submit or create new **doSubmit** function when is not exist.
```javascript
//Before
function doSubmit() 
  var form = document.form;
  
  if(form.inputField_1.value == '') {
    alert('inputField_1 is empty!!');
    return;
  } else if(form.inputField_2.value == '') {
    alert('inputField_2 is empty!!');
    return;
  }
  
  //...
  
  form.submit();
}
```
```javascript
//After
function doSubmit() {
  var form = document.form;
  $(form).formValidation();
}
```

Add attributes into form element for validation.

> - For required fields
```html
<input type="text" name="inputField_1" data-label="label_1" data-essl="true">
```

> - For value validation
```html
<!-- Number -->
<input type="text" name="inputField_1" data-label="label_1" data-val="number">
<!-- Date(YYYYMMDD) -->
<input type="text" name="inputField_2" data-label="label_2" data-val="yyyymmdd">
<!-- Date(YYYY-MM-DD) -->
<input type="text" name="inputField_3" data-label="label_3" data-val="yyyy-mm-dd">
<!-- Date(YYYY) -->
<input type="text" name="inputField_4" data-label="label_4" data-val="yyyy">
<!-- Phone  -->
<input type="text" name="inputField_5" data-label="label_5" data-val="phone">
<!-- Email  -->
<input type="text" name="inputField_6" data-label="label_6" data-val="email">
```

> - For length(byte) check
```html
<input type="text" name="inputField_1" data-label="label_1" maxlength="30">
```

> - Use Regular Expression
```html
<!-- [data-regex] and [data-val] is used at the same time,-->
<!-- the regular expression will take precedence.-->
<input type="text" name="inputField_1" data-label="label_1" data-regexp="^\d{3}$">
```

> - Execute function after validation error found
```html
<input type="text" name="inputField_1" data-label="label_1" data-essl="true" data-fn="doSomething()">
```

> - Attributes Specification

> | Attributes | Required | Description                                   |
> | :--------- | :------: | :----------                                   |
> | data-label | ●        | For display validation messages(Alert)        |
> | data-essl  |          | Required field (true or false)                |
> | data-val   |          | [Validation preset](#validation-presets)      |
> | maxlength  |          | Byte length check for UTF-8 characters        |
> | data-fn    |          | Execute function after validation error found |

The **data-label** is essential attribute. It may be used in combination with the remaining attributes. If verification errors are found, it gives the alert notification, otherwise automatically performs a form submit. To prevent form submit automatically, you can gives the option like this.
```javascript
function doSubmit() {
  
  var form = document.form;
  
  var options = {
    'submit' : false
  };
  var result = $(form).formValidation(options); // returns true or false
  
  if(result) {
    form.submit();
  } else {
    //to do something...
  }
}
```

##Validation Presets
| Presets  | Regular Expression |
| :------- | :----------------- |
|number|```/^\d*$/```|
|yyyymmdd|```/^\d{4}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/```|
|yyyy-mm-dd|```/^\d{4}[\/\-](0[1-9]|1[012])[\/\-](0[1-9]|[12][0-9]|3[01])$/```|
|yyyy|```/^[12]{1}\d{3}$/```|
|phone|```/^\d{2,3}-\d{3,4}-\d{4}$/```|
|email|```/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i```|

*jquery.validation.js* contains presets. The presets are used in addition or modify it to suit your project.

##Authors
JEON YOUNG HO

gplusit@gmail.com

If you have any questions, please contact us.

