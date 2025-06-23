import require$$0, { useState, useCallback, useEffect, createContext, useContext } from 'react';
import { SSOClient } from '@tjsglion/sso-client-sdk';
import { SSOIcon } from '@tjsglion/sso-icons';

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production_min;

function requireReactJsxRuntime_production_min () {
	if (hasRequiredReactJsxRuntime_production_min) return reactJsxRuntime_production_min;
	hasRequiredReactJsxRuntime_production_min = 1;
var f=require$$0,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};
	function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;
	return reactJsxRuntime_production_min;
}

var reactJsxRuntime_development = {};

/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_development;

function requireReactJsxRuntime_development () {
	if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
	hasRequiredReactJsxRuntime_development = 1;

	if (process.env.NODE_ENV !== "production") {
	  (function() {

	var React = require$$0;

	// ATTENTION
	// When adding new symbols to this file,
	// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
	// The Symbol used to tag the ReactElement-like types.
	var REACT_ELEMENT_TYPE = Symbol.for('react.element');
	var REACT_PORTAL_TYPE = Symbol.for('react.portal');
	var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
	var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
	var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
	var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
	var REACT_CONTEXT_TYPE = Symbol.for('react.context');
	var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
	var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
	var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
	var REACT_MEMO_TYPE = Symbol.for('react.memo');
	var REACT_LAZY_TYPE = Symbol.for('react.lazy');
	var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
	var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL = '@@iterator';
	function getIteratorFn(maybeIterable) {
	  if (maybeIterable === null || typeof maybeIterable !== 'object') {
	    return null;
	  }

	  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

	  if (typeof maybeIterator === 'function') {
	    return maybeIterator;
	  }

	  return null;
	}

	var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

	function error(format) {
	  {
	    {
	      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        args[_key2 - 1] = arguments[_key2];
	      }

	      printWarning('error', format, args);
	    }
	  }
	}

	function printWarning(level, format, args) {
	  // When changing this logic, you might want to also
	  // update consoleWithStackDev.www.js as well.
	  {
	    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
	    var stack = ReactDebugCurrentFrame.getStackAddendum();

	    if (stack !== '') {
	      format += '%s';
	      args = args.concat([stack]);
	    } // eslint-disable-next-line react-internal/safe-string-coercion


	    var argsWithFormat = args.map(function (item) {
	      return String(item);
	    }); // Careful: RN currently depends on this prefix

	    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
	    // breaks IE9: https://github.com/facebook/react/issues/13610
	    // eslint-disable-next-line react-internal/no-production-logging

	    Function.prototype.apply.call(console[level], console, argsWithFormat);
	  }
	}

	// -----------------------------------------------------------------------------

	var enableScopeAPI = false; // Experimental Create Event Handle API.
	var enableCacheElement = false;
	var enableTransitionTracing = false; // No known bugs, but needs performance testing

	var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
	// stuff. Intended to enable React core members to more easily debug scheduling
	// issues in DEV builds.

	var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

	var REACT_MODULE_REFERENCE;

	{
	  REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
	}

	function isValidElementType(type) {
	  if (typeof type === 'string' || typeof type === 'function') {
	    return true;
	  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


	  if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing  || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden  || type === REACT_OFFSCREEN_TYPE || enableScopeAPI  || enableCacheElement  || enableTransitionTracing ) {
	    return true;
	  }

	  if (typeof type === 'object' && type !== null) {
	    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
	    // types supported by any Flight configuration anywhere since
	    // we don't know which Flight build this will end up being used
	    // with.
	    type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
	      return true;
	    }
	  }

	  return false;
	}

	function getWrappedName(outerType, innerType, wrapperName) {
	  var displayName = outerType.displayName;

	  if (displayName) {
	    return displayName;
	  }

	  var functionName = innerType.displayName || innerType.name || '';
	  return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
	} // Keep in sync with react-reconciler/getComponentNameFromFiber


	function getContextName(type) {
	  return type.displayName || 'Context';
	} // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.


	function getComponentNameFromType(type) {
	  if (type == null) {
	    // Host root, text node or just invalid type.
	    return null;
	  }

	  {
	    if (typeof type.tag === 'number') {
	      error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
	    }
	  }

	  if (typeof type === 'function') {
	    return type.displayName || type.name || null;
	  }

	  if (typeof type === 'string') {
	    return type;
	  }

	  switch (type) {
	    case REACT_FRAGMENT_TYPE:
	      return 'Fragment';

	    case REACT_PORTAL_TYPE:
	      return 'Portal';

	    case REACT_PROFILER_TYPE:
	      return 'Profiler';

	    case REACT_STRICT_MODE_TYPE:
	      return 'StrictMode';

	    case REACT_SUSPENSE_TYPE:
	      return 'Suspense';

	    case REACT_SUSPENSE_LIST_TYPE:
	      return 'SuspenseList';

	  }

	  if (typeof type === 'object') {
	    switch (type.$$typeof) {
	      case REACT_CONTEXT_TYPE:
	        var context = type;
	        return getContextName(context) + '.Consumer';

	      case REACT_PROVIDER_TYPE:
	        var provider = type;
	        return getContextName(provider._context) + '.Provider';

	      case REACT_FORWARD_REF_TYPE:
	        return getWrappedName(type, type.render, 'ForwardRef');

	      case REACT_MEMO_TYPE:
	        var outerName = type.displayName || null;

	        if (outerName !== null) {
	          return outerName;
	        }

	        return getComponentNameFromType(type.type) || 'Memo';

	      case REACT_LAZY_TYPE:
	        {
	          var lazyComponent = type;
	          var payload = lazyComponent._payload;
	          var init = lazyComponent._init;

	          try {
	            return getComponentNameFromType(init(payload));
	          } catch (x) {
	            return null;
	          }
	        }

	      // eslint-disable-next-line no-fallthrough
	    }
	  }

	  return null;
	}

	var assign = Object.assign;

	// Helpers to patch console.logs to avoid logging during side-effect free
	// replaying on render function. This currently only patches the object
	// lazily which won't cover if the log function was extracted eagerly.
	// We could also eagerly patch the method.
	var disabledDepth = 0;
	var prevLog;
	var prevInfo;
	var prevWarn;
	var prevError;
	var prevGroup;
	var prevGroupCollapsed;
	var prevGroupEnd;

	function disabledLog() {}

	disabledLog.__reactDisabledLog = true;
	function disableLogs() {
	  {
	    if (disabledDepth === 0) {
	      /* eslint-disable react-internal/no-production-logging */
	      prevLog = console.log;
	      prevInfo = console.info;
	      prevWarn = console.warn;
	      prevError = console.error;
	      prevGroup = console.group;
	      prevGroupCollapsed = console.groupCollapsed;
	      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

	      var props = {
	        configurable: true,
	        enumerable: true,
	        value: disabledLog,
	        writable: true
	      }; // $FlowFixMe Flow thinks console is immutable.

	      Object.defineProperties(console, {
	        info: props,
	        log: props,
	        warn: props,
	        error: props,
	        group: props,
	        groupCollapsed: props,
	        groupEnd: props
	      });
	      /* eslint-enable react-internal/no-production-logging */
	    }

	    disabledDepth++;
	  }
	}
	function reenableLogs() {
	  {
	    disabledDepth--;

	    if (disabledDepth === 0) {
	      /* eslint-disable react-internal/no-production-logging */
	      var props = {
	        configurable: true,
	        enumerable: true,
	        writable: true
	      }; // $FlowFixMe Flow thinks console is immutable.

	      Object.defineProperties(console, {
	        log: assign({}, props, {
	          value: prevLog
	        }),
	        info: assign({}, props, {
	          value: prevInfo
	        }),
	        warn: assign({}, props, {
	          value: prevWarn
	        }),
	        error: assign({}, props, {
	          value: prevError
	        }),
	        group: assign({}, props, {
	          value: prevGroup
	        }),
	        groupCollapsed: assign({}, props, {
	          value: prevGroupCollapsed
	        }),
	        groupEnd: assign({}, props, {
	          value: prevGroupEnd
	        })
	      });
	      /* eslint-enable react-internal/no-production-logging */
	    }

	    if (disabledDepth < 0) {
	      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
	    }
	  }
	}

	var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
	var prefix;
	function describeBuiltInComponentFrame(name, source, ownerFn) {
	  {
	    if (prefix === undefined) {
	      // Extract the VM specific prefix used by each line.
	      try {
	        throw Error();
	      } catch (x) {
	        var match = x.stack.trim().match(/\n( *(at )?)/);
	        prefix = match && match[1] || '';
	      }
	    } // We use the prefix to ensure our stacks line up with native stack frames.


	    return '\n' + prefix + name;
	  }
	}
	var reentry = false;
	var componentFrameCache;

	{
	  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
	  componentFrameCache = new PossiblyWeakMap();
	}

	function describeNativeComponentFrame(fn, construct) {
	  // If something asked for a stack inside a fake render, it should get ignored.
	  if ( !fn || reentry) {
	    return '';
	  }

	  {
	    var frame = componentFrameCache.get(fn);

	    if (frame !== undefined) {
	      return frame;
	    }
	  }

	  var control;
	  reentry = true;
	  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

	  Error.prepareStackTrace = undefined;
	  var previousDispatcher;

	  {
	    previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
	    // for warnings.

	    ReactCurrentDispatcher.current = null;
	    disableLogs();
	  }

	  try {
	    // This should throw.
	    if (construct) {
	      // Something should be setting the props in the constructor.
	      var Fake = function () {
	        throw Error();
	      }; // $FlowFixMe


	      Object.defineProperty(Fake.prototype, 'props', {
	        set: function () {
	          // We use a throwing setter instead of frozen or non-writable props
	          // because that won't throw in a non-strict mode function.
	          throw Error();
	        }
	      });

	      if (typeof Reflect === 'object' && Reflect.construct) {
	        // We construct a different control for this case to include any extra
	        // frames added by the construct call.
	        try {
	          Reflect.construct(Fake, []);
	        } catch (x) {
	          control = x;
	        }

	        Reflect.construct(fn, [], Fake);
	      } else {
	        try {
	          Fake.call();
	        } catch (x) {
	          control = x;
	        }

	        fn.call(Fake.prototype);
	      }
	    } else {
	      try {
	        throw Error();
	      } catch (x) {
	        control = x;
	      }

	      fn();
	    }
	  } catch (sample) {
	    // This is inlined manually because closure doesn't do it for us.
	    if (sample && control && typeof sample.stack === 'string') {
	      // This extracts the first frame from the sample that isn't also in the control.
	      // Skipping one frame that we assume is the frame that calls the two.
	      var sampleLines = sample.stack.split('\n');
	      var controlLines = control.stack.split('\n');
	      var s = sampleLines.length - 1;
	      var c = controlLines.length - 1;

	      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
	        // We expect at least one stack frame to be shared.
	        // Typically this will be the root most one. However, stack frames may be
	        // cut off due to maximum stack limits. In this case, one maybe cut off
	        // earlier than the other. We assume that the sample is longer or the same
	        // and there for cut off earlier. So we should find the root most frame in
	        // the sample somewhere in the control.
	        c--;
	      }

	      for (; s >= 1 && c >= 0; s--, c--) {
	        // Next we find the first one that isn't the same which should be the
	        // frame that called our sample function and the control.
	        if (sampleLines[s] !== controlLines[c]) {
	          // In V8, the first line is describing the message but other VMs don't.
	          // If we're about to return the first line, and the control is also on the same
	          // line, that's a pretty good indicator that our sample threw at same line as
	          // the control. I.e. before we entered the sample frame. So we ignore this result.
	          // This can happen if you passed a class to function component, or non-function.
	          if (s !== 1 || c !== 1) {
	            do {
	              s--;
	              c--; // We may still have similar intermediate frames from the construct call.
	              // The next one that isn't the same should be our match though.

	              if (c < 0 || sampleLines[s] !== controlLines[c]) {
	                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
	                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
	                // but we have a user-provided "displayName"
	                // splice it in to make the stack more readable.


	                if (fn.displayName && _frame.includes('<anonymous>')) {
	                  _frame = _frame.replace('<anonymous>', fn.displayName);
	                }

	                {
	                  if (typeof fn === 'function') {
	                    componentFrameCache.set(fn, _frame);
	                  }
	                } // Return the line we found.


	                return _frame;
	              }
	            } while (s >= 1 && c >= 0);
	          }

	          break;
	        }
	      }
	    }
	  } finally {
	    reentry = false;

	    {
	      ReactCurrentDispatcher.current = previousDispatcher;
	      reenableLogs();
	    }

	    Error.prepareStackTrace = previousPrepareStackTrace;
	  } // Fallback to just using the name if we couldn't make it throw.


	  var name = fn ? fn.displayName || fn.name : '';
	  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

	  {
	    if (typeof fn === 'function') {
	      componentFrameCache.set(fn, syntheticFrame);
	    }
	  }

	  return syntheticFrame;
	}
	function describeFunctionComponentFrame(fn, source, ownerFn) {
	  {
	    return describeNativeComponentFrame(fn, false);
	  }
	}

	function shouldConstruct(Component) {
	  var prototype = Component.prototype;
	  return !!(prototype && prototype.isReactComponent);
	}

	function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

	  if (type == null) {
	    return '';
	  }

	  if (typeof type === 'function') {
	    {
	      return describeNativeComponentFrame(type, shouldConstruct(type));
	    }
	  }

	  if (typeof type === 'string') {
	    return describeBuiltInComponentFrame(type);
	  }

	  switch (type) {
	    case REACT_SUSPENSE_TYPE:
	      return describeBuiltInComponentFrame('Suspense');

	    case REACT_SUSPENSE_LIST_TYPE:
	      return describeBuiltInComponentFrame('SuspenseList');
	  }

	  if (typeof type === 'object') {
	    switch (type.$$typeof) {
	      case REACT_FORWARD_REF_TYPE:
	        return describeFunctionComponentFrame(type.render);

	      case REACT_MEMO_TYPE:
	        // Memo may contain any component type so we recursively resolve it.
	        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

	      case REACT_LAZY_TYPE:
	        {
	          var lazyComponent = type;
	          var payload = lazyComponent._payload;
	          var init = lazyComponent._init;

	          try {
	            // Lazy may contain any component type so we recursively resolve it.
	            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
	          } catch (x) {}
	        }
	    }
	  }

	  return '';
	}

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	var loggedTypeFailures = {};
	var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

	function setCurrentlyValidatingElement(element) {
	  {
	    if (element) {
	      var owner = element._owner;
	      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
	      ReactDebugCurrentFrame.setExtraStackFrame(stack);
	    } else {
	      ReactDebugCurrentFrame.setExtraStackFrame(null);
	    }
	  }
	}

	function checkPropTypes(typeSpecs, values, location, componentName, element) {
	  {
	    // $FlowFixMe This is okay but Flow doesn't know it.
	    var has = Function.call.bind(hasOwnProperty);

	    for (var typeSpecName in typeSpecs) {
	      if (has(typeSpecs, typeSpecName)) {
	        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.

	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          if (typeof typeSpecs[typeSpecName] !== 'function') {
	            // eslint-disable-next-line react-internal/prod-error-codes
	            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
	            err.name = 'Invariant Violation';
	            throw err;
	          }

	          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
	        } catch (ex) {
	          error$1 = ex;
	        }

	        if (error$1 && !(error$1 instanceof Error)) {
	          setCurrentlyValidatingElement(element);

	          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

	          setCurrentlyValidatingElement(null);
	        }

	        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error$1.message] = true;
	          setCurrentlyValidatingElement(element);

	          error('Failed %s type: %s', location, error$1.message);

	          setCurrentlyValidatingElement(null);
	        }
	      }
	    }
	  }
	}

	var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

	function isArray(a) {
	  return isArrayImpl(a);
	}

	/*
	 * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
	 * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
	 *
	 * The functions in this module will throw an easier-to-understand,
	 * easier-to-debug exception with a clear errors message message explaining the
	 * problem. (Instead of a confusing exception thrown inside the implementation
	 * of the `value` object).
	 */
	// $FlowFixMe only called in DEV, so void return is not possible.
	function typeName(value) {
	  {
	    // toStringTag is needed for namespaced types like Temporal.Instant
	    var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
	    var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object';
	    return type;
	  }
	} // $FlowFixMe only called in DEV, so void return is not possible.


	function willCoercionThrow(value) {
	  {
	    try {
	      testStringCoercion(value);
	      return false;
	    } catch (e) {
	      return true;
	    }
	  }
	}

	function testStringCoercion(value) {
	  // If you ended up here by following an exception call stack, here's what's
	  // happened: you supplied an object or symbol value to React (as a prop, key,
	  // DOM attribute, CSS property, string ref, etc.) and when React tried to
	  // coerce it to a string using `'' + value`, an exception was thrown.
	  //
	  // The most common types that will cause this exception are `Symbol` instances
	  // and Temporal objects like `Temporal.Instant`. But any object that has a
	  // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
	  // exception. (Library authors do this to prevent users from using built-in
	  // numeric operators like `+` or comparison operators like `>=` because custom
	  // methods are needed to perform accurate arithmetic or comparison.)
	  //
	  // To fix the problem, coerce this object or symbol value to a string before
	  // passing it to React. The most reliable way is usually `String(value)`.
	  //
	  // To find which value is throwing, check the browser or debugger console.
	  // Before this exception was thrown, there should be `console.error` output
	  // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
	  // problem and how that type was used: key, atrribute, input value prop, etc.
	  // In most cases, this console output also shows the component and its
	  // ancestor components where the exception happened.
	  //
	  // eslint-disable-next-line react-internal/safe-string-coercion
	  return '' + value;
	}
	function checkKeyStringCoercion(value) {
	  {
	    if (willCoercionThrow(value)) {
	      error('The provided key is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', typeName(value));

	      return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
	    }
	  }
	}

	var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
	var RESERVED_PROPS = {
	  key: true,
	  ref: true,
	  __self: true,
	  __source: true
	};
	var specialPropKeyWarningShown;
	var specialPropRefWarningShown;
	var didWarnAboutStringRefs;

	{
	  didWarnAboutStringRefs = {};
	}

	function hasValidRef(config) {
	  {
	    if (hasOwnProperty.call(config, 'ref')) {
	      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

	      if (getter && getter.isReactWarning) {
	        return false;
	      }
	    }
	  }

	  return config.ref !== undefined;
	}

	function hasValidKey(config) {
	  {
	    if (hasOwnProperty.call(config, 'key')) {
	      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

	      if (getter && getter.isReactWarning) {
	        return false;
	      }
	    }
	  }

	  return config.key !== undefined;
	}

	function warnIfStringRefCannotBeAutoConverted(config, self) {
	  {
	    if (typeof config.ref === 'string' && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
	      var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);

	      if (!didWarnAboutStringRefs[componentName]) {
	        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);

	        didWarnAboutStringRefs[componentName] = true;
	      }
	    }
	  }
	}

	function defineKeyPropWarningGetter(props, displayName) {
	  {
	    var warnAboutAccessingKey = function () {
	      if (!specialPropKeyWarningShown) {
	        specialPropKeyWarningShown = true;

	        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
	      }
	    };

	    warnAboutAccessingKey.isReactWarning = true;
	    Object.defineProperty(props, 'key', {
	      get: warnAboutAccessingKey,
	      configurable: true
	    });
	  }
	}

	function defineRefPropWarningGetter(props, displayName) {
	  {
	    var warnAboutAccessingRef = function () {
	      if (!specialPropRefWarningShown) {
	        specialPropRefWarningShown = true;

	        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
	      }
	    };

	    warnAboutAccessingRef.isReactWarning = true;
	    Object.defineProperty(props, 'ref', {
	      get: warnAboutAccessingRef,
	      configurable: true
	    });
	  }
	}
	/**
	 * Factory method to create a new React element. This no longer adheres to
	 * the class pattern, so do not use new to call it. Also, instanceof check
	 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
	 * if something is a React Element.
	 *
	 * @param {*} type
	 * @param {*} props
	 * @param {*} key
	 * @param {string|object} ref
	 * @param {*} owner
	 * @param {*} self A *temporary* helper to detect places where `this` is
	 * different from the `owner` when React.createElement is called, so that we
	 * can warn. We want to get rid of owner and replace string `ref`s with arrow
	 * functions, and as long as `this` and owner are the same, there will be no
	 * change in behavior.
	 * @param {*} source An annotation object (added by a transpiler or otherwise)
	 * indicating filename, line number, and/or other information.
	 * @internal
	 */


	var ReactElement = function (type, key, ref, self, source, owner, props) {
	  var element = {
	    // This tag allows us to uniquely identify this as a React Element
	    $$typeof: REACT_ELEMENT_TYPE,
	    // Built-in properties that belong on the element
	    type: type,
	    key: key,
	    ref: ref,
	    props: props,
	    // Record the component responsible for creating this element.
	    _owner: owner
	  };

	  {
	    // The validation flag is currently mutative. We put it on
	    // an external backing store so that we can freeze the whole object.
	    // This can be replaced with a WeakMap once they are implemented in
	    // commonly used development environments.
	    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
	    // the validation flag non-enumerable (where possible, which should
	    // include every environment we run tests in), so the test framework
	    // ignores it.

	    Object.defineProperty(element._store, 'validated', {
	      configurable: false,
	      enumerable: false,
	      writable: true,
	      value: false
	    }); // self and source are DEV only properties.

	    Object.defineProperty(element, '_self', {
	      configurable: false,
	      enumerable: false,
	      writable: false,
	      value: self
	    }); // Two elements created in two different places should be considered
	    // equal for testing purposes and therefore we hide it from enumeration.

	    Object.defineProperty(element, '_source', {
	      configurable: false,
	      enumerable: false,
	      writable: false,
	      value: source
	    });

	    if (Object.freeze) {
	      Object.freeze(element.props);
	      Object.freeze(element);
	    }
	  }

	  return element;
	};
	/**
	 * https://github.com/reactjs/rfcs/pull/107
	 * @param {*} type
	 * @param {object} props
	 * @param {string} key
	 */

	function jsxDEV(type, config, maybeKey, source, self) {
	  {
	    var propName; // Reserved names are extracted

	    var props = {};
	    var key = null;
	    var ref = null; // Currently, key can be spread in as a prop. This causes a potential
	    // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
	    // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
	    // but as an intermediary step, we will use jsxDEV for everything except
	    // <div {...props} key="Hi" />, because we aren't currently able to tell if
	    // key is explicitly declared to be undefined or not.

	    if (maybeKey !== undefined) {
	      {
	        checkKeyStringCoercion(maybeKey);
	      }

	      key = '' + maybeKey;
	    }

	    if (hasValidKey(config)) {
	      {
	        checkKeyStringCoercion(config.key);
	      }

	      key = '' + config.key;
	    }

	    if (hasValidRef(config)) {
	      ref = config.ref;
	      warnIfStringRefCannotBeAutoConverted(config, self);
	    } // Remaining properties are added to a new props object


	    for (propName in config) {
	      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        props[propName] = config[propName];
	      }
	    } // Resolve default props


	    if (type && type.defaultProps) {
	      var defaultProps = type.defaultProps;

	      for (propName in defaultProps) {
	        if (props[propName] === undefined) {
	          props[propName] = defaultProps[propName];
	        }
	      }
	    }

	    if (key || ref) {
	      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

	      if (key) {
	        defineKeyPropWarningGetter(props, displayName);
	      }

	      if (ref) {
	        defineRefPropWarningGetter(props, displayName);
	      }
	    }

	    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
	  }
	}

	var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
	var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

	function setCurrentlyValidatingElement$1(element) {
	  {
	    if (element) {
	      var owner = element._owner;
	      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
	      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
	    } else {
	      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
	    }
	  }
	}

	var propTypesMisspellWarningShown;

	{
	  propTypesMisspellWarningShown = false;
	}
	/**
	 * Verifies the object is a ReactElement.
	 * See https://reactjs.org/docs/react-api.html#isvalidelement
	 * @param {?object} object
	 * @return {boolean} True if `object` is a ReactElement.
	 * @final
	 */


	function isValidElement(object) {
	  {
	    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	  }
	}

	function getDeclarationErrorAddendum() {
	  {
	    if (ReactCurrentOwner$1.current) {
	      var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);

	      if (name) {
	        return '\n\nCheck the render method of `' + name + '`.';
	      }
	    }

	    return '';
	  }
	}

	function getSourceInfoErrorAddendum(source) {
	  {
	    if (source !== undefined) {
	      var fileName = source.fileName.replace(/^.*[\\\/]/, '');
	      var lineNumber = source.lineNumber;
	      return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
	    }

	    return '';
	  }
	}
	/**
	 * Warn if there's no key explicitly set on dynamic arrays of children or
	 * object keys are not valid. This allows us to keep track of children between
	 * updates.
	 */


	var ownerHasKeyUseWarning = {};

	function getCurrentComponentErrorInfo(parentType) {
	  {
	    var info = getDeclarationErrorAddendum();

	    if (!info) {
	      var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

	      if (parentName) {
	        info = "\n\nCheck the top-level render call using <" + parentName + ">.";
	      }
	    }

	    return info;
	  }
	}
	/**
	 * Warn if the element doesn't have an explicit key assigned to it.
	 * This element is in an array. The array could grow and shrink or be
	 * reordered. All children that haven't already been validated are required to
	 * have a "key" property assigned to it. Error statuses are cached so a warning
	 * will only be shown once.
	 *
	 * @internal
	 * @param {ReactElement} element Element that requires a key.
	 * @param {*} parentType element's parent's type.
	 */


	function validateExplicitKey(element, parentType) {
	  {
	    if (!element._store || element._store.validated || element.key != null) {
	      return;
	    }

	    element._store.validated = true;
	    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

	    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
	      return;
	    }

	    ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
	    // property, it may be the creator of the child that's responsible for
	    // assigning it a key.

	    var childOwner = '';

	    if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
	      // Give the component that originally created this child.
	      childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
	    }

	    setCurrentlyValidatingElement$1(element);

	    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

	    setCurrentlyValidatingElement$1(null);
	  }
	}
	/**
	 * Ensure that every element either is passed in a static location, in an
	 * array with an explicit keys property defined, or in an object literal
	 * with valid key property.
	 *
	 * @internal
	 * @param {ReactNode} node Statically passed child of any type.
	 * @param {*} parentType node's parent's type.
	 */


	function validateChildKeys(node, parentType) {
	  {
	    if (typeof node !== 'object') {
	      return;
	    }

	    if (isArray(node)) {
	      for (var i = 0; i < node.length; i++) {
	        var child = node[i];

	        if (isValidElement(child)) {
	          validateExplicitKey(child, parentType);
	        }
	      }
	    } else if (isValidElement(node)) {
	      // This element was passed in a valid location.
	      if (node._store) {
	        node._store.validated = true;
	      }
	    } else if (node) {
	      var iteratorFn = getIteratorFn(node);

	      if (typeof iteratorFn === 'function') {
	        // Entry iterators used to provide implicit keys,
	        // but now we print a separate warning for them later.
	        if (iteratorFn !== node.entries) {
	          var iterator = iteratorFn.call(node);
	          var step;

	          while (!(step = iterator.next()).done) {
	            if (isValidElement(step.value)) {
	              validateExplicitKey(step.value, parentType);
	            }
	          }
	        }
	      }
	    }
	  }
	}
	/**
	 * Given an element, validate that its props follow the propTypes definition,
	 * provided by the type.
	 *
	 * @param {ReactElement} element
	 */


	function validatePropTypes(element) {
	  {
	    var type = element.type;

	    if (type === null || type === undefined || typeof type === 'string') {
	      return;
	    }

	    var propTypes;

	    if (typeof type === 'function') {
	      propTypes = type.propTypes;
	    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
	    // Inner props are checked in the reconciler.
	    type.$$typeof === REACT_MEMO_TYPE)) {
	      propTypes = type.propTypes;
	    } else {
	      return;
	    }

	    if (propTypes) {
	      // Intentionally inside to avoid triggering lazy initializers:
	      var name = getComponentNameFromType(type);
	      checkPropTypes(propTypes, element.props, 'prop', name, element);
	    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
	      propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

	      var _name = getComponentNameFromType(type);

	      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
	    }

	    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
	      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
	    }
	  }
	}
	/**
	 * Given a fragment, validate that it can only be provided with fragment props
	 * @param {ReactElement} fragment
	 */


	function validateFragmentProps(fragment) {
	  {
	    var keys = Object.keys(fragment.props);

	    for (var i = 0; i < keys.length; i++) {
	      var key = keys[i];

	      if (key !== 'children' && key !== 'key') {
	        setCurrentlyValidatingElement$1(fragment);

	        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

	        setCurrentlyValidatingElement$1(null);
	        break;
	      }
	    }

	    if (fragment.ref !== null) {
	      setCurrentlyValidatingElement$1(fragment);

	      error('Invalid attribute `ref` supplied to `React.Fragment`.');

	      setCurrentlyValidatingElement$1(null);
	    }
	  }
	}

	var didWarnAboutKeySpread = {};
	function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
	  {
	    var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
	    // succeed and there will likely be errors in render.

	    if (!validType) {
	      var info = '';

	      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
	        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
	      }

	      var sourceInfo = getSourceInfoErrorAddendum(source);

	      if (sourceInfo) {
	        info += sourceInfo;
	      } else {
	        info += getDeclarationErrorAddendum();
	      }

	      var typeString;

	      if (type === null) {
	        typeString = 'null';
	      } else if (isArray(type)) {
	        typeString = 'array';
	      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
	        typeString = "<" + (getComponentNameFromType(type.type) || 'Unknown') + " />";
	        info = ' Did you accidentally export a JSX literal instead of a component?';
	      } else {
	        typeString = typeof type;
	      }

	      error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
	    }

	    var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.
	    // TODO: Drop this when these are no longer allowed as the type argument.

	    if (element == null) {
	      return element;
	    } // Skip key warning if the type isn't valid since our key validation logic
	    // doesn't expect a non-string/function type and can throw confusing errors.
	    // We don't want exception behavior to differ between dev and prod.
	    // (Rendering will throw with a helpful message and as soon as the type is
	    // fixed, the key warnings will appear.)


	    if (validType) {
	      var children = props.children;

	      if (children !== undefined) {
	        if (isStaticChildren) {
	          if (isArray(children)) {
	            for (var i = 0; i < children.length; i++) {
	              validateChildKeys(children[i], type);
	            }

	            if (Object.freeze) {
	              Object.freeze(children);
	            }
	          } else {
	            error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
	          }
	        } else {
	          validateChildKeys(children, type);
	        }
	      }
	    }

	    {
	      if (hasOwnProperty.call(props, 'key')) {
	        var componentName = getComponentNameFromType(type);
	        var keys = Object.keys(props).filter(function (k) {
	          return k !== 'key';
	        });
	        var beforeExample = keys.length > 0 ? '{key: someKey, ' + keys.join(': ..., ') + ': ...}' : '{key: someKey}';

	        if (!didWarnAboutKeySpread[componentName + beforeExample]) {
	          var afterExample = keys.length > 0 ? '{' + keys.join(': ..., ') + ': ...}' : '{}';

	          error('A props object containing a "key" prop is being spread into JSX:\n' + '  let props = %s;\n' + '  <%s {...props} />\n' + 'React keys must be passed directly to JSX without using spread:\n' + '  let props = %s;\n' + '  <%s key={someKey} {...props} />', beforeExample, componentName, afterExample, componentName);

	          didWarnAboutKeySpread[componentName + beforeExample] = true;
	        }
	      }
	    }

	    if (type === REACT_FRAGMENT_TYPE) {
	      validateFragmentProps(element);
	    } else {
	      validatePropTypes(element);
	    }

	    return element;
	  }
	} // These two functions exist to still get child warnings in dev
	// even with the prod transform. This means that jsxDEV is purely
	// opt-in behavior for better messages but that we won't stop
	// giving you warnings if you use production apis.

	function jsxWithValidationStatic(type, props, key) {
	  {
	    return jsxWithValidation(type, props, key, true);
	  }
	}
	function jsxWithValidationDynamic(type, props, key) {
	  {
	    return jsxWithValidation(type, props, key, false);
	  }
	}

	var jsx =  jsxWithValidationDynamic ; // we may want to special case jsxs internally to take advantage of static children.
	// for now we can ship identical prod functions

	var jsxs =  jsxWithValidationStatic ;

	reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
	reactJsxRuntime_development.jsx = jsx;
	reactJsxRuntime_development.jsxs = jsxs;
	  })();
	}
	return reactJsxRuntime_development;
}

if (process.env.NODE_ENV === 'production') {
  jsxRuntime.exports = requireReactJsxRuntime_production_min();
} else {
  jsxRuntime.exports = requireReactJsxRuntime_development();
}

var jsxRuntimeExports = jsxRuntime.exports;

const useAuth = (config) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const ssoClient = new SSOClient({
        baseUrl: config.apiUrl,
        redirectUri: config.redirectUrl,
    });
    const checkAuth = useCallback(async () => {
        try {
            setLoading(true);
            const currentUser = await ssoClient.getCurrentUser();
            setUser(currentUser);
        }
        catch (error) {
            setUser(null);
        }
        finally {
            setLoading(false);
        }
    }, [ssoClient]);
    const login = useCallback(async (credentials) => {
        try {
            setLoading(true);
            if (credentials.email && credentials.password) {
                const user = await ssoClient.loginWithPassword({
                    email: credentials.email,
                    password: credentials.password,
                });
                setUser(user);
            }
        }
        catch (error) {
            throw error;
        }
        finally {
            setLoading(false);
        }
    }, [ssoClient]);
    const register = useCallback(async (credentials) => {
        try {
            setLoading(true);
            if (credentials.email && credentials.password) {
                const user = await ssoClient.register({
                    email: credentials.email,
                    password: credentials.password,
                    name: credentials.name,
                });
                setUser(user);
            }
        }
        catch (error) {
            throw error;
        }
        finally {
            setLoading(false);
        }
    }, [ssoClient]);
    const logout = useCallback(async () => {
        try {
            setLoading(true);
            ssoClient.logout();
            setUser(null);
        }
        catch (error) {
            throw error;
        }
        finally {
            setLoading(false);
        }
    }, [ssoClient]);
    const loginWithSSO = useCallback(async (provider) => {
        try {
            setLoading(true);
            ssoClient.login({ providerId: provider.id });
        }
        catch (error) {
            throw error;
        }
        finally {
            setLoading(false);
        }
    }, [ssoClient]);
    const verify2FA = useCallback(async (code) => {
        try {
            setLoading(true);
            const success = await ssoClient.verifyTwoFactor({ token: code });
            if (success) {
                // 重新获取用户信息
                const user = await ssoClient.getCurrentUser();
                setUser(user);
            }
            else {
                throw new Error('2FA verification failed');
            }
        }
        catch (error) {
            throw error;
        }
        finally {
            setLoading(false);
        }
    }, [ssoClient]);
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);
    return {
        config,
        user,
        loading,
        login,
        register,
        logout,
        loginWithSSO,
        verify2FA,
        checkAuth,
    };
};

const AuthContext = createContext(null);
const AuthProvider = ({ config, children }) => {
    const auth = useAuth(config);
    const contextValue = {
        ...auth,
        config
    };
    return (jsxRuntimeExports.jsx(AuthContext.Provider, { value: contextValue, children: children }));
};
const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};

const SSOButtons = ({ providers, onSSOClick, theme, className = '', }) => {
    const buttonStyle = {
        backgroundColor: theme?.backgroundColor || '#ffffff',
        border: `1px solid ${theme?.borderColor || '#d1d5db'}`,
        borderRadius: theme?.borderRadius || '0.5rem',
        color: theme?.textColor || '#1f2937',
        boxShadow: theme?.boxShadow || '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    };
    return (jsxRuntimeExports.jsx("div", { className: `sso-buttons ${className}`, children: providers.map((provider) => (jsxRuntimeExports.jsxs("button", { onClick: () => onSSOClick(provider), style: buttonStyle, className: "sso-button", children: [jsxRuntimeExports.jsx(SSOIcon, { provider: provider, size: 20 }), jsxRuntimeExports.jsxs("span", { children: ["Continue with ", provider.name] })] }, provider.id))) }));
};

const LoginForm = ({ config, theme, onLoginSuccess, onLoginError, showRememberMe = true, showForgotPassword = true, className = '', }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    // 尝试从AuthProvider上下文获取config，如果没有则使用props中的config
    let authContext;
    try {
        authContext = useAuthContext();
    }
    catch (e) {
        // 如果不在AuthProvider中，authContext将为undefined
    }
    // 优先使用props中的config，如果没有则使用上下文中的config
    const finalConfig = config || authContext?.config;
    if (!finalConfig) {
        throw new Error('LoginForm requires either a config prop or to be used within AuthProvider');
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // 如果使用AuthProvider，使用其login方法
            if (authContext) {
                await authContext.login({ email, password, rememberMe });
                onLoginSuccess?.(authContext.user);
            }
            else {
                // 否则使用传统的fetch方式
                const response = await fetch(`${finalConfig.apiUrl}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });
                if (!response.ok) {
                    throw new Error('Login failed');
                }
                const user = await response.json();
                onLoginSuccess?.(user);
            }
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Login failed';
            setError(errorMessage);
            onLoginError?.(new Error(errorMessage));
        }
        finally {
            setLoading(false);
        }
    };
    const handleSSOClick = (provider) => {
        // 如果使用AuthProvider，使用其loginWithSSO方法
        if (authContext) {
            authContext.loginWithSSO(provider);
        }
        else {
            // 否则使用传统的重定向方式
            window.location.href = `${finalConfig.apiUrl}/auth/sso/${provider.id}`;
        }
    };
    const formStyle = {
        backgroundColor: theme?.backgroundColor || '#ffffff',
        border: `1px solid ${theme?.borderColor || '#d1d5db'}`,
        borderRadius: theme?.borderRadius || '0.5rem',
        boxShadow: theme?.boxShadow || '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    };
    const inputStyle = {
        border: `1px solid ${theme?.borderColor || '#d1d5db'}`,
        borderRadius: theme?.borderRadius || '0.375rem',
        color: theme?.textColor || '#1f2937',
    };
    const buttonStyle = {
        backgroundColor: theme?.primaryColor || '#3b82f6',
        color: '#ffffff',
        borderRadius: theme?.borderRadius || '0.375rem',
    };
    return (jsxRuntimeExports.jsxs("div", { className: `login-form ${className}`, style: formStyle, children: [finalConfig.appLogo && (jsxRuntimeExports.jsx("div", { className: "app-logo", children: jsxRuntimeExports.jsx("img", { src: finalConfig.appLogo, alt: finalConfig.appName || 'App Logo' }) })), jsxRuntimeExports.jsx("h2", { children: finalConfig.appName || 'Login' }), jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [jsxRuntimeExports.jsxs("div", { className: "form-group", children: [jsxRuntimeExports.jsx("label", { htmlFor: "email", children: "Email" }), jsxRuntimeExports.jsx("input", { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), style: inputStyle, required: true })] }), jsxRuntimeExports.jsxs("div", { className: "form-group", children: [jsxRuntimeExports.jsx("label", { htmlFor: "password", children: "Password" }), jsxRuntimeExports.jsx("input", { id: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), style: inputStyle, required: true })] }), error && (jsxRuntimeExports.jsx("div", { className: "error-message", style: { color: theme?.errorColor || '#ef4444' }, children: error })), showRememberMe && (jsxRuntimeExports.jsx("div", { className: "form-group checkbox", children: jsxRuntimeExports.jsxs("label", { children: [jsxRuntimeExports.jsx("input", { type: "checkbox", checked: rememberMe, onChange: (e) => setRememberMe(e.target.checked) }), "Remember me"] }) })), jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, style: buttonStyle, className: "submit-button", children: loading ? 'Signing in...' : 'Sign in' })] }), showForgotPassword && (jsxRuntimeExports.jsx("div", { className: "forgot-password", children: jsxRuntimeExports.jsx("a", { href: "/forgot-password", children: "Forgot your password?" }) })), finalConfig.authMethods.sso?.enabled && finalConfig.authMethods.sso.providers && (jsxRuntimeExports.jsxs("div", { className: "sso-section", children: [jsxRuntimeExports.jsx("div", { className: "divider", children: "or" }), jsxRuntimeExports.jsx(SSOButtons, { providers: finalConfig.authMethods.sso.providers, onSSOClick: handleSSOClick, theme: theme })] }))] }));
};

const RegisterForm = ({ config, theme, onRegisterSuccess, onRegisterError, confirmPassword = true, termsUrl, privacyUrl, className = '', }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        if (confirmPassword && formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }
        try {
            const response = await fetch(`${config.apiUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });
            if (!response.ok) {
                throw new Error('Registration failed');
            }
            const user = await response.json();
            onRegisterSuccess?.(user);
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Registration failed';
            setError(errorMessage);
            onRegisterError?.(new Error(errorMessage));
        }
        finally {
            setLoading(false);
        }
    };
    const handleSSOClick = (provider) => {
        window.location.href = `${config.apiUrl}/auth/sso/${provider.id}`;
    };
    const formStyle = {
        backgroundColor: theme?.backgroundColor || '#ffffff',
        border: `1px solid ${theme?.borderColor || '#d1d5db'}`,
        borderRadius: theme?.borderRadius || '0.5rem',
        boxShadow: theme?.boxShadow || '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    };
    const inputStyle = {
        border: `1px solid ${theme?.borderColor || '#d1d5db'}`,
        borderRadius: theme?.borderRadius || '0.375rem',
        color: theme?.textColor || '#1f2937',
    };
    const buttonStyle = {
        backgroundColor: theme?.primaryColor || '#3b82f6',
        color: '#ffffff',
        borderRadius: theme?.borderRadius || '0.375rem',
    };
    return (jsxRuntimeExports.jsxs("div", { className: `register-form ${className}`, style: formStyle, children: [config.appLogo && (jsxRuntimeExports.jsx("div", { className: "app-logo", children: jsxRuntimeExports.jsx("img", { src: config.appLogo, alt: config.appName || 'App Logo' }) })), jsxRuntimeExports.jsx("h2", { children: "Create Account" }), jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [jsxRuntimeExports.jsxs("div", { className: "form-group", children: [jsxRuntimeExports.jsx("label", { htmlFor: "name", children: "Full Name" }), jsxRuntimeExports.jsx("input", { id: "name", name: "name", type: "text", value: formData.name, onChange: handleChange, style: inputStyle, required: true })] }), jsxRuntimeExports.jsxs("div", { className: "form-group", children: [jsxRuntimeExports.jsx("label", { htmlFor: "email", children: "Email" }), jsxRuntimeExports.jsx("input", { id: "email", name: "email", type: "email", value: formData.email, onChange: handleChange, style: inputStyle, required: true })] }), jsxRuntimeExports.jsxs("div", { className: "form-group", children: [jsxRuntimeExports.jsx("label", { htmlFor: "password", children: "Password" }), jsxRuntimeExports.jsx("input", { id: "password", name: "password", type: "password", value: formData.password, onChange: handleChange, style: inputStyle, required: true })] }), confirmPassword && (jsxRuntimeExports.jsxs("div", { className: "form-group", children: [jsxRuntimeExports.jsx("label", { htmlFor: "confirmPassword", children: "Confirm Password" }), jsxRuntimeExports.jsx("input", { id: "confirmPassword", name: "confirmPassword", type: "password", value: formData.confirmPassword, onChange: handleChange, style: inputStyle, required: true })] })), error && (jsxRuntimeExports.jsx("div", { className: "error-message", style: { color: theme?.errorColor || '#ef4444' }, children: error })), jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, style: buttonStyle, className: "submit-button", children: loading ? 'Creating account...' : 'Create account' })] }), (termsUrl || privacyUrl) && (jsxRuntimeExports.jsxs("div", { className: "legal-links", children: [termsUrl && (jsxRuntimeExports.jsx("a", { href: termsUrl, target: "_blank", rel: "noopener noreferrer", children: "Terms of Service" })), privacyUrl && (jsxRuntimeExports.jsx("a", { href: privacyUrl, target: "_blank", rel: "noopener noreferrer", children: "Privacy Policy" }))] })), config.authMethods.sso?.enabled && config.authMethods.sso.providers && (jsxRuntimeExports.jsxs("div", { className: "sso-section", children: [jsxRuntimeExports.jsx("div", { className: "divider", children: "or" }), jsxRuntimeExports.jsx(SSOButtons, { providers: config.authMethods.sso.providers, onSSOClick: handleSSOClick, theme: theme })] }))] }));
};

const TwoFactorAuth = ({ onVerify, onCancel, theme, className = '', }) => {
    const [code, setCode] = useState('');
    const [countdown, setCountdown] = useState(0);
    // 倒计时效果
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);
    const handleVerify = () => {
        if (code.length === 6) {
            onVerify(code);
        }
    };
    const handleResend = () => {
        setCountdown(60);
        // 这里可以调用重新发送验证码的API
    };
    const inputStyle = {
        border: `1px solid ${theme?.borderColor || '#d1d5db'}`,
        borderRadius: theme?.borderRadius || '0.375rem',
        color: theme?.textColor || '#1f2937',
    };
    const buttonStyle = {
        backgroundColor: theme?.primaryColor || '#3b82f6',
        color: '#ffffff',
        borderRadius: theme?.borderRadius || '0.375rem',
    };
    const containerStyle = {
        backgroundColor: theme?.backgroundColor || '#ffffff',
        border: `1px solid ${theme?.borderColor || '#d1d5db'}`,
        borderRadius: theme?.borderRadius || '0.5rem',
        boxShadow: theme?.boxShadow || '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    };
    return (jsxRuntimeExports.jsxs("div", { className: `two-factor-auth ${className}`, style: containerStyle, children: [jsxRuntimeExports.jsx("h3", { children: "\u53CC\u56E0\u7D20\u8BA4\u8BC1" }), jsxRuntimeExports.jsx("p", { children: "\u8BF7\u8F93\u5165\u60A8\u7684\u9A8C\u8BC1\u7801" }), jsxRuntimeExports.jsx("div", { className: "code-input", children: jsxRuntimeExports.jsx("input", { type: "text", value: code, onChange: (e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                        setCode(value);
                    }, placeholder: "6\u4F4D\u9A8C\u8BC1\u7801", maxLength: 6, style: inputStyle, autoFocus: true }) }), jsxRuntimeExports.jsxs("div", { className: "actions", children: [jsxRuntimeExports.jsx("button", { onClick: handleVerify, disabled: code.length !== 6, style: buttonStyle, className: "verify-button", children: "\u9A8C\u8BC1" }), jsxRuntimeExports.jsx("button", { onClick: onCancel, style: {
                            ...buttonStyle,
                            backgroundColor: 'transparent',
                            color: theme?.textColor || '#1f2937',
                            border: `1px solid ${theme?.borderColor || '#d1d5db'}`,
                        }, className: "cancel-button", children: "\u53D6\u6D88" })] }), jsxRuntimeExports.jsx("div", { className: "resend-section", children: jsxRuntimeExports.jsx("button", { onClick: handleResend, disabled: countdown > 0, style: {
                        backgroundColor: 'transparent',
                        color: theme?.primaryColor || '#3b82f6',
                        border: 'none',
                        cursor: countdown > 0 ? 'not-allowed' : 'pointer',
                    }, children: countdown > 0 ? `${countdown}秒后重发` : '重新发送验证码' }) })] }));
};

const TwoFactorSetup = ({ qrCodeUrl, secretKey, onEnable, onCancel, theme, className = '', }) => {
    const [verificationCode, setVerificationCode] = useState('');
    const [step, setStep] = useState('qr');
    const handleVerify = () => {
        if (verificationCode.length === 6) {
            onEnable(verificationCode);
        }
    };
    const inputStyle = {
        border: `1px solid ${theme?.borderColor || '#d1d5db'}`,
        borderRadius: theme?.borderRadius || '0.375rem',
        color: theme?.textColor || '#1f2937',
    };
    const buttonStyle = {
        backgroundColor: theme?.primaryColor || '#3b82f6',
        color: '#ffffff',
        borderRadius: theme?.borderRadius || '0.375rem',
    };
    const containerStyle = {
        backgroundColor: theme?.backgroundColor || '#ffffff',
        border: `1px solid ${theme?.borderColor || '#d1d5db'}`,
        borderRadius: theme?.borderRadius || '0.5rem',
        boxShadow: theme?.boxShadow || '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    };
    if (step === 'qr') {
        return (jsxRuntimeExports.jsxs("div", { className: `two-factor-setup ${className}`, style: containerStyle, children: [jsxRuntimeExports.jsx("h3", { children: "\u8BBE\u7F6E\u53CC\u56E0\u7D20\u8BA4\u8BC1" }), jsxRuntimeExports.jsx("p", { children: "\u8BF7\u4F7F\u7528\u60A8\u7684\u8BA4\u8BC1\u5668\u5E94\u7528\u626B\u63CF\u4EE5\u4E0B\u4E8C\u7EF4\u7801\uFF1A" }), jsxRuntimeExports.jsx("div", { className: "qr-section", children: jsxRuntimeExports.jsx("img", { src: qrCodeUrl, alt: "QR Code", style: { maxWidth: '200px' } }) }), jsxRuntimeExports.jsxs("div", { className: "secret-section", children: [jsxRuntimeExports.jsx("p", { children: "\u6216\u8005\u624B\u52A8\u8F93\u5165\u5BC6\u94A5\uFF1A" }), jsxRuntimeExports.jsx("code", { style: {
                                backgroundColor: theme?.backgroundColor || '#f3f4f6',
                                padding: '8px 12px',
                                borderRadius: theme?.borderRadius || '0.375rem',
                                fontFamily: 'monospace'
                            }, children: secretKey })] }), jsxRuntimeExports.jsxs("div", { className: "actions", children: [jsxRuntimeExports.jsx("button", { onClick: () => setStep('verify'), style: buttonStyle, className: "next-button", children: "\u4E0B\u4E00\u6B65" }), jsxRuntimeExports.jsx("button", { onClick: onCancel, style: {
                                ...buttonStyle,
                                backgroundColor: 'transparent',
                                color: theme?.textColor || '#1f2937',
                                border: `1px solid ${theme?.borderColor || '#d1d5db'}`,
                            }, className: "cancel-button", children: "\u53D6\u6D88" })] })] }));
    }
    return (jsxRuntimeExports.jsxs("div", { className: `two-factor-setup ${className}`, style: containerStyle, children: [jsxRuntimeExports.jsx("h3", { children: "\u9A8C\u8BC1\u53CC\u56E0\u7D20\u8BA4\u8BC1" }), jsxRuntimeExports.jsx("p", { children: "\u8BF7\u5728\u60A8\u7684\u8BA4\u8BC1\u5668\u5E94\u7528\u4E2D\u8F93\u5165\u9A8C\u8BC1\u7801\uFF1A" }), jsxRuntimeExports.jsx("div", { className: "verification-section", children: jsxRuntimeExports.jsx("input", { type: "text", value: verificationCode, onChange: (e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                        setVerificationCode(value);
                    }, placeholder: "6\u4F4D\u9A8C\u8BC1\u7801", maxLength: 6, style: inputStyle, autoFocus: true }) }), jsxRuntimeExports.jsxs("div", { className: "actions", children: [jsxRuntimeExports.jsx("button", { onClick: handleVerify, disabled: verificationCode.length !== 6, style: buttonStyle, className: "verify-button", children: "\u542F\u7528 2FA" }), jsxRuntimeExports.jsx("button", { onClick: () => setStep('qr'), style: {
                            ...buttonStyle,
                            backgroundColor: 'transparent',
                            color: theme?.textColor || '#1f2937',
                            border: `1px solid ${theme?.borderColor || '#d1d5db'}`,
                        }, className: "back-button", children: "\u8FD4\u56DE" })] })] }));
};

const PhoneAuth = ({ phone, code, onSendCode, onVerify, theme, className = '', }) => {
    const [phoneNumber, setPhoneNumber] = useState(phone);
    const [verificationCode, setVerificationCode] = useState(code);
    const [countdown, setCountdown] = useState(0);
    const [step, setStep] = useState('phone');
    // 倒计时效果
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);
    const handleSendCode = () => {
        if (phoneNumber && phoneNumber.length >= 11) {
            onSendCode(phoneNumber);
            setCountdown(60);
            setStep('code');
        }
    };
    const handleVerify = () => {
        if (verificationCode.length === 6) {
            onVerify(phoneNumber, verificationCode);
        }
    };
    const inputStyle = {
        border: `1px solid ${theme?.borderColor || '#d1d5db'}`,
        borderRadius: theme?.borderRadius || '0.375rem',
        color: theme?.textColor || '#1f2937',
    };
    const buttonStyle = {
        backgroundColor: theme?.primaryColor || '#3b82f6',
        color: '#ffffff',
        borderRadius: theme?.borderRadius || '0.375rem',
    };
    const containerStyle = {
        backgroundColor: theme?.backgroundColor || '#ffffff',
        border: `1px solid ${theme?.borderColor || '#d1d5db'}`,
        borderRadius: theme?.borderRadius || '0.5rem',
        boxShadow: theme?.boxShadow || '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    };
    if (step === 'phone') {
        return (jsxRuntimeExports.jsxs("div", { className: `phone-auth ${className}`, style: containerStyle, children: [jsxRuntimeExports.jsx("h3", { children: "\u624B\u673A\u53F7\u767B\u5F55" }), jsxRuntimeExports.jsx("p", { children: "\u8BF7\u8F93\u5165\u60A8\u7684\u624B\u673A\u53F7" }), jsxRuntimeExports.jsx("div", { className: "phone-input", children: jsxRuntimeExports.jsx("input", { type: "tel", value: phoneNumber, onChange: (e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 11);
                            setPhoneNumber(value);
                        }, placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7", maxLength: 11, style: inputStyle, autoFocus: true }) }), jsxRuntimeExports.jsx("button", { onClick: handleSendCode, disabled: !phoneNumber || phoneNumber.length < 11, style: buttonStyle, className: "send-code-button", children: "\u53D1\u9001\u9A8C\u8BC1\u7801" })] }));
    }
    return (jsxRuntimeExports.jsxs("div", { className: `phone-auth ${className}`, style: containerStyle, children: [jsxRuntimeExports.jsx("h3", { children: "\u9A8C\u8BC1\u7801\u767B\u5F55" }), jsxRuntimeExports.jsxs("p", { children: ["\u9A8C\u8BC1\u7801\u5DF2\u53D1\u9001\u81F3 ", phoneNumber] }), jsxRuntimeExports.jsx("div", { className: "code-input", children: jsxRuntimeExports.jsx("input", { type: "text", value: verificationCode, onChange: (e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                        setVerificationCode(value);
                    }, placeholder: "6\u4F4D\u9A8C\u8BC1\u7801", maxLength: 6, style: inputStyle, autoFocus: true }) }), jsxRuntimeExports.jsxs("div", { className: "actions", children: [jsxRuntimeExports.jsx("button", { onClick: handleVerify, disabled: verificationCode.length !== 6, style: buttonStyle, className: "verify-button", children: "\u767B\u5F55" }), jsxRuntimeExports.jsx("button", { onClick: () => setStep('phone'), style: {
                            ...buttonStyle,
                            backgroundColor: 'transparent',
                            color: theme?.textColor || '#1f2937',
                            border: `1px solid ${theme?.borderColor || '#d1d5db'}`,
                        }, className: "back-button", children: "\u8FD4\u56DE" })] }), jsxRuntimeExports.jsx("div", { className: "resend-section", children: jsxRuntimeExports.jsx("button", { onClick: handleSendCode, disabled: countdown > 0, style: {
                        backgroundColor: 'transparent',
                        color: theme?.primaryColor || '#3b82f6',
                        border: 'none',
                        cursor: countdown > 0 ? 'not-allowed' : 'pointer',
                    }, children: countdown > 0 ? `${countdown}秒后重发` : '重新发送验证码' }) })] }));
};

const UnifiedAuthForm = ({ config, theme, onLoginSuccess, onLoginError, defaultMethod = 'email', showMethodSwitch = true, methodOrder = ['email', 'phone', 'sso'], className = '', }) => {
    const [currentMethod, setCurrentMethod] = useState(defaultMethod);
    const [loginCredentials, setLoginCredentials] = useState({});
    const [show2FA, setShow2FA] = useState(false);
    // 获取启用的认证方式
    const enabledMethods = methodOrder.filter(method => {
        switch (method) {
            case 'email':
                return config.authMethods.emailPassword?.enabled;
            case 'phone':
                return config.authMethods.phone?.enabled;
            case 'sso':
                return config.authMethods.sso?.enabled;
            case '2fa':
                return config.authMethods.twoFactor?.enabled;
            default:
                return false;
        }
    });
    const handleEmailLogin = async (credentials) => {
        try {
            const response = await fetch(`${config.apiUrl}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });
            if (response.status === 202) {
                // 需要 2FA 验证
                setLoginCredentials(credentials);
                setShow2FA(true);
                return;
            }
            if (response.ok) {
                const user = await response.json();
                onLoginSuccess?.(user);
            }
            else {
                throw new Error('Login failed');
            }
        }
        catch (error) {
            onLoginError?.(error);
        }
    };
    const handle2FAVerify = async (code) => {
        try {
            const response = await fetch(`${config.apiUrl}/auth/2fa/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...loginCredentials,
                    totpCode: code,
                }),
            });
            if (response.ok) {
                const user = await response.json();
                onLoginSuccess?.(user);
            }
            else {
                throw new Error('2FA verification failed');
            }
        }
        catch (error) {
            onLoginError?.(error);
        }
    };
    const handlePhoneLogin = async (phone, code) => {
        try {
            const response = await fetch(`${config.apiUrl}/auth/phone/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, code }),
            });
            if (response.ok) {
                const user = await response.json();
                onLoginSuccess?.(user);
            }
            else {
                throw new Error('Phone login failed');
            }
        }
        catch (error) {
            onLoginError?.(error);
        }
    };
    const handleSendCode = async (phone) => {
        try {
            await fetch(`${config.apiUrl}/auth/phone/send-code`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone }),
            });
        }
        catch (error) {
            onLoginError?.(error);
        }
    };
    const handleSSOClick = (provider) => {
        window.location.href = `${config.apiUrl}/auth/sso/${provider.id}`;
    };
    const containerStyle = {
        backgroundColor: theme?.backgroundColor || '#ffffff',
        border: `1px solid ${theme?.borderColor || '#d1d5db'}`,
        borderRadius: theme?.borderRadius || '0.5rem',
        boxShadow: theme?.boxShadow || '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    };
    const tabStyle = {
        backgroundColor: 'transparent',
        border: 'none',
        color: theme?.textColor || '#1f2937',
        cursor: 'pointer',
        padding: '8px 16px',
    };
    const activeTabStyle = {
        ...tabStyle,
        color: theme?.primaryColor || '#3b82f6',
        borderBottom: `2px solid ${theme?.primaryColor || '#3b82f6'}`,
    };
    if (show2FA) {
        return (jsxRuntimeExports.jsx(TwoFactorAuth, { onVerify: handle2FAVerify, onCancel: () => setShow2FA(false), theme: theme, className: className }));
    }
    return (jsxRuntimeExports.jsxs("div", { className: `unified-auth-form ${className}`, style: containerStyle, children: [config.appLogo && (jsxRuntimeExports.jsx("div", { className: "app-logo", children: jsxRuntimeExports.jsx("img", { src: config.appLogo, alt: config.appName || 'App Logo' }) })), jsxRuntimeExports.jsx("h2", { children: config.appName || '登录' }), showMethodSwitch && enabledMethods.length > 1 && (jsxRuntimeExports.jsx("div", { className: "method-tabs", children: enabledMethods.map((method) => (jsxRuntimeExports.jsxs("button", { onClick: () => setCurrentMethod(method), style: currentMethod === method ? activeTabStyle : tabStyle, className: `method-tab ${currentMethod === method ? 'active' : ''}`, children: [method === 'email' && '邮箱登录', method === 'phone' && '手机登录', method === 'sso' && 'SSO登录'] }, method))) })), jsxRuntimeExports.jsxs("div", { className: "auth-content", children: [currentMethod === 'email' && config.authMethods.emailPassword?.enabled && (jsxRuntimeExports.jsx(LoginForm, { config: config, theme: theme, onLoginSuccess: handleEmailLogin, onLoginError: onLoginError, showRememberMe: true, showForgotPassword: true })), currentMethod === 'phone' && config.authMethods.phone?.enabled && (jsxRuntimeExports.jsx(PhoneAuth, { phone: "", code: "", onSendCode: handleSendCode, onVerify: handlePhoneLogin, theme: theme })), currentMethod === 'sso' && config.authMethods.sso?.enabled && config.authMethods.sso.providers && (jsxRuntimeExports.jsx("div", { className: "sso-section", children: jsxRuntimeExports.jsx(SSOButtons, { providers: config.authMethods.sso.providers, onSSOClick: handleSSOClick, theme: theme }) }))] })] }));
};

const defaultTheme = {
    primaryColor: '#3b82f6',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    borderColor: '#d1d5db',
    errorColor: '#ef4444',
    successColor: '#10b981',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
};
const darkTheme = {
    primaryColor: '#60a5fa',
    backgroundColor: '#1f2937',
    textColor: '#f9fafb',
    borderColor: '#374151',
    errorColor: '#f87171',
    successColor: '#34d399',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
};
const createTheme = (overrides = {}) => {
    return {
        ...defaultTheme,
        ...overrides,
    };
};

export { AuthProvider, LoginForm, PhoneAuth, RegisterForm, SSOButtons, TwoFactorAuth, TwoFactorSetup, UnifiedAuthForm, createTheme, darkTheme, defaultTheme, useAuth, useAuthContext };
//# sourceMappingURL=index.esm.js.map
