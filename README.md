#jquery.formValidation
A simple, lightweight jQuery plugin for form validation.
This plugin is optimized for *Korean* language.

##Installation
Include script *after* the jQuery library (unless you are packaging scripts somehow else):
~~~~html
<script src="/path/to/jquery.validation.js"></script>
~~~~
**Do not include the script directly from GitHub.** The file is being served as text/plain and as such being blocked in Internet Explorer on Windows 7 for instance (because of the wrong MIME type). Bottom line: GitHub is not a CDN.

##Usage
Change function like this for submit or create new **doSubmit** function when is not exist.
~~~~javascript
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
~~~~
~~~~javascript
//After
function doSubmit() {
  var form = document.form;
  $(form).formValidation();
}
~~~~


Add attributes into form element for validation

> For required Fields
~~~~html
<input type="text" name="inputField_1" **data-label**="Name" **data-essl**="true">
~~~~

> For value validation

> For maxLength(byte) check

> Use Regular Expression


##configuration

##Authors
