'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// It's an generator
exports.default = function (timings) {

    if (typeof timings === 'undefined') timings = {
        open: 1000,
        close: 500
    };

    return function (Comp) {

        return function (_Component) {
            _inherits(Modal, _Component);

            function Modal(props) {
                _classCallCheck(this, Modal);

                var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

                _this.timings = timings;

                _this.state = {
                    stage: 'closed'
                };

                _this.openPopup = _this.openPopup.bind(_this);
                _this.closePopup = _this.closePopup.bind(_this);
                _this._modal = _this._modal.bind(_this);

                return _this;
            }

            _createClass(Modal, [{
                key: 'openPopup',
                value: function openPopup() {
                    var _this2 = this;

                    var stage = this.state.stage;


                    if (stage !== 'closed') return null;

                    var open = this.timings.open;


                    return this.setState({

                        stage: 'opening'

                    }, function () {

                        return setTimeout(function () {

                            _this2.setState({

                                stage: 'open'

                            });
                        }, open);
                    });
                }
            }, {
                key: 'closePopup',
                value: function closePopup() {
                    var _this3 = this;

                    var close = this.timings.close;
                    var stage = this.state.stage;


                    if (stage !== 'open') return null;

                    return this.setState({

                        stage: 'closing'

                    }, function () {
                        return setTimeout(function () {

                            _this3.setState({

                                stage: 'closed'

                            });
                        }, close);
                    });
                }
            }, {
                key: '_modal',
                value: function _modal(props) {
                    var stage = this.state.stage;


                    if (stage == 'closed') return null;

                    return _react2.default.createElement(
                        'div',
                        { className: 'popModal ' + stage, key: '1' },
                        stage === 'open' ? _react2.default.createElement(
                            'button',
                            { onClick: this.closePopup, className: 'popModalClose', type: 'button' },
                            _react2.default.createElement('span', { className: 'fa fa-close' })
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

                    return _react2.default.createElement(Comp, _extends({}, this.props, { Modal: this._modal, modalState: this.state.stage, setContent: this.setContent, openPopup: this.openPopup, closePopup: this.closePopup }));
                }
            }]);

            return Modal;
        }(_react.Component);
    };
};