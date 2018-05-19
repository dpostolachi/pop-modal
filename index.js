/* @flow */

import React, { PureComponent } from 'react'

const defaultProps = {
    onClose: null,
    onOpen: null,
    openMs: 1000,
    closeMs: 500,
    showBtn: true,
    btnClassName: 'fa fa-close',
    outsideClickClose: false,
    children: [],
    defaultOpen: false
}

type Props = {
    onClose?: Function,
    onOpen?: Function,
    openMs?: number,
    closeMs?: number,
    showBtn?: boolean,
    btnClassName?: string,
    outsideClickClose?: boolean,
    defaultOpen?: boolean,
    children?: any,
}

type State = {
    stage: string,
    ready: boolean,
}

// It's an decorator
export default ( Comp: any ) => {

    return class Modal extends PureComponent<any, State> {

        state: State = {
            stage: 'closed',
            ready: false
        }

        openMs: number = 0
        closeMs: number = 0
        onClose: null | Function = null
        onOpen: null | Function = null

        openPopup ( initialStage?: string = '' ) {

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

        clickOutside ( e: Object ) {

            if ( e.target.classList.contains( 'popModal' ) )
                return this.closePopup()

        }

        _modal ( props: Props ) {

            const { ready } = this.state

            const newProps = { ...defaultProps, ...props }

            const stage = ( !ready && newProps.defaultOpen ) ? this.setState({  stage: 'open' }) || 'open' : this.state.stage


            this.onClose = newProps.onClose || null
            this.onOpen = newProps.onOpen || null

            if ( stage === 'closed' )
                return null

            return (
                <div className={ `popModal ${stage}` } key='1' onClick={ ( newProps.outsideClickClose && stage === 'open' ) ? this.clickOutside.bind( this ) : null }>
                    {
                        ( newProps.showBtn && stage === 'open' ) ? (

                            <button onClick={ this.closePopup.bind( this ) } className='popModalClose' type='button'>
                                <span className={ newProps.btnClassName } />
                            </button>

                        ) : null
                    }
                    <div className='popModalContainer'>
                        { newProps.children }
                    </div>
                </div>
            )
        }

        render () {

            return <Comp
                { ...this.props }
                Modal={ this._modal.bind( this ) }
                modalStage={ this.state.stage }
                openPopup={ this.openPopup.bind( this ) }
                closePopup={ this.closePopup.bind( this ) }
            />

        }

    }

}
