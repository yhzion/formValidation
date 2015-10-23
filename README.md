#jquery.formValidation
A simple, lightweight jQuery plugin for form validation.

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
function doSubmit() {
  
  var form = document.form;
  
  if(form.inputElement1.value == '') {
    alert('inputElement1 is empty!!');
    return;
  } else if(form.inputElement2.value == '') {
    alert('inputElement2 is empty!!');
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

##configuration

##Authors
