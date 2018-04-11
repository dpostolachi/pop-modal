'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dns = require('dns');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// It's an decorator

exports.default = function (Comp) {

    return function (_PureComponent) {
        _inherits(Modal, _PureComponent);

        function Modal(props) {
            _classCallCheck(this, Modal);

            var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

            _this.state = {
                stage: 'closed'

                // Default values
            };_this.onClose = null;
            _this.onOpen = null;
            _this.openMs = 1000;
            _this.closeMs = 500;
            _this.showBtn = true;
            _this.btnClassName = 'fa fa-close';
            _this.outsideClickClose = false;

            _this.openPopup = _this.openPopup.bind(_this);
            _this.closePopup = _this.closePopup.bind(_this);
            _this.clickOutside = _this.clickOutside.bind(_this);
            _this._modal = _this._modal.bind(_this);

            return _this;
        }

        _createClass(Modal, [{
            key: 'openPopup',
            value: function openPopup() {
                var _this2 = this;

                var initialStage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


                if (initialStage) return this.setState({
                    stage: initialStage
                });

                var stage = this.state.stage;


                if (stage !== 'closed') return null;

                return this.setState({

                    stage: 'opening'

                }, function () {

                    setTimeout(function () {

                        return _this2.setState({
                            stage: 'open'
                        }, function () {
                            if (_this2.onOpen) _this2.onOpen();
                        });
                    }, _this2.openMs);
                });
            }
        }, {
            key: 'closePopup',
            value: function closePopup() {
                var _this3 = this;

                var stage = this.state.stage;


                if (stage !== 'open') return null;

                return this.setState({
                    stage: 'closing'
                }, function () {

                    return setTimeout(function () {

                        _this3.setState({
                            stage: 'closed'
                        }, function () {
                            if (_this3.onClose) _this3.onClose();
                        });
                    }, _this3.closeMs);
                });
            }
        }, {
            key: 'clickOutside',
            value: function clickOutside(e) {

                if (e.target.classList.contains('popModal')) return this.closePopup();
            }
        }, {
            key: '_modal',
            value: function _modal(props) {
                var stage = this.state.stage;


                if (typeof props.onClose === 'function') this.onClose = props.onClose;

                if (typeof props.onOpen === 'function') this.onOpen = props.onOpen;

                if (typeof props.openMs === "number") this.openMs = props.openMs;

                if (typeof props.closeMs === 'number') this.closeMs = props.closeMs;

                if (typeof props.showBtn === 'boolean') this.showBtn = props.showBtn;

                if (typeof props.btnClassName === 'string') this.btnClassName = props.btnClassName;

                if (typeof props.outsideClickClose === 'boolean') this.outsideClickClose = props.outsideClickClose;

                if (stage === 'closed') return null;

                return _react2.default.createElement(
                    'div',
                    { className: 'popModal ' + stage, key: '1', onClick: this.outsideClickClose && stage === 'open' ? this.clickOutside : null },
                    this.showBtn && stage === 'open' ? _react2.default.createElement(
                        'button',
                        { onClick: this.closePopup, className: 'popModalClose', type: 'button' },
                        _react2.default.createElement('span', { className: this.btnClassName })
                    ) : null,
                    _react2.default.createElement(
                        'div',
                        { className: 'popModalContainer' },
                        props.children
                    )
                );
            }
        }, {
            key: 'render',
            value: function render() {

                return _react2.default.createElement(Comp, _extends({}, this.props, { Modal: this._modal, modalStage: this.state.stage, openPopup: this.openPopup, closePopup: this.closePopup }));
            }
        }]);

        return Modal;
    }(_react.PureComponent);
};