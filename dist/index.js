"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var _default = function _default(Comp) {
  return (
    /*#__PURE__*/
    function (_PureComponent) {
      _inherits(Modal, _PureComponent);

      function Modal() {
        var _getPrototypeOf2;

        var _this;

        _classCallCheck(this, Modal);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Modal)).call.apply(_getPrototypeOf2, [this].concat(args)));

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
          stage: 'closed',
          ready: false
        });

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "openMs", 0);

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "closeMs", 0);

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClose", null);

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onOpen", null);

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "clickOutside", function (e) {
          if (!e.target.classList.contains('popModal')) return _this.closePopup();
        });

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_modal", function (props) {
          var ready = _this.state.ready;

          var newProps = _objectSpread({}, defaultProps, props);

          var stage = !ready && newProps.defaultOpen ? 'open' : _this.state.stage;
          if (stage === 'closed') return null;
          _this.onClose = newProps.onClose || null;
          _this.onOpen = newProps.onOpen || null;
          return _react.default.createElement("div", {
            className: "popModal ".concat(stage),
            onClick: newProps.outsideClickClose && stage === 'open' ? _this.clickOutside : null
          }, newProps.showBtn && stage === 'open' ? _react.default.createElement("button", {
            onClick: _this.closePopup.bind(_assertThisInitialized(_assertThisInitialized(_this))),
            className: "popModalClose",
            type: "button"
          }, _react.default.createElement("span", {
            className: newProps.btnClassName
          })) : null, _react.default.createElement("div", {
            className: "popModalContainer"
          }, newProps.children));
        });

        return _this;
      }

      _createClass(Modal, [{
        key: "openPopup",
        value: function openPopup() {
          var _this2 = this;

          var initialStage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
          if (initialStage && typeof initialStage === 'string') return this.setState({
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
        key: "closePopup",
        value: function closePopup() {
          var _this3 = this;

          var stage = this.state.stage;
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
        key: "componentDidMount",
        value: function componentDidMount() {
          return this.setState({
            ready: true
          });
        }
      }, {
        key: "render",
        value: function render() {
          return _react.default.createElement(Comp, _extends({}, this.props, {
            Modal: this._modal.bind(this),
            modalStage: this.state.stage,
            openPopup: this.openPopup.bind(this),
            closePopup: this.closePopup.bind(this)
          }));
        }
      }]);

      return Modal;
    }(_react.PureComponent)
  );
};

exports.default = _default;