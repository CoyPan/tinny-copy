# tinny-copy
A tiny copy tool for copying text in a h5 page

# install 
```
npm install tinny-copy --save
```
# usage example
```
/html
<div id='clkBtn'></div>

/js
var TinyCopy = require('tinny-copy');
var copyAction = new TinyCopy({
  selectText:'hehe'
});
copyAction.on('success',function(e){
  console.log('success', e.selextText); // 'success hehe'
});
copyAction.on('fail',function(){
  console.log('fail');
});

document.querySelector('#clkBtn').addEventListener('click',function(){
  copyAction.copy();
});
```

