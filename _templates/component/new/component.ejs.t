---
to: src/components/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>.tsx
---
import React from 'react';

type Props = {
  // Define your props here
}

export default function <%= h.changeCase.pascal(name) %>({}: Props) {
  return (
    <div>
      <p><%= h.changeCase.pascal(name) %></p>
    </div>
  );
}