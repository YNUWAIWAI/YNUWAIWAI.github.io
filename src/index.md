---
layout : home
title : Home
---
<style>
  ul.projects {
    margin-bottom: 1rem;
  }

  .projects li {
    display: inline-block;
  }

  .projects p {
    font-size: 1.5rem;
  }

  .projects dl {
    border: solid 2px black;
  }

  .projects dt {
    font-size: 1.5rem;
    padding: 1rem;
  }

  .projects dd {
    font-size: 1.5rem;
    padding: 2rem;
  }

</style>
<ul class="projects">
  <li>
    <p>人狼プラットフォーム</p>
    <dl>
      <dt>スポンサー</dt>
      <dd><a href="https://rakumo.com/"><img src="{{ "/assets/img/rakumo.png" | prepend: site.baseurl }}" alt="rakumo-logo"></a></dd>
    </dl>
  </li>
</ul>
{% include postlist.html %}