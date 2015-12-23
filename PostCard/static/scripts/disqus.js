/**
 * Created by Pawel on 23.12.2015.
 */

function initDisqus(pageurl,pageid)
{
var disqus_config = function () {
this.page.url=pageurl; // Replace PAGE_URL with your page's canonical URL variable
this.page.identifier = pageurl; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
};

(function() { // DON'T EDIT BELOW THIS LINE
var d = document, s = d.createElement('script');

s.src = '//ragnardanneshild.disqus.com/embed.js';

s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();}

