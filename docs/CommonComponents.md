# Common Components

This details a few components that are shared or general components that are used in multiple places for similar purposes.

## List
- Stateless
- General component list container
- Takes a data array and a component to create

```javascript
const List = props => {
  return props.data.map(d => {
    return React.createElement(props.component, { ...d })
  })
}
```

