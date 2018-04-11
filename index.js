import React, { PureComponent } from 'react'

// It's an decorator
export default ( Comp ) => {

    return class Modal extends PureComponent {

        constructor ( props ) {

            super( props )

            this.state = {
                stage: 'closed',
                ready: false,
            }

            // Default values
            this.onClose = null
            this.onOpen = null
            this.openMs = 1000
            this.closeMs = 500
            this.showBtn = true
            this.btnClassName = 'fa fa-close'
            this.outsideClickClose = false


            this.openPopup = this.openPopup.bind(this)
            this.closePopup = this.closePopup.bind(this)
            this.clickOutside = this.clickOutside.bind(this)
            this._modal = this._modal.bind(this)

        }

        openPopup ( initialStage = null ) {

                if ( initialStage )
                    return this.setState( {
                        stage: initialStage,
                    } )

                const { stage } = this.state

                if ( stage !== 'closed' )
                    return null

                return this.setState( {

                    stage: 'opening',

                } , () => {

                    setTimeout( () => {

                        return this.setState( {
                            stage: 'open',
                        }, () => {
                            if ( this.onOpen )
                                this.onOpen()
                        } )

                    } , this.openMs )

                } )

        }

        closePopup () {

            const { stage } = this.state

            if ( stage !== 'open' )
                return null

            return this.setState( {
                stage: 'closing'
            } , () => {

                return setTimeout( () => {

                    this.setState( {
                        stage: 'closed',
                    }, () => {
                        if ( this.onClose )
                            this.onClose()
                    } )

                }, this.closeMs )

            } )

        }

        componentDidMount() {

            return this.setState( {
                ready: true,
            } )

        }

        clickOutside (e) {

            if ( e.target.classList.contains( 'popModal' ) )
                return this.closePopup()

        }

        _modal ( props ) {

            const { ready } = this.state

            const stage = ( !ready && typeof props.defaultOpen !== 'undefined' && props.defaultOpen ) ? 'open' : this.state.stage

            if ( typeof props.onClose === 'function' )
                this.onClose = props.onClose

            if ( typeof props.onOpen === 'function' )
                this.onOpen = props.onOpen

            if ( typeof props.openMs === "number" )
                this.openMs = props.openMs

            if ( typeof props.closeMs === 'number' )
                this.closeMs = props.closeMs

            if ( typeof props.showBtn === 'boolean' )
                this.showBtn = props.showBtn

            if ( typeof props.btnClassName === 'string' )
                this.btnClassName = props.btnClassName

            if ( typeof props.outsideClickClose === 'boolean' )
                this.outsideClickClose = props.outsideClickClose

            if ( stage === 'closed' )
                return null

            return (
                <div className={ `popModal ${stage}` } key='1' onClick={ ( this.outsideClickClose && stage === 'open' ) ? this.clickOutside : null }>
                    {
                        ( this.showBtn && stage === 'open' ) ? (

                            <button onClick={ this.closePopup } className='popModalClose' type='button'>
                                <span className={ this.btnClassName } />
                            </button>

                        ) : null
                    }
                    <div className='popModalContainer'>
                        { props.children }
                    </div>
                </div>
            )
        }

        render () {

            return <Comp { ...this.props } Modal={ this._modal } modalStage={ this.state.stage } openPopup={ this.openPopup } closePopup={ this.closePopup } />

        }

    }

}
