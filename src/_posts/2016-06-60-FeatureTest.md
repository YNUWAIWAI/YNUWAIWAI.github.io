---
layout: post
title:  "Feature Test!"
date:   2016-10-14 20:16:40 +0900
published: false
---
本文はMarkdownで書くことができます。  
# h1 elements
## h2 elements
### h3 elements
#### h4 elements
##### h5 elements
###### h6 elements

*italic*
**bold**

|thead|thead|thead|thead|thead|thead|thead|thead|
|:----:|:-----:|
|tbody|tbody|tbody|tbody|tbody|tbody|tbody|tbody|

{: .aa}
- ul
  - ul
- ul
- ul

ソースコード
```python
import numpy as np

print('Hello')
```

```js
function F() {}
F.prototype.method = function() {
	console.log(this);
}

const f = new F();
f.method();//=> F{}


function G() {}
G.prototype.method = () => {
	console.log(this);
}

const g = new G();
g.method();//=> Window


function H() {}
H.method = function() {
	console.log(this);
}

const h = new H();
h.method();//=> TypeError
h.method;//=> undefined
H.method();//=>function H() {}
```
{:.line-numbers data-line="5-7, 2, 10"}