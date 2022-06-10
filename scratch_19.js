function loop (tree, children, parent, prev) {
  return children.reduce((before, now) => {
    const getGrandChildren = tree.get(now);

    if (getGrandChildren) {
      const temp = loop(tree, getGrandChildren, now, before);
      let txt = '';

      children.forEach((child) => {
        if (temp[child]) {
          txt += `(${child}${temp[child]})`;
        }
      })
      before[parent] = txt;
      return before;
    } else {
      const value = before[parent];
      if (value) {
        before[parent] = before[parent] + `(${now})`;
      } else {
        before[parent] = `(${now})`;
      }
      return before;
    }
  }, prev)
}