/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** Virtual DOM Node */
function VNode() {}

/** Global options
 *	@public
 *	@namespace options {Object}
 */
var options = {

	/** If `true`, `prop` changes trigger synchronous component updates.
  *	@name syncComponentUpdates
  *	@type Boolean
  *	@default true
  */
	//syncComponentUpdates: true,

	/** Processes all created VNodes.
  *	@param {VNode} vnode	A newly-created VNode to normalize/process
  */
	//vnode(vnode) { }

	/** Hook invoked after a component is mounted. */
	// afterMount(component) { }

	/** Hook invoked after the DOM is updated with a component's latest render. */
	// afterUpdate(component) { }

	/** Hook invoked immediately before a component is unmounted. */
	// beforeUnmount(component) { }
};

var stack = [];

var EMPTY_CHILDREN = [];

/**
 * JSX/hyperscript reviver.
 * @see http://jasonformat.com/wtf-is-jsx
 * Benchmarks: https://esbench.com/bench/57ee8f8e330ab09900a1a1a0
 *
 * Note: this is exported as both `h()` and `createElement()` for compatibility reasons.
 *
 * Creates a VNode (virtual DOM element). A tree of VNodes can be used as a lightweight representation
 * of the structure of a DOM tree. This structure can be realized by recursively comparing it against
 * the current _actual_ DOM structure, and applying only the differences.
 *
 * `h()`/`createElement()` accepts an element name, a list of attributes/props,
 * and optionally children to append to the element.
 *
 * @example The following DOM tree
 *
 * `<div id="foo" name="bar">Hello!</div>`
 *
 * can be constructed using this function as:
 *
 * `h('div', { id: 'foo', name : 'bar' }, 'Hello!');`
 *
 * @param {string} nodeName	An element name. Ex: `div`, `a`, `span`, etc.
 * @param {Object} attributes	Any attributes/props to set on the created element.
 * @param rest			Additional arguments are taken to be children to append. Can be infinitely nested Arrays.
 *
 * @public
 */
function h(nodeName, attributes) {
	var children = EMPTY_CHILDREN,
	    lastSimple,
	    child,
	    simple,
	    i;
	for (i = arguments.length; i-- > 2;) {
		stack.push(arguments[i]);
	}
	if (attributes && attributes.children != null) {
		if (!stack.length) stack.push(attributes.children);
		delete attributes.children;
	}
	while (stack.length) {
		if ((child = stack.pop()) && child.pop !== undefined) {
			for (i = child.length; i--;) {
				stack.push(child[i]);
			}
		} else {
			if (typeof child === 'boolean') child = null;

			if (simple = typeof nodeName !== 'function') {
				if (child == null) child = '';else if (typeof child === 'number') child = String(child);else if (typeof child !== 'string') simple = false;
			}

			if (simple && lastSimple) {
				children[children.length - 1] += child;
			} else if (children === EMPTY_CHILDREN) {
				children = [child];
			} else {
				children.push(child);
			}

			lastSimple = simple;
		}
	}

	var p = new VNode();
	p.nodeName = nodeName;
	p.children = children;
	p.attributes = attributes == null ? undefined : attributes;
	p.key = attributes == null ? undefined : attributes.key;

	// if a "vnode hook" is defined, pass every created VNode to it
	if (options.vnode !== undefined) options.vnode(p);

	return p;
}

/**
 *  Copy all properties from `props` onto `obj`.
 *  @param {Object} obj		Object onto which properties should be copied.
 *  @param {Object} props	Object from which to copy properties.
 *  @returns obj
 *  @private
 */
function extend(obj, props) {
	for (var i in props) {
		obj[i] = props[i];
	}return obj;
}

/**
 * Call a function asynchronously, as soon as possible. Makes
 * use of HTML Promise to schedule the callback if available,
 * otherwise falling back to `setTimeout` (mainly for IE<11).
 *
 * @param {Function} callback
 */
var defer = typeof Promise == 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

/**
 * Clones the given VNode, optionally adding attributes/props and replacing its children.
 * @param {VNode} vnode		The virutal DOM element to clone
 * @param {Object} props	Attributes/props to add when cloning
 * @param {VNode} rest		Any additional arguments will be used as replacement children.
 */
function cloneElement(vnode, props) {
	return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
}

// DOM properties that should NOT have "px" added when numeric
var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

/** Managed queue of dirty components to be re-rendered */

var items = [];

function enqueueRender(component) {
	if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
		(options.debounceRendering || defer)(rerender);
	}
}

function rerender() {
	var p,
	    list = items;
	items = [];
	while (p = list.pop()) {
		if (p._dirty) renderComponent(p);
	}
}

/**
 * Check if two nodes are equivalent.
 *
 * @param {Node} node			DOM Node to compare
 * @param {VNode} vnode			Virtual DOM node to compare
 * @param {boolean} [hyrdating=false]	If true, ignores component constructors when comparing.
 * @private
 */
function isSameNodeType(node, vnode, hydrating) {
	if (typeof vnode === 'string' || typeof vnode === 'number') {
		return node.splitText !== undefined;
	}
	if (typeof vnode.nodeName === 'string') {
		return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
	}
	return hydrating || node._componentConstructor === vnode.nodeName;
}

/**
 * Check if an Element has a given nodeName, case-insensitively.
 *
 * @param {Element} node	A DOM Element to inspect the name of.
 * @param {String} nodeName	Unnormalized name to compare against.
 */
function isNamedNode(node, nodeName) {
	return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
}

/**
 * Reconstruct Component-style `props` from a VNode.
 * Ensures default/fallback values from `defaultProps`:
 * Own-properties of `defaultProps` not present in `vnode.attributes` are added.
 *
 * @param {VNode} vnode
 * @returns {Object} props
 */
function getNodeProps(vnode) {
	var props = extend({}, vnode.attributes);
	props.children = vnode.children;

	var defaultProps = vnode.nodeName.defaultProps;
	if (defaultProps !== undefined) {
		for (var i in defaultProps) {
			if (props[i] === undefined) {
				props[i] = defaultProps[i];
			}
		}
	}

	return props;
}

/** Create an element with the given nodeName.
 *	@param {String} nodeName
 *	@param {Boolean} [isSvg=false]	If `true`, creates an element within the SVG namespace.
 *	@returns {Element} node
 */
function createNode(nodeName, isSvg) {
	var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
	node.normalizedNodeName = nodeName;
	return node;
}

/** Remove a child node from its parent if attached.
 *	@param {Element} node		The node to remove
 */
function removeNode(node) {
	var parentNode = node.parentNode;
	if (parentNode) parentNode.removeChild(node);
}

/** Set a named attribute on the given Node, with special behavior for some names and event handlers.
 *	If `value` is `null`, the attribute/handler will be removed.
 *	@param {Element} node	An element to mutate
 *	@param {string} name	The name/key to set, such as an event or attribute name
 *	@param {any} old	The last value that was set for this name/node pair
 *	@param {any} value	An attribute value, such as a function to be used as an event handler
 *	@param {Boolean} isSvg	Are we currently diffing inside an svg?
 *	@private
 */
function setAccessor(node, name, old, value, isSvg) {
	if (name === 'className') name = 'class';

	if (name === 'key') {
		// ignore
	} else if (name === 'ref') {
		if (old) old(null);
		if (value) value(node);
	} else if (name === 'class' && !isSvg) {
		node.className = value || '';
	} else if (name === 'style') {
		if (!value || typeof value === 'string' || typeof old === 'string') {
			node.style.cssText = value || '';
		}
		if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
			if (typeof old !== 'string') {
				for (var i in old) {
					if (!(i in value)) node.style[i] = '';
				}
			}
			for (var i in value) {
				node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? value[i] + 'px' : value[i];
			}
		}
	} else if (name === 'dangerouslySetInnerHTML') {
		if (value) node.innerHTML = value.__html || '';
	} else if (name[0] == 'o' && name[1] == 'n') {
		var useCapture = name !== (name = name.replace(/Capture$/, ''));
		name = name.toLowerCase().substring(2);
		if (value) {
			if (!old) node.addEventListener(name, eventProxy, useCapture);
		} else {
			node.removeEventListener(name, eventProxy, useCapture);
		}
		(node._listeners || (node._listeners = {}))[name] = value;
	} else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
		setProperty(node, name, value == null ? '' : value);
		if (value == null || value === false) node.removeAttribute(name);
	} else {
		var ns = isSvg && name !== (name = name.replace(/^xlink\:?/, ''));
		if (value == null || value === false) {
			if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());else node.removeAttribute(name);
		} else if (typeof value !== 'function') {
			if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);else node.setAttribute(name, value);
		}
	}
}

/** Attempt to set a DOM property to the given value.
 *	IE & FF throw for certain property-value combinations.
 */
function setProperty(node, name, value) {
	try {
		node[name] = value;
	} catch (e) {}
}

/** Proxy an event to hooked event handlers
 *	@private
 */
function eventProxy(e) {
	return this._listeners[e.type](options.event && options.event(e) || e);
}

/** Queue of components that have been mounted and are awaiting componentDidMount */
var mounts = [];

/** Diff recursion count, used to track the end of the diff cycle. */
var diffLevel = 0;

/** Global flag indicating if the diff is currently within an SVG */
var isSvgMode = false;

/** Global flag indicating if the diff is performing hydration */
var hydrating = false;

/** Invoke queued componentDidMount lifecycle methods */
function flushMounts() {
	var c;
	while (c = mounts.pop()) {
		if (options.afterMount) options.afterMount(c);
		if (c.componentDidMount) c.componentDidMount();
	}
}

/** Apply differences in a given vnode (and it's deep children) to a real DOM Node.
 *	@param {Element} [dom=null]		A DOM node to mutate into the shape of the `vnode`
 *	@param {VNode} vnode			A VNode (with descendants forming a tree) representing the desired DOM structure
 *	@returns {Element} dom			The created/mutated element
 *	@private
 */
function diff(dom, vnode, context, mountAll, parent, componentRoot) {
	// diffLevel having been 0 here indicates initial entry into the diff (not a subdiff)
	if (!diffLevel++) {
		// when first starting the diff, check if we're diffing an SVG or within an SVG
		isSvgMode = parent != null && parent.ownerSVGElement !== undefined;

		// hydration is indicated by the existing element to be diffed not having a prop cache
		hydrating = dom != null && !('__preactattr_' in dom);
	}

	var ret = idiff(dom, vnode, context, mountAll, componentRoot);

	// append the element if its a new parent
	if (parent && ret.parentNode !== parent) parent.appendChild(ret);

	// diffLevel being reduced to 0 means we're exiting the diff
	if (! --diffLevel) {
		hydrating = false;
		// invoke queued componentDidMount lifecycle methods
		if (!componentRoot) flushMounts();
	}

	return ret;
}

/** Internals of `diff()`, separated to allow bypassing diffLevel / mount flushing. */
function idiff(dom, vnode, context, mountAll, componentRoot) {
	var out = dom,
	    prevSvgMode = isSvgMode;

	// empty values (null, undefined, booleans) render as empty Text nodes
	if (vnode == null || typeof vnode === 'boolean') vnode = '';

	// Fast case: Strings & Numbers create/update Text nodes.
	if (typeof vnode === 'string' || typeof vnode === 'number') {

		// update if it's already a Text node:
		if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
			/* istanbul ignore if */ /* Browser quirk that can't be covered: https://github.com/developit/preact/commit/fd4f21f5c45dfd75151bd27b4c217d8003aa5eb9 */
			if (dom.nodeValue != vnode) {
				dom.nodeValue = vnode;
			}
		} else {
			// it wasn't a Text node: replace it with one and recycle the old Element
			out = document.createTextNode(vnode);
			if (dom) {
				if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
				recollectNodeTree(dom, true);
			}
		}

		out['__preactattr_'] = true;

		return out;
	}

	// If the VNode represents a Component, perform a component diff:
	var vnodeName = vnode.nodeName;
	if (typeof vnodeName === 'function') {
		return buildComponentFromVNode(dom, vnode, context, mountAll);
	}

	// Tracks entering and exiting SVG namespace when descending through the tree.
	isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode;

	// If there's no existing element or it's the wrong type, create a new one:
	vnodeName = String(vnodeName);
	if (!dom || !isNamedNode(dom, vnodeName)) {
		out = createNode(vnodeName, isSvgMode);

		if (dom) {
			// move children into the replacement node
			while (dom.firstChild) {
				out.appendChild(dom.firstChild);
			} // if the previous Element was mounted into the DOM, replace it inline
			if (dom.parentNode) dom.parentNode.replaceChild(out, dom);

			// recycle the old element (skips non-Element node types)
			recollectNodeTree(dom, true);
		}
	}

	var fc = out.firstChild,
	    props = out['__preactattr_'],
	    vchildren = vnode.children;

	if (props == null) {
		props = out['__preactattr_'] = {};
		for (var a = out.attributes, i = a.length; i--;) {
			props[a[i].name] = a[i].value;
		}
	}

	// Optimization: fast-path for elements containing a single TextNode:
	if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
		if (fc.nodeValue != vchildren[0]) {
			fc.nodeValue = vchildren[0];
		}
	}
	// otherwise, if there are existing or new children, diff them:
	else if (vchildren && vchildren.length || fc != null) {
			innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null);
		}

	// Apply attributes/props from VNode to the DOM Element:
	diffAttributes(out, vnode.attributes, props);

	// restore previous SVG mode: (in case we're exiting an SVG namespace)
	isSvgMode = prevSvgMode;

	return out;
}

/** Apply child and attribute changes between a VNode and a DOM Node to the DOM.
 *	@param {Element} dom			Element whose children should be compared & mutated
 *	@param {Array} vchildren		Array of VNodes to compare to `dom.childNodes`
 *	@param {Object} context			Implicitly descendant context object (from most recent `getChildContext()`)
 *	@param {Boolean} mountAll
 *	@param {Boolean} isHydrating	If `true`, consumes externally created elements similar to hydration
 */
function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
	var originalChildren = dom.childNodes,
	    children = [],
	    keyed = {},
	    keyedLen = 0,
	    min = 0,
	    len = originalChildren.length,
	    childrenLen = 0,
	    vlen = vchildren ? vchildren.length : 0,
	    j,
	    c,
	    f,
	    vchild,
	    child;

	// Build up a map of keyed children and an Array of unkeyed children:
	if (len !== 0) {
		for (var i = 0; i < len; i++) {
			var _child = originalChildren[i],
			    props = _child['__preactattr_'],
			    key = vlen && props ? _child._component ? _child._component.__key : props.key : null;
			if (key != null) {
				keyedLen++;
				keyed[key] = _child;
			} else if (props || (_child.splitText !== undefined ? isHydrating ? _child.nodeValue.trim() : true : isHydrating)) {
				children[childrenLen++] = _child;
			}
		}
	}

	if (vlen !== 0) {
		for (var i = 0; i < vlen; i++) {
			vchild = vchildren[i];
			child = null;

			// attempt to find a node based on key matching
			var key = vchild.key;
			if (key != null) {
				if (keyedLen && keyed[key] !== undefined) {
					child = keyed[key];
					keyed[key] = undefined;
					keyedLen--;
				}
			}
			// attempt to pluck a node of the same type from the existing children
			else if (!child && min < childrenLen) {
					for (j = min; j < childrenLen; j++) {
						if (children[j] !== undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
							child = c;
							children[j] = undefined;
							if (j === childrenLen - 1) childrenLen--;
							if (j === min) min++;
							break;
						}
					}
				}

			// morph the matched/found/created DOM child to match vchild (deep)
			child = idiff(child, vchild, context, mountAll);

			f = originalChildren[i];
			if (child && child !== dom && child !== f) {
				if (f == null) {
					dom.appendChild(child);
				} else if (child === f.nextSibling) {
					removeNode(f);
				} else {
					dom.insertBefore(child, f);
				}
			}
		}
	}

	// remove unused keyed children:
	if (keyedLen) {
		for (var i in keyed) {
			if (keyed[i] !== undefined) recollectNodeTree(keyed[i], false);
		}
	}

	// remove orphaned unkeyed children:
	while (min <= childrenLen) {
		if ((child = children[childrenLen--]) !== undefined) recollectNodeTree(child, false);
	}
}

/** Recursively recycle (or just unmount) a node and its descendants.
 *	@param {Node} node						DOM node to start unmount/removal from
 *	@param {Boolean} [unmountOnly=false]	If `true`, only triggers unmount lifecycle, skips removal
 */
function recollectNodeTree(node, unmountOnly) {
	var component = node._component;
	if (component) {
		// if node is owned by a Component, unmount that component (ends up recursing back here)
		unmountComponent(component);
	} else {
		// If the node's VNode had a ref function, invoke it with null here.
		// (this is part of the React spec, and smart for unsetting references)
		if (node['__preactattr_'] != null && node['__preactattr_'].ref) node['__preactattr_'].ref(null);

		if (unmountOnly === false || node['__preactattr_'] == null) {
			removeNode(node);
		}

		removeChildren(node);
	}
}

/** Recollect/unmount all children.
 *	- we use .lastChild here because it causes less reflow than .firstChild
 *	- it's also cheaper than accessing the .childNodes Live NodeList
 */
function removeChildren(node) {
	node = node.lastChild;
	while (node) {
		var next = node.previousSibling;
		recollectNodeTree(node, true);
		node = next;
	}
}

/** Apply differences in attributes from a VNode to the given DOM Element.
 *	@param {Element} dom		Element with attributes to diff `attrs` against
 *	@param {Object} attrs		The desired end-state key-value attribute pairs
 *	@param {Object} old			Current/previous attributes (from previous VNode or element's prop cache)
 */
function diffAttributes(dom, attrs, old) {
	var name;

	// remove attributes no longer present on the vnode by setting them to undefined
	for (name in old) {
		if (!(attrs && attrs[name] != null) && old[name] != null) {
			setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode);
		}
	}

	// add new & update changed attributes
	for (name in attrs) {
		if (name !== 'children' && name !== 'innerHTML' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
			setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
		}
	}
}

/** Retains a pool of Components for re-use, keyed on component name.
 *	Note: since component names are not unique or even necessarily available, these are primarily a form of sharding.
 *	@private
 */
var components = {};

/** Reclaim a component for later re-use by the recycler. */
function collectComponent(component) {
	var name = component.constructor.name;
	(components[name] || (components[name] = [])).push(component);
}

/** Create a component. Normalizes differences between PFC's and classful Components. */
function createComponent(Ctor, props, context) {
	var list = components[Ctor.name],
	    inst;

	if (Ctor.prototype && Ctor.prototype.render) {
		inst = new Ctor(props, context);
		Component.call(inst, props, context);
	} else {
		inst = new Component(props, context);
		inst.constructor = Ctor;
		inst.render = doRender;
	}

	if (list) {
		for (var i = list.length; i--;) {
			if (list[i].constructor === Ctor) {
				inst.nextBase = list[i].nextBase;
				list.splice(i, 1);
				break;
			}
		}
	}
	return inst;
}

/** The `.render()` method for a PFC backing instance. */
function doRender(props, state, context) {
	return this.constructor(props, context);
}

/** Set a component's `props` (generally derived from JSX attributes).
 *	@param {Object} props
 *	@param {Object} [opts]
 *	@param {boolean} [opts.renderSync=false]	If `true` and {@link options.syncComponentUpdates} is `true`, triggers synchronous rendering.
 *	@param {boolean} [opts.render=true]			If `false`, no render will be triggered.
 */
function setComponentProps(component, props, opts, context, mountAll) {
	if (component._disable) return;
	component._disable = true;

	if (component.__ref = props.ref) delete props.ref;
	if (component.__key = props.key) delete props.key;

	if (!component.base || mountAll) {
		if (component.componentWillMount) component.componentWillMount();
	} else if (component.componentWillReceiveProps) {
		component.componentWillReceiveProps(props, context);
	}

	if (context && context !== component.context) {
		if (!component.prevContext) component.prevContext = component.context;
		component.context = context;
	}

	if (!component.prevProps) component.prevProps = component.props;
	component.props = props;

	component._disable = false;

	if (opts !== 0) {
		if (opts === 1 || options.syncComponentUpdates !== false || !component.base) {
			renderComponent(component, 1, mountAll);
		} else {
			enqueueRender(component);
		}
	}

	if (component.__ref) component.__ref(component);
}

/** Render a Component, triggering necessary lifecycle events and taking High-Order Components into account.
 *	@param {Component} component
 *	@param {Object} [opts]
 *	@param {boolean} [opts.build=false]		If `true`, component will build and store a DOM node if not already associated with one.
 *	@private
 */
function renderComponent(component, opts, mountAll, isChild) {
	if (component._disable) return;

	var props = component.props,
	    state = component.state,
	    context = component.context,
	    previousProps = component.prevProps || props,
	    previousState = component.prevState || state,
	    previousContext = component.prevContext || context,
	    isUpdate = component.base,
	    nextBase = component.nextBase,
	    initialBase = isUpdate || nextBase,
	    initialChildComponent = component._component,
	    skip = false,
	    rendered,
	    inst,
	    cbase;

	// if updating
	if (isUpdate) {
		component.props = previousProps;
		component.state = previousState;
		component.context = previousContext;
		if (opts !== 2 && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
			skip = true;
		} else if (component.componentWillUpdate) {
			component.componentWillUpdate(props, state, context);
		}
		component.props = props;
		component.state = state;
		component.context = context;
	}

	component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
	component._dirty = false;

	if (!skip) {
		rendered = component.render(props, state, context);

		// context to pass to the child, can be updated via (grand-)parent component
		if (component.getChildContext) {
			context = extend(extend({}, context), component.getChildContext());
		}

		var childComponent = rendered && rendered.nodeName,
		    toUnmount,
		    base;

		if (typeof childComponent === 'function') {
			// set up high order component link

			var childProps = getNodeProps(rendered);
			inst = initialChildComponent;

			if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
				setComponentProps(inst, childProps, 1, context, false);
			} else {
				toUnmount = inst;

				component._component = inst = createComponent(childComponent, childProps, context);
				inst.nextBase = inst.nextBase || nextBase;
				inst._parentComponent = component;
				setComponentProps(inst, childProps, 0, context, false);
				renderComponent(inst, 1, mountAll, true);
			}

			base = inst.base;
		} else {
			cbase = initialBase;

			// destroy high order component link
			toUnmount = initialChildComponent;
			if (toUnmount) {
				cbase = component._component = null;
			}

			if (initialBase || opts === 1) {
				if (cbase) cbase._component = null;
				base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
			}
		}

		if (initialBase && base !== initialBase && inst !== initialChildComponent) {
			var baseParent = initialBase.parentNode;
			if (baseParent && base !== baseParent) {
				baseParent.replaceChild(base, initialBase);

				if (!toUnmount) {
					initialBase._component = null;
					recollectNodeTree(initialBase, false);
				}
			}
		}

		if (toUnmount) {
			unmountComponent(toUnmount);
		}

		component.base = base;
		if (base && !isChild) {
			var componentRef = component,
			    t = component;
			while (t = t._parentComponent) {
				(componentRef = t).base = base;
			}
			base._component = componentRef;
			base._componentConstructor = componentRef.constructor;
		}
	}

	if (!isUpdate || mountAll) {
		mounts.unshift(component);
	} else if (!skip) {
		// Ensure that pending componentDidMount() hooks of child components
		// are called before the componentDidUpdate() hook in the parent.
		// Note: disabled as it causes duplicate hooks, see https://github.com/developit/preact/issues/750
		// flushMounts();

		if (component.componentDidUpdate) {
			component.componentDidUpdate(previousProps, previousState, previousContext);
		}
		if (options.afterUpdate) options.afterUpdate(component);
	}

	if (component._renderCallbacks != null) {
		while (component._renderCallbacks.length) {
			component._renderCallbacks.pop().call(component);
		}
	}

	if (!diffLevel && !isChild) flushMounts();
}

/** Apply the Component referenced by a VNode to the DOM.
 *	@param {Element} dom	The DOM node to mutate
 *	@param {VNode} vnode	A Component-referencing VNode
 *	@returns {Element} dom	The created/mutated element
 *	@private
 */
function buildComponentFromVNode(dom, vnode, context, mountAll) {
	var c = dom && dom._component,
	    originalComponent = c,
	    oldDom = dom,
	    isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
	    isOwner = isDirectOwner,
	    props = getNodeProps(vnode);
	while (c && !isOwner && (c = c._parentComponent)) {
		isOwner = c.constructor === vnode.nodeName;
	}

	if (c && isOwner && (!mountAll || c._component)) {
		setComponentProps(c, props, 3, context, mountAll);
		dom = c.base;
	} else {
		if (originalComponent && !isDirectOwner) {
			unmountComponent(originalComponent);
			dom = oldDom = null;
		}

		c = createComponent(vnode.nodeName, props, context);
		if (dom && !c.nextBase) {
			c.nextBase = dom;
			// passing dom/oldDom as nextBase will recycle it if unused, so bypass recycling on L229:
			oldDom = null;
		}
		setComponentProps(c, props, 1, context, mountAll);
		dom = c.base;

		if (oldDom && dom !== oldDom) {
			oldDom._component = null;
			recollectNodeTree(oldDom, false);
		}
	}

	return dom;
}

/** Remove a component from the DOM and recycle it.
 *	@param {Component} component	The Component instance to unmount
 *	@private
 */
function unmountComponent(component) {
	if (options.beforeUnmount) options.beforeUnmount(component);

	var base = component.base;

	component._disable = true;

	if (component.componentWillUnmount) component.componentWillUnmount();

	component.base = null;

	// recursively tear down & recollect high-order component children:
	var inner = component._component;
	if (inner) {
		unmountComponent(inner);
	} else if (base) {
		if (base['__preactattr_'] && base['__preactattr_'].ref) base['__preactattr_'].ref(null);

		component.nextBase = base;

		removeNode(base);
		collectComponent(component);

		removeChildren(base);
	}

	if (component.__ref) component.__ref(null);
}

/** Base Component class.
 *	Provides `setState()` and `forceUpdate()`, which trigger rendering.
 *	@public
 *
 *	@example
 *	class MyFoo extends Component {
 *		render(props, state) {
 *			return <div />;
 *		}
 *	}
 */
function Component(props, context) {
	this._dirty = true;

	/** @public
  *	@type {object}
  */
	this.context = context;

	/** @public
  *	@type {object}
  */
	this.props = props;

	/** @public
  *	@type {object}
  */
	this.state = this.state || {};
}

extend(Component.prototype, {

	/** Returns a `boolean` indicating if the component should re-render when receiving the given `props` and `state`.
  *	@param {object} nextProps
  *	@param {object} nextState
  *	@param {object} nextContext
  *	@returns {Boolean} should the component re-render
  *	@name shouldComponentUpdate
  *	@function
  */

	/** Update component state by copying properties from `state` to `this.state`.
  *	@param {object} state		A hash of state properties to update with new values
  *	@param {function} callback	A function to be called once component state is updated
  */
	setState: function setState(state, callback) {
		var s = this.state;
		if (!this.prevState) this.prevState = extend({}, s);
		extend(s, typeof state === 'function' ? state(s, this.props) : state);
		if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
		enqueueRender(this);
	},

	/** Immediately perform a synchronous re-render of the component.
  *	@param {function} callback		A function to be called after component is re-rendered.
  *	@private
  */
	forceUpdate: function forceUpdate(callback) {
		if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
		renderComponent(this, 2);
	},

	/** Accepts `props` and `state`, and returns a new Virtual DOM tree to build.
  *	Virtual DOM is generally constructed via [JSX](http://jasonformat.com/wtf-is-jsx).
  *	@param {object} props		Props (eg: JSX attributes) received from parent element/component
  *	@param {object} state		The component's current state
  *	@param {object} context		Context object (if a parent component has provided context)
  *	@returns VNode
  */
	render: function render() {}
});

/** Render JSX into a `parent` Element.
 *	@param {VNode} vnode		A (JSX) VNode to render
 *	@param {Element} parent		DOM element to render into
 *	@param {Element} [merge]	Attempt to re-use an existing DOM tree rooted at `merge`
 *	@public
 *
 *	@example
 *	// render a div into <body>:
 *	render(<div id="hello">hello!</div>, document.body);
 *
 *	@example
 *	// render a "Thing" component into #foo:
 *	const Thing = ({ name }) => <span>{ name }</span>;
 *	render(<Thing name="one" />, document.querySelector('#foo'));
 */
function render(vnode, parent, merge) {
	return diff(merge, vnode, {}, false, parent, false);
}

var preact = {
	h: h,
	createElement: h,
	cloneElement: cloneElement,
	Component: Component,
	render: render,
	rerender: rerender,
	options: options
};

exports.h = h;
exports.createElement = h;
exports.cloneElement = cloneElement;
exports.Component = Component;
exports.render = render;
exports.rerender = rerender;
exports.options = options;
exports.default = preact;
//# sourceMappingURL=preact.esm.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loglevel = __webpack_require__(19);

var _loglevel2 = _interopRequireDefault(_loglevel);

var _loglevelPluginPrefix = __webpack_require__(20);

var _loglevelPluginPrefix2 = _interopRequireDefault(_loglevelPluginPrefix);

var _loglevelPrefixTemplate = __webpack_require__(21);

var _loglevelPrefixTemplate2 = _interopRequireDefault(_loglevelPrefixTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_loglevelPluginPrefix2.default.apply(_loglevel2.default, _loglevelPrefixTemplate2.default);

var CustomLog = function () {
  function CustomLog(logger) {
    _classCallCheck(this, CustomLog);

    this.logger = logger;
  }

  _createClass(CustomLog, [{
    key: 'stringify',
    value: function stringify(args) {
      var msgtok = args.slice(0);
      msgtok.shift();

      return msgtok.map(function (arg) {
        if (typeof arg == 'array' || (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) == 'object') {
          return ' ' + JSON.stringify(arg);
        }

        return arg;
      }).join('');
    }
  }, {
    key: 'info',
    value: function info(prefix) {
      if (false) {
        this.logger.info(prefix, this.stringify(Array.from(arguments)));
      } else {
        this.logger.info.apply(this, arguments);
      }
    }
  }, {
    key: 'warn',
    value: function warn(prefix) {
      if (false) {
        this.logger.warn(prefix, this.stringify(Array.from(arguments)));
      } else {
        this.logger.warn.apply(this, arguments);
      }
    }
  }, {
    key: 'debug',
    value: function debug(prefix) {
      if (false) {
        this.logger.debug(prefix, this.stringify(Array.from(arguments)));
      } else {
        this.logger.debug.apply(this, arguments);
      }
    }
  }, {
    key: 'error',
    value: function error(prefix) {
      if (false) {
        this.logger.error(prefix, this.stringify(Array.from(arguments)));
      } else {
        this.logger.error.apply(this, arguments);
      }
    }
  }, {
    key: 'trace',
    value: function trace(prefix) {
      if (false) {
        this.logger.trace(prefix, this.stringify(Array.from(arguments)));
      } else {
        this.logger.trace.apply(this, arguments);
      }
    }
  }]);

  return CustomLog;
}();

var _default = function () {
  function _default() {
    _classCallCheck(this, _default);
  }

  _createClass(_default, null, [{
    key: 'getLogger',
    value: function getLogger(moduleName) {
      return new CustomLog(_loglevel2.default.getLogger(moduleName));
    }
  }]);

  return _default;
}();

exports.default = _default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var State = function () {
  function State(props) {
    _classCallCheck(this, State);

    this._state = props;
  }

  _createClass(State, [{
    key: "getIgnoreObject",
    value: function getIgnoreObject(propsArr) {
      var obj = {};

      for (var id in propsArr) {
        obj[propsArr[id]] = null;
      }

      return obj;
    }
  }, {
    key: "ignore",
    value: function ignore(propsArr) {
      this.state = this.getIgnoreObject(propsArr);
      return this;
    }
  }, {
    key: "ignoreGlobals",
    value: function ignoreGlobals(propsArr) {
      this.globals = this.getIgnoreObject(propsArr);;
      return this;
    }
  }, {
    key: "ignoreSkills",
    value: function ignoreSkills(propsArr) {
      this.skills = this.getIgnoreObject(propsArr);;
      return this;
    }
  }, {
    key: "ignoreEvents",
    value: function ignoreEvents(propsArr) {
      this.events = this.getIgnoreObject(propsArr);;
      return this;
    }
  }, {
    key: "ignoreParameters",
    value: function ignoreParameters(propsArr) {
      this.props = this.getIgnoreObject(propsArr);;
      return this;
    }
  }, {
    key: "ignoreSolutions",
    value: function ignoreSolutions(propsArr) {
      this.solutions = this.getIgnoreObject(propsArr);;
      return this;
    }
  }, {
    key: "ignoreManagers",
    value: function ignoreManagers(propsArr) {
      this.managers = this.getIgnoreObject(propsArr);;
      return this;
    }
  }, {
    key: "state",
    set: function set(state) {
      this._state = _extends({}, this._state, state);
    },
    get: function get() {
      return this._state;
    }
  }, {
    key: "globals",
    set: function set(state) {
      this._state = _extends({}, this._state, {
        globals: _extends({}, this._state.globals, state)
      });
    },
    get: function get() {
      return this._state.globals;
    }
  }, {
    key: "events",
    set: function set(state) {
      this._state = _extends({}, this._state, {
        events: _extends({}, this._state.events, state)
      });
    },
    get: function get() {
      return this._state.events;
    }
  }, {
    key: "skills",
    set: function set(state) {
      this._state = _extends({}, this._state, {
        skills: _extends({}, this._state.skills, state)
      });
    },
    get: function get() {
      return this._state.skills;
    }
  }, {
    key: "parameters",
    set: function set(state) {
      this._state = _extends({}, this._state, {
        parameters: _extends({}, this._state.parameters, state)
      });
    },
    get: function get() {
      return this._state.parameters;
    }
  }, {
    key: "managers",
    set: function set(state) {
      this._state = _extends({}, this._state, {
        managers: _extends({}, this._state.managers, state)
      });
    },
    get: function get() {
      return this._state.managers;
    }
  }, {
    key: "solutions",
    set: function set(state) {
      this._state = _extends({}, this._state, {
        solutions: _extends({}, this._state.solutions, state)
      });
    },
    get: function get() {
      return this._state.solutions;
    }
  }]);

  return State;
}();

exports.default = State;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectAdvanced = exports.connect = exports.Provider = undefined;

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _preact = __webpack_require__(0);

var _redux = __webpack_require__(13);

var Children = {
  only: function only(children) {
    return children && children[0] || null;
  }
};

function proptype() {}
proptype.isRequired = proptype;

var PropTypes = {
  element: proptype,
  func: proptype,
  shape: function shape() {
    return proptype;
  },
  instanceOf: function instanceOf() {
    return proptype;
  }
};

var subscriptionShape = PropTypes.shape({
  trySubscribe: PropTypes.func.isRequired,
  tryUnsubscribe: PropTypes.func.isRequired,
  notifyNestedSubs: PropTypes.func.isRequired,
  isSubscribed: PropTypes.func.isRequired
});

var storeShape = PropTypes.shape({
  subscribe: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired
});

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
};

var classCallCheck = function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
};

var didWarnAboutReceivingStore = false;
function warnAboutReceivingStore() {
  if (didWarnAboutReceivingStore) {
    return;
  }
  didWarnAboutReceivingStore = true;

  warning('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/reactjs/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
}

function createProvider() {
  var _Provider$childContex;

  var storeKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'store';
  var subKey = arguments[1];

  var subscriptionKey = subKey || storeKey + 'Subscription';

  var Provider = function (_Component) {
    inherits(Provider, _Component);

    Provider.prototype.getChildContext = function getChildContext() {
      var _ref;

      return _ref = {}, _ref[storeKey] = this[storeKey], _ref[subscriptionKey] = null, _ref;
    };

    function Provider(props, context) {
      classCallCheck(this, Provider);

      var _this = possibleConstructorReturn(this, _Component.call(this, props, context));

      _this[storeKey] = props.store;
      return _this;
    }

    Provider.prototype.render = function render() {
      return Children.only(this.props.children);
    };

    return Provider;
  }(_preact.Component);

  {
    Provider.prototype.componentWillReceiveProps = function (nextProps) {
      if (this[storeKey] !== nextProps.store) {
        warnAboutReceivingStore();
      }
    };
  }

  Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[storeKey] = storeShape.isRequired, _Provider$childContex[subscriptionKey] = subscriptionShape, _Provider$childContex);

  return Provider;
}

var Provider = createProvider();

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
  childContextTypes: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  mixins: true,
  propTypes: true,
  type: true
};

var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};

var defineProperty$1 = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = getPrototypeOf && getPrototypeOf(Object);

var hoistNonReactStatics = function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components

    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);
      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];
      if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
        try {
          // Avoid failures from read-only properties
          defineProperty$1(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }

    return targetComponent;
  }

  return targetComponent;
};

var invariant = function invariant() {};

// encapsulates the subscription logic for connecting a component to the redux store, as
// well as nesting subscriptions of descendant components, so that we can ensure the
// ancestor components re-render before descendants

var CLEARED = null;
var nullListeners = {
  notify: function notify() {}
};

function createListenerCollection() {
  // the current/next pattern is copied from redux's createStore code.
  // TODO: refactor+expose that code to be reusable here?
  var current = [];
  var next = [];

  return {
    clear: function clear() {
      next = CLEARED;
      current = CLEARED;
    },
    notify: function notify() {
      var listeners = current = next;
      for (var i = 0; i < listeners.length; i++) {
        listeners[i]();
      }
    },
    get: function get$$1() {
      return next;
    },
    subscribe: function subscribe(listener) {
      var isSubscribed = true;
      if (next === current) next = current.slice();
      next.push(listener);

      return function unsubscribe() {
        if (!isSubscribed || current === CLEARED) return;
        isSubscribed = false;

        if (next === current) next = current.slice();
        next.splice(next.indexOf(listener), 1);
      };
    }
  };
}

var Subscription = function () {
  function Subscription(store, parentSub, onStateChange) {
    classCallCheck(this, Subscription);

    this.store = store;
    this.parentSub = parentSub;
    this.onStateChange = onStateChange;
    this.unsubscribe = null;
    this.listeners = nullListeners;
  }

  Subscription.prototype.addNestedSub = function addNestedSub(listener) {
    this.trySubscribe();
    return this.listeners.subscribe(listener);
  };

  Subscription.prototype.notifyNestedSubs = function notifyNestedSubs() {
    this.listeners.notify();
  };

  Subscription.prototype.isSubscribed = function isSubscribed() {
    return Boolean(this.unsubscribe);
  };

  Subscription.prototype.trySubscribe = function trySubscribe() {
    if (!this.unsubscribe) {
      this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.onStateChange) : this.store.subscribe(this.onStateChange);

      this.listeners = createListenerCollection();
    }
  };

  Subscription.prototype.tryUnsubscribe = function tryUnsubscribe() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
      this.listeners.clear();
      this.listeners = nullListeners;
    }
  };

  return Subscription;
}();

var hotReloadingVersion = 0;
var dummyState = {};
function noop() {}
function makeSelectorStateful(sourceSelector, store) {
  // wrap the selector in an object that tracks its results between runs.
  var selector = {
    run: function runComponentSelector(props) {
      try {
        var nextProps = sourceSelector(store.getState(), props);
        if (nextProps !== selector.props || selector.error) {
          selector.shouldComponentUpdate = true;
          selector.props = nextProps;
          selector.error = null;
        }
      } catch (error) {
        selector.shouldComponentUpdate = true;
        selector.error = error;
      }
    }
  };

  return selector;
}

function connectAdvanced(
/*
  selectorFactory is a func that is responsible for returning the selector function used to
  compute new props from state, props, and dispatch. For example:
     export default connectAdvanced((dispatch, options) => (state, props) => ({
      thing: state.things[props.thingId],
      saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
    }))(YourComponent)
   Access to dispatch is provided to the factory so selectorFactories can bind actionCreators
  outside of their selector as an optimization. Options passed to connectAdvanced are passed to
  the selectorFactory, along with displayName and WrappedComponent, as the second argument.
   Note that selectorFactory is responsible for all caching/memoization of inbound and outbound
  props. Do not use connectAdvanced directly without memoizing results between calls to your
  selector, otherwise the Connect component will re-render on every state or props change.
*/
selectorFactory) {
  var _contextTypes, _childContextTypes;

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _ref$getDisplayName = _ref.getDisplayName,
      getDisplayName = _ref$getDisplayName === undefined ? function (name) {
    return 'ConnectAdvanced(' + name + ')';
  } : _ref$getDisplayName,
      _ref$methodName = _ref.methodName,
      methodName = _ref$methodName === undefined ? 'connectAdvanced' : _ref$methodName,
      _ref$renderCountProp = _ref.renderCountProp,
      renderCountProp = _ref$renderCountProp === undefined ? undefined : _ref$renderCountProp,
      _ref$shouldHandleStat = _ref.shouldHandleStateChanges,
      shouldHandleStateChanges = _ref$shouldHandleStat === undefined ? true : _ref$shouldHandleStat,
      _ref$storeKey = _ref.storeKey,
      storeKey = _ref$storeKey === undefined ? 'store' : _ref$storeKey,
      _ref$withRef = _ref.withRef,
      withRef = _ref$withRef === undefined ? false : _ref$withRef,
      connectOptions = objectWithoutProperties(_ref, ['getDisplayName', 'methodName', 'renderCountProp', 'shouldHandleStateChanges', 'storeKey', 'withRef']);

  var subscriptionKey = storeKey + 'Subscription';
  var version = hotReloadingVersion++;

  var contextTypes = (_contextTypes = {}, _contextTypes[storeKey] = storeShape, _contextTypes[subscriptionKey] = subscriptionShape, _contextTypes);
  var childContextTypes = (_childContextTypes = {}, _childContextTypes[subscriptionKey] = subscriptionShape, _childContextTypes);

  return function wrapWithConnect(WrappedComponent) {
    invariant(typeof WrappedComponent == 'function', 'You must pass a component to the function returned by ' + ('connect. Instead received ' + JSON.stringify(WrappedComponent)));

    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    var displayName = getDisplayName(wrappedComponentName);

    var selectorFactoryOptions = _extends({}, connectOptions, {
      getDisplayName: getDisplayName,
      methodName: methodName,
      renderCountProp: renderCountProp,
      shouldHandleStateChanges: shouldHandleStateChanges,
      storeKey: storeKey,
      withRef: withRef,
      displayName: displayName,
      wrappedComponentName: wrappedComponentName,
      WrappedComponent: WrappedComponent
    });

    var Connect = function (_Component) {
      inherits(Connect, _Component);

      function Connect(props, context) {
        classCallCheck(this, Connect);

        var _this = possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.version = version;
        _this.state = {};
        _this.renderCount = 0;
        _this.store = props[storeKey] || context[storeKey];
        _this.propsMode = Boolean(props[storeKey]);
        _this.setWrappedInstance = _this.setWrappedInstance.bind(_this);

        invariant(_this.store, 'Could not find "' + storeKey + '" in either the context or props of ' + ('"' + displayName + '". Either wrap the root component in a <Provider>, ') + ('or explicitly pass "' + storeKey + '" as a prop to "' + displayName + '".'));

        _this.initSelector();
        _this.initSubscription();
        return _this;
      }

      Connect.prototype.getChildContext = function getChildContext() {
        var _ref2;

        // If this component received store from props, its subscription should be transparent
        // to any descendants receiving store+subscription from context; it passes along
        // subscription passed to it. Otherwise, it shadows the parent subscription, which allows
        // Connect to control ordering of notifications to flow top-down.
        var subscription = this.propsMode ? null : this.subscription;
        return _ref2 = {}, _ref2[subscriptionKey] = subscription || this.context[subscriptionKey], _ref2;
      };

      Connect.prototype.componentDidMount = function componentDidMount() {
        if (!shouldHandleStateChanges) return;

        // componentWillMount fires during server side rendering, but componentDidMount and
        // componentWillUnmount do not. Because of this, trySubscribe happens during ...didMount.
        // Otherwise, unsubscription would never take place during SSR, causing a memory leak.
        // To handle the case where a child component may have triggered a state change by
        // dispatching an action in its componentWillMount, we have to re-run the select and maybe
        // re-render.
        this.subscription.trySubscribe();
        this.selector.run(this.props);
        if (this.selector.shouldComponentUpdate) this.forceUpdate();
      };

      Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        this.selector.run(nextProps);
      };

      Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
        return this.selector.shouldComponentUpdate;
      };

      Connect.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.subscription) this.subscription.tryUnsubscribe();
        this.subscription = null;
        this.notifyNestedSubs = noop;
        this.store = null;
        this.selector.run = noop;
        this.selector.shouldComponentUpdate = false;
      };

      Connect.prototype.getWrappedInstance = function getWrappedInstance() {
        invariant(withRef, 'To access the wrapped instance, you need to specify ' + ('{ withRef: true } in the options argument of the ' + methodName + '() call.'));
        return this.wrappedInstance;
      };

      Connect.prototype.setWrappedInstance = function setWrappedInstance(ref) {
        this.wrappedInstance = ref;
      };

      Connect.prototype.initSelector = function initSelector() {
        var sourceSelector = selectorFactory(this.store.dispatch, selectorFactoryOptions);
        this.selector = makeSelectorStateful(sourceSelector, this.store);
        this.selector.run(this.props);
      };

      Connect.prototype.initSubscription = function initSubscription() {
        if (!shouldHandleStateChanges) return;

        // parentSub's source should match where store came from: props vs. context. A component
        // connected to the store via props shouldn't use subscription from context, or vice versa.
        var parentSub = (this.propsMode ? this.props : this.context)[subscriptionKey];
        this.subscription = new Subscription(this.store, parentSub, this.onStateChange.bind(this));

        // `notifyNestedSubs` is duplicated to handle the case where the component is  unmounted in
        // the middle of the notification loop, where `this.subscription` will then be null. An
        // extra null check every change can be avoided by copying the method onto `this` and then
        // replacing it with a no-op on unmount. This can probably be avoided if Subscription's
        // listeners logic is changed to not call listeners that have been unsubscribed in the
        // middle of the notification loop.
        this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(this.subscription);
      };

      Connect.prototype.onStateChange = function onStateChange() {
        this.selector.run(this.props);

        if (!this.selector.shouldComponentUpdate) {
          this.notifyNestedSubs();
        } else {
          this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate;
          this.setState(dummyState);
        }
      };

      Connect.prototype.notifyNestedSubsOnComponentDidUpdate = function notifyNestedSubsOnComponentDidUpdate() {
        // `componentDidUpdate` is conditionally implemented when `onStateChange` determines it
        // needs to notify nested subs. Once called, it unimplements itself until further state
        // changes occur. Doing it this way vs having a permanent `componentDidUpdate` that does
        // a boolean check every time avoids an extra method call most of the time, resulting
        // in some perf boost.
        this.componentDidUpdate = undefined;
        this.notifyNestedSubs();
      };

      Connect.prototype.isSubscribed = function isSubscribed() {
        return Boolean(this.subscription) && this.subscription.isSubscribed();
      };

      Connect.prototype.addExtraProps = function addExtraProps(props) {
        if (!withRef && !renderCountProp && !(this.propsMode && this.subscription)) return props;
        // make a shallow copy so that fields added don't leak to the original selector.
        // this is especially important for 'ref' since that's a reference back to the component
        // instance. a singleton memoized selector would then be holding a reference to the
        // instance, preventing the instance from being garbage collected, and that would be bad
        var withExtras = _extends({}, props);
        if (withRef) withExtras.ref = this.setWrappedInstance;
        if (renderCountProp) withExtras[renderCountProp] = this.renderCount++;
        if (this.propsMode && this.subscription) withExtras[subscriptionKey] = this.subscription;
        return withExtras;
      };

      Connect.prototype.render = function render() {
        var selector = this.selector;
        selector.shouldComponentUpdate = false;

        if (selector.error) {
          throw selector.error;
        } else {
          return (0, _preact.h)(WrappedComponent, this.addExtraProps(selector.props));
        }
      };

      return Connect;
    }(_preact.Component);

    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = displayName;
    Connect.childContextTypes = childContextTypes;
    Connect.contextTypes = contextTypes;

    {
      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
        var _this2 = this;

        // We are hot reloading!
        if (this.version !== version) {
          this.version = version;
          this.initSelector();

          // If any connected descendants don't hot reload (and resubscribe in the process), their
          // listeners will be lost when we unsubscribe. Unfortunately, by copying over all
          // listeners, this does mean that the old versions of connected descendants will still be
          // notified of state changes; however, their onStateChange function is a no-op so this
          // isn't a huge deal.
          var oldListeners = [];

          if (this.subscription) {
            oldListeners = this.subscription.listeners.get();
            this.subscription.tryUnsubscribe();
          }
          this.initSubscription();
          if (shouldHandleStateChanges) {
            this.subscription.trySubscribe();
            oldListeners.forEach(function (listener) {
              return _this2.subscription.listeners.subscribe(listener);
            });
          }
        }
      };
    }

    return hoistNonReactStatics(Connect, WrappedComponent);
  };
}

var hasOwn = Object.prototype.hasOwnProperty;

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;

  if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var _Symbol = root.Symbol;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$1.toString;

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty$1.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$2.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]';
var undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype;
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}

function verifyPlainObject(value, displayName, methodName) {
  if (!isPlainObject(value)) {
    warning(methodName + '() in ' + displayName + ' must return a plain object. Instead received ' + value + '.');
  }
}

function wrapMapToPropsConstant(getConstant) {
  return function initConstantSelector(dispatch, options) {
    var constant = getConstant(dispatch, options);

    function constantSelector() {
      return constant;
    }
    constantSelector.dependsOnOwnProps = false;
    return constantSelector;
  };
}

// dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
// to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
// whether mapToProps needs to be invoked when props have changed.
// 
// A length of one signals that mapToProps does not depend on props from the parent component.
// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
// therefore not reporting its length accurately..
function getDependsOnOwnProps(mapToProps) {
  return mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
}

// Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
// this function wraps mapToProps in a proxy function which does several things:
// 
//  * Detects whether the mapToProps function being called depends on props, which
//    is used by selectorFactory to decide if it should reinvoke on props changes.
//    
//  * On first call, handles mapToProps if returns another function, and treats that
//    new function as the true mapToProps for subsequent calls.
//    
//  * On first call, verifies the first result is a plain object, in order to warn
//    the developer that their mapToProps function is not returning a valid result.
//    
function wrapMapToPropsFunc(mapToProps, methodName) {
  return function initProxySelector(dispatch, _ref) {
    var displayName = _ref.displayName;

    var proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
      return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch);
    };

    // allow detectFactoryAndVerify to get ownProps
    proxy.dependsOnOwnProps = true;

    proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
      proxy.mapToProps = mapToProps;
      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
      var props = proxy(stateOrDispatch, ownProps);

      if (typeof props === 'function') {
        proxy.mapToProps = props;
        proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
        props = proxy(stateOrDispatch, ownProps);
      }

      verifyPlainObject(props, displayName, methodName);

      return props;
    };

    return proxy;
  };
}

function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
  return typeof mapDispatchToProps === 'function' ? wrapMapToPropsFunc(mapDispatchToProps, 'mapDispatchToProps') : undefined;
}

function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
  return !mapDispatchToProps ? wrapMapToPropsConstant(function (dispatch) {
    return { dispatch: dispatch };
  }) : undefined;
}

function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
  return mapDispatchToProps && (typeof mapDispatchToProps === 'undefined' ? 'undefined' : _typeof(mapDispatchToProps)) === 'object' ? wrapMapToPropsConstant(function (dispatch) {
    return (0, _redux.bindActionCreators)(mapDispatchToProps, dispatch);
  }) : undefined;
}

var defaultMapDispatchToPropsFactories = [whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject];

function whenMapStateToPropsIsFunction(mapStateToProps) {
  return typeof mapStateToProps === 'function' ? wrapMapToPropsFunc(mapStateToProps, 'mapStateToProps') : undefined;
}

function whenMapStateToPropsIsMissing(mapStateToProps) {
  return !mapStateToProps ? wrapMapToPropsConstant(function () {
    return {};
  }) : undefined;
}

var defaultMapStateToPropsFactories = [whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing];

function defaultMergeProps(stateProps, dispatchProps, ownProps) {
  return _extends({}, ownProps, stateProps, dispatchProps);
}

function wrapMergePropsFunc(mergeProps) {
  return function initMergePropsProxy(dispatch, _ref) {
    var displayName = _ref.displayName,
        pure = _ref.pure,
        areMergedPropsEqual = _ref.areMergedPropsEqual;

    var hasRunOnce = false;
    var mergedProps = void 0;

    return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
      var nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);

      if (hasRunOnce) {
        if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) mergedProps = nextMergedProps;
      } else {
        hasRunOnce = true;
        mergedProps = nextMergedProps;

        verifyPlainObject(mergedProps, displayName, 'mergeProps');
      }

      return mergedProps;
    };
  };
}

function whenMergePropsIsFunction(mergeProps) {
  return typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : undefined;
}

function whenMergePropsIsOmitted(mergeProps) {
  return !mergeProps ? function () {
    return defaultMergeProps;
  } : undefined;
}

var defaultMergePropsFactories = [whenMergePropsIsFunction, whenMergePropsIsOmitted];

function verify(selector, methodName, displayName) {
  if (!selector) {
    throw new Error('Unexpected value for ' + methodName + ' in ' + displayName + '.');
  } else if (methodName === 'mapStateToProps' || methodName === 'mapDispatchToProps') {
    if (!selector.hasOwnProperty('dependsOnOwnProps')) {
      warning('The selector for ' + methodName + ' of ' + displayName + ' did not specify a value for dependsOnOwnProps.');
    }
  }
}

function verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, displayName) {
  verify(mapStateToProps, 'mapStateToProps', displayName);
  verify(mapDispatchToProps, 'mapDispatchToProps', displayName);
  verify(mergeProps, 'mergeProps', displayName);
}

function impureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch) {
  return function impureFinalPropsSelector(state, ownProps) {
    return mergeProps(mapStateToProps(state, ownProps), mapDispatchToProps(dispatch, ownProps), ownProps);
  };
}

function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, _ref) {
  var areStatesEqual = _ref.areStatesEqual,
      areOwnPropsEqual = _ref.areOwnPropsEqual,
      areStatePropsEqual = _ref.areStatePropsEqual;

  var hasRunAtLeastOnce = false;
  var state = void 0;
  var ownProps = void 0;
  var stateProps = void 0;
  var dispatchProps = void 0;
  var mergedProps = void 0;

  function handleFirstCall(firstState, firstOwnProps) {
    state = firstState;
    ownProps = firstOwnProps;
    stateProps = mapStateToProps(state, ownProps);
    dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    hasRunAtLeastOnce = true;
    return mergedProps;
  }

  function handleNewPropsAndNewState() {
    stateProps = mapStateToProps(state, ownProps);

    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);

    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewProps() {
    if (mapStateToProps.dependsOnOwnProps) stateProps = mapStateToProps(state, ownProps);

    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);

    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewState() {
    var nextStateProps = mapStateToProps(state, ownProps);
    var statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
    stateProps = nextStateProps;

    if (statePropsChanged) mergedProps = mergeProps(stateProps, dispatchProps, ownProps);

    return mergedProps;
  }

  function handleSubsequentCalls(nextState, nextOwnProps) {
    var propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
    var stateChanged = !areStatesEqual(nextState, state);
    state = nextState;
    ownProps = nextOwnProps;

    if (propsChanged && stateChanged) return handleNewPropsAndNewState();
    if (propsChanged) return handleNewProps();
    if (stateChanged) return handleNewState();
    return mergedProps;
  }

  return function pureFinalPropsSelector(nextState, nextOwnProps) {
    return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
  };
}

// TODO: Add more comments

// If pure is true, the selector returned by selectorFactory will memoize its results,
// allowing connectAdvanced's shouldComponentUpdate to return false if final
// props have not changed. If false, the selector will always return a new
// object and shouldComponentUpdate will always return true.

function finalPropsSelectorFactory(dispatch, _ref2) {
  var initMapStateToProps = _ref2.initMapStateToProps,
      initMapDispatchToProps = _ref2.initMapDispatchToProps,
      initMergeProps = _ref2.initMergeProps,
      options = objectWithoutProperties(_ref2, ['initMapStateToProps', 'initMapDispatchToProps', 'initMergeProps']);

  var mapStateToProps = initMapStateToProps(dispatch, options);
  var mapDispatchToProps = initMapDispatchToProps(dispatch, options);
  var mergeProps = initMergeProps(dispatch, options);

  {
    verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, options.displayName);
  }

  var selectorFactory = options.pure ? pureFinalPropsSelectorFactory : impureFinalPropsSelectorFactory;

  return selectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
}

/*
  connect is a facade over connectAdvanced. It turns its args into a compatible
  selectorFactory, which has the signature:

    (dispatch, options) => (nextState, nextOwnProps) => nextFinalProps
  
  connect passes its args to connectAdvanced as options, which will in turn pass them to
  selectorFactory each time a Connect component instance is instantiated or hot reloaded.

  selectorFactory returns a final props selector from its mapStateToProps,
  mapStateToPropsFactories, mapDispatchToProps, mapDispatchToPropsFactories, mergeProps,
  mergePropsFactories, and pure args.

  The resulting final props selector is called by the Connect component instance whenever
  it receives new props or store state.
 */

function match(arg, factories, name) {
  for (var i = factories.length - 1; i >= 0; i--) {
    var result = factories[i](arg);
    if (result) return result;
  }

  return function (dispatch, options) {
    throw new Error('Invalid value of type ' + (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) + ' for ' + name + ' argument when connecting component ' + options.wrappedComponentName + '.');
  };
}

function strictEqual(a, b) {
  return a === b;
}

// createConnect with default args builds the 'official' connect behavior. Calling it with
// different options opens up some testing and extensibility scenarios
function createConnect() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$connectHOC = _ref.connectHOC,
      connectHOC = _ref$connectHOC === undefined ? connectAdvanced : _ref$connectHOC,
      _ref$mapStateToPropsF = _ref.mapStateToPropsFactories,
      mapStateToPropsFactories = _ref$mapStateToPropsF === undefined ? defaultMapStateToPropsFactories : _ref$mapStateToPropsF,
      _ref$mapDispatchToPro = _ref.mapDispatchToPropsFactories,
      mapDispatchToPropsFactories = _ref$mapDispatchToPro === undefined ? defaultMapDispatchToPropsFactories : _ref$mapDispatchToPro,
      _ref$mergePropsFactor = _ref.mergePropsFactories,
      mergePropsFactories = _ref$mergePropsFactor === undefined ? defaultMergePropsFactories : _ref$mergePropsFactor,
      _ref$selectorFactory = _ref.selectorFactory,
      selectorFactory = _ref$selectorFactory === undefined ? finalPropsSelectorFactory : _ref$selectorFactory;

  return function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
    var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var _ref2$pure = _ref2.pure,
        pure = _ref2$pure === undefined ? true : _ref2$pure,
        _ref2$areStatesEqual = _ref2.areStatesEqual,
        areStatesEqual = _ref2$areStatesEqual === undefined ? strictEqual : _ref2$areStatesEqual,
        _ref2$areOwnPropsEqua = _ref2.areOwnPropsEqual,
        areOwnPropsEqual = _ref2$areOwnPropsEqua === undefined ? shallowEqual : _ref2$areOwnPropsEqua,
        _ref2$areStatePropsEq = _ref2.areStatePropsEqual,
        areStatePropsEqual = _ref2$areStatePropsEq === undefined ? shallowEqual : _ref2$areStatePropsEq,
        _ref2$areMergedPropsE = _ref2.areMergedPropsEqual,
        areMergedPropsEqual = _ref2$areMergedPropsE === undefined ? shallowEqual : _ref2$areMergedPropsE,
        extraOptions = objectWithoutProperties(_ref2, ['pure', 'areStatesEqual', 'areOwnPropsEqual', 'areStatePropsEqual', 'areMergedPropsEqual']);

    var initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
    var initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps');
    var initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps');

    return connectHOC(selectorFactory, _extends({
      // used in error messages
      methodName: 'connect',

      // used to compute Connect's displayName from the wrapped component's displayName.
      getDisplayName: function getDisplayName(name) {
        return 'Connect(' + name + ')';
      },

      // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
      shouldHandleStateChanges: Boolean(mapStateToProps),

      // passed through to selectorFactory
      initMapStateToProps: initMapStateToProps,
      initMapDispatchToProps: initMapDispatchToProps,
      initMergeProps: initMergeProps,
      pure: pure,
      areStatesEqual: areStatesEqual,
      areOwnPropsEqual: areOwnPropsEqual,
      areStatePropsEqual: areStatePropsEqual,
      areMergedPropsEqual: areMergedPropsEqual

    }, extraOptions));
  };
}

var connect = createConnect();

var index = { Provider: Provider, connect: connect, connectAdvanced: connectAdvanced };

exports.Provider = Provider;
exports.connect = connect;
exports.connectAdvanced = connectAdvanced;
exports.default = index;
//# sourceMappingURL=preact-redux.esm.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _State = __webpack_require__(2);

var _State2 = _interopRequireDefault(_State);

var _generics = __webpack_require__(6);

var _loglevelCustom = __webpack_require__(1);

var _loglevelCustom2 = _interopRequireDefault(_loglevelCustom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var logger = _loglevelCustom2.default.getLogger('EvoComponent');

var EvoComponent = function (_Component) {
  _inherits(EvoComponent, _Component);

  function EvoComponent(props) {
    _classCallCheck(this, EvoComponent);

    return _possibleConstructorReturn(this, (EvoComponent.__proto__ || Object.getPrototypeOf(EvoComponent)).call(this, props));
  }

  _createClass(EvoComponent, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var logPrefix = ':shouldComponentUpdate] ';
      logger.debug(logPrefix, '-->');

      var ignoreProps = ['dispatch', 'managers', 'children', 'history'];
      var _ref = [new _State2.default(this.props).ignore(ignoreProps), new _State2.default(nextProps).ignore(ignoreProps)],
          oldProps = _ref[0],
          newProps = _ref[1];


      var result = (0, _generics.compareObjects)(oldProps.state, newProps.state);
      logger.debug(logPrefix, 'Props are ' + (result ? '' : 'not ') + 'equals');

      logger.debug(logPrefix, '<--');
      return !result;
    }
  }]);

  return EvoComponent;
}(_preact.Component);

exports.default = EvoComponent;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    var mod = { exports: {} };factory(mod.exports);global.decko = mod.exports;
  }
})(undefined, function (exports) {
  'use strict';
  exports.__esModule = true;var EMPTY = {};var HOP = Object.prototype.hasOwnProperty;var fns = { memoize: function memoize(fn) {
      var opt = arguments.length <= 1 || arguments[1] === undefined ? EMPTY : arguments[1];var cache = opt.cache || {};return function () {
        for (var _len = arguments.length, a = Array(_len), _key = 0; _key < _len; _key++) {
          a[_key] = arguments[_key];
        }var k = String(a[0]);if (opt.caseSensitive === false) k = k.toLowerCase();return HOP.call(cache, k) ? cache[k] : cache[k] = fn.apply(this, a);
      };
    }, debounce: function debounce(fn, opts) {
      if (typeof opts === 'function') {
        var p = fn;fn = opts;opts = p;
      }var delay = opts && opts.delay || opts || 0,
          args = undefined,
          context = undefined,
          timer = undefined;return function () {
        for (var _len2 = arguments.length, a = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          a[_key2] = arguments[_key2];
        }args = a;context = this;if (!timer) timer = setTimeout(function () {
          fn.apply(context, args);args = context = timer = null;
        }, delay);
      };
    }, bind: function bind(target, key, _ref) {
      var fn = _ref.value;return { configurable: true, get: function get() {
          var value = fn.bind(this);Object.defineProperty(this, key, { value: value, configurable: true, writable: true });return value;
        } };
    } };var memoize = multiMethod(fns.memoize),
      debounce = multiMethod(fns.debounce),
      bind = multiMethod(function (f, c) {
    return f.bind(c);
  }, function () {
    return fns.bind;
  });exports.memoize = memoize;exports.debounce = debounce;exports.bind = bind;exports['default'] = { memoize: memoize, debounce: debounce, bind: bind };function multiMethod(inner, deco) {
    deco = deco || inner.decorate || decorator(inner);var d = deco();return function () {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }var l = args.length;return (l < 2 ? deco : l > 2 ? d : inner).apply(undefined, args);
    };
  }function decorator(fn) {
    return function (opt) {
      return typeof opt === 'function' ? fn(opt) : function (target, key, desc) {
        desc.value = fn(desc.value, opt, target, key, desc);
      };
    };
  }
});

//# sourceMappingURL=decko.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sumEqualsKey = exports.compareObjects = exports.getValueInScale = exports.getRandomInt = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _loglevelCustom = __webpack_require__(1);

var _loglevelCustom2 = _interopRequireDefault(_loglevelCustom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = _loglevelCustom2.default.getLogger('generics');

var getRandomInt = exports.getRandomInt = function getRandomInt(min, max) {
  var _ref = [Math.ceil(min), Math.floor(max)];
  min = _ref[0];
  max = _ref[1];

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getValueInScale = exports.getValueInScale = function getValueInScale(scale, value) {
  var logPrefix = ':getValueInScale] ';
  logger.info(logPrefix, '-->');

  var result = null;

  for (var i in scale) {
    if (value <= scale[i].value || i == scale.length - 1) {
      result = scale[i];
      break;
    }
  }

  if (result === null) {
    logger.info(logPrefix, 'No valid value found');
    result = { label: '', value: 0 };
  }

  logger.debug(logPrefix, 'value in scale:', result.value, 'associated with label:', result.label);

  logger.info(logPrefix, '<--');
  return result;
};

var compareObjects = exports.compareObjects = function compareObjects(a, b) {
  if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) != 'object' || (typeof b === 'undefined' ? 'undefined' : _typeof(b)) != 'object') {
    throw new Error('Invalid arguments (a: ' + (typeof a === 'undefined' ? 'undefined' : _typeof(a)) + ', b: ' + (typeof b === 'undefined' ? 'undefined' : _typeof(b)) + ')');
    return false;
  }

  for (var key in a) {
    if (!b.hasOwnProperty(key)) {
      return false;
    }

    if (_typeof(a[key]) != _typeof(b[key])) {
      return false;
    }

    if (_typeof(a[key]) != 'object') {
      if (a[key] !== b[key]) {
        return false;
      }
    } else if (!compareObjects(a[key], b[key])) {
      return false;
    }
  }

  return true;
};

var sumEqualsKey = exports.sumEqualsKey = function sumEqualsKey(a, b) {
  if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) != 'object' || (typeof b === 'undefined' ? 'undefined' : _typeof(b)) != 'object') {
    throw new Error('Invalid arguments (a: ' + (typeof a === 'undefined' ? 'undefined' : _typeof(a)) + ', b: ' + (typeof b === 'undefined' ? 'undefined' : _typeof(b)) + ')');
    return false;
  }

  var object = _extends({}, b, a);

  for (var key in a) {
    if (!b.hasOwnProperty(key)) {
      continue;
    }

    if (_typeof(a[key]) != 'object') {
      object[key] = a[key] + b[key];
    } else {
      object[key] = sumEqualsKey(a[key], b[key]);
    }
  }

  return object;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CoreList = exports.Core = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _State2 = __webpack_require__(2);

var _State3 = _interopRequireDefault(_State2);

var _loglevelCustom = __webpack_require__(1);

var _loglevelCustom2 = _interopRequireDefault(_loglevelCustom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var logger = _loglevelCustom2.default.getLogger('core');

var Core = exports.Core = function (_State) {
  _inherits(Core, _State);

  function Core() {
    _classCallCheck(this, Core);

    return _possibleConstructorReturn(this, (Core.__proto__ || Object.getPrototypeOf(Core)).call(this, {}));
  }

  _createClass(Core, [{
    key: 'setState',
    value: function setState(state) {
      this.state = state;
      return this;
    }
  }, {
    key: 'getCurrentState',
    value: function getCurrentState() {
      var logPrefix = ':getCurrentState] ';
      logger.debug(logPrefix, '-->');
      logger.trace(logPrefix, this.state);
      logger.debug(logPrefix, '<--');
      return this.state;
    }
  }]);

  return Core;
}(_State3.default);

var CoreList = exports.CoreList = function (_Core) {
  _inherits(CoreList, _Core);

  function CoreList(list) {
    _classCallCheck(this, CoreList);

    var _this2 = _possibleConstructorReturn(this, (CoreList.__proto__ || Object.getPrototypeOf(CoreList)).call(this));

    _this2.state = {
      list: list
    };
    return _this2;
  }

  _createClass(CoreList, [{
    key: 'getList',
    value: function getList() {
      var logPrefix = ':getList] ';
      logger.debug(logPrefix, '-->');

      logger.debug(logPrefix, '<--');
      return this.state.list;
    }
  }, {
    key: 'getElementByKey',
    value: function getElementByKey(key) {
      var logPrefix = ':getElementByKey] ';
      logger.debug(logPrefix, '-->');

      var elem = this.state.list.find(function (e) {
        return e.key == key;
      });
      logger.debug(logPrefix, 'key:', key, 'element:', elem);

      logger.debug(logPrefix, '<--');
      return elem;
    }
  }, {
    key: 'getLabelByKey',
    value: function getLabelByKey(key) {
      var logPrefix = ':getLabelByKey] ';
      logger.debug(logPrefix, '-->');

      var label = this.getElementByKey(key).label;

      logger.debug(logPrefix, '<--');
      return label;
    }
  }, {
    key: 'getValueByKey',
    value: function getValueByKey(key) {
      var logPrefix = ':getValueByKey] ';
      logger.debug(logPrefix, '-->');

      var value = this.getElementByKey(key).value;

      logger.debug(logPrefix, '<--');
      return value;
    }
  }, {
    key: 'setValueByKey',
    value: function setValueByKey(key, value) {
      var _this3 = this;

      var logPrefix = ':setValueByKey] ';
      logger.debug(logPrefix, '-->');
      logger.debug(logPrefix, 'key:', key, 'value:', value);

      this.setState({
        list: this.state.list.map(function (param) {
          if (param.key != key) {
            return param;
          }
          logger.debug(logPrefix, 'Element found:', param);

          if (param.hasOwnProperty('min') && +value < +param.min) {
            logger.debug(logPrefix, 'Prevent set a value less than minimum');
            return param;
          }

          if (param.hasOwnProperty('max') && +value > +param.max) {
            logger.debug(logPrefix, 'Prevent set a value greater than maximum');
            return param;
          }

          if (param.hasOwnProperty('lessThan')) {
            logger.debug(logPrefix, 'Property ' + param.key + ' must be less than ' + param.lessThan);
            var lessThanValue = _this3.getElementByKey(param.lessThan).value;

            if (value >= lessThanValue) {
              logger.debug(logPrefix, 'Property not respected ( ' + value + ' >= ' + lessThanValue + ' )');
              return param;
            } else {
              logger.debug(logPrefix, 'Property respected ( ' + value + ' < ' + lessThanValue + ' )');
            }
          }

          if (param.hasOwnProperty('greaterThan')) {
            logger.debug(logPrefix, 'Property ' + param.key + ' must be greater than ' + param.greaterThan);
            var greaterThanValue = _this3.getElementByKey(param.greaterThan).value;

            if (value <= greaterThanValue) {
              logger.debug(logPrefix, 'Property not respected ( ' + value + ' <= ' + greaterThanValue + ' )');
              return param;
            } else {
              logger.debug(logPrefix, 'Property respected ( ' + value + ' > ' + greaterThanValue + ' )');
            }
          }

          logger.debug('Element returned:', _extends({}, param, { value: value }));
          return _extends({}, param, { value: value });
        })
      });

      logger.debug(logPrefix, '<--');
      return this;
    }
  }, {
    key: 'isDynamic',
    value: function isDynamic(key) {
      var logPrefix = ':isDynamic] ';
      logger.debug(logPrefix, '-->');

      var _ref = [true, this.getElementByKey(key)],
          answer = _ref[0],
          param = _ref[1];


      if (param.hasOwnProperty('dynamic')) {
        answer = param.dynamic;
      }

      logger.debug(logPrefix, '<--');
      return answer;
    }
  }]);

  return CoreList;
}(Core);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.row = factory(global.Preact);
})(undefined, function (preact) {
  'use strict';

  var classCallCheck = function classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var objectWithoutProperties = function objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  var possibleConstructorReturn = function possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
  };

  var set = function set(object, property, value, receiver) {
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent !== null) {
        set(parent, property, value, receiver);
      }
    } else if ("value" in desc && desc.writable) {
      desc.value = value;
    } else {
      var setter = desc.set;

      if (setter !== undefined) {
        setter.call(receiver, value);
      }
    }

    return value;
  };

  /**
   * MUI Preact Row Module
   * @module preact/row
   */

  /**
   * @name Row
   */

  var Row = function (_Component) {
    inherits(Row, _Component);

    function Row() {
      classCallCheck(this, Row);
      return possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).apply(this, arguments));
    }

    createClass(Row, [{
      key: 'render',
      value: function render(_ref) {
        var children = _ref.children,
            props = objectWithoutProperties(_ref, ['children']);

        return preact.h('div', _extends({ 'class': 'mui-row' }, props), children);
      }
    }]);
    return Row;
  }(preact.Component);

  return Row;
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.col = factory(global.Preact);
})(undefined, function (preact) {
  'use strict';

  var classCallCheck = function classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var objectWithoutProperties = function objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  var possibleConstructorReturn = function possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
  };

  var set = function set(object, property, value, receiver) {
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent !== null) {
        set(parent, property, value, receiver);
      }
    } else if ("value" in desc && desc.writable) {
      desc.value = value;
    } else {
      var setter = desc.set;

      if (setter !== undefined) {
        setter.call(receiver, value);
      }
    }

    return value;
  };

  /**
   * MUI Preact Col Module
   * @module preact/col
   */
  /**
   * @name Col
   */

  var Col = function (_Component) {
    inherits(Col, _Component);

    function Col() {
      classCallCheck(this, Col);
      return possibleConstructorReturn(this, (Col.__proto__ || Object.getPrototypeOf(Col)).apply(this, arguments));
    }

    createClass(Col, [{
      key: 'render',
      value: function render(_ref) {
        var children = _ref.children,
            xs = _ref.xs,
            xsOffset = _ref.xsOffset,
            sm = _ref.sm,
            smOffset = _ref.smOffset,
            md = _ref.md,
            mdOffset = _ref.mdOffset,
            lg = _ref.lg,
            lgOffset = _ref.lgOffset,
            xl = _ref.xl,
            xlOffset = _ref.xlOffset,
            props = objectWithoutProperties(_ref, ['children', 'xs', 'xsOffset', 'sm', 'smOffset', 'md', 'mdOffset', 'lg', 'lgOffset', 'xl', 'xlOffset']);

        var colMdClass = md ? 'mui-col-md-' + md : '',
            colXsClass = xs ? 'mui-col-xs-' + xs : '',
            colSmClass = sm ? 'mui-col-sm-' + sm : '',
            colLgClass = lg ? 'mui-col-lg-' + lg : '',
            colXlClass = xl ? 'mui-col-xs-' + xl : '',
            xsOffsetClass = xsOffset ? 'mui-col-xs-offset-' + xsOffset : '',
            smOffsetClass = smOffset ? 'mui-col-sm-offset-' + smOffset : '',
            mdOffsetClass = mdOffset ? 'mui-col-md-offset-' + mdOffset : '',
            lgOffsetClass = lgOffset ? 'mui-col-lg-offset-' + lgOffset : '',
            xlOffsetClass = xlOffset ? 'mui-col-xl-offset-' + xlOffset : '',
            className = (colXsClass + ' ' + colSmClass + ' ' + colMdClass + ' ' + colLgClass + ' ' + colXlClass + ' ' + xsOffsetClass + ' ' + smOffsetClass + ' ' + mdOffsetClass + ' ' + lgOffsetClass + ' ' + xlOffsetClass).trim();

        return preact.h('div', _extends({ 'class': className }, props), children);
      }
    }]);
    return Col;
  }(preact.Component);

  return Col;
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.input = factory(global.Preact);
})(undefined, function (preact) {
  'use strict';

  var classCallCheck = function classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var objectWithoutProperties = function objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  var possibleConstructorReturn = function possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
  };

  var set = function set(object, property, value, receiver) {
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent !== null) {
        set(parent, property, value, receiver);
      }
    } else if ("value" in desc && desc.writable) {
      desc.value = value;
    } else {
      var setter = desc.set;

      if (setter !== undefined) {
        setter.call(receiver, value);
      }
    }

    return value;
  };

  /**
   * MUI Preact Input Module
   * @module preact/input
   */

  /**
   * @name Input
   */

  var Input = function (_Component) {
    inherits(Input, _Component);

    function Input() {
      classCallCheck(this, Input);
      return possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).apply(this, arguments));
    }

    createClass(Input, [{
      key: 'render',
      value: function render(_ref) {
        var style = _ref.style,
            hint = _ref.hint,
            label = _ref.label,
            _ref$type = _ref.type,
            type = _ref$type === undefined ? 'text' : _ref$type,
            required = _ref.required,
            defaultValue = _ref.defaultValue,
            floatingLabel = _ref.floatingLabel,
            props = objectWithoutProperties(_ref, ['style', 'hint', 'label', 'type', 'required', 'defaultValue', 'floatingLabel']);

        var floatingLabelClass = floatingLabel ? ' mui-textfield--float-label' : '';
        var className = ('mui-textfield ' + floatingLabelClass).trim();
        return preact.h('div', {
          'class': className,
          style: style ? style : null
        }, preact.h('input', _extends({
          type: type,
          placeholder: hint,
          value: defaultValue ? defaultValue : null,
          required: required ? required : null
        }, props)), label ? preact.h('label', null, label) : null);
      }
    }]);
    return Input;
  }(preact.Component);

  return Input;
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListItem = exports.List = undefined;

var _preact = __webpack_require__(0);

var List = exports.List = function List(props) {
  return (0, _preact.h)(
    "table",
    { className: "muiextra--list" },
    (0, _preact.h)(
      "tbody",
      null,
      props.children
    )
  );
};

var ListItem = exports.ListItem = function ListItem(props) {
  return (0, _preact.h)(
    "tr",
    { className: "muiextra--list-item" },
    (0, _preact.h)(
      "td",
      { className: "muiextra--list-item-title" },
      props.label
    ),
    (0, _preact.h)(
      "td",
      { className: "muiextra--list-item-value" },
      props.children
    )
  );
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;

var _createStore = __webpack_require__(14);

var _createStore2 = _interopRequireDefault(_createStore);

var _combineReducers = __webpack_require__(37);

var _combineReducers2 = _interopRequireDefault(_combineReducers);

var _bindActionCreators = __webpack_require__(38);

var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

var _applyMiddleware = __webpack_require__(39);

var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

var _compose = __webpack_require__(18);

var _compose2 = _interopRequireDefault(_compose);

var _warning = __webpack_require__(17);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if (false) {
  (0, _warning2.default)('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}

exports.createStore = _createStore2.default;
exports.combineReducers = _combineReducers2.default;
exports.bindActionCreators = _bindActionCreators2.default;
exports.applyMiddleware = _applyMiddleware2.default;
exports.compose = _compose2.default;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionTypes = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = createStore;

var _isPlainObject = __webpack_require__(15);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _symbolObservable = __webpack_require__(33);

var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = exports.ActionTypes = {
  INIT: '@@redux/INIT'

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
};function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!(0, _isPlainObject2.default)(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if ((typeof observer === 'undefined' ? 'undefined' : _typeof(observer)) !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[_symbolObservable2.default] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[_symbolObservable2.default] = observable, _ref2;
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _baseGetTag = __webpack_require__(25);

var _baseGetTag2 = _interopRequireDefault(_baseGetTag);

var _getPrototype = __webpack_require__(30);

var _getPrototype2 = _interopRequireDefault(_getPrototype);

var _isObjectLike = __webpack_require__(32);

var _isObjectLike2 = _interopRequireDefault(_isObjectLike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!(0, _isObjectLike2.default)(value) || (0, _baseGetTag2.default)(value) != objectTag) {
    return false;
  }
  var proto = (0, _getPrototype2.default)(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}

exports.default = isPlainObject;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _root = __webpack_require__(26);

var _root2 = _interopRequireDefault(_root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Built-in value references. */
var _Symbol = _root2.default.Symbol;

exports.default = _Symbol;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
* loglevel - https://github.com/pimterry/loglevel
*
* Copyright (c) 2013 Tim Perry
* Licensed under the MIT license.
*/
(function (root, definition) {
    "use strict";

    if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
        module.exports = definition();
    } else {
        root.log = definition();
    }
})(undefined, function () {
    "use strict";

    // Slightly dubious tricks to cut down minimized file size

    var noop = function noop() {};
    var undefinedType = "undefined";

    var logMethods = ["trace", "debug", "info", "warn", "error"];

    // Cross-browser bind equivalent that works at least back to IE6
    function bindMethod(obj, methodName) {
        var method = obj[methodName];
        if (typeof method.bind === 'function') {
            return method.bind(obj);
        } else {
            try {
                return Function.prototype.bind.call(method, obj);
            } catch (e) {
                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
                return function () {
                    return Function.prototype.apply.apply(method, [obj, arguments]);
                };
            }
        }
    }

    // Build the best logging method possible for this env
    // Wherever possible we want to bind, not wrap, to preserve stack traces
    function realMethod(methodName) {
        if (methodName === 'debug') {
            methodName = 'log';
        }

        if ((typeof console === 'undefined' ? 'undefined' : _typeof(console)) === undefinedType) {
            return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
        } else if (console[methodName] !== undefined) {
            return bindMethod(console, methodName);
        } else if (console.log !== undefined) {
            return bindMethod(console, 'log');
        } else {
            return noop;
        }
    }

    // These private functions always need `this` to be set properly

    function replaceLoggingMethods(level, loggerName) {
        /*jshint validthis:true */
        for (var i = 0; i < logMethods.length; i++) {
            var methodName = logMethods[i];
            this[methodName] = i < level ? noop : this.methodFactory(methodName, level, loggerName);
        }

        // Define log.log as an alias for log.debug
        this.log = this.debug;
    }

    // In old IE versions, the console isn't present until you first open it.
    // We build realMethod() replacements here that regenerate logging methods
    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
        return function () {
            if ((typeof console === 'undefined' ? 'undefined' : _typeof(console)) !== undefinedType) {
                replaceLoggingMethods.call(this, level, loggerName);
                this[methodName].apply(this, arguments);
            }
        };
    }

    // By default, we use closely bound real methods wherever possible, and
    // otherwise we wait for a console to appear, and then try again.
    function defaultMethodFactory(methodName, level, loggerName) {
        /*jshint validthis:true */
        return realMethod(methodName) || enableLoggingWhenConsoleArrives.apply(this, arguments);
    }

    function Logger(name, defaultLevel, factory) {
        var self = this;
        var currentLevel;
        var storageKey = "loglevel";
        if (name) {
            storageKey += ":" + name;
        }

        function persistLevelIfPossible(levelNum) {
            var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

            if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === undefinedType) return;

            // Use localStorage if available
            try {
                window.localStorage[storageKey] = levelName;
                return;
            } catch (ignore) {}

            // Use session cookie as fallback
            try {
                window.document.cookie = encodeURIComponent(storageKey) + "=" + levelName + ";";
            } catch (ignore) {}
        }

        function getPersistedLevel() {
            var storedLevel;

            if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === undefinedType) return;

            try {
                storedLevel = window.localStorage[storageKey];
            } catch (ignore) {}

            // Fallback to cookies if local storage gives us nothing
            if ((typeof storedLevel === 'undefined' ? 'undefined' : _typeof(storedLevel)) === undefinedType) {
                try {
                    var cookie = window.document.cookie;
                    var location = cookie.indexOf(encodeURIComponent(storageKey) + "=");
                    if (location !== -1) {
                        storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
                    }
                } catch (ignore) {}
            }

            // If the stored level is not valid, treat it as if nothing was stored.
            if (self.levels[storedLevel] === undefined) {
                storedLevel = undefined;
            }

            return storedLevel;
        }

        /*
         *
         * Public logger API - see https://github.com/pimterry/loglevel for details
         *
         */

        self.name = name;

        self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
            "ERROR": 4, "SILENT": 5 };

        self.methodFactory = factory || defaultMethodFactory;

        self.getLevel = function () {
            return currentLevel;
        };

        self.setLevel = function (level, persist) {
            if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
                level = self.levels[level.toUpperCase()];
            }
            if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
                currentLevel = level;
                if (persist !== false) {
                    // defaults to true
                    persistLevelIfPossible(level);
                }
                replaceLoggingMethods.call(self, level, name);
                if ((typeof console === 'undefined' ? 'undefined' : _typeof(console)) === undefinedType && level < self.levels.SILENT) {
                    return "No console available for logging";
                }
            } else {
                throw "log.setLevel() called with invalid level: " + level;
            }
        };

        self.setDefaultLevel = function (level) {
            if (!getPersistedLevel()) {
                self.setLevel(level, false);
            }
        };

        self.enableAll = function (persist) {
            self.setLevel(self.levels.TRACE, persist);
        };

        self.disableAll = function (persist) {
            self.setLevel(self.levels.SILENT, persist);
        };

        // Initialize with the right level
        var initialLevel = getPersistedLevel();
        if (initialLevel == null) {
            initialLevel = defaultLevel == null ? "WARN" : defaultLevel;
        }
        self.setLevel(initialLevel, false);
    }

    /*
     *
     * Top-level API
     *
     */

    var defaultLogger = new Logger();

    var _loggersByName = {};
    defaultLogger.getLogger = function getLogger(name) {
        if (typeof name !== "string" || name === "") {
            throw new TypeError("You must supply a name when creating a logger.");
        }

        var logger = _loggersByName[name];
        if (!logger) {
            logger = _loggersByName[name] = new Logger(name, defaultLogger.getLevel(), defaultLogger.methodFactory);
        }
        return logger;
    };

    // Grab the current global log variable in case of overwrite
    var _log = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== undefinedType ? window.log : undefined;
    defaultLogger.noConflict = function () {
        if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== undefinedType && window.log === defaultLogger) {
            window.log = _log;
        }

        return defaultLogger;
    };

    defaultLogger.getLoggers = function getLoggers() {
        return _loggersByName;
    };

    return defaultLogger;
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.prefix = factory(root);
  }
})(undefined, function (root) {
  'use strict';

  var merge = function merge(target) {
    var i = 1;
    var length = arguments.length;
    var key;
    for (; i < length; i++) {
      for (key in arguments[i]) {
        if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
          target[key] = arguments[i][key];
        }
      }
    }
    return target;
  };

  var defaults = {
    template: '[%t] %l:',
    timestampFormatter: function timestampFormatter(date) {
      return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
    },
    levelFormatter: function levelFormatter(level) {
      return level.toUpperCase();
    },
    nameFormatter: function nameFormatter(name) {
      return name || 'root';
    }
  };

  var loglevel;
  var originalFactory;
  var pluginFactory;

  var apply = function apply(logger, options) {
    if (!logger || !logger.getLogger) {
      throw new TypeError('Argument is not a root loglevel object');
    }

    if (loglevel && pluginFactory !== logger.methodFactory) {
      throw new Error("You can't reassign a plugin after appling another plugin");
    }

    loglevel = logger;

    options = merge({}, defaults, options);

    originalFactory = originalFactory || logger.methodFactory;

    pluginFactory = function methodFactory(methodName, logLevel, loggerName) {
      var rawMethod = originalFactory(methodName, logLevel, loggerName);

      var hasTimestamp = options.template.indexOf('%t') !== -1;
      var hasLevel = options.template.indexOf('%l') !== -1;
      var hasName = options.template.indexOf('%n') !== -1;

      return function () {
        var content = options.template;

        var length = arguments.length;
        var args = Array(length);
        var key = 0;
        for (; key < length; key++) {
          args[key] = arguments[key];
        }

        if (hasTimestamp) content = content.replace(/%t/, options.timestampFormatter(new Date()));
        if (hasLevel) content = content.replace(/%l/, options.levelFormatter(methodName));
        if (hasName) content = content.replace(/%n/, options.nameFormatter(loggerName));

        if (args.length && typeof args[0] === 'string') {
          // concat prefix with first argument to support string substitutions
          args[0] = '' + content + ' ' + args[0];
        } else {
          args.unshift(content);
        }

        rawMethod.apply(undefined, args);
      };
    };

    logger.methodFactory = pluginFactory;
    logger.setLevel(logger.getLevel());
    return logger;
  };

  var disable = function disable() {
    if (!loglevel) {
      throw new Error("You can't disable a not appled plugin");
    }

    if (pluginFactory !== loglevel.methodFactory) {
      throw new Error("You can't disable a plugin after appling another plugin");
    }

    loglevel.methodFactory = originalFactory;
    loglevel.setLevel(loglevel.getLevel());
    originalFactory = undefined;
    loglevel = undefined;
  };

  var api = {
    apply: apply,
    disable: disable
  };

  var save;
  if (root) {
    save = root.prefix;
    api.noConflict = function () {
      if (root.prefix === api) {
        root.prefix = save;
      }
      return api;
    };
  }

  return api;
});

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var f2 = function f2(n) {
  return (n + '').length < 2 ? '0' + n : (n + '').length > 2 ? (n + '').substr(-2) : n;
};
var f3 = function f3(n) {
  return (n + '').length < 2 ? '00' + n : (n + '').length < 3 ? '0' + n : n;
};

var prefixTemplate = {
  template: '[%t] [%l] [%n',
  timestampFormatter: function timestampFormatter(date) {
    return f2(date.getDate()) + '/' + f2(date.getMonth() + 1) + '/' + f2(date.getFullYear()) + ' ' + f2(date.getHours()) + ':' + f2(date.getMinutes()) + ':' + f2(date.getSeconds()) + ':' + f3(date.getMilliseconds());
  }
};

exports.default = prefixTemplate;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [{
  key: 'cold',
  label: 'Cold Resistance',
  unit: '°C',
  min: '-273',
  defaultValue: '-25',
  lessThan: 'heat',
  value: -25,
  fitness: 0,
  color: '#E0E0E0',
  generateFitness: 'fitnessCold',
  isFatal: 'isFatalCold'
}, {
  key: 'heat',
  label: 'Heat Resistance',
  unit: '°C',
  min: '-273',
  defaultValue: '45',
  greaterThan: 'cold',
  value: 45,
  fitness: 0,
  color: '#ED6A5A',
  generateFitness: 'fitnessHeat',
  isFatal: 'isFatalHeat'
}, {
  key: 'water',
  label: 'Water Resistance',
  unit: 'm',
  min: '0',
  defaultValue: '8',
  value: 8,
  fitness: 0,
  color: '#9BC1BC',
  generateFitness: 'fitnessWater',
  isFatal: 'isFatalWater'
}, {
  key: 'wind',
  label: 'Wind Resistance',
  unit: 'km/h',
  min: '0',
  defaultValue: '90',
  value: 90,
  fitness: 0,
  color: '#8A84E2',
  generateFitness: 'fitnessWind',
  isFatal: 'isFatalWind'
}];

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

var _loglevelCustom = __webpack_require__(1);

var _loglevelCustom2 = _interopRequireDefault(_loglevelCustom);

var _decko = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var logger = _loglevelCustom2.default.getLogger('damageEvaluate');

var DamageEvaluate = (_class = function () {
  function DamageEvaluate() {
    _classCallCheck(this, DamageEvaluate);
  }

  _createClass(DamageEvaluate, null, [{
    key: 'damageWind',
    value: function damageWind(value) {
      var logPrefix = ':damageWind] ';
      logger.info(logPrefix, '-->');

      logger.info(logPrefix, '<--');
      return {
        wind: value
      };
    }
  }, {
    key: 'damageRain',
    value: function damageRain(value) {
      var logPrefix = ':damageRain] ';
      logger.info(logPrefix, '-->');

      logger.info(logPrefix, '<--');
      return {
        water: value * 0.24,
        wind: value * 2.2
      };
    }
  }, {
    key: 'damageFire',
    value: function damageFire(value) {
      var logPrefix = ':damageFire] ';
      logger.info(logPrefix, '-->');

      logger.info(logPrefix, '<--');
      return {
        heat: value,
        cold: value
      };
    }
  }, {
    key: 'damageSnow',
    value: function damageSnow(value) {
      var logPrefix = ':damageSnow] ';
      logger.info(logPrefix, '-->');

      logger.info(logPrefix, '<--');
      return {
        cold: 1 / 24 * value,
        heat: 1 / 24 * value
      };
    }
  }, {
    key: 'damageWave',
    value: function damageWave(value) {
      var logPrefix = ':damageWave] ';
      logger.info(logPrefix, '-->');

      logger.info(logPrefix, '<--');
      return {
        water: value
      };
    }
  }, {
    key: 'damageSandstorm',
    value: function damageSandstorm(value) {
      var logPrefix = ':damageSandstorm] ';
      logger.info(logPrefix, '-->');

      logger.info(logPrefix, '<--');
      return {
        wind: value / 5,
        heat: value / 10,
        cold: value / 10
      };
    }
  }, {
    key: 'isFatalCold',
    value: function isFatalCold(resistance, value) {
      var logPrefix = ':isFatalCold] ';
      logger.debug(logPrefix, '-->');

      logger.debug(logPrefix, '<--');
      return value <= resistance;
    }
  }, {
    key: 'isFatalHeat',
    value: function isFatalHeat(resistance, value) {
      var logPrefix = ':isFatalHeat ] ';
      logger.debug(logPrefix, '-->');

      logger.debug(logPrefix, '<--');
      return value >= resistance;
    }
  }, {
    key: 'isFatalWind',
    value: function isFatalWind(resistance, value) {
      var logPrefix = ':isFatalWind ] ';
      logger.debug(logPrefix, '-->');

      logger.debug(logPrefix, '<--');
      return value >= resistance;
    }
  }, {
    key: 'isFatalWater',
    value: function isFatalWater(resistance, value) {
      var logPrefix = ':isFatalWater ] ';
      logger.debug(logPrefix, '-->');

      logger.debug(logPrefix, '<--');
      return value >= resistance;
    }
  }]);

  return DamageEvaluate;
}(), (_applyDecoratedDescriptor(_class, 'damageWind', [_decko.memoize], Object.getOwnPropertyDescriptor(_class, 'damageWind'), _class), _applyDecoratedDescriptor(_class, 'damageRain', [_decko.memoize], Object.getOwnPropertyDescriptor(_class, 'damageRain'), _class), _applyDecoratedDescriptor(_class, 'damageFire', [_decko.memoize], Object.getOwnPropertyDescriptor(_class, 'damageFire'), _class), _applyDecoratedDescriptor(_class, 'damageSnow', [_decko.memoize], Object.getOwnPropertyDescriptor(_class, 'damageSnow'), _class), _applyDecoratedDescriptor(_class, 'damageWave', [_decko.memoize], Object.getOwnPropertyDescriptor(_class, 'damageWave'), _class), _applyDecoratedDescriptor(_class, 'damageSandstorm', [_decko.memoize], Object.getOwnPropertyDescriptor(_class, 'damageSandstorm'), _class)), _class);
exports.default = DamageEvaluate;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(3);

var _Layout = __webpack_require__(40);

var _Layout2 = _interopRequireDefault(_Layout);

var _store = __webpack_require__(58);

var _store2 = _interopRequireDefault(_store);

var _loglevel = __webpack_require__(19);

var _loglevel2 = _interopRequireDefault(_loglevel);

var _loglevelPluginPrefix = __webpack_require__(20);

var _loglevelPluginPrefix2 = _interopRequireDefault(_loglevelPluginPrefix);

var _loglevelPrefixTemplate = __webpack_require__(21);

var _loglevelPrefixTemplate2 = _interopRequireDefault(_loglevelPrefixTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('Log level:', 'debug' || 'info');

_loglevelPluginPrefix2.default.apply(_loglevel2.default, _loglevelPrefixTemplate2.default);
(0, _loglevel.setLevel)('debug' || 'info');

window.addEventListener('load', function () {
  var logPrefix = ':loadEvent] ';
  _loglevel2.default.info(logPrefix, '-->');

  (0, _preact.render)((0, _preact.h)(
    _preactRedux.Provider,
    { store: _store2.default },
    (0, _preact.h)(_Layout2.default, null)
  ), document.getElementById('container'));

  _loglevel2.default.info(logPrefix, '<--');
});

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Symbol2 = __webpack_require__(16);

var _Symbol3 = _interopRequireDefault(_Symbol2);

var _getRawTag = __webpack_require__(28);

var _getRawTag2 = _interopRequireDefault(_getRawTag);

var _objectToString = __webpack_require__(29);

var _objectToString2 = _interopRequireDefault(_objectToString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol3.default ? _Symbol3.default.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? (0, _getRawTag2.default)(value) : (0, _objectToString2.default)(value);
}

exports.default = baseGetTag;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _freeGlobal = __webpack_require__(27);

var _freeGlobal2 = _interopRequireDefault(_freeGlobal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal2.default || freeSelf || Function('return this')();

exports.default = root;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

exports.default = freeGlobal;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Symbol2 = __webpack_require__(16);

var _Symbol3 = _interopRequireDefault(_Symbol2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol3.default ? _Symbol3.default.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

exports.default = getRawTag;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

exports.default = objectToString;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _overArg = __webpack_require__(31);

var _overArg2 = _interopRequireDefault(_overArg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Built-in value references. */
var getPrototype = (0, _overArg2.default)(Object.getPrototypeOf, Object);

exports.default = getPrototype;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

exports.default = overArg;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

exports.default = isObjectLike;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(34);

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = __webpack_require__(36);

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var root; /* global window */

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8), __webpack_require__(35)(module)))

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = combineReducers;

var _createStore = __webpack_require__(14);

var _isPlainObject = __webpack_require__(15);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _warning = __webpack_require__(17);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!(0, _isPlainObject2.default)(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (false) {
      if (typeof reducers[key] === 'undefined') {
        (0, _warning2.default)('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var unexpectedKeyCache = void 0;
  if (false) {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError = void 0;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (false) {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        (0, _warning2.default)(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = bindActionCreators;
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if ((typeof actionCreators === 'undefined' ? 'undefined' : _typeof(actionCreators)) !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators === 'undefined' ? 'undefined' : _typeof(actionCreators)) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = applyMiddleware;

var _compose = __webpack_require__(18);

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = _compose2.default.apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _EvoComponent2 = __webpack_require__(4);

var _EvoComponent3 = _interopRequireDefault(_EvoComponent2);

var _container = __webpack_require__(41);

var _container2 = _interopRequireDefault(_container);

var _row = __webpack_require__(9);

var _row2 = _interopRequireDefault(_row);

var _col = __webpack_require__(10);

var _col2 = _interopRequireDefault(_col);

var _panel = __webpack_require__(42);

var _panel2 = _interopRequireDefault(_panel);

var _panel3 = __webpack_require__(43);

var _tab = __webpack_require__(44);

var _Events = __webpack_require__(45);

var _Events2 = _interopRequireDefault(_Events);

var _GeneralInfo = __webpack_require__(51);

var _GeneralInfo2 = _interopRequireDefault(_GeneralInfo);

var _WorldMap = __webpack_require__(53);

var _WorldMap2 = _interopRequireDefault(_WorldMap);

var _Parameters = __webpack_require__(54);

var _Parameters2 = _interopRequireDefault(_Parameters);

var _Skills = __webpack_require__(55);

var _Skills2 = _interopRequireDefault(_Skills);

var _Controller = __webpack_require__(56);

var _Controller2 = _interopRequireDefault(_Controller);

var _loglevelCustom = __webpack_require__(1);

var _loglevelCustom2 = _interopRequireDefault(_loglevelCustom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var logger = _loglevelCustom2.default.getLogger('Layout');

var Layout = function (_EvoComponent) {
  _inherits(Layout, _EvoComponent);

  function Layout(props) {
    _classCallCheck(this, Layout);

    return _possibleConstructorReturn(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).call(this, props));
  }

  _createClass(Layout, [{
    key: 'render',
    value: function render() {
      var logPrefix = ':render] ';
      logger.info(logPrefix, '-->');

      var stage = (0, _preact.h)(
        'div',
        null,
        (0, _preact.h)(
          _container2.default,
          { fluid: true },
          (0, _preact.h)(
            _row2.default,
            null,
            (0, _preact.h)(
              _col2.default,
              { md: '3' },
              (0, _preact.h)(_Controller2.default, null),
              (0, _preact.h)(
                _panel2.default,
                null,
                (0, _preact.h)(_panel3.PanelHeader, { label: 'Event' }),
                (0, _preact.h)(_Events2.default, null)
              ),
              (0, _preact.h)(
                _panel2.default,
                null,
                (0, _preact.h)(_panel3.PanelHeader, { label: 'General Info' }),
                (0, _preact.h)(_GeneralInfo2.default, null)
              )
            ),
            (0, _preact.h)(
              _col2.default,
              { md: '6' },
              (0, _preact.h)(
                _panel2.default,
                null,
                (0, _preact.h)(_panel3.PanelHeader, { label: 'World Map' }),
                (0, _preact.h)(_WorldMap2.default, null)
              )
            ),
            (0, _preact.h)(
              _col2.default,
              { md: '3' },
              (0, _preact.h)(
                _panel2.default,
                null,
                (0, _preact.h)(
                  _tab.Tabs,
                  null,
                  (0, _preact.h)(
                    _tab.Tab,
                    { selected: true, label: 'Parameters' },
                    (0, _preact.h)(_Parameters2.default, null)
                  ),
                  (0, _preact.h)(
                    _tab.Tab,
                    { label: 'Skills' },
                    (0, _preact.h)(_Skills2.default, null)
                  )
                )
              )
            )
          )
        )
      );

      logger.info(logPrefix, '<--');
      return stage;
    }
  }]);

  return Layout;
}(_EvoComponent3.default);

exports.default = Layout;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.container = factory(global.Preact);
})(undefined, function (preact) {
  'use strict';

  var classCallCheck = function classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var objectWithoutProperties = function objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  var possibleConstructorReturn = function possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
  };

  var set = function set(object, property, value, receiver) {
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent !== null) {
        set(parent, property, value, receiver);
      }
    } else if ("value" in desc && desc.writable) {
      desc.value = value;
    } else {
      var setter = desc.set;

      if (setter !== undefined) {
        setter.call(receiver, value);
      }
    }

    return value;
  };

  /**
   * MUI Preact Container Module
   * @module preact/container
   */

  /**
   * @name Container
   */

  var Container = function (_Component) {
    inherits(Container, _Component);

    function Container() {
      classCallCheck(this, Container);
      return possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).apply(this, arguments));
    }

    createClass(Container, [{
      key: 'render',
      value: function render(_ref) {
        var fluid = _ref.fluid,
            children = _ref.children,
            props = objectWithoutProperties(_ref, ['fluid', 'children']);

        return preact.h('div', _extends({
          'class': fluid ? 'mui-container-fluid' : 'mui-container'
        }, props), children);
      }
    }]);
    return Container;
  }(preact.Component);

  return Container;
});

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.panel = factory(global.Preact);
})(undefined, function (preact) {
  'use strict';

  var classCallCheck = function classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var objectWithoutProperties = function objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  var possibleConstructorReturn = function possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
  };

  var set = function set(object, property, value, receiver) {
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent !== null) {
        set(parent, property, value, receiver);
      }
    } else if ("value" in desc && desc.writable) {
      desc.value = value;
    } else {
      var setter = desc.set;

      if (setter !== undefined) {
        setter.call(receiver, value);
      }
    }

    return value;
  };

  /**
   * MUI Preact Panel Module
   * @module preact/panel
   */

  /**
   * @name Panel
   */

  var Panel = function (_Component) {
    inherits(Panel, _Component);

    function Panel() {
      classCallCheck(this, Panel);
      return possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).apply(this, arguments));
    }

    createClass(Panel, [{
      key: 'render',
      value: function render(_ref) {
        var children = _ref.children,
            props = objectWithoutProperties(_ref, ['children']);

        return preact.h('div', _extends({ 'class': 'mui-panel' }, props), children);
      }
    }]);
    return Panel;
  }(preact.Component);

  return Panel;
});

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelHeader = undefined;

var _preact = __webpack_require__(0);

var PanelHeader = function PanelHeader(props) {
  return (0, _preact.h)(
    "div",
    { className: "muiextra--panel-header" },
    props.label
  );
};

exports.PanelHeader = PanelHeader;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tab = exports.Tabs = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tabs = function (_Component) {
  _inherits(Tabs, _Component);

  function Tabs(props) {
    _classCallCheck(this, Tabs);

    var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));

    var selected = 0;
    for (var id in props.children) {
      if (props.children[id].attributes.selected) {
        selected = id;
        break;
      }
    }

    _this.state = {
      selected: selected
    };
    return _this;
  }

  _createClass(Tabs, [{
    key: 'changeTab',
    value: function changeTab(e, selected) {
      e.preventDefault();

      this.setState({ selected: selected });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return (0, _preact.h)(
        'div',
        { className: 'muiextra--tabs' },
        (0, _preact.h)(
          'ul',
          null,
          this.props.children.map(function (children, idx) {
            return (0, _preact.h)(
              'li',
              { key: idx, className: _this2.state.selected == idx ? 'selected' : '' },
              (0, _preact.h)(
                'a',
                { href: '#', onClick: function onClick(e) {
                    return _this2.changeTab(e, idx);
                  } },
                children.attributes.label
              )
            );
          })
        ),
        (0, _preact.h)(
          'div',
          null,
          this.props.children[this.state.selected]
        )
      );
    }
  }]);

  return Tabs;
}(_preact.Component);

var Tab = function Tab(props) {
  return (0, _preact.h)(
    'div',
    null,
    props.children
  );
};

exports.Tabs = Tabs;
exports.Tab = Tab;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

var _preact = __webpack_require__(0);

var _preactRedux = __webpack_require__(3);

var _EvoComponent2 = __webpack_require__(4);

var _EvoComponent3 = _interopRequireDefault(_EvoComponent2);

var _form = __webpack_require__(46);

var _form2 = _interopRequireDefault(_form);

var _select = __webpack_require__(47);

var _select2 = _interopRequireDefault(_select);

var _option = __webpack_require__(48);

var _option2 = _interopRequireDefault(_option);

var _input = __webpack_require__(11);

var _input2 = _interopRequireDefault(_input);

var _button = __webpack_require__(49);

var _button2 = _interopRequireDefault(_button);

var _decko = __webpack_require__(5);

var _badges = __webpack_require__(50);

var _list = __webpack_require__(12);

var _State = __webpack_require__(2);

var _State2 = _interopRequireDefault(_State);

var _loglevelCustom = __webpack_require__(1);

var _loglevelCustom2 = _interopRequireDefault(_loglevelCustom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var logger = _loglevelCustom2.default.getLogger('Events');

var EventStatus = function EventStatus(props) {
  return (0, _preact.h)(
    _list.List,
    null,
    (0, _preact.h)(
      _list.ListItem,
      { label: 'Day Passed' },
      props.status.passed
    ),
    Object.keys(props.status.damages).map(function (key) {
      return (0, _preact.h)(
        _list.ListItem,
        { label: 'Damage ' + key },
        props.status.damages[key]
      );
    })
  );
};

var Events = (_class = function (_EvoComponent) {
  _inherits(Events, _EvoComponent);

  function Events(props) {
    _classCallCheck(this, Events);

    return _possibleConstructorReturn(this, (Events.__proto__ || Object.getPrototypeOf(Events)).call(this, props));
  }

  _createClass(Events, [{
    key: 'changeEvent',
    value: function changeEvent(e) {
      this.props.dispatch({
        type: 'EVENT_SET',
        data: e.target.value
      });
    }
  }, {
    key: 'sendEvent',
    value: function sendEvent(e) {
      e.preventDefault();

      this.props.dispatch({
        type: 'EVENT_SEND',
        data: null
      });
    }
  }, {
    key: 'changeValue',
    value: function changeValue(e) {
      e.preventDefault();

      this.props.dispatch({
        type: 'EVENT_SET_VALUE',
        data: +e.target.value
      });
    }
  }, {
    key: 'changeTime',
    value: function changeTime(e) {
      e.preventDefault();

      this.props.dispatch({
        type: 'EVENT_SET_TIME',
        data: +e.target.value
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var logPrefix = ':render] ';
      logger.info(logPrefix, '-->');

      logger.debug(logPrefix, 'Get label for current event\'s value');
      var label = this.props.managers.events.getValueLabel(this.props.events.current.key, this.props.events.current.value);
      logger.debug(logPrefix, 'Label retrieved:', label);

      var stage = (0, _preact.h)(
        _form2.default,
        null,
        (0, _preact.h)(_badges.Badges, { label: 'Affect', badges: this.props.events.current.affect }),
        (0, _preact.h)(
          _select2.default,
          { name: 'evogame-event', label: 'Event Type', defaultValue: this.props.events.current.key, onChange: this.changeEvent },
          this.props.events.list.map(function (event) {
            return (0, _preact.h)(_option2.default, { value: event.key, label: event.label });
          })
        ),
        (0, _preact.h)(_input2.default, { type: 'number', floatingLabel: true,
          label: this.props.events.current.label + ' [ ' + this.props.events.current.unit + ' ]',
          min: this.props.events.current.min || null,
          max: this.props.events.current.max || null,
          value: this.props.events.current.value,
          onChange: this.changeValue }),
        (0, _preact.h)(
          'label',
          { className: 'evogame--event-label mui--text-caption' },
          label
        ),
        (0, _preact.h)(_input2.default, { type: 'number', floatingLabel: true,
          label: this.props.config.label.time + ' [ ' + this.props.config.unit.time + ' ]',
          min: 0, value: this.props.events.current.dispatchTime,
          onChange: this.changeTime }),
        this.props.events.status.sended ? (0, _preact.h)(EventStatus, { status: this.props.events.status }) : null,
        (0, _preact.h)(
          _button2.default,
          { color: 'primary', style: { width: '100%' }, raised: true,
            disabled: this.props.globals.status != 'play' || this.props.events.status.sended,
            onClick: this.sendEvent },
          'Send Event'
        )
      );

      logger.info(logPrefix, '<--');
      return stage;
    }
  }]);

  return Events;
}(_EvoComponent3.default), (_applyDecoratedDescriptor(_class.prototype, 'changeEvent', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'changeEvent'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'sendEvent', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'sendEvent'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'changeValue', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'changeValue'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'changeTime', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'changeTime'), _class.prototype)), _class);
exports.default = (0, _preactRedux.connect)(function (state) {
  return new _State2.default(state).ignore(['skills', 'parameters', 'solutions']).ignoreGlobals(['day', 'generation', 'timers']).state;
})(Events);

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.form = factory(global.Preact);
})(undefined, function (preact) {
  'use strict';

  var classCallCheck = function classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var objectWithoutProperties = function objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  var possibleConstructorReturn = function possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
  };

  var set = function set(object, property, value, receiver) {
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent !== null) {
        set(parent, property, value, receiver);
      }
    } else if ("value" in desc && desc.writable) {
      desc.value = value;
    } else {
      var setter = desc.set;

      if (setter !== undefined) {
        setter.call(receiver, value);
      }
    }

    return value;
  };

  /**
   * MUI Preact Form module
   * @module preact/form
   */

  /**
   * @name Form
   */

  var Form = function (_Component) {
    inherits(Form, _Component);

    function Form() {
      classCallCheck(this, Form);
      return possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).apply(this, arguments));
    }

    createClass(Form, [{
      key: 'render',
      value: function render(_ref) {
        var legend = _ref.legend,
            children = _ref.children,
            inline = _ref.inline,
            props = objectWithoutProperties(_ref, ['legend', 'children', 'inline']);

        return preact.h('form', _extends({
          'class': inline ? 'mui-form--inline' : null
        }, props), legend ? preact.h('legend', null, legend) : null, children);
      }
    }]);
    return Form;
  }(preact.Component);

  return Form;
});

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.select = factory(global.Preact);
})(undefined, function (preact) {
  'use strict';

  var classCallCheck = function classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var objectWithoutProperties = function objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  var possibleConstructorReturn = function possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
  };

  var set = function set(object, property, value, receiver) {
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent !== null) {
        set(parent, property, value, receiver);
      }
    } else if ("value" in desc && desc.writable) {
      desc.value = value;
    } else {
      var setter = desc.set;

      if (setter !== undefined) {
        setter.call(receiver, value);
      }
    }

    return value;
  };

  /**
   * MUI Preact Select Module
   * @module preact/select
   */

  /**
   * @name Select
   */

  var Select = function (_Component) {
    inherits(Select, _Component);

    function Select() {
      classCallCheck(this, Select);
      return possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).apply(this, arguments));
    }

    createClass(Select, [{
      key: 'render',
      value: function render(_ref) {
        var style = _ref.style,
            children = _ref.children,
            label = _ref.label,
            _ref$defaultValue = _ref.defaultValue,
            defaultValue = _ref$defaultValue === undefined ? false : _ref$defaultValue,
            _ref$disabled = _ref.disabled,
            disabled = _ref$disabled === undefined ? false : _ref$disabled,
            props = objectWithoutProperties(_ref, ['style', 'children', 'label', 'defaultValue', 'disabled']);

        return preact.h('div', { 'class': 'mui-select', style: style }, preact.h('select', _extends({}, props, { disabled: disabled, value: defaultValue }), label ? preact.h('label', null, label) : null, children));
      }
    }]);
    return Select;
  }(preact.Component);

  return Select;
});

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.option = factory(global.Preact);
})(undefined, function (preact) {
  'use strict';

  var classCallCheck = function classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var objectWithoutProperties = function objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  var possibleConstructorReturn = function possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
  };

  var set = function set(object, property, value, receiver) {
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent !== null) {
        set(parent, property, value, receiver);
      }
    } else if ("value" in desc && desc.writable) {
      desc.value = value;
    } else {
      var setter = desc.set;

      if (setter !== undefined) {
        setter.call(receiver, value);
      }
    }

    return value;
  };

  /**
   * MUI Preact Option Module
   * @module preact/option
   */

  /**
   * @name Option
   */

  var Option = function (_Component) {
    inherits(Option, _Component);

    function Option() {
      classCallCheck(this, Option);
      return possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).apply(this, arguments));
    }

    createClass(Option, [{
      key: 'render',
      value: function render(_ref) {
        var label = _ref.label,
            value = _ref.value,
            props = objectWithoutProperties(_ref, ['label', 'value']);

        return preact.h('option', _extends({}, props, { value: value }), label);
      }
    }]);
    return Option;
  }(preact.Component);

  return Option;
});

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory(__webpack_require__(0)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.button = factory(global.Preact);
})(undefined, function (preact) {
  'use strict';

  var classCallCheck = function classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var objectWithoutProperties = function objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  var possibleConstructorReturn = function possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
  };

  var set = function set(object, property, value, receiver) {
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent !== null) {
        set(parent, property, value, receiver);
      }
    } else if ("value" in desc && desc.writable) {
      desc.value = value;
    } else {
      var setter = desc.set;

      if (setter !== undefined) {
        setter.call(receiver, value);
      }
    }

    return value;
  };

  /**
   * MUI Preact Button Module
   * @module preact/button
   */
  /**
   * @name Button
   */

  var Button = function (_Component) {
    inherits(Button, _Component);

    function Button() {
      classCallCheck(this, Button);
      return possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
    }

    createClass(Button, [{
      key: 'render',
      value: function render(_ref) {
        var color = _ref.color,
            variant = _ref.variant,
            children = _ref.children,
            disabled = _ref.disabled,
            size = _ref.size,
            props = objectWithoutProperties(_ref, ['color', 'variant', 'children', 'disabled', 'size']);

        var variantClass = variant ? 'mui-btn--' + variant : '',
            colorClass = color ? 'mui-btn--' + color : '',
            sizeClass = size ? 'mui-btn--' + size : '',
            className = ('mui-btn ' + variantClass + ' ' + colorClass + ' ' + sizeClass).trim();
        return preact.h('button', _extends({
          'class': className,
          disabled: disabled ? 'disabled' : ''
        }, props), children);
      }
    }]);
    return Button;
  }(preact.Component);

  return Button;
});

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Badges = undefined;

var _preact = __webpack_require__(0);

var Badges = function Badges(props) {
  var badgeLabel = null;

  if (props.hasOwnProperty('label')) {
    badgeLabel = (0, _preact.h)(
      'span',
      null,
      props.label
    );
  }

  return (0, _preact.h)(
    'div',
    { className: 'muiextra--badges' },
    badgeLabel,
    (0, _preact.h)(
      'ul',
      null,
      props.badges.map(function (badge) {
        return (0, _preact.h)(
          'li',
          { style: { backgroundColor: badge.color } },
          badge.label
        );
      })
    )
  );
};

exports.Badges = Badges;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

var _preact = __webpack_require__(0);

var _EvoComponent2 = __webpack_require__(4);

var _EvoComponent3 = _interopRequireDefault(_EvoComponent2);

var _State = __webpack_require__(2);

var _State2 = _interopRequireDefault(_State);

var _preactRedux = __webpack_require__(3);

var _list = __webpack_require__(12);

var _Solution = __webpack_require__(52);

var _Solution2 = _interopRequireDefault(_Solution);

var _decko = __webpack_require__(5);

var _loglevelCustom = __webpack_require__(1);

var _loglevelCustom2 = _interopRequireDefault(_loglevelCustom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var logger = _loglevelCustom2.default.getLogger('GeneralInfo');

var GeneralInfo = (_class = function (_EvoComponent) {
  _inherits(GeneralInfo, _EvoComponent);

  function GeneralInfo(props) {
    _classCallCheck(this, GeneralInfo);

    return _possibleConstructorReturn(this, (GeneralInfo.__proto__ || Object.getPrototypeOf(GeneralInfo)).call(this, props));
  }

  _createClass(GeneralInfo, [{
    key: 'labelCb',
    value: function labelCb(key) {
      return this.props.managers.skills.getLabelByKey(key);
    }
  }, {
    key: 'render',
    value: function render() {
      var logPrefix = ':render] ';
      logger.info(logPrefix, '-->');

      var bestSolution = this.props.managers.solutions.getBestSolution();

      var stage = (0, _preact.h)(
        'div',
        null,
        (0, _preact.h)(
          _list.List,
          null,
          (0, _preact.h)(
            _list.ListItem,
            { label: 'Generation' },
            this.props.globals.generation
          ),
          (0, _preact.h)(
            _list.ListItem,
            { label: 'Day' },
            this.props.globals.day
          ),
          (0, _preact.h)(
            _list.ListItem,
            { label: 'Current Solutions' },
            this.props.solutions.list.length
          ),
          (0, _preact.h)(
            _list.ListItem,
            { label: 'Dead Solutions' },
            this.props.solutions.dead
          )
        ),
        bestSolution ? (0, _preact.h)(
          'div',
          null,
          (0, _preact.h)(
            'h2',
            null,
            'Best Solution ( Fitness: ',
            bestSolution.fitness.toFixed(3),
            ' )'
          ),
          (0, _preact.h)(_Solution2.default, { solution: bestSolution, labelCb: this.labelCb })
        ) : null
      );

      logger.info(logPrefix, '<--');
      return stage;
    }
  }]);

  return GeneralInfo;
}(_EvoComponent3.default), (_applyDecoratedDescriptor(_class.prototype, 'labelCb', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'labelCb'), _class.prototype)), _class);
exports.default = (0, _preactRedux.connect)(function (state) {
  return new _State2.default(state).ignore(['events', 'parameters', 'skills']).ignoreGlobals(['timers', 'status']).state;
})(GeneralInfo);

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = __webpack_require__(0);

var _list = __webpack_require__(12);

var Solution = function Solution(props) {
  return (0, _preact.h)(
    'div',
    { className: 'evogame--solution' },
    (0, _preact.h)('div', { style: { background: props.solution.color } }),
    (0, _preact.h)(
      'div',
      null,
      (0, _preact.h)(
        _list.List,
        null,
        props.solution.skills.map(function (skill) {
          return (0, _preact.h)(
            _list.ListItem,
            { label: props.labelCb(skill.key) },
            skill.value
          );
        })
      )
    )
  );
};

exports.default = Solution;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = __webpack_require__(0);

var _EvoComponent2 = __webpack_require__(4);

var _EvoComponent3 = _interopRequireDefault(_EvoComponent2);

var _State = __webpack_require__(2);

var _State2 = _interopRequireDefault(_State);

var _preactRedux = __webpack_require__(3);

var _loglevelCustom = __webpack_require__(1);

var _loglevelCustom2 = _interopRequireDefault(_loglevelCustom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var logger = _loglevelCustom2.default.getLogger('WorldMap');

var WorldMap = function (_EvoComponent) {
  _inherits(WorldMap, _EvoComponent);

  function WorldMap(props) {
    _classCallCheck(this, WorldMap);

    return _possibleConstructorReturn(this, (WorldMap.__proto__ || Object.getPrototypeOf(WorldMap)).call(this, props));
  }

  _createClass(WorldMap, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var logPrefix = ':render] ';
      logger.info(logPrefix, '-->');

      var width = this.props.managers.parameters.getValueByKey('world-width') || 1,
          height = this.props.managers.parameters.getValueByKey('world-height') || 1;

      logger.debug(logPrefix, 'width:', width, 'height:', height);

      var stage = (0, _preact.h)(
        'div',
        { className: 'evogame--worldmap' },
        new Array(height).fill().map(function (e, y) {
          return (0, _preact.h)(
            'div',
            { className: 'evogame--worldmap-row' },
            new Array(width).fill().map(function (e, x) {
              var solution = _this2.props.managers.solutions.getSolutionAt({ x: x, y: y });

              return (0, _preact.h)(
                'div',
                { className: 'evogame--worldmap-col', style: {
                    width: 100 / width + '%',
                    paddingBottom: 100 / width + '%'
                  } },
                solution !== null ? (0, _preact.h)('div', { className: 'evogame--worldmap-solution', style: {
                    background: solution.color
                  } }) : ''
              );
            })
          );
        })
      );

      logger.info(logPrefix, '<--');
      return stage;
    }
  }]);

  return WorldMap;
}(_EvoComponent3.default);

exports.default = (0, _preactRedux.connect)(function (state) {
  return new _State2.default(state).ignore(['skills', 'globals']).ignoreEvents(['current']).state;
})(WorldMap);

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

var _preact = __webpack_require__(0);

var _EvoComponent2 = __webpack_require__(4);

var _EvoComponent3 = _interopRequireDefault(_EvoComponent2);

var _State = __webpack_require__(2);

var _State2 = _interopRequireDefault(_State);

var _preactRedux = __webpack_require__(3);

var _decko = __webpack_require__(5);

var _input = __webpack_require__(11);

var _input2 = _interopRequireDefault(_input);

var _row = __webpack_require__(9);

var _row2 = _interopRequireDefault(_row);

var _col = __webpack_require__(10);

var _col2 = _interopRequireDefault(_col);

var _loglevelCustom = __webpack_require__(1);

var _loglevelCustom2 = _interopRequireDefault(_loglevelCustom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var logger = _loglevelCustom2.default.getLogger('Parameters');

var Parameters = (_class = function (_EvoComponent) {
  _inherits(Parameters, _EvoComponent);

  function Parameters(props) {
    _classCallCheck(this, Parameters);

    return _possibleConstructorReturn(this, (Parameters.__proto__ || Object.getPrototypeOf(Parameters)).call(this, props));
  }

  _createClass(Parameters, [{
    key: 'changeParameter',
    value: function changeParameter(event, key) {
      var logPrefix = ':changeParameter] ';
      event.preventDefault();
      logger.debug(logPrefix, '-->');

      if (this.props.managers.parameters.isDynamic(key) && this.props.globals.status == 'play') {
        logger.debug(logPrefix, 'Prevent to change dynamic parameters');
      } else {
        this.props.dispatch({
          type: 'PARAMETER_SET',
          data: {
            key: key,
            value: event.target.value
          }
        });
      }

      logger.debug(logPrefix, '<--');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var logPrefix = ':render] ';
      logger.info(logPrefix, '-->');

      var stage = (0, _preact.h)(
        'div',
        null,
        (0, _preact.h)(
          _row2.default,
          null,
          this.props.parameters.list.map(function (property) {
            return (0, _preact.h)(
              _col2.default,
              { md: '6', sm: '12' },
              (0, _preact.h)(_input2.default, _extends({}, _extends({}, property, {
                label: (property.dynamic ? '' : '* ') + property.label + ' [ ' + property.unit + ' ]'
              }), { type: 'number', floatingLabel: true,
                onChange: function onChange(e) {
                  return _this2.changeParameter(e, property.key);
                } }))
            );
          })
        ),
        (0, _preact.h)(
          'div',
          { className: 'muiextra--note' },
          (0, _preact.h)(
            'b',
            null,
            '*'
          ),
          ' Need restart to be applied'
        )
      );

      logger.info(logPrefix, '<--');
      return stage;
    }
  }]);

  return Parameters;
}(_EvoComponent3.default), (_applyDecoratedDescriptor(_class.prototype, 'changeParameter', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'changeParameter'), _class.prototype)), _class);
exports.default = (0, _preactRedux.connect)(function (state) {
  return new _State2.default(state).ignore(['events', 'skills', 'solutions']).ignoreGlobals(['day', 'generation', 'timers']).state;
})(Parameters);

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

var _preact = __webpack_require__(0);

var _EvoComponent2 = __webpack_require__(4);

var _EvoComponent3 = _interopRequireDefault(_EvoComponent2);

var _State = __webpack_require__(2);

var _State2 = _interopRequireDefault(_State);

var _preactRedux = __webpack_require__(3);

var _decko = __webpack_require__(5);

var _input = __webpack_require__(11);

var _input2 = _interopRequireDefault(_input);

var _row = __webpack_require__(9);

var _row2 = _interopRequireDefault(_row);

var _col = __webpack_require__(10);

var _col2 = _interopRequireDefault(_col);

var _loglevelCustom = __webpack_require__(1);

var _loglevelCustom2 = _interopRequireDefault(_loglevelCustom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var logger = _loglevelCustom2.default.getLogger('Skills');

var Skills = (_class = function (_EvoComponent) {
  _inherits(Skills, _EvoComponent);

  function Skills(props) {
    _classCallCheck(this, Skills);

    return _possibleConstructorReturn(this, (Skills.__proto__ || Object.getPrototypeOf(Skills)).call(this, props));
  }

  _createClass(Skills, [{
    key: 'changeParameter',
    value: function changeParameter(event, key) {
      var logPrefix = ':changeParameter] ';
      event.preventDefault();
      logger.info(logPrefix, '-->');

      if (this.props.managers.skills.isDynamic(key) == false && this.props.globals.status == 'play') {
        logger.debug(logPrefix, 'Prevent to change dynamic parameters');
      } else {
        this.props.dispatch({
          type: 'SKILL_SET',
          data: {
            key: key,
            value: event.target.value
          }
        });
      }

      logger.info(logPrefix, '<--');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var logPrefix = ':render] ';
      logger.info(logPrefix, '-->');

      var stage = (0, _preact.h)(
        'div',
        null,
        (0, _preact.h)(
          _row2.default,
          null,
          this.props.skills.list.map(function (property) {
            logger.debug(logPrefix, 'Generating input for property', property);

            return (0, _preact.h)(
              _col2.default,
              { key: property.key, md: '6', sm: '12' },
              (0, _preact.h)(_input2.default, { type: 'number', floatingLabel: true,
                label: property.label + ' [ ' + property.unit + ' ]',
                min: property.min || null,
                max: property.max || null,
                value: property.value,
                onChange: function onChange(e) {
                  return _this2.changeParameter(e, property.key);
                } })
            );
          })
        ),
        (0, _preact.h)(
          'div',
          { className: 'muiextra--note' },
          'This settings will be applied only for the first generation'
        )
      );

      logger.info(logPrefix, '<--');
      return stage;
    }
  }]);

  return Skills;
}(_EvoComponent3.default), (_applyDecoratedDescriptor(_class.prototype, 'changeParameter', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'changeParameter'), _class.prototype)), _class);
exports.default = (0, _preactRedux.connect)(function (state) {
  return new _State2.default(state).ignore(['events', 'parameters', 'solutions']).ignoreGlobals(['day', 'generation', 'timers']).state;
})(Skills);
;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

var _preact = __webpack_require__(0);

var _EvoComponent2 = __webpack_require__(4);

var _EvoComponent3 = _interopRequireDefault(_EvoComponent2);

var _State = __webpack_require__(2);

var _State2 = _interopRequireDefault(_State);

var _preactRedux = __webpack_require__(3);

var _buttonsGroup = __webpack_require__(57);

var _decko = __webpack_require__(5);

var _loglevelCustom = __webpack_require__(1);

var _loglevelCustom2 = _interopRequireDefault(_loglevelCustom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var logger = _loglevelCustom2.default.getLogger('Controller');

var Controller = (_class = function (_EvoComponent) {
  _inherits(Controller, _EvoComponent);

  function Controller(props) {
    _classCallCheck(this, Controller);

    return _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).call(this, props));
  }

  _createClass(Controller, [{
    key: 'play',
    value: function play() {
      var _this2 = this;

      this.props.dispatch({
        type: 'GLOBAL_PLAY_GAME',
        data: function data() {
          return _this2.props.dispatch({
            type: 'GLOBAL_ADD_DAY',
            data: null
          });
        }
      });
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.props.dispatch({
        type: 'GLOBAL_PAUSE_GAME',
        data: null
      });
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.props.dispatch({
        type: 'GLOBAL_STOP_GAME',
        data: null
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var logPrefix = ':render] ';
      logger.info(logPrefix, '-->');

      var stage = (0, _preact.h)(
        _buttonsGroup.ButtonsGroup,
        null,
        (0, _preact.h)(
          _buttonsGroup.ButtonItem,
          { active: this.props.globals.status == 'play', onClick: this.play },
          (0, _preact.h)('i', { className: 'fa fa-play' })
        ),
        (0, _preact.h)(
          _buttonsGroup.ButtonItem,
          { active: this.props.globals.status == 'pause', onClick: this.pause },
          (0, _preact.h)('i', { className: 'fa fa-pause' })
        ),
        (0, _preact.h)(
          _buttonsGroup.ButtonItem,
          { active: this.props.globals.status == 'stop', onClick: this.stop },
          (0, _preact.h)('i', { className: 'fa fa-stop' })
        )
      );

      logger.info(logPrefix, '<--');
      return stage;
    }
  }]);

  return Controller;
}(_EvoComponent3.default), (_applyDecoratedDescriptor(_class.prototype, 'play', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'play'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'pause', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'pause'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'stop', [_decko.bind], Object.getOwnPropertyDescriptor(_class.prototype, 'stop'), _class.prototype)), _class);
exports.default = (0, _preactRedux.connect)(function (state) {
  return new _State2.default(state).ignore(['events', 'parameters', 'skills', 'solutions']).ignoreGlobals(['day', 'generation', 'timers']).state;
})(Controller);

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonItem = exports.ButtonsGroup = undefined;

var _preact = __webpack_require__(0);

var ButtonsGroup = function ButtonsGroup(props) {
  return (0, _preact.h)(
    'div',
    { className: 'muiextra--buttons' },
    props.children
  );
};

var ButtonItem = function ButtonItem(props) {
  return (0, _preact.h)(
    'div',
    { onClick: props.onClick, className: 'muiextra--button-item' + (props.active ? ' selected' : '') },
    props.children
  );
};

exports.ButtonsGroup = ButtonsGroup;
exports.ButtonItem = ButtonItem;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(13);

var _reducer = __webpack_require__(59);

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.createStore)(_reducer2.default);

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _init = __webpack_require__(60);

var _loglevelCustom = __webpack_require__(1);

var _loglevelCustom2 = _interopRequireDefault(_loglevelCustom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = _loglevelCustom2.default.getLogger('reducer');

var reducerLookup = {
  EVENT_SEND: {
    cb: function cb(state, data) {
      return state.managers.events.sendEvent();
    }
  },
  EVENT_SET: {
    cb: function cb(state, data) {
      return state.managers.events.setEventByKey(data);
    }
  },
  EVENT_SET_VALUE: {
    cb: function cb(state, data) {
      return state.managers.events.setCurrentEventValue(data);
    }
  },
  EVENT_SET_TIME: {
    cb: function cb(state, data) {
      return state.managers.events.setCurrentEventTime(data);
    }
  },
  GLOBAL_ADD_DAY: {
    cb: function cb(state, data) {
      return state.managers.globals.addDay(state);
    }
  },
  GLOBAL_STOP_GAME: {
    cb: function cb(state, data) {
      return state.managers.globals.stopGame(state);
    }
  },
  GLOBAL_PAUSE_GAME: {
    cb: function cb(state, data) {
      return state.managers.globals.pauseGame();
    }
  },
  GLOBAL_PLAY_GAME: {
    cb: function cb(state, data) {
      return state.managers.globals.playGame(state, data);
    }
  },
  SKILL_SET: {
    cb: function cb(state, data) {
      return state.managers.skills.setValueByKey(data.key, +data.value);
    }
  },
  PARAMETER_SET: {
    cb: function cb(state, data) {
      return state.managers.parameters.setValueByKey(data.key, +data.value);
    }
  }
};

var reducer = function reducer(state, action) {
  var logPrefix = ':reducer] ';
  logger.info(logPrefix, '-->');
  logger.info(logPrefix, 'type:', action.type, 'data:', action.data);
  logger.debug(logPrefix, 'Current state:', state);

  var nextState = state;
  if (action.type == '@@redux/INIT') {
    nextState = (0, _init.initState)();
  } else if (reducerLookup.hasOwnProperty(action.type)) {
    logger.info(logPrefix, 'Executing action received');
    reducerLookup[action.type].cb(state, action.data);

    logger.info(logPrefix, 'Saving previous state');
    var history = state.history.slice(0);
    history.push(state);

    logger.info(logPrefix, 'Updating state');
    nextState = _extends({}, state, {
      history: history,
      events: state.managers.events.getCurrentState(),
      globals: state.managers.globals.getCurrentState(),
      skills: state.managers.skills.getCurrentState(),
      parameters: state.managers.parameters.getCurrentState(),
      solutions: state.managers.solutions.getCurrentState()
    });
  } else {
    logger.warn(logPrefix, 'Action not recognized.');
  }

  logger.debug(logPrefix, 'New state:', nextState);
  logger.info(logPrefix, '<--');
  return nextState;
};

exports.default = reducer;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initState = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _SkillsManager = __webpack_require__(61);

var _SkillsManager2 = _interopRequireDefault(_SkillsManager);

var _ParametersManager = __webpack_require__(64);

var _ParametersManager2 = _interopRequireDefault(_ParametersManager);

var _EventsManager = __webpack_require__(67);

var _EventsManager2 = _interopRequireDefault(_EventsManager);

var _GlobalsManager = __webpack_require__(71);

var _GlobalsManager2 = _interopRequireDefault(_GlobalsManager);

var _SolutionsManager = __webpack_require__(73);

var _SolutionsManager2 = _interopRequireDefault(_SolutionsManager);

var _loglevelCustom = __webpack_require__(1);

var _loglevelCustom2 = _interopRequireDefault(_loglevelCustom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = _loglevelCustom2.default.getLogger('init');

var initialState = {
  events: {},
  skills: {},
  solutions: {},
  parameters: {},
  globals: {},
  config: {
    label: {
      time: 'Duration'
    },
    unit: {
      time: 'days'
    }
  },
  history: [],
  managers: {
    events: null,
    globals: null,
    skills: null,
    solutions: null,
    parameters: null
  }
};

var initState = function initState() {
  var logPrefix = ':initState] ';
  logger.info(logPrefix, '-->');

  logger.info(logPrefix, 'Init managers');
  var nextState = _extends({}, initialState, {
    managers: {
      events: new _EventsManager2.default(),
      globals: new _GlobalsManager2.default(),
      skills: new _SkillsManager2.default(),
      parameters: new _ParametersManager2.default(),
      solutions: new _SolutionsManager2.default()
    }
  });
  logger.info(logPrefix, 'Managers initialized');

  logger.info(logPrefix, 'Init managers states');
  nextState = _extends({}, nextState, {
    events: nextState.managers.events.getCurrentState(),
    globals: nextState.managers.globals.getCurrentState(),
    skills: nextState.managers.skills.getCurrentState(),
    parameters: nextState.managers.parameters.getCurrentState(),
    solutions: nextState.managers.solutions.getCurrentState()
  });
  logger.info(logPrefix, 'Manager states initialized');

  logger.info(logPrefix, '<--');
  return nextState;
};

exports.initState = initState;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SkillsCore2 = __webpack_require__(62);

var _SkillsCore3 = _interopRequireDefault(_SkillsCore2);

var _DamageEvaluate = __webpack_require__(23);

var _DamageEvaluate2 = _interopRequireDefault(_DamageEvaluate);

var _FitnessEvaluate = __webpack_require__(63);

var _FitnessEvaluate2 = _interopRequireDefault(_FitnessEvaluate);

var _loglevelCustom = __webpack_require__(1);

var _loglevelCustom2 = _interopRequireDefault(_loglevelCustom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var logger = _loglevelCustom2.default.getLogger('skills');

var SkillsManager = function (_SkillsCore) {
  _inherits(SkillsManager, _SkillsCore);

  function SkillsManager() {
    _classCallCheck(this, SkillsManager);

    return _possibleConstructorReturn(this, (SkillsManager.__proto__ || Object.getPrototypeOf(SkillsManager)).call(this));
  }

  _createClass(SkillsManager, [{
    key: 'getFitness',
    value: function getFitness(skill, min, max) {
      var logPrefix = ':getFitness] ';
      logger.debug(logPrefix, '-->');

      var element = this.getElementByKey(skill.key);
      var fitness = _FitnessEvaluate2.default[element.generateFitness](skill.value, min, max);
      logger.debug(logPrefix, 'fitness:', fitness);

      logger.debug(logPrefix, '<--');
      return fitness;
    }
  }, {
    key: 'isFatalDamage',
    value: function isFatalDamage(skill, damages) {
      var logPrefix = ':isFatalDamage] ';
      logger.debug(logPrefix, '-->');

      var isFatal = false;
      if (damages.hasOwnProperty(skill.key)) {
        var element = this.getElementByKey(skill.key);
        isFatal = _DamageEvaluate2.default[element.isFatal](skill.value, damages[skill.key]);
        logger.debug(logPrefix, (isFatal ? 'is' : 'isn\'t') + ' fatal.');
      } else logger.debug(logPrefix, 'damages doesn\'t affect skill', skill.key);

      logger.debug(logPrefix, '<--');
      return isFatal;
    }
  }]);

  return SkillsManager;
}(_SkillsCore3.default);

exports.default = SkillsManager;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _skills = __webpack_require__(22);

var _skills2 = _interopRequireDefault(_skills);

var _Core = __webpack_require__(7);

var _loglevelCustom = __webpack_require__(1);

var _loglevelCustom2 = _interopRequireDefault(_loglevelCustom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var logger = _loglevelCustom2.default.getLogger('skills');

var SkillsCore = function (_CoreList) {
  _inherits(SkillsCore, _CoreList);

  function SkillsCore() {
    _classCallCheck(this, SkillsCore);

    return _possibleConstructorReturn(this, (SkillsCore.__proto__ || Object.getPrototypeOf(SkillsCore)).call(this, _skills2.default));
  }

  return SkillsCore;
}(_Core.CoreList);

exports.default = SkillsCore;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loglevelCustom = __webpack_require__(1);

var _loglevelCustom2 = _interopRequireDefault(_loglevelCustom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var logger = _loglevelCustom2.default.getLogger('fitnessEvaluate');

var FitnessEvaluate = function () {
  function FitnessEvaluate() {
    _classCallCheck(this, FitnessEvaluate);
  }

  _createClass(FitnessEvaluate, null, [{
    key: 'fitnessCold',
    value: function fitnessCold(value, min, max) {
      var logPrefix = ':fitnessCold] ';
      logger.debug(logPrefix, '-->');

      var result = 1;
      if (max != min) {
        result = (max - value) / Math.abs(max - min);
      }

      logger.debug(logPrefix, '<--');
      return result;
    }
  }, {
    key: 'fitnessHeat',
    value: function fitnessHeat(value, min, max) {
      var logPrefix = ':fitnessHeat] ';
      logger.debug(logPrefix, '-->');

      var result = 1;
      if (max != min) {
        result = (value - min) / Math.abs(max - min);
      }

      logger.debug(logPrefix, '<--');
      return result;
    }
  }, {
    key: 'fitnessWater',
    value: function fitnessWater(value, min, max) {
      var logPrefix = ':fitnessWater] ';
      logger.debug(logPrefix, '-->');

      var result = 1;
      if (max != min) {
        result = (value - min) / Math.abs(max - min);
      }

      logger.debug(logPrefix, '<--');
      return result;
    }
  }, {
    key: 'fitnessWind',
    value: function fitnessWind(value, min, max) {
      var logPrefix = ':fitnessWind] ';
      logger.debug(logPrefix, '-->');

      var result = 1;
      if (max != min) {
        result = (value - min) / Math.abs(max - min);
      }

      logger.debug(logPrefix, '<--');
      return result;
    }
  }]);

  return FitnessEvaluate;
}();

exports.default = FitnessEvaluate;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ParametersCore2 = __webpack_require__(65);

var _ParametersCore3 = _interopRequireDefault(_ParametersCore2);

var _loglevelCustom = __webpack_require__(1);

var _loglevelCustom2 = _interopRequireDefault(_loglevelCustom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var logger = _loglevelCustom2.default.getLogger('parameters');

var ParametersManager = function (_ParametersCore) {
  _inherits(ParametersManager, _ParametersCore);

  function ParametersManager() {
    _classCallCheck(this, ParametersManager);

    return _possibleConstructorReturn(this, (ParametersManager.__proto__ || Object.getPrototypeOf(ParametersManager)).call(this));
  }

  return ParametersManager;
}(_ParametersCore3.default);

exports.default = ParametersManager;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _parameters = __webpack_require__(66);

var _parameters2 = _interopRequireDefault(_parameters);

var _Core = __webpack_require__(7);

var _loglevelCustom = __webpack_require__(1);

var _loglevelCustom2 = _interopRequireDefault(_loglevelCustom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var logger = _loglevelCustom2.default.getLogger('parameters');

var ParametersCore = function (_CoreList) {
  _inherits(ParametersCore, _CoreList);

  function ParametersCore() {
    _classCallCheck(this, ParametersCore);

    return _possibleConstructorReturn(this, (ParametersCore.__proto__ || Object.getPrototypeOf(ParametersCore)).call(this, _parameters2.default));
  }

  return ParametersCore;
}(_Core.CoreList);

exports.default = ParametersCore;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [{
  key: 'solutions',
  dynamic: false,
  label: 'Solutions',
  unit: 'n',
  min: '1',
  defaultValue: '16',
  value: 16
}, {
  key: 'days_per_generation',
  dynamic: false,
  label: 'Generation duration',
  unit: 'days',
  min: '1',
  defaultValue: '30',
  value: 30
}, {
  key: 'mutability',
  dynamic: true,
  label: 'Mutability',
  unit: '%',
  min: '0',
  max: '100',
  defaultValue: '20',
  value: 20
}, {
  key: 'reproductivity',
  dynamic: true,
  label: 'Reproductivity',
  unit: '%',
  min: '0',
  max: '100',
  defaultValue: '80',
  value: 80
}, {
  key: 'world-width',
  dynamic: false,
  label: 'World Width',
  unit: 'cell',
  min: '1',
  defaultValue: '24',
  value: 24
}, {
  key: 'world-height',
  dynamic: false,
  label: 'World Height',
  unit: 'cell',
  min: '1',
  defaultValue: '12',
  value: 12
}, {
  key: 'day_time',
  dynamic: false,
  label: 'Day duration',
  unit: 'ms',
  min: '10',
  defaultValue: '300',
  value: 300
}, {
  key: 'reproduction-area',
  dynamic: true,
  label: 'Reproduction Area',
  unit: 'cell',
  min: '1',
  defaultValue: '6',
  value: 6
}, {
  key: 'day-mutability',
  dynamic: true,
  label: 'Day Mutability Range',
  unit: '%',
  min: '0',
  max: '100',
  defaultValue: '2',
  value: 5
}];

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventsCore2 = __webpack_require__(68);

var _EventsCore3 = _interopRequireDefault(_EventsCore2);

var _LabelEvaluate = __webpack_require__(70);

var _LabelEvaluate2 = _interopRequireDefault(_LabelEvaluate);

var _DamageEvaluate = __webpack_require__(23);

var _DamageEvaluate2 = _interopRequireDefault(_DamageEvaluate);

var _generics = __webpack_require__(6);

var _loglevelCustom = __webpack_require__(1);

var _loglevelCustom2 = _interopRequireDefault(_loglevelCustom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var logger = _loglevelCustom2.default.getLogger('events');

var EventsManager = function (_EventsCore) {
  _inherits(EventsManager, _EventsCore);

  function EventsManager() {
    _classCallCheck(this, EventsManager);

    var _this = _possibleConstructorReturn(this, (EventsManager.__proto__ || Object.getPrototypeOf(EventsManager)).call(this));

    _this.state = {
      status: {
        sended: false,
        damages: {},
        duration: 0,
        passed: 0
      }
    };
    return _this;
  }

  _createClass(EventsManager, [{
    key: 'sendEvent',
    value: function sendEvent() {
      var logPrefix = ':sendEvent] ';
      logger.info(logPrefix, '-->');

      if (!this.state.current) {
        logger.warn(logPrefix, 'Element not found');
      } else if (!_DamageEvaluate2.default.hasOwnProperty(this.state.current.damageEvaluate)) {
        logger.warn(logPrefix, 'Method ' + this.state.current.damageEvaluate + ' not found.');
      } else {
        this.setState({
          status: _extends({}, this.state.status, {
            sended: true,
            duration: this.state.current.dispatchTime
          })
        });
      }

      logger.info(logPrefix, '<--');
      return this;
    }
  }, {
    key: 'addDay',
    value: function addDay(state) {
      var logPrefix = ':addDay] ';
      logger.info(logPrefix, '-->');

      if (this.state.status.sended === false) {
        logger.debug(logPrefix, 'No event sended');
      } else {
        if (this.state.status.passed == this.state.status.duration) {
          logger.info(logPrefix, 'Current event end');

          this.setState({
            status: {
              sended: false,
              passed: 0,
              duration: 0,
              damages: {}
            }
          });
        }

        var damages = _DamageEvaluate2.default[this.state.current.damageEvaluate](this.state.current.value);

        this.setState({
          status: _extends({}, this.state.status, {
            damages: (0, _generics.sumEqualsKey)(damages, this.state.status.damages),
            passed: this.state.status.passed + 1
          })
        });

        logger.debug(logPrefix, 'damages:', this.state.status.damages);

        state.managers.solutions.applyDamage(state.managers.skills, this.state.status.damages);

        if (state.managers.solutions.getList().length == 0) {
          logger.info(logPrefix, 'No solutions left');
          state.managers.globals.pauseGame();

          this.setState({
            status: {
              sended: false,
              passed: 0,
              duration: 0,
              damages: {}
            }
          });
        }
      }

      logger.info(logPrefix, '<--');
      return this;
    }
  }, {
    key: 'getValueLabel',
    value: function getValueLabel(key, value) {
      var logPrefix = ':getValueLabel] ';
      logger.info(logPrefix, '-->');

      var element = this.getElementByKey(key);
      var valueInfo = 'undefined';

      if (!element) {
        logger.warn(logPrefix, 'Element not found');
      } else if (!_LabelEvaluate2.default.hasOwnProperty(element.labelEvaluate)) {
        logger.warn(logPrefix, 'Method ' + element.labelEvaluate + ' not found.');
      } else {
        valueInfo = _LabelEvaluate2.default[element.labelEvaluate](value);
      }

      logger.info(logPrefix, '<--');
      return valueInfo;
    }
  }]);

  return EventsManager;
}(_EventsCore3.default);

exports.default = EventsManager;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Core = __webpack_require__(7);

var _events = __webpack_require__(69);

var _events2 = _interopRequireDefault(_events);

var _skills = __webpack_require__(22);

var _skills2 = _interopRequireDefault(_skills);

var _loglevelCustom = __webpack_require__(1);

var _loglevelCustom2 = _interopRequireDefault(_loglevelCustom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var logger = _loglevelCustom2.default.getLogger('events');

var EventsCore = function (_CoreList) {
  _inherits(EventsCore, _CoreList);

  function EventsCore() {
    _classCallCheck(this, EventsCore);

    var _this = _possibleConstructorReturn(this, (EventsCore.__proto__ || Object.getPrototypeOf(EventsCore)).call(this, _events2.default.map(function (event) {
      return _extends({}, event, {
        affect: event.affect.map(function (skillKey) {
          return {
            label: skillKey,
            color: _skills2.default.find(function (s) {
              return s.key == skillKey;
            }).color
          };
        })
      });
    })));

    _this.state = {
      current: _extends({}, _this.state.list[0], {
        value: _this.state.list[0].defaultValue
      })
    };
    return _this;
  }

  _createClass(EventsCore, [{
    key: 'setEventByKey',
    value: function setEventByKey(key) {
      var logPrefix = ':setEventByKey] ';
      logger.info(logPrefix, '-->');

      var element = this.getElementByKey(key);

      this.setState({
        current: _extends({}, element, {
          value: element.defaultValue
        })
      });

      logger.info(logPrefix, '<--');
      return this;
    }
  }, {
    key: 'setValueByKey',
    value: function setValueByKey(key, value) {
      var logPrefix = ':setValueByKey] ';
      logger.info(logPrefix, '-->');
      logger.warn(logPrefix, 'Method not available with events');
      logger.info(logPrefix, '<--');

      return this;
    }
  }, {
    key: 'setCurrentEventValue',
    value: function setCurrentEventValue(value) {
      var logPrefix = ':setCurrentEventValue] ';
      logger.info(logPrefix, '-->');

      if (this.state.current.hasOwnProperty('min') && value < this.state.current.min) {
        logger.info(logPrefix, 'Prevent to set a value less than minimum.');
        value = event.min;
      }

      if (this.state.current.hasOwnProperty('max') && value > this.state.current.max) {
        logger.info(logPrefix, 'Prevent to set a value more than maximum.');
        value = event.max;
      }

      this.setState({
        current: _extends({}, this.state.current, {
          value: value
        })
      });

      logger.info(logPrefix, '<--');
      return this;
    }
  }, {
    key: 'setCurrentEventTime',
    value: function setCurrentEventTime(dispatchTime) {
      var logPrefix = ':setCurrentEventTime] ';
      logger.info(logPrefix, '-->');

      if (dispatchTime < 0) {
        logger.info(logPrefix, 'Prevent to set a value less than minimum.');
        value = 0;
      }

      this.setState({
        current: _extends({}, this.state.current, {
          dispatchTime: dispatchTime
        })
      });

      logger.info(logPrefix, '<--');
      return this;
    }
  }]);

  return EventsCore;
}(_Core.CoreList);

exports.default = EventsCore;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [{
  key: 'wind',
  label: 'Wind',
  affect: ['wind'],
  min: 0,
  defaultValue: 20,
  dispatchTime: 2,
  unit: 'km/h',
  labelEvaluate: 'labelWind',
  damageEvaluate: 'damageWind'
}, {
  key: 'rain',
  label: 'Rain',
  affect: ['water', 'wind'],
  min: 0,
  defaultValue: 5,
  dispatchTime: 7,
  unit: 'mm/h',
  labelEvaluate: 'labelRain',
  damageEvaluate: 'damageRain'
}, {
  key: 'sandstorm',
  label: 'Sandstorm',
  affect: ['heat', 'cold', 'wind'],
  min: 0,
  defaultValue: 10,
  dispatchTime: 60,
  unit: 'km/h',
  labelEvaluate: 'labelSandstorm',
  damageEvaluate: 'damageSandstorm'
}, {
  key: 'snow',
  label: 'Snow',
  affect: ['cold', 'heat'],
  min: 0,
  defaultValue: 4,
  dispatchTime: 3,
  unit: 'cm/h',
  labelEvaluate: 'labelSnow',
  damageEvaluate: 'damageSnow'
}, {
  key: 'wave',
  label: 'Wave',
  affect: ['water'],
  min: 0,
  defaultValue: 4,
  dispatchTime: 14,
  unit: 'm',
  labelEvaluate: 'labelWave',
  damageEvaluate: 'damageWave'
}, {
  key: 'fire',
  label: 'Fire',
  affect: ['heat', 'cold'],
  min: 0,
  defaultValue: 40,
  dispatchTime: 30,
  unit: '°C',
  labelEvaluate: 'labelFire',
  damageEvaluate: 'damageFire'
}];

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

var _generics = __webpack_require__(6);

var _decko = __webpack_require__(5);

var _loglevelCustom = __webpack_require__(1);

var _loglevelCustom2 = _interopRequireDefault(_loglevelCustom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var logger = _loglevelCustom2.default.getLogger('labelEvaluate');

var LabelEvaluate = (_class = function () {
  function LabelEvaluate() {
    _classCallCheck(this, LabelEvaluate);
  }

  _createClass(LabelEvaluate, null, [{
    key: 'labelWind',
    value: function labelWind(value) {
      var logPrefix = ':labelWind] ';
      logger.info(logPrefix, '-->');

      var beaufortScale = [{ label: 'Calm', value: 1 }, { label: 'Light Air', value: 5 }, { label: 'Light Breeze', value: 11 }, { label: 'Gentle Breeze', value: 19 }, { label: 'Moderate Breeze', value: 28 }, { label: 'Fresh Breeze', value: 38 }, { label: 'Strong Breeze', value: 49 }, { label: 'Moderate Gale', value: 61 }, { label: 'Fresh Gale', value: 74 }, { label: 'Strong Gale', value: 88 }, { label: 'Storm', value: 102 }, { label: 'Violent Storm', value: 117 }, { label: 'Hurricane Force', value: -1 }];

      var result = (0, _generics.getValueInScale)(beaufortScale, value);

      logger.info(logPrefix, '<--');
      return result.label;
    }
  }, {
    key: 'labelRain',
    value: function labelRain(value) {
      var logPrefix = ':labelRain] ';
      logger.info(logPrefix, '-->');

      var rainScale = [{ label: 'Fog', value: 1 }, { label: 'Drizzle', value: 4 }, { label: 'Heavy Rain', value: 10 }, { label: 'Shower', value: 30 }, { label: 'Cloudburst', value: -1 }];

      var result = (0, _generics.getValueInScale)(rainScale, value);

      logger.info(logPrefix, '<--');
      return result.label;
    }
  }, {
    key: 'labelSandstorm',
    value: function labelSandstorm(value) {
      var logPrefix = ':labelSandstorm] ';
      logger.info(logPrefix, '-->');

      var sandstormScale = [{ label: 'Smoke In The Eyes', value: 10 }, { label: 'Regular Sandstorm', value: 35 }, { label: 'Haboob', value: 90 }, { label: 'Martian Sandstorm', value: -1 }];

      var result = (0, _generics.getValueInScale)(sandstormScale, value);

      logger.info(logPrefix, '<--');
      return result.label;
    }
  }, {
    key: 'labelSnow',
    value: function labelSnow(value) {
      var logPrefix = ':labelSnow] ';
      logger.info(logPrefix, '-->');

      var snowScale = [{ label: 'Regular Snow', value: 2 }, { label: 'Heavy Snow', value: 5 }];

      var result = (0, _generics.getValueInScale)(snowScale, value);

      logger.info(logPrefix, '<--');
      return result.label;
    }
  }, {
    key: 'labelWave',
    value: function labelWave(value) {
      var logPrefix = ':labelWave] ';
      logger.info(logPrefix, '-->');

      var waveScale = [{ label: 'Like A Mirror', value: 1 }, { label: 'Moderate Wave', value: 3 }, { label: 'High Wave', value: 8 }, { label: 'Rogue Wave', value: 16 }, { label: 'Tsunami', value: -1 }];

      var result = (0, _generics.getValueInScale)(waveScale, value);

      logger.info(logPrefix, '<--');
      return result.label;
    }
  }, {
    key: 'labelFire',
    value: function labelFire(value) {
      var logPrefix = ':labelFire] ';
      logger.info(logPrefix, '-->');

      var fireScale = [{ label: 'Earth Surface', value: 21 }, { label: 'Room Temperature', value: 28 }, { label: 'Minimum Human Body', value: 37 }, { label: 'Human Body', value: 38 }, { label: 'Cat Body', value: 39 }, { label: 'Death Valley', value: 90 }, { label: 'Soup', value: 100 }, { label: 'Water Boiling', value: 150 }, { label: 'Mercury', value: 200 }, { label: 'Venus', value: 500 }, { label: 'Burn Burn', value: -1 }];

      var result = (0, _generics.getValueInScale)(fireScale, value);

      logger.info(logPrefix, '<--');
      return result.label;
    }
  }]);

  return LabelEvaluate;
}(), (_applyDecoratedDescriptor(_class, 'labelWind', [_decko.memoize], Object.getOwnPropertyDescriptor(_class, 'labelWind'), _class), _applyDecoratedDescriptor(_class, 'labelRain', [_decko.memoize], Object.getOwnPropertyDescriptor(_class, 'labelRain'), _class), _applyDecoratedDescriptor(_class, 'labelSandstorm', [_decko.memoize], Object.getOwnPropertyDescriptor(_class, 'labelSandstorm'), _class), _applyDecoratedDescriptor(_class, 'labelSnow', [_decko.memoize], Object.getOwnPropertyDescriptor(_class, 'labelSnow'), _class), _applyDecoratedDescriptor(_class, 'labelWave', [_decko.memoize], Object.getOwnPropertyDescriptor(_class, 'labelWave'), _class), _applyDecoratedDescriptor(_class, 'labelFire', [_decko.memoize], Object.getOwnPropertyDescriptor(_class, 'labelFire'), _class)), _class);
exports.default = LabelEvaluate;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GlobalsCore2 = __webpack_require__(72);

var _GlobalsCore3 = _interopRequireDefault(_GlobalsCore2);

var _generics = __webpack_require__(6);

var _loglevelCustom = __webpack_require__(1);

var _loglevelCustom2 = _interopRequireDefault(_loglevelCustom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var logger = _loglevelCustom2.default.getLogger('globals');

var GlobalsManager = function (_GlobalsCore) {
  _inherits(GlobalsManager, _GlobalsCore);

  function GlobalsManager() {
    _classCallCheck(this, GlobalsManager);

    var _this = _possibleConstructorReturn(this, (GlobalsManager.__proto__ || Object.getPrototypeOf(GlobalsManager)).call(this));

    _this.state = {
      day: 0,
      generation: 0,
      timers: {
        day: null
      },
      status: 'stop'
    };
    return _this;
  }

  _createClass(GlobalsManager, [{
    key: 'playGame',
    value: function playGame(state, callback) {
      var logPrefix = ':playGame] ';
      logger.info(logPrefix, '-->');

      var _ref = [state.managers.parameters, state.managers.solutions],
          parameters = _ref[0],
          solutions = _ref[1];


      if (this.state.status == 'play') {
        logger.debug(logPrefix, 'Already running.');
        logger.info(logPrefix, '<--');
        return this;
      }

      if (this.state.status == 'pause') {
        logger.info(logPrefix, 'Recover status from pause.');

        this.setState({
          status: 'play',
          timers: {
            day: setInterval(callback, parameters.getElementByKey('day_time').value)
          }
        });

        logger.info(logPrefix, '<--');
        return this;
      }

      logger.debug('Initializing environment');
      this.setState({
        status: 'play',
        generation: 1,
        day: 1,
        timers: {
          day: setInterval(callback, parameters.getElementByKey('day_time').value)
        }
      });

      var _ref2 = [parameters.getValueByKey('solutions'), parameters.getValueByKey('world-width'), parameters.getValueByKey('world-height'), parameters.getValueByKey('day-mutability') / 100],
          maxSolutions = _ref2[0],
          worldWidth = _ref2[1],
          worldHeight = _ref2[2],
          initialRange = _ref2[3];


      maxSolutions = Math.min(worldWidth * worldHeight, maxSolutions);
      logger.info(logPrefix, 'Generating ' + maxSolutions + ' solutions');

      /* Generating solution */
      for (var j = 0; j < maxSolutions; j++) {
        logger.info(logPrefix, '> Generating solution ' + j);

        var position = {
          y: (0, _generics.getRandomInt)(0, worldHeight - 1),
          x: (0, _generics.getRandomInt)(0, worldWidth - 1)
        };

        while (solutions.getSolutionAt(position) !== null) {
          position = {
            y: (0, _generics.getRandomInt)(0, worldHeight - 1),
            x: (0, _generics.getRandomInt)(0, worldWidth - 1)
          };
        }
        logger.debug(logPrefix, '- founded free spot in row ' + position.y + ' and col ' + position.x);

        solutions.addRandomSolution(state.skills.list, initialRange, position);
      }

      solutions.addFitnessEvaluation(state.managers.skills).addSolutionsColors();

      logger.info(logPrefix, '<--');
      return this;
    }
  }, {
    key: 'stopGame',
    value: function stopGame(state) {
      var logPrefix = ':stop] ';
      logger.info(logPrefix, '-->');

      if (this.state.status == 'stop') {
        logger.debug(logPrefix, 'Already stopped');
        logger.info(logPrefix, '<--');
        return this;
      }

      logger.info(logPrefix, 'Clear intervals');
      clearInterval(this.state.timers.day);

      logger.info(logPrefix, 'Clear solutions');
      state.managers.solutions.removeAll();

      logger.info(logPrefix, 'Reset world');
      this.setState({
        status: 'stop',
        day: 0,
        generation: 0
      });

      logger.info(logPrefix, '<--');
      return this;
    }
  }, {
    key: 'pauseGame',
    value: function pauseGame() {
      var logPrefix = ':pause] ';
      logger.info(logPrefix, '-->');

      if (this.state.status != 'play') {
        logger.debug(logPrefix, 'Nothing to pause');
        logger.info(logPrefix, '<--');
        return this;
      }

      this.setState({ status: 'pause' });

      logger.info(logPrefix, 'Clearing intervals');
      clearInterval(this.state.timers.day);

      logger.info(logPrefix, '<--');
      return this;
    }
  }, {
    key: 'addDay',
    value: function addDay(state) {
      var logPrefix = ':addDay] ';
      logger.debug(logPrefix, '-->');

      var _ref3 = [state.managers.parameters, state.managers.solutions],
          parameters = _ref3[0],
          solutions = _ref3[1];


      if (this.state.day >= parameters.getValueByKey('days_per_generation')) {
        logger.info('End of generation', this.state.generation);

        this.setState({
          day: 1,
          generation: this.state.generation + 1
        });

        solutions.buildGeneration(parameters.getValueByKey('world-width'), parameters.getValueByKey('world-height'), parameters.getValueByKey('reproductivity'), Math.ceil(parameters.getValueByKey('reproduction-area') / 2), parameters.getValueByKey('mutability'));
      } else {
        logger.debug('End of day', this.state.day, 'in generation', this.state.generation);

        this.setState({
          day: this.state.day + 1
        });

        state.managers.events.addDay(state);
      }

      solutions.mutate(parameters.getValueByKey('day-mutability')).addFitnessEvaluation(state.managers.skills).addSolutionsColors();

      logger.debug(logPrefix, '<--');
      return this;
    }
  }]);

  return GlobalsManager;
}(_GlobalsCore3.default);

exports.default = GlobalsManager;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Core2 = __webpack_require__(7);

var _loglevelCustom = __webpack_require__(1);

var _loglevelCustom2 = _interopRequireDefault(_loglevelCustom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var logger = _loglevelCustom2.default.getLogger('globals');

var GlobalsCore = function (_Core) {
  _inherits(GlobalsCore, _Core);

  function GlobalsCore() {
    _classCallCheck(this, GlobalsCore);

    return _possibleConstructorReturn(this, (GlobalsCore.__proto__ || Object.getPrototypeOf(GlobalsCore)).call(this));
  }

  return GlobalsCore;
}(_Core2.Core);

exports.default = GlobalsCore;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SolutionsCore2 = __webpack_require__(74);

var _SolutionsCore3 = _interopRequireDefault(_SolutionsCore2);

var _generics = __webpack_require__(6);

var _loglevelCustom = __webpack_require__(1);

var _loglevelCustom2 = _interopRequireDefault(_loglevelCustom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var logger = _loglevelCustom2.default.getLogger('solutions');

var SolutionsManager = function (_SolutionsCore) {
  _inherits(SolutionsManager, _SolutionsCore);

  function SolutionsManager() {
    _classCallCheck(this, SolutionsManager);

    return _possibleConstructorReturn(this, (SolutionsManager.__proto__ || Object.getPrototypeOf(SolutionsManager)).call(this));
  }

  _createClass(SolutionsManager, [{
    key: 'addRandomSolution',
    value: function addRandomSolution(skills, range, position) {
      var logPrefix = ':addRandomSolution] ';
      logger.info(logPrefix, '-->');

      logger.debug('Generating skills');
      var solutionSkills = skills.map(function (skill) {
        var rangeValue = range * skill.value;
        var value = skill.value + (0, _generics.getRandomInt)(-rangeValue, +rangeValue);

        logger.debug(logPrefix, 'rangeValue:', rangeValue, 'value:', value);

        logger.debug(logPrefix, '<--');
        return {
          key: skill.key,
          value: Math.min(Math.max(value, skill.min ? +skill.min : value), skill.max ? +skill.max : value),
          color: skill.color,
          fitness: 0
        };
      });

      logger.debug('Adding solution');
      this.addSolution(solutionSkills, position);

      logger.info(logPrefix, '<--');
      return this;
    }
  }, {
    key: 'buildGeneration',
    value: function buildGeneration(worldWidth, worldHeight, repRange, repArea, mutability) {
      var logPrefix = ':buildGeneration] ';
      logger.info(logPrefix, '-->');

      this.processOverpopulation(worldWidth, worldHeight, repArea).reproduceSolutions(worldWidth, worldHeight, repRange, repArea, mutability).processOverpopulation(worldWidth, worldHeight, repArea);

      logger.info(logPrefix, '<--');
      return this;
    }
  }, {
    key: 'mutate',
    value: function mutate(mutability) {
      var logPrefix = ':mutate] ';
      logger.debug(logPrefix, '-->');

      var list = this.state.list.map(function (solution) {
        return _extends({}, solution, {
          skills: solution.skills.map(function (skill) {
            var _ref = [0, 0, skill.value],
                rangeValue = _ref[0],
                value = _ref[1],
                mutateBase = _ref[2];


            if (skill.hasOwnProperty('mutateBase')) {
              rangeValue = skill.mutateBase * (mutability / 100);
              value = skill.mutateBase + (0, _generics.getRandomInt)(-rangeValue, +rangeValue);
              mutateBase = skill.mutateBase;
            } else {
              rangeValue = skill.value * (mutability / 100);
              value = skill.value + (0, _generics.getRandomInt)(-rangeValue, +rangeValue);
            }

            return _extends({}, skill, {
              value: Math.min(Math.max(value, skill.min ? +skill.min : value), skill.max ? +skill.max : value),
              mutateBase: mutateBase,
              fitness: 0
            });
          })
        });
      });

      this.setState({ list: list });

      logger.debug(logPrefix, '<--');
      return this;
    }
  }, {
    key: 'addFitnessEvaluation',
    value: function addFitnessEvaluation(skillsManager) {
      var _this2 = this;

      var logPrefix = ':addFitnessEvaluation] ';
      logger.info(logPrefix, '-->');

      logger.info(logPrefix, 'Evaluating skills ranges');
      var ranges = skillsManager.getList().map(function (skill) {
        return _extends({}, _this2.getSkillRangeByKey(skill.key), {
          skill: skill.key
        });
      });

      logger.debug(logPrefix, 'ranges:', ranges);
      logger.info(logPrefix, 'Generate fitness for each solution skill');

      var list = this.state.list.map(function (solution, idx) {
        logger.debug(logPrefix, 'Current solution index:', idx);

        var skills = solution.skills.map(function (skill) {
          logger.debug(logPrefix, '- Evaluating skill ' + skill.key + ' fitness');

          var currSkillRange = ranges.find(function (r) {
            return r.skill == skill.key;
          });
          logger.debug(logPrefix, 'Current skill ranges:', currSkillRange);

          return _extends({}, skill, {
            fitness: skillsManager.getFitness(skill, currSkillRange.min, currSkillRange.max)
          });
        });

        return _extends({}, solution, {
          skills: skills,
          fitness: skills.reduce(function (p, curr) {
            return p + curr.fitness;
          }, 0) / skills.length
        });
      });

      this.setState({ list: list });

      logger.info(logPrefix, '<--');
      return this;
    }
  }, {
    key: 'addSolutionsColors',
    value: function addSolutionsColors() {
      var _this3 = this;

      var logPrefix = ':generateSolutionColor] ';
      logger.info(logPrefix, '-->');

      var list = this.state.list.map(function (solution, idx) {
        logger.info(logPrefix, 'Generate colors for solution ' + (idx + 1) + '/' + _this3.state.list.length);
        logger.debug(logPrefix, '-->');

        var values = solution.skills.map(function (s) {
          return s.fitness;
        });
        var minVal = values.reduce(function (prev, curr) {
          return curr < prev && curr > 0 || !prev ? curr : prev;
        });

        logger.debug(logPrefix, 'values:', values);
        logger.debug(logPrefix, 'minVal:', minVal);

        var valuesRanges = new Array(values.length).fill(1 / values.length);
        if (minVal != 0) {
          var ranges = values.map(function (v) {
            return v / minVal;
          });
          logger.debug(logPrefix, 'values parts:', ranges);

          var totRanges = ranges.reduce(function (a, b) {
            return a + b;
          }, 0);
          logger.debug(logPrefix, 'totRanges:', totRanges);

          valuesRanges = ranges.map(function (r) {
            return r / totRanges;
          });
        }

        logger.debug(logPrefix, 'valuesRanges:', valuesRanges, 'tot:', valuesRanges.reduce(function (p, c) {
          return p + c;
        }));

        var colorRanges = solution.skills.map(function (skill, idx) {
          return {
            color: skill.color,
            value: valuesRanges[idx] * 100
          };
        }).filter(function (c) {
          return c.value > 0;
        });

        logger.debug(logPrefix, 'colorRanges:', colorRanges);

        var gradientColors = [];
        var percentage = 0;
        for (var _idx in colorRanges) {
          gradientColors.push(colorRanges[_idx].color + ' ' + percentage + '%');
          percentage += colorRanges[_idx].value;
          gradientColors.push(colorRanges[_idx].color + ' ' + percentage + '%');
        }

        logger.debug(logPrefix, 'gradientColors:', gradientColors);
        logger.debug(logPrefix, '<--');
        return _extends({}, solution, {
          color: 'linear-gradient(' + gradientColors.join(',') + ')'
        });
      });

      this.setState({ list: list });

      logger.info(logPrefix, '<--');
      return this;
    }
  }, {
    key: 'applyDamage',
    value: function applyDamage(skillManager, damage) {
      var logPrefix = ':applyDamage] ';
      logger.info(logPrefix, '-->');

      logger.info(logPrefix, 'Current solutions:', this.state.list.length);
      var list = this.state.list.filter(function (solution) {
        return !solution.skills.reduce(function (p, curr) {
          return p |= skillManager.isFatalDamage(curr, damage);
        }, false);
      });
      logger.info(logPrefix, 'Filtered solutions:', list.length);

      this.setState({ list: list, dead: this.state.dead + (this.state.list.length - list.length) });

      logger.info(logPrefix, '<--');
      return this;
    }
  }, {
    key: 'getBestSolution',
    value: function getBestSolution() {
      var logPrefix = ':getBestSolution] ';
      logger.info(logPrefix, '-->');

      var bestSolution = null;
      if (this.state.list.length > 0) {
        bestSolution = this.state.list.reduce(function (p, curr) {
          return p.fitness > curr.fitness ? p : curr;
        });
      }

      logger.info(logPrefix, '<--');
      return bestSolution;
    }
  }]);

  return SolutionsManager;
}(_SolutionsCore3.default);

exports.default = SolutionsManager;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Core2 = __webpack_require__(7);

var _generics = __webpack_require__(6);

var _loglevelCustom = __webpack_require__(1);

var _loglevelCustom2 = _interopRequireDefault(_loglevelCustom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var logger = _loglevelCustom2.default.getLogger('solutions');

var SolutionsCore = function (_Core) {
  _inherits(SolutionsCore, _Core);

  function SolutionsCore() {
    _classCallCheck(this, SolutionsCore);

    var _this = _possibleConstructorReturn(this, (SolutionsCore.__proto__ || Object.getPrototypeOf(SolutionsCore)).call(this));

    _this.state = {
      list: [],
      dead: 0
    };
    return _this;
  }

  _createClass(SolutionsCore, [{
    key: 'addSolution',
    value: function addSolution(skills, position) {
      var logPrefix = ':addSolution] ';
      logger.info(logPrefix, '-->');

      var list = this.state.list;

      list.push({
        skills: skills,
        position: position
      });

      this.setState({ list: list });

      logger.info(logPrefix, '<--');
      return this;
    }
  }, {
    key: 'removeAll',
    value: function removeAll() {
      var logPrefix = ':removeAll] ';
      logger.info(logPrefix, '-->');

      this.setState({ list: [], dead: 0 });

      logger.info(logPrefix, '<--');
      return this;
    }
  }, {
    key: 'removeSolutionAt',
    value: function removeSolutionAt(position) {
      var logPrefix = ':removeSolutionAt] ';
      logger.info(logPrefix, '-->');

      var list = this.state.list.filter(function (solution) {
        return !(0, _generics.compareObjects)(solution.position, position);
      });
      this.setState({
        list: list,
        dead: this.state.dead + (this.state.list.length - list.length)
      });

      logger.info(logPrefix, '<--');
      return this;
    }
  }, {
    key: 'getList',
    value: function getList() {
      var logPrefix = ':getList] ';
      logger.info(logPrefix, '-->');

      logger.info(logPrefix, '<--');
      return this.state.list;
    }
  }, {
    key: 'getSolutionAt',
    value: function getSolutionAt(position) {
      var logPrefix = ':getSolutionAt] ';
      logger.trace(logPrefix, '-->');

      var solution = this.state.list.find(function (s) {
        return s.position.x == position.x && s.position.y == position.y;
      });

      logger.trace(logPrefix, '<--');
      return solution === undefined ? null : solution;
    }
  }, {
    key: 'getSkillRangeByKey',
    value: function getSkillRangeByKey(key) {
      var logPrefix = ':getSkillRange] ';
      logger.debug(logPrefix, '-->');
      logger.debug(logPrefix, 'Skill key:', key);

      var range = {
        min: undefined,
        max: undefined
      };

      for (var i in this.state.list) {
        var currSkillValue = this.state.list[i].skills.find(function (s) {
          return s.key == key;
        }).value;
        logger.debug(logPrefix, 'currSkillValue:', currSkillValue, 'at Index:', i);

        if (range.min == undefined || currSkillValue < range.min) {
          range.min = currSkillValue;
        }

        if (range.max == undefined || currSkillValue > range.max) {
          range.max = currSkillValue;
        }
      }

      logger.debug(logPrefix, '<--');
      return range;
    }
  }, {
    key: 'getFreePositionInArea',
    value: function getFreePositionInArea(pos, width, height, area) {
      var logPrefix = ':getFreePositionInArea] ';
      logger.debug(logPrefix, '-->');

      var start = {
        x: pos.x - area < 0 ? 0 : pos.x - area,
        y: pos.y - area < 0 ? 0 : pos.y - area
      },
          end = {
        x: pos.x + area > width ? width : pos.x + area,
        y: pos.y + area > height ? height : pos.y + area
      };


      logger.debug(logPrefix, 'start:', start);
      logger.debug(logPrefix, 'end:', end);

      var emptyPos = [];
      for (var x = start.x; x < end.x; x++) {
        for (var y = start.y; y < end.y; y++) {
          if (this.getSolutionAt({ x: x, y: y }) === null) {
            emptyPos.push({ x: x, y: y });
          }
        }
      }
      logger.debug(logPrefix, 'empty cells:', emptyPos);

      logger.debug(logPrefix, '<--');
      return emptyPos;
    }
  }, {
    key: 'generateSolutionChild',
    value: function generateSolutionChild(mom, dad, mutability) {
      var logPrefix = ':generateSolutionChildren] ';
      logger.debug(logPrefix, '-->');

      var child = [];
      for (var key in mom) {
        var side = (0, _generics.getRandomInt)(0, 100) / 100;

        var baseValue = Math.ceil((mom[key].value * side + dad[key].value * (1 - side)) / 2);
        var range = baseValue * (mutability / 100);

        child.push(_extends({}, mom[key], {
          value: baseValue + (0, _generics.getRandomInt)(-range, +range),
          fitness: 0
        }));
      }
      logger.debug(logPrefix, 'Something happened from mom', mom, 'and dad', dad);
      logger.debug(logPrefix, 'It\'s a ' + ((0, _generics.getRandomInt)(0, 1) ? 'boy' : 'girl') + ':', child);

      logger.debug(logPrefix, '<--');
      return child;
    }
  }, {
    key: 'processOverpopulation',
    value: function processOverpopulation(width, height, area) {
      var _this2 = this;

      var logPrefix = ':processOverpopulation] ';
      logger.info(logPrefix, '-->');

      var dead = 0;
      var list = this.state.list;
      list.map(function (solution) {
        var freePos = _this2.getFreePositionInArea(solution.position, width, height, area).length;

        if (freePos == 0) {
          _this2.removeSolutionAt(solution.position);
          dead++;
          return false;
        }

        return true;
      });
      logger.info(logPrefix, 'During overpopulation', dead, 'are passed away');

      this.setState({
        dead: this.state.dead + dead
      });

      logger.info(logPrefix, '<--');
      return this;
    }
  }, {
    key: 'reproduceSolutions',
    value: function reproduceSolutions(width, height, range, area, mutability) {
      var _this3 = this;

      var logPrefix = ':reproduceSolutions] ';
      logger.debug(logPrefix, '-->');

      var born = 0;
      var list = this.state.list;
      list.map(function (dad, idx) {
        if ((0, _generics.getRandomInt)(0, 100) > range) {
          logger.debug(logPrefix, 'Missed reproduction due to fate');
          return dad;
        }

        var randIdx = (0, _generics.getRandomInt)(0, list.length - 1);
        while (randIdx == idx) {
          randIdx = (0, _generics.getRandomInt)(0, list.length - 1);
        }

        var couplingPos = {
          x: Math.ceil((dad.position.x + list[randIdx].position.x) / 2),
          y: Math.ceil((dad.position.y + list[randIdx].position.y) / 2)
        };
        var freePos = _this3.getFreePositionInArea(couplingPos, width, height, area);

        if (freePos.length == 0) {
          logger.debug(logPrefix, 'A new born missed due to no space in', couplingPos);
          return dad;
        }

        _this3.addSolution(_this3.generateSolutionChild(list[randIdx].skills, dad.skills, mutability), freePos[(0, _generics.getRandomInt)(0, freePos.length - 1)]);

        born++;
        return dad;
      });
      logger.info(logPrefix, born ? born + ' solutions are born :D' : 'No solution are born');

      logger.info(logPrefix, '<--');
      return this;
    }
  }]);

  return SolutionsCore;
}(_Core2.Core);

exports.default = SolutionsCore;

/***/ })
/******/ ]);