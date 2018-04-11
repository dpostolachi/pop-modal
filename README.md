# pop-modal
A simple adaptive React Popup Modal. Also works fine with server side rendering of React.
# demo
[Demo on heroku](http://popmodal.herokuapp.com/)

# instalation
using npm
```
  npm install pop-modal ---save
```

Pop-Modal is a wrapper for React Components. It passes as props 2 methods for opening and closing modal: 'openPopup' and 'closePopup' and the 'Modal' itself.
```javascript
const { openPopup, closePopup, Modal } = this.props
```

to render something inside the modal just wrapp it inside Modal prop of Component.
```javascript
  render () {
    const { Modal } = this.props
    return (
        <Modal>
            <h1>Hello from Pop Modal</h1>
        </Modal>
    )
}
```

# usage
To add Modal to a React Component you must pass the Component that will receive modal's props.


```javascript
import WithModal from 'pop-modal'

export default WithModal( YourComponent )
```

# configuring modal
To configure Modal's behaviour you can pass props to it.

Below is a table of props it accepts.

| PropName | Type | Description | Default | Required |
| -------- |----- | ----------- | ------- | -------- |
| onClose | function | An callback function that will be called once the modal has been closed. | Null | false |
| onOpen | function | An callback function that will be called once the modal has been opened. | Null | false |
| openMs | number | Timeout in ms for modal opening. | 1000 | false |
| closeMs | number | Timeout in ms for modal closing. | 500 | false |
| showBtn | boolean | Display close button or no. | true | false |
| btnClassName | string | Close button's className. | 'fa fa-close' | false |
| outsideClickClose | boolean | Option to close modal if there is an click outside of it's container. | false | false |
| defaultOpen | boolean | Used to render modal in open stage, skipping opening stage. | false | false |

Example:

```javascript
  const { Modal } = this.props
  ...
  return (
    <Modal onClose={ () => { console.log('closed') } } openMs={ 1000 } closeMs={ 1000 }>
      <h1>Hello</h1>
    </Modal>
  )

```

# opening and closing
The react component that is wrapped in `pop-modal` gets two props for closing and opening: `openPopup` and `closePopup`, openPopup can take an initial stage to be opened in.
Example:
```javascript
    this.props.openPopup() // Opens the popup
```


# css
You can find the css required by the modal in the 'pop-modal/dist/modal.css' file in your node_modules. It's very likely that you will need to do some adjustments to this css file so it's better to just copy it from here and edit it the way you need it.

The modal itself has four transition classes: closed > opening > open > closing. So you can customize the transition of the modal.

```javascript
import 'pop-modal/dist/modal.css'
```

# usage example ( from demo )
using decorators
```javascript
import React, { Component } from 'react'
import WithModal from 'pop-modal'

@WithModal

export default class Page extends Component {
    render () {
        const { openPopup, Modal } = this.props
        return (
            <div className='container text-center'>
                <h1>Pop Modal Demo</h1>
                <button className='btn btn-primary' type='button' onClick={
                    () => { openPopup() }
                }>Open modal</button>
                <Modal outsideClickClose>
                    <h1>Hello from Pop Modal</h1>
                </Modal>
            </div>
        )
    }
}

```

using ES6
```javascript
import React, { Component } from 'react'
import WithModal from 'pop-modal'

class Page extends Component {
    render () {
        const { openPopup, Modal } = this.props
        return (
            <div className='container text-center'>
                <h1>Pop Modal Demo</h1>
                <button className='btn btn-primary' type='button' onClick={
                    () => { openPopup() }
                }>Open modal</button>
                <Modal outsideClickClose>
                    <h1>Hello from Pop Modal</h1>
                </Modal>
            </div>
        )
    }
}

export default WithModal( Page )
```
