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

> - For required fields
~~~~html
<input type="text" name="inputField_1" data-label="label_1" data-essl="true">
~~~~

> - For value validation
~~~~html
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
~~~~

> - For maxLength(byte) check
~~~~html
<input type="text" name="inputField_1" data-label="label_1" maxlength="30">
~~~~

> - Use Regular Expression
~~~~html
<!-- [data-regex] and [data-val] is used at the same time,-->
<!--  the regular expression will take precedence.-->
<input type="text" name="inputField_1" data-label="label_1" data-regexp="^\d{3}$">
~~~~

##configuration

##Authors
