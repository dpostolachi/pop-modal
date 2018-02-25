import React, { Component } from 'react'

// It's an generator
export default ( options ) => {

    if ( typeof options === 'undefined' )
        options = {
            timings: {
                open: 1000,
                close: 500,
            },
            outsideClickClose: false,
            closeButton: {
                show: true,
                icon: 'fa fa-close',
            }
        }

    if ( typeof options.timings === 'undefined' )
        options.timings = {
            open: 1000,
            close: 500,
        }

    if ( typeof options.closeButton === 'undefined' )
        options.closeButton = {
            show: true,
            icon: 'fa fa-close',
        }

    if ( typeof options.outsideClickClose === 'undefined' )
        options.outsideClickClose = false

    return ( Comp ) => {

        return class Modal extends Component {

            constructor ( props ) {

                super( props )

                this.options = options

                this.state = {
                    stage: 'closed',
                }


                this.openPopup = this.openPopup.bind(this)
                this.closePopup = this.closePopup.bind(this)
                this.clickOutside = this.clickOutside.bind(this)
                this._modal = this._modal.bind(this)

            }

            openPopup () {

                return new Promise( ( resolve ) => {

                    const { stage } = this.state

                    if ( stage !== 'closed' )
                        return null

                    const { open } = this.options.timings

                    return this.setState( {

                        stage: 'opening',

                    } , () => {

                        return setTimeout( () => {

                            this.setState( {

                                stage: 'open',

                            }, () => {
                                resolve()
                            } )

                        } , open )

                    } )

                } )

            }

            closePopup () {

                return new Promise( ( resolve ) => {

                    const { close } = this.options.timings

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
                                resolve()
                            } )

                        }, close )

                    } )

                })

            }

            clickOutside (e) {

                if ( e.target.classList.contains( 'popModal' ) )
                    return this.closePopup()

            }

            _modal ( props ) {

                const { stage } = this.state
                const { outsideClickClose, closeButton } = this.options

                if ( stage == 'closed' )
                    return null

                return (
                    <div className={ `popModal ${stage}` } key='1' onClick={ ( outsideClickClose && stage === 'open' ) ? this.clickOutside : null }>
                        {
                            ( closeButton.show && stage === 'open' ) ? (

                                <button onClick={ this.closePopup } className='popModalClose' type='button'>
                                    <span className={ closeButton.icon } />
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

                return <Comp { ...this.props } Modal={ this._modal } openPopup={ this.openPopup } closePopup={ this.closePopup } />

            }

        }

    }

}
