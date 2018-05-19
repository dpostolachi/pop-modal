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

var defaultProps = {
    onClose: null,
    onOpen: null,
    openMs: 1000,
    closeMs: 500,
    showBtn: true,
    btnClassName: 'fa fa-close',
    outsideClickClose: false,
    children: [],
    defaultOpen: false
};

// It's an decorator
exports.default = function (Comp) {

    return function (_PureComponent) {
        _inherits(Modal, _PureComponent);

        function Modal() {
            var _ref;

            var _temp, _this, _ret;

            _classCallCheck(this, Modal);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Modal.__proto__ || Object.getPrototypeOf(Modal)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
                stage: 'closed',
                ready: false
            }, _this.openMs = 0, _this.closeMs = 0, _this.onClose = null, _this.onOpen = null, _temp), _possibleConstructorReturn(_this, _ret);
        }

        _createClass(Modal, [{
            key: 'openPopup',
            value: function openPopup() {
                var _this2 = this;

                var initialStage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';


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
            key: 'componentDidMount',
            value: function componentDidMount() {

                return this.setState({
                    ready: true
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
                var ready = this.state.ready;


                var newProps = _extends({}, defaultProps, props);

                var stage = !ready && newProps.defaultOpen ? this.setState({ stage: 'open' }) || 'open' : this.state.stage;

                this.onClose = newProps.onClose || null;
                this.onOpen = newProps.onOpen || null;

                if (stage === 'closed') return null;

                return _react2.default.createElement(
                    'div',
                    { className: 'popModal ' + stage, key: '1', onClick: newProps.outsideClickClose && stage === 'open' ? this.clickOutside.bind(this) : null },
                    newProps.showBtn && stage === 'open' ? _react2.default.createElement(
                        'button',
                        { onClick: this.closePopup.bind(this), className: 'popModalClose', type: 'button' },
                        _react2.default.createElement('span', { className: newProps.btnClassName })
                    ) : null,
                    _react2.default.createElement(
                        'div',
                        { className: 'popModalContainer' },
                        newProps.children
                    )
                );
            }
        }, {
            key: 'render',
            value: function render() {

                return _react2.default.createElement(Comp, _extends({}, this.props, {
                    Modal: this._modal.bind(this),
                    modalStage: this.state.stage,
                    openPopup: this.openPopup.bind(this),
                    closePopup: this.closePopup.bind(this)
                }));
            }
        }]);

        return Modal;
    }(_react.PureComponent);
};