var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, HashRouter, Switch, Route, Link } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
var Main = function Main() {
    return React.createElement(
        'div',
        { className: 'primary-layout' },
        React.createElement(
            'main',
            null,
            React.createElement(
                'switch',
                null,
                React.createElement(Route, { exact: true, path: '/', component: HomePage }),
                React.createElement(Route, { path: '/ProductList', component: ProductList }),
                React.createElement(Route, { path: '/Gallery', component: Gallery })
            )
        )
    );
};
var Home = function Home() {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            'Welcome to the Tornadoes Website!'
        )
    );
};
var HomePage = function HomePage() {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'div',
            { id: 'page-loader' },
            React.createElement(
                'div',
                { 'class': 'loaders' },
                React.createElement('img', { src: 'assets/images/loader/3.gif', alt: 'First Loader' }),
                React.createElement('img', { src: 'assets/images/loader/4.gif', alt: 'First Loader' })
            )
        ),
        React.createElement(
            'header',
            { id: 'site-header' },
            React.createElement(
                'div',
                { id: 'site-header-top' },
                React.createElement(
                    'div',
                    { 'class': 'container' },
                    React.createElement(
                        'div',
                        { 'class': 'row' },
                        React.createElement(
                            'div',
                            { 'class': 'col-md-5' },
                            React.createElement(
                                'div',
                                { 'class': 'clearfix' },
                                React.createElement(
                                    'button',
                                    { 'class': 'btn btn-warning btn-lg header-btn visible-sm pull-right' },
                                    'RECOMMEND PROPERTIES'
                                ),
                                React.createElement('p', { 'class': 'timing-in-header' })
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'col-md-7' },
                            React.createElement(
                                'div',
                                { 'class': 'clearfix' },
                                React.createElement(
                                    'button',
                                    { 'class': 'btn btn-warning btn-lg header-btn hidden-sm' },
                                    'RECOMMEND PROPERTIES'
                                )
                            )
                        )
                    )
                )
            ),
            React.createElement(
                'div',
                { 'class': 'container' },
                React.createElement(
                    'div',
                    { 'class': 'row' },
                    React.createElement(
                        'div',
                        { 'class': 'col-md-3' },
                        React.createElement(
                            'figure',
                            { id: 'site-logo' },
                            React.createElement(
                                'a',
                                { href: 'index.html' },
                                React.createElement('img', { src: 'assets/images/logo.png', alt: 'Logo' })
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'col-md-6 col-sm-8' },
                        React.createElement(
                            'nav',
                            { id: 'site-nav', 'class': 'nav navbar-default' },
                            React.createElement(
                                'ul',
                                { 'class': 'nav navbar-nav' },
                                React.createElement(
                                    'li',
                                    null,
                                    React.createElement(
                                        'a',
                                        { href: 'index.html' },
                                        'Home'
                                    )
                                ),
                                React.createElement(
                                    'li',
                                    null,
                                    React.createElement(
                                        'a',
                                        { href: 'property-listing.html' },
                                        'Listing'
                                    )
                                ),
                                React.createElement(
                                    'li',
                                    null,
                                    React.createElement(
                                        'a',
                                        { href: 'gallery.html' },
                                        'Gallery'
                                    )
                                )
                            )
                        )
                    )
                )
            )
        ),
        React.createElement(
            'div',
            { 'class': 'main-slider-wrapper clearfix' },
            React.createElement(
                'div',
                { id: 'main-slider' },
                React.createElement(
                    'div',
                    { 'class': 'slide' },
                    React.createElement('img', { src: 'assets/images/slider/1.jpg', alt: 'Slide' })
                ),
                React.createElement(
                    'div',
                    { 'class': 'slide' },
                    React.createElement('img', { src: 'assets/images/slider/2.jpg', alt: 'Slide' })
                ),
                React.createElement(
                    'div',
                    { 'class': 'slide' },
                    React.createElement('img', { src: 'assets/images/slider/3.jpg', alt: 'Slide' })
                ),
                React.createElement(
                    'div',
                    { 'class': 'slide' },
                    React.createElement('img', { src: 'assets/images/slider/4.jpg', alt: 'Slide' })
                )
            ),
            React.createElement(
                'div',
                { id: 'slider-contents' },
                React.createElement(
                    'div',
                    { 'class': 'container text-center' },
                    React.createElement(
                        'div',
                        { 'class': 'jumbotron' },
                        React.createElement(
                            'h1',
                            null,
                            'Find Your Dream House'
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'contents clearfix' },
                            React.createElement(
                                'p',
                                null,
                                'If you dream of designing a new home that takes full advantage of the unique geography and views of land that you love'
                            )
                        ),
                        React.createElement(
                            'a',
                            { 'class': 'btn btn-warning btn-lg btn-3d', 'data-hover': 'Our Services', href: '#', role: 'button' },
                            'Our Services'
                        ),
                        React.createElement(
                            'a',
                            { 'class': 'btn btn-default btn-border btn-lg', href: '#', role: 'button' },
                            'Get a Quote'
                        )
                    )
                )
            )
        ),
        React.createElement('div', { id: 'advance-search', 'class': 'main-page clearfix' }),
        React.createElement('div', { id: 'search_result' })
    );
};
var ProductList = function ProductList() {
    return React.createElement(
        'div',
        null,
        'Users Page'
    );
};
var Gallery = function Gallery() {
    return React.createElement(
        'div',
        null,
        'Gallery Page'
    );
};

var App = function App() {
    return React.createElement(
        'div',
        null,
        React.createElement(Main, null)
    );
};

ReactDOM.render(React.createElement(
    HashRouter,
    null,
    React.createElement(App, null)
), document.getElementById('root'));

var Toggle = function (_React$Component) {
    _inherits(Toggle, _React$Component);

    function Toggle(props) {
        _classCallCheck(this, Toggle);

        var _this = _possibleConstructorReturn(this, (Toggle.__proto__ || Object.getPrototypeOf(Toggle)).call(this, props));

        _this.state = { value: 'Hello Runoob!' };
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }

    _createClass(Toggle, [{
        key: 'handleChange',
        value: function handleChange(event) {
            var myHeaders = new Headers({
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"

            });
            var url = 'http://127.0.0.1:5000/Search?location=' + document.getElementById('property-sub-location').value + '&check_in=1535291075&check_out=345600&guest_num=3';
            console.log(url);
            fetch(url, {
                method: 'get',
                headers: myHeaders

            }).then(function (response) {

                response.json().then(function (data) {
                    console.log(data['000000002']['price']);
                    ReactDOM.render(React.createElement(
                        'section',
                        { id: 'home-property-listing' },
                        React.createElement(
                            'header',
                            { 'class': 'section-header home-section-header text-center' },
                            React.createElement(
                                'div',
                                { 'class': 'container' },
                                React.createElement(
                                    'h2',
                                    { 'class': 'wow slideInRight' },
                                    'SEARCH RESULT'
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { 'class': 'container' },
                            React.createElement(
                                'div',
                                { 'class': 'row' },
                                React.createElement(
                                    'div',
                                    { 'class': 'col-lg-4 col-sm-6 layout-item-wrap' },
                                    React.createElement(
                                        'article',
                                        { 'class': 'property layout-item clearfix' },
                                        React.createElement(
                                            'figure',
                                            { 'class': 'feature-image' },
                                            React.createElement(
                                                'a',
                                                { 'class': 'clearfix zoom', href: 'single-property.html' },
                                                React.createElement('img', { 'data-action': 'zoom', src: 'assets/images/property/1.jpg', alt: 'Property Image' })
                                            ),
                                            React.createElement(
                                                'span',
                                                { 'class': 'btn btn-warning btn-sale' },
                                                'for sale'
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { 'class': 'property-contents clearfix' },
                                            React.createElement(
                                                'header',
                                                { 'class': 'property-header clearfix' },
                                                React.createElement(
                                                    'div',
                                                    { 'class': 'pull-left' },
                                                    React.createElement(
                                                        'h6',
                                                        { 'class': 'entry-title' },
                                                        React.createElement(
                                                            'a',
                                                            { href: 'single-property.html' },
                                                            'Guaranteed modern home'
                                                        )
                                                    ),
                                                    React.createElement(
                                                        'span',
                                                        { 'class': 'property-location' },
                                                        React.createElement('i', { 'class': 'fa fa-map-marker' }),
                                                        ' 14 Tottenham Road, London'
                                                    )
                                                ),
                                                React.createElement(
                                                    'button',
                                                    { 'class': 'btn btn-default btn-price pull-right btn-3d', 'data-hover': '$389.000' },
                                                    React.createElement(
                                                        'strong',
                                                        null,
                                                        data['000000002']['price']
                                                    )
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { 'class': 'property-meta clearfix' },
                                                React.createElement(
                                                    'span',
                                                    null,
                                                    React.createElement('i', { 'class': 'fa fa-arrows-alt' }),
                                                    ' 3060 SqFt'
                                                ),
                                                React.createElement(
                                                    'span',
                                                    null,
                                                    React.createElement('i', { 'class': 'fa fa-bed' }),
                                                    ' 3 Beds'
                                                ),
                                                React.createElement(
                                                    'span',
                                                    null,
                                                    React.createElement('i', { 'class': 'fa fa-bathtub' }),
                                                    ' 3 Baths'
                                                ),
                                                React.createElement(
                                                    'span',
                                                    null,
                                                    React.createElement('i', { 'class': 'fa fa-cab' }),
                                                    ' Yes'
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { 'class': 'contents clearfix' },
                                                React.createElement(
                                                    'p',
                                                    null,
                                                    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. '
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { 'class': 'author-box clearfix' },
                                                React.createElement(
                                                    'a',
                                                    { href: '#', 'class': 'author-img' },
                                                    React.createElement('img', { src: 'assets/images/agents/1.jpg', alt: 'Agent Image' })
                                                ),
                                                React.createElement(
                                                    'cite',
                                                    { 'class': 'author-name' },
                                                    'Personal Seller: ',
                                                    React.createElement(
                                                        'a',
                                                        { href: '#' },
                                                        'Linda Garret'
                                                    )
                                                ),
                                                React.createElement(
                                                    'span',
                                                    { 'class': 'phone' },
                                                    React.createElement('i', { 'class': 'fa fa-phone' }),
                                                    ' 00894 692-49-22'
                                                )
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { 'class': 'col-lg-4 col-sm-6 layout-item-wrap' },
                                    React.createElement(
                                        'article',
                                        { 'class': 'property layout-item clearfix' },
                                        React.createElement(
                                            'figure',
                                            { 'class': 'feature-image' },
                                            React.createElement(
                                                'a',
                                                { 'class': 'clearfix zoom', href: 'single-property.html' },
                                                React.createElement('img', { 'data-action': 'zoom', src: 'assets/images/property/2.jpg', alt: 'Property Image' })
                                            ),
                                            React.createElement(
                                                'span',
                                                { 'class': 'btn btn-warning btn-sale' },
                                                'for sale'
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { 'class': 'property-contents clearfix' },
                                            React.createElement(
                                                'header',
                                                { 'class': 'property-header clearfix' },
                                                React.createElement(
                                                    'div',
                                                    { 'class': 'pull-left' },
                                                    React.createElement(
                                                        'h6',
                                                        { 'class': 'entry-title' },
                                                        React.createElement(
                                                            'a',
                                                            { href: 'single-property.html' },
                                                            'Guaranteed modern home'
                                                        )
                                                    ),
                                                    React.createElement(
                                                        'span',
                                                        { 'class': 'property-location' },
                                                        React.createElement('i', { 'class': 'fa fa-map-marker' }),
                                                        ' 14 Tottenham Road, London'
                                                    )
                                                ),
                                                React.createElement(
                                                    'button',
                                                    { 'class': 'btn btn-default btn-price pull-right btn-3d', 'data-hover': '$389.000' },
                                                    React.createElement(
                                                        'strong',
                                                        null,
                                                        '$389.000'
                                                    )
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { 'class': 'property-meta clearfix' },
                                                React.createElement(
                                                    'span',
                                                    null,
                                                    React.createElement('i', { 'class': 'fa fa-arrows-alt' }),
                                                    ' 3060 SqFt'
                                                ),
                                                React.createElement(
                                                    'span',
                                                    null,
                                                    React.createElement('i', { 'class': 'fa fa-bed' }),
                                                    ' 3 Beds'
                                                ),
                                                React.createElement(
                                                    'span',
                                                    null,
                                                    React.createElement('i', { 'class': 'fa fa-bathtub' }),
                                                    ' 3 Baths'
                                                ),
                                                React.createElement(
                                                    'span',
                                                    null,
                                                    React.createElement('i', { 'class': 'fa fa-cab' }),
                                                    ' Yes'
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { 'class': 'contents clearfix' },
                                                React.createElement(
                                                    'p',
                                                    null,
                                                    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. '
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { 'class': 'author-box clearfix' },
                                                React.createElement(
                                                    'a',
                                                    { href: '#', 'class': 'author-img' },
                                                    React.createElement('img', { src: 'assets/images/agents/1.jpg', alt: 'Agent Image' })
                                                ),
                                                React.createElement(
                                                    'cite',
                                                    { 'class': 'author-name' },
                                                    'Personal Seller: ',
                                                    React.createElement(
                                                        'a',
                                                        { href: '#' },
                                                        'Linda Garret'
                                                    )
                                                ),
                                                React.createElement(
                                                    'span',
                                                    { 'class': 'phone' },
                                                    React.createElement('i', { 'class': 'fa fa-phone' }),
                                                    ' 00894 692-49-22'
                                                )
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { 'class': 'col-lg-4 col-sm-6 layout-item-wrap' },
                                    React.createElement(
                                        'article',
                                        { 'class': 'property layout-item clearfix' },
                                        React.createElement(
                                            'figure',
                                            { 'class': 'feature-image' },
                                            React.createElement(
                                                'a',
                                                { 'class': 'clearfix zoom', href: 'single-property.html' },
                                                React.createElement('img', { 'data-action': 'zoom', src: 'assets/images/property/3.jpg', alt: 'Property Image' })
                                            ),
                                            React.createElement(
                                                'span',
                                                { 'class': 'btn btn-warning btn-sale' },
                                                'for sale'
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { 'class': 'property-contents clearfix' },
                                            React.createElement(
                                                'header',
                                                { 'class': 'property-header clearfix' },
                                                React.createElement(
                                                    'div',
                                                    { 'class': 'pull-left' },
                                                    React.createElement(
                                                        'h6',
                                                        { 'class': 'entry-title' },
                                                        React.createElement(
                                                            'a',
                                                            { href: 'single-property.html' },
                                                            'Guaranteed modern home'
                                                        )
                                                    ),
                                                    React.createElement(
                                                        'span',
                                                        { 'class': 'property-location' },
                                                        React.createElement('i', { 'class': 'fa fa-map-marker' }),
                                                        ' 14 Tottenham Road, London'
                                                    )
                                                ),
                                                React.createElement(
                                                    'button',
                                                    { 'class': 'btn btn-default btn-price pull-right btn-3d', 'data-hover': '$389.000' },
                                                    React.createElement(
                                                        'strong',
                                                        null,
                                                        '$389.000'
                                                    )
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { 'class': 'property-meta clearfix' },
                                                React.createElement(
                                                    'span',
                                                    null,
                                                    React.createElement('i', { 'class': 'fa fa-arrows-alt' }),
                                                    ' 3060 SqFt'
                                                ),
                                                React.createElement(
                                                    'span',
                                                    null,
                                                    React.createElement('i', { 'class': 'fa fa-bed' }),
                                                    ' 3 Beds'
                                                ),
                                                React.createElement(
                                                    'span',
                                                    null,
                                                    React.createElement('i', { 'class': 'fa fa-bathtub' }),
                                                    ' 3 Baths'
                                                ),
                                                React.createElement(
                                                    'span',
                                                    null,
                                                    React.createElement('i', { 'class': 'fa fa-cab' }),
                                                    ' Yes'
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { 'class': 'contents clearfix' },
                                                React.createElement(
                                                    'p',
                                                    null,
                                                    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. '
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { 'class': 'author-box clearfix' },
                                                React.createElement(
                                                    'a',
                                                    { href: '#', 'class': 'author-img' },
                                                    React.createElement('img', { src: 'assets/images/agents/1.jpg', alt: 'Agent Image' })
                                                ),
                                                React.createElement(
                                                    'cite',
                                                    { 'class': 'author-name' },
                                                    'Personal Seller: ',
                                                    React.createElement(
                                                        'a',
                                                        { href: '#' },
                                                        'Linda Garret'
                                                    )
                                                ),
                                                React.createElement(
                                                    'span',
                                                    { 'class': 'phone' },
                                                    React.createElement('i', { 'class': 'fa fa-phone' }),
                                                    ' 00894 692-49-22'
                                                )
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { 'class': 'col-lg-4 col-sm-6 layout-item-wrap' },
                                    React.createElement(
                                        'article',
                                        { 'class': 'property layout-item clearfix' },
                                        React.createElement(
                                            'figure',
                                            { 'class': 'feature-image' },
                                            React.createElement(
                                                'a',
                                                { 'class': 'clearfix zoom', href: 'single-property.html' },
                                                React.createElement('img', { 'data-action': 'zoom', src: 'assets/images/property/4.jpg', alt: 'Property Image' })
                                            ),
                                            React.createElement(
                                                'span',
                                                { 'class': 'btn btn-warning btn-sale' },
                                                'for sale'
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { 'class': 'property-contents clearfix' },
                                            React.createElement(
                                                'header',
                                                { 'class': 'property-header clearfix' },
                                                React.createElement(
                                                    'div',
                                                    { 'class': 'pull-left' },
                                                    React.createElement(
                                                        'h6',
                                                        { 'class': 'entry-title' },
                                                        React.createElement(
                                                            'a',
                                                            { href: 'single-property.html' },
                                                            'Guaranteed modern home'
                                                        )
                                                    ),
                                                    React.createElement(
                                                        'span',
                                                        { 'class': 'property-location' },
                                                        React.createElement('i', { 'class': 'fa fa-map-marker' }),
                                                        ' 14 Tottenham Road, London'
                                                    )
                                                ),
                                                React.createElement(
                                                    'button',
                                                    { 'class': 'btn btn-default btn-price pull-right btn-3d', 'data-hover': '$389.000' },
                                                    React.createElement(
                                                        'strong',
                                                        null,
                                                        '$389.000'
                                                    )
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { 'class': 'property-meta clearfix' },
                                                React.createElement(
                                                    'span',
                                                    null,
                                                    React.createElement('i', { 'class': 'fa fa-arrows-alt' }),
                                                    ' 3060 SqFt'
                                                ),
                                                React.createElement(
                                                    'span',
                                                    null,
                                                    React.createElement('i', { 'class': 'fa fa-bed' }),
                                                    ' 3 Beds'
                                                ),
                                                React.createElement(
                                                    'span',
                                                    null,
                                                    React.createElement('i', { 'class': 'fa fa-bathtub' }),
                                                    ' 3 Baths'
                                                ),
                                                React.createElement(
                                                    'span',
                                                    null,
                                                    React.createElement('i', { 'class': 'fa fa-cab' }),
                                                    ' Yes'
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { 'class': 'contents clearfix' },
                                                React.createElement(
                                                    'p',
                                                    null,
                                                    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. '
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { 'class': 'author-box clearfix' },
                                                React.createElement(
                                                    'a',
                                                    { href: '#', 'class': 'author-img' },
                                                    React.createElement('img', { src: 'assets/images/agents/1.jpg', alt: 'Agent Image' })
                                                ),
                                                React.createElement(
                                                    'cite',
                                                    { 'class': 'author-name' },
                                                    'Personal Seller: ',
                                                    React.createElement(
                                                        'a',
                                                        { href: '#' },
                                                        'Linda Garret'
                                                    )
                                                ),
                                                React.createElement(
                                                    'span',
                                                    { 'class': 'phone' },
                                                    React.createElement('i', { 'class': 'fa fa-phone' }),
                                                    ' 00894 692-49-22'
                                                )
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { 'class': 'col-lg-4 col-sm-6 layout-item-wrap' },
                                    React.createElement(
                                        'article',
                                        { 'class': 'property layout-item clearfix' },
                                        React.createElement(
                                            'figure',
                                            { 'class': 'feature-image' },
                                            React.createElement(
                                                'a',
                                                { 'class': 'clearfix zoom', href: 'single-property.html' },
                                                React.createElement('img', { 'data-action': 'zoom', src: 'assets/images/property/5.jpg', alt: 'Property Image' })
                                            ),
                                            React.createElement(
                                                'span',
                                                { 'class': 'btn btn-warning btn-sale' },
                                                'for sale'
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { 'class': 'property-contents clearfix' },
                                            React.createElement(
                                                'header',
                                                { 'class': 'property-header clearfix' },
                                                React.createElement(
                                                    'div',
                                                    { 'class': 'pull-left' },
                                                    React.createElement(
                                                        'h6',
                                                        { 'class': 'entry-title' },
                                                        React.createElement(
                                                            'a',
                                                            { href: 'single-property.html' },
                                                            'Guaranteed modern home'
                                                        )
                                                    ),
                                                    React.createElement(
                                                        'span',
                                                        { 'class': 'property-location' },
                                                        React.createElement('i', { 'class': 'fa fa-map-marker' }),
                                                        ' 14 Tottenham Road, London'
                                                    )
                                                ),
                                                React.createElement(
                                                    'button',
                                                    { 'class': 'btn btn-default btn-price pull-right btn-3d', 'data-hover': '$389.000' },
                                                    React.createElement(
                                                        'strong',
                                                        null,
                                                        '$389.000'
                                                    )
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { 'class': 'property-meta clearfix' },
                                                React.createElement(
                                                    'span',
                                                    null,
                                                    React.createElement('i', { 'class': 'fa fa-arrows-alt' }),
                                                    ' 3060 SqFt'
                                                ),
                                                React.createElement(
                                                    'span',
                                                    null,
                                                    React.createElement('i', { 'class': 'fa fa-bed' }),
                                                    ' 3 Beds'
                                                ),
                                                React.createElement(
                                                    'span',
                                                    null,
                                                    React.createElement('i', { 'class': 'fa fa-bathtub' }),
                                                    ' 3 Baths'
                                                ),
                                                React.createElement(
                                                    'span',
                                                    null,
                                                    React.createElement('i', { 'class': 'fa fa-cab' }),
                                                    ' Yes'
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { 'class': 'contents clearfix' },
                                                React.createElement(
                                                    'p',
                                                    null,
                                                    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. '
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { 'class': 'author-box clearfix' },
                                                React.createElement(
                                                    'a',
                                                    { href: '#', 'class': 'author-img' },
                                                    React.createElement('img', { src: 'assets/images/agents/1.jpg', alt: 'Agent Image' })
                                                ),
                                                React.createElement(
                                                    'cite',
                                                    { 'class': 'author-name' },
                                                    'Personal Seller: ',
                                                    React.createElement(
                                                        'a',
                                                        { href: '#' },
                                                        'Linda Garret'
                                                    )
                                                ),
                                                React.createElement(
                                                    'span',
                                                    { 'class': 'phone' },
                                                    React.createElement('i', { 'class': 'fa fa-phone' }),
                                                    ' 00894 692-49-22'
                                                )
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { 'class': 'col-lg-4 col-sm-6 layout-item-wrap' },
                                    React.createElement(
                                        'article',
                                        { 'class': 'property layout-item clearfix' },
                                        React.createElement(
                                            'figure',
                                            { 'class': 'feature-image' },
                                            React.createElement(
                                                'a',
                                                { 'class': 'clearfix zoom', href: 'single-property.html' },
                                                React.createElement('img', { 'data-action': 'zoom', src: 'assets/images/property/6.jpg', alt: 'Property Image' })
                                            ),
                                            React.createElement(
                                                'span',
                                                { 'class': 'btn btn-warning btn-sale' },
                                                'for sale'
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { 'class': 'property-contents clearfix' },
                                            React.createElement(
                                                'header',
                                                { 'class': 'property-header clearfix' },
                                                React.createElement(
                                                    'div',
                                                    { 'class': 'pull-left' },
                                                    React.createElement(
                                                        'h6',
                                                        { 'class': 'entry-title' },
                                                        React.createElement(
                                                            'a',
                                                            { href: 'single-property.html' },
                                                            'Guaranteed modern home'
                                                        )
                                                    ),
                                                    React.createElement(
                                                        'span',
                                                        { 'class': 'property-location' },
                                                        React.createElement('i', { 'class': 'fa fa-map-marker' }),
                                                        ' 14 Tottenham Road, London'
                                                    )
                                                ),
                                                React.createElement(
                                                    'button',
                                                    { 'class': 'btn btn-default btn-price pull-right btn-3d', 'data-hover': '$389.000' },
                                                    React.createElement(
                                                        'strong',
                                                        null,
                                                        '$389.000'
                                                    )
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { 'class': 'property-meta clearfix' },
                                                React.createElement(
                                                    'span',
                                                    null,
                                                    React.createElement('i', { 'class': 'fa fa-arrows-alt' }),
                                                    ' 3060 SqFt'
                                                ),
                                                React.createElement(
                                                    'span',
                                                    null,
                                                    React.createElement('i', { 'class': 'fa fa-bed' }),
                                                    ' 3 Beds'
                                                ),
                                                React.createElement(
                                                    'span',
                                                    null,
                                                    React.createElement('i', { 'class': 'fa fa-bathtub' }),
                                                    ' 3 Baths'
                                                ),
                                                React.createElement(
                                                    'span',
                                                    null,
                                                    React.createElement('i', { 'class': 'fa fa-cab' }),
                                                    ' Yes'
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { 'class': 'contents clearfix' },
                                                React.createElement(
                                                    'p',
                                                    null,
                                                    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. '
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { 'class': 'author-box clearfix' },
                                                React.createElement(
                                                    'a',
                                                    { href: '#', 'class': 'author-img' },
                                                    React.createElement('img', { src: 'assets/images/agents/1.jpg', alt: 'Agent Image' })
                                                ),
                                                React.createElement(
                                                    'cite',
                                                    { 'class': 'author-name' },
                                                    'Personal Seller: ',
                                                    React.createElement(
                                                        'a',
                                                        { href: '#' },
                                                        'Linda Garret'
                                                    )
                                                ),
                                                React.createElement(
                                                    'span',
                                                    { 'class': 'phone' },
                                                    React.createElement('i', { 'class': 'fa fa-phone' }),
                                                    ' 00894 692-49-22'
                                                )
                                            )
                                        )
                                    )
                                ),
                                '        '
                            )
                        )
                    ), document.getElementById('search_result'));
                });
            }).catch(function (e) {
                console.log("Oops, error");
            });

            this.setState({ value: '菜鸟教程' });
        }
    }, {
        key: 'render',
        value: function render() {
            var value = this.state.value;
            return React.createElement(
                'div',
                { 'class': 'container' },
                React.createElement(
                    'form',
                    { action: '#', id: 'adv-search-form', 'class': 'clearfix' },
                    React.createElement(
                        'fieldset',
                        null,
                        React.createElement(
                            'select',
                            { name: 'sub-location', id: 'property-sub-location' },
                            React.createElement(
                                'option',
                                { value: '' },
                                'All Areas'
                            ),
                            React.createElement(
                                'option',
                                { value: 'Alexandria' },
                                ' Alexandria'
                            ),
                            React.createElement(
                                'option',
                                { value: 'Kingsford' },
                                ' Kingsford'
                            ),
                            React.createElement(
                                'option',
                                { value: 'Zetland' },
                                ' Zetland'
                            ),
                            React.createElement(
                                'option',
                                { value: 'Victoria' },
                                ' Victoria'
                            ),
                            React.createElement(
                                'option',
                                { value: 'coconut-grove' },
                                ' Coconut Grove'
                            ),
                            React.createElement(
                                'option',
                                { value: 'downtown' },
                                ' Downtown'
                            ),
                            React.createElement(
                                'option',
                                { value: 'eagle-rock' },
                                ' Eagle Rock'
                            ),
                            React.createElement(
                                'option',
                                { value: 'englewood' },
                                ' Englewood'
                            ),
                            React.createElement(
                                'option',
                                { value: 'hermosa' },
                                ' Hermosa'
                            ),
                            React.createElement(
                                'option',
                                { value: 'hollywood' },
                                ' Hollywood '
                            ),
                            React.createElement(
                                'option',
                                { value: 'lincoln-park' },
                                ' Lincoln Park'
                            ),
                            React.createElement(
                                'option',
                                { value: 'manhattan' },
                                ' Manhattan'
                            ),
                            React.createElement(
                                'option',
                                { value: 'midtown' },
                                ' Midtown'
                            ),
                            React.createElement(
                                'option',
                                { value: 'queens' },
                                ' Queens'
                            ),
                            React.createElement(
                                'option',
                                { value: 'westwood' },
                                ' Westwood '
                            ),
                            React.createElement(
                                'option',
                                { value: 'wynwood' },
                                ' Wynwood'
                            )
                        ),
                        React.createElement(
                            'select',
                            { id: 'property-status', name: 'status' },
                            React.createElement(
                                'option',
                                { value: '' },
                                'All Status'
                            ),
                            React.createElement(
                                'option',
                                { value: 'for-rent' },
                                ' For Rent'
                            ),
                            React.createElement(
                                'option',
                                { value: 'for-sale' },
                                ' For Sale'
                            ),
                            React.createElement(
                                'option',
                                { value: 'foreclosures' },
                                ' Foreclosures'
                            ),
                            React.createElement(
                                'option',
                                { value: 'new-costruction' },
                                ' New Costruction'
                            ),
                            React.createElement(
                                'option',
                                { value: 'new-listing' },
                                ' New Listing'
                            ),
                            React.createElement(
                                'option',
                                { value: 'open-house' },
                                ' Open House'
                            ),
                            React.createElement(
                                'option',
                                { value: 'reduced-price' },
                                ' Reduced Price'
                            ),
                            React.createElement(
                                'option',
                                { value: 'resale' },
                                ' Resale'
                            )
                        ),
                        React.createElement(
                            'select',
                            { id: 'property-type', name: 'type' },
                            React.createElement(
                                'option',
                                { value: '' },
                                'All Types'
                            ),
                            React.createElement(
                                'option',
                                { value: 'apartment' },
                                ' Apartment'
                            ),
                            React.createElement(
                                'option',
                                { value: 'condo' },
                                ' Condo'
                            ),
                            React.createElement(
                                'option',
                                { value: 'farm' },
                                ' Farm'
                            ),
                            React.createElement(
                                'option',
                                { value: 'loft' },
                                ' Loft'
                            ),
                            React.createElement(
                                'option',
                                { value: 'lot' },
                                ' Lot'
                            ),
                            React.createElement(
                                'option',
                                { value: 'multi-family-home' },
                                ' Multi Family Home'
                            ),
                            React.createElement(
                                'option',
                                { value: 'single-family-home' },
                                ' Single Family Home'
                            ),
                            React.createElement(
                                'option',
                                { value: 'townhouse' },
                                ' Townhouse'
                            ),
                            React.createElement(
                                'option',
                                { value: 'villa' },
                                ' Villa'
                            )
                        ),
                        React.createElement(
                            'select',
                            { name: 'bedrooms', id: 'property-beds' },
                            React.createElement(
                                'option',
                                { value: '' },
                                'Beds'
                            ),
                            React.createElement(
                                'option',
                                { value: '1' },
                                '1'
                            ),
                            React.createElement(
                                'option',
                                { value: '2' },
                                '2'
                            ),
                            React.createElement(
                                'option',
                                { value: '3' },
                                '3'
                            ),
                            React.createElement(
                                'option',
                                { value: '4' },
                                '4'
                            ),
                            React.createElement(
                                'option',
                                { value: '5' },
                                '5'
                            ),
                            React.createElement(
                                'option',
                                { value: '6' },
                                '6'
                            ),
                            React.createElement(
                                'option',
                                { value: '7' },
                                '7'
                            ),
                            React.createElement(
                                'option',
                                { value: '8' },
                                '8'
                            ),
                            React.createElement(
                                'option',
                                { value: '9' },
                                '9'
                            ),
                            React.createElement(
                                'option',
                                { value: '10' },
                                '10'
                            ),
                            React.createElement(
                                'option',
                                { value: 'any' },
                                'Any'
                            )
                        ),
                        React.createElement(
                            'select',
                            { name: 'bathrooms', id: 'property-baths' },
                            React.createElement(
                                'option',
                                { value: '' },
                                'Bathrooms'
                            ),
                            React.createElement(
                                'option',
                                { value: '1' },
                                '1'
                            ),
                            React.createElement(
                                'option',
                                { value: '2' },
                                '2'
                            ),
                            React.createElement(
                                'option',
                                { value: '3' },
                                '3'
                            ),
                            React.createElement(
                                'option',
                                { value: '4' },
                                '4'
                            ),
                            React.createElement(
                                'option',
                                { value: '5' },
                                '5'
                            ),
                            React.createElement(
                                'option',
                                { value: '6' },
                                '6'
                            ),
                            React.createElement(
                                'option',
                                { value: '7' },
                                '7'
                            ),
                            React.createElement(
                                'option',
                                { value: '8' },
                                '8'
                            ),
                            React.createElement(
                                'option',
                                { value: '9' },
                                '9'
                            ),
                            React.createElement(
                                'option',
                                { value: '10' },
                                '10'
                            ),
                            React.createElement(
                                'option',
                                { value: 'any' },
                                'Any'
                            )
                        ),
                        React.createElement('input', { type: 'text', name: 'min-area', id: 'property-min-area', placeholder: 'Min Area (sqft)' }),
                        React.createElement('input', { type: 'text', name: 'max-area', id: 'property-max-area', placeholder: 'Max Area (sqft)' }),
                        React.createElement(
                            'select',
                            { name: 'min-price', id: 'property-min-price' },
                            React.createElement(
                                'option',
                                { value: 'any', selected: 'selected' },
                                'Min Price'
                            ),
                            React.createElement(
                                'option',
                                { value: '1000' },
                                '$1000'
                            ),
                            React.createElement(
                                'option',
                                { value: '5000' },
                                '$5000'
                            ),
                            React.createElement(
                                'option',
                                { value: '10000' },
                                '$10000'
                            ),
                            React.createElement(
                                'option',
                                { value: '50000' },
                                '$50000'
                            ),
                            React.createElement(
                                'option',
                                { value: '100000' },
                                '$100000'
                            ),
                            React.createElement(
                                'option',
                                { value: '200000' },
                                '$200000'
                            ),
                            React.createElement(
                                'option',
                                { value: '300000' },
                                '$300000'
                            ),
                            React.createElement(
                                'option',
                                { value: '400000' },
                                '$400000'
                            ),
                            React.createElement(
                                'option',
                                { value: '500000' },
                                '$500000'
                            ),
                            React.createElement(
                                'option',
                                { value: '600000' },
                                '$600000'
                            ),
                            React.createElement(
                                'option',
                                { value: '700000' },
                                '$700000'
                            ),
                            React.createElement(
                                'option',
                                { value: '800000' },
                                '$800000'
                            ),
                            React.createElement(
                                'option',
                                { value: '900000' },
                                '$900000'
                            ),
                            React.createElement(
                                'option',
                                { value: '1000000' },
                                '$1000000'
                            ),
                            React.createElement(
                                'option',
                                { value: '1500000' },
                                '$1500000'
                            ),
                            React.createElement(
                                'option',
                                { value: '2000000' },
                                '$2000000'
                            ),
                            React.createElement(
                                'option',
                                { value: '2500000' },
                                '$2500000'
                            ),
                            React.createElement(
                                'option',
                                { value: '5000000' },
                                '$5000000'
                            )
                        ),
                        React.createElement(
                            'select',
                            { name: 'max-price', id: 'property-max-price' },
                            React.createElement(
                                'option',
                                { value: 'any', selected: 'selected' },
                                'Max Price'
                            ),
                            React.createElement(
                                'option',
                                { value: '5000' },
                                '$5000'
                            ),
                            React.createElement(
                                'option',
                                { value: '10000' },
                                '$10000'
                            ),
                            React.createElement(
                                'option',
                                { value: '50000' },
                                '$50000'
                            ),
                            React.createElement(
                                'option',
                                { value: '100000' },
                                '$100000'
                            ),
                            React.createElement(
                                'option',
                                { value: '200000' },
                                '$200000'
                            ),
                            React.createElement(
                                'option',
                                { value: '300000' },
                                '$300000'
                            ),
                            React.createElement(
                                'option',
                                { value: '400000' },
                                '$400000'
                            ),
                            React.createElement(
                                'option',
                                { value: '500000' },
                                '$500000'
                            ),
                            React.createElement(
                                'option',
                                { value: '600000' },
                                '$600000'
                            ),
                            React.createElement(
                                'option',
                                { value: '700000' },
                                '$700000'
                            ),
                            React.createElement(
                                'option',
                                { value: '800000' },
                                '$800000'
                            ),
                            React.createElement(
                                'option',
                                { value: '900000' },
                                '$900000'
                            ),
                            React.createElement(
                                'option',
                                { value: '1000000' },
                                '$1000000'
                            ),
                            React.createElement(
                                'option',
                                { value: '1500000' },
                                '$1500000'
                            ),
                            React.createElement(
                                'option',
                                { value: '2000000' },
                                '$2000000'
                            ),
                            React.createElement(
                                'option',
                                { value: '2500000' },
                                '$2500000'
                            ),
                            React.createElement(
                                'option',
                                { value: '5000000' },
                                '$5000000'
                            ),
                            React.createElement(
                                'option',
                                { value: '10000000' },
                                '$10000000'
                            )
                        )
                    )
                ),
                React.createElement(
                    'button',
                    { onClick: this.handleChange, 'class': 'btn btn-default btn-lg text-center' },
                    'Search ',
                    React.createElement('br', { 'class': 'hidden-sm hidden-xs' }),
                    ' Property'
                )
            );
        }
    }]);

    return Toggle;
}(React.Component);

ReactDOM.render(React.createElement(Toggle, null), document.getElementById('advance-search'));
registerServiceWorker();