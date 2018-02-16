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
            <h1>Hello fro Pop Modal</h1>
        </Modal>
    )
}
```

# configuring
To add Modal to a React Component you must pass a config object with timeouts for opening/closing the modal and the Component that will receive modal's props.

```javascript
import WithModal from 'pop-modal'

export default WithModal({
  open: 1000, //timeout for opening
  close: 500, //timeout for closing
})( YourComponent )
```

# css
You can find the css required by the modal in the 'pop-modal/dist/modal.css' file in your node_modules. It's very likely that you will need to do some adjustments to this css file so it's better to just copy it from here and edit it the way you need it.

```javascript
import 'pop-modal/dist/modal.css'
```

# usage example ( from demo )
using decorators
```javascript
import React, { Component } from 'react'
import WithModal from 'pop-modal'

@WithModal({
    open: 1000,
    close: 500,
})

export default class Page extends Component {
    render () {
        const { openPopup, Modal } = this.props
        return (
            <div className='container text-center'>
                <h1>Pop Modal Demo</h1>
                <button className='btn btn-primary' type='button' onClick={
                    () => { openPopup() }
                }>Open modal</button>
                <hr />
                <a href="https://github.com/voodoo-child/pop-modal">project on Github</a>
                <Modal>
                    <h1>Hello fro Pop Modal</h1>
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

@WithModal({
    open: 1000,
    close: 500,
})

class Page extends Component {
    render () {
        const { openPopup, Modal } = this.props
        return (
            <div className='container text-center'>
                <h1>Pop Modal Demo</h1>
                <button className='btn btn-primary' type='button' onClick={
                    () => { openPopup() }
                }>Open modal</button>
                <hr />
                <a href="https://github.com/voodoo-child/pop-modal">project on Github</a>
                <Modal>
                    <h1>Hello fro Pop Modal</h1>
                </Modal>
            </div>
        )
    }
}

export default WithModal( {
  opem: 1000,
  close: 500,
} )( Page )
```
