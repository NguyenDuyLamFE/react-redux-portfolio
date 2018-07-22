import React, { Component } from 'react'
import Nav from "../Nav"
import $ from 'jquery'
import Velocity from 'velocity-animate'
import { connect } from 'react-redux'
import Spinner from 'react-spinkit'
import baloonAbout from '../../media/baloon-about.png'
import title from '../../media/about-title.png'

class About extends Component{
    
    constructor(props) {
        super(props);
        this.state = this.state = {            
            loading: true
         }
    }

    componentWillMount() {   
        setTimeout(() => {
            this.setState({loading: false})
        }, 2000)
    }

    render(){     

        $(document).ready(function($){   
            //variables
            var hijacking= $('.main-body').data('hijacking'),
                animationType = $('.main-body').data('animation'),
                delta = 0,
                scrollThreshold = 5,
                actual = 1,
                animating = false;

            //DOM elements
            var sectionsAvailable = $('.cd-section'),
                verticalNav = $('.cd-vertical-nav'),
                prevArrow = verticalNav.find('i.cd-prev'),
                nextArrow = verticalNav.find('i.cd-next');

            bindEvents();

            nextArrow.velocity({
                translateY: "10px"
            }, {
                loop: true,
                delay: 80
            }).velocity("reverse");

            prevArrow.velocity({
                translateY: "-10px"
            }, {
                loop: true,
                delay: 80
            }).velocity("reverse");

            function bindEvents() {
                // if( MQ === 'desktop' && bool ) {
                    //bind the animation to the window scroll event, arrows click and keyboard
                    if( hijacking === 'on' ) {
                        initHijacking();
                        $(window).on('DOMMouseScroll mousewheel', scrollHijacking);
                    }
                    prevArrow.on('click', prevSection);
                    nextArrow.on('click', nextSection);

                    $(document).on('keydown', function(event){
                        if( event.which==='40' && !nextArrow.hasClass('inactive') ) {
                            event.preventDefault();
                            nextSection();
                        } else if( event.which==='38' && (!prevArrow.hasClass('inactive') || (prevArrow.hasClass('inactive') && $(window).scrollTop() !== sectionsAvailable.eq(0).offset().top) ) ) {
                            event.preventDefault();
                            prevSection();
                        }
                    });
                    checkNavigation();
            }

            function initHijacking() {
                // initialize section style - scrollhijacking
                var visibleSection = sectionsAvailable.filter('.visible'),
                    topSection = visibleSection.prevAll('.cd-section'),
                    bottomSection = visibleSection.nextAll('.cd-section'),
                    animationParams = selectAnimation(animationType, false),
                    animationVisible = animationParams[0],
                    animationTop = animationParams[1],
                    animationBottom = animationParams[2];

                visibleSection.children('div').velocity(animationVisible, 1, function(){
                    visibleSection.css('opacity', 1);
                    topSection.css('opacity', 1);
                    bottomSection.css('opacity', 1);
                });
                topSection.children('div').velocity(animationTop, 0);
                bottomSection.children('div').velocity(animationBottom, 0);
            }

            function scrollHijacking (event) {
                // on mouse scroll - check if animate section
                if (event.originalEvent.detail < 0 || event.originalEvent.wheelDelta > 0) {
                    delta--;
                    ( Math.abs(delta) >= scrollThreshold) && prevSection();
                } else {
                    delta++;
                    (delta >= scrollThreshold) && nextSection();
                }
                return false;
            }

            function prevSection(event) {
                //go to previous section
                typeof event !== 'undefined' && event.preventDefault();

                var visibleSection = sectionsAvailable.filter('.visible'),
                    middleScroll = ( hijacking === 'off' && $(window).scrollTop() !== visibleSection.offset().top) ? true : false;
                visibleSection = middleScroll ? visibleSection.next('.cd-section') : visibleSection;

                var animationParams = selectAnimation(animationType, middleScroll, 'prev');
                unbindScroll(visibleSection.prev('.cd-section'), animationParams[3]);

                if( !animating && !visibleSection.is(":first-child") ) {
                    animating = true;
                    visibleSection.removeClass('visible').children('div').velocity(animationParams[2], animationParams[3], animationParams[4])
                        .end().prev('.cd-section').addClass('visible').children('div').velocity(animationParams[0] , animationParams[3], animationParams[4], function(){
                        animating = false;
                        // if( hijacking === 'off') $(window).on('scroll', scrollAnimation);
                    });

                    actual = actual - 1;
                }

                resetScroll();
            }

            function nextSection(event) {
                //go to next section
                typeof event !== 'undefined' && event.preventDefault();

                var visibleSection = sectionsAvailable.filter('.visible'),
                    middleScroll = ( hijacking === 'off' && $(window).scrollTop() !== visibleSection.offset().top) ? true : false;

                var animationParams = selectAnimation(animationType, middleScroll, 'next');
                unbindScroll(visibleSection.next('.cd-section'), animationParams[3]);

                if(!animating && !visibleSection.is(":last-of-type") ) {
                    animating = true;
                    visibleSection.removeClass('visible').children('div').velocity(animationParams[1], animationParams[3], animationParams[4] )
                        .end().next('.cd-section').addClass('visible').children('div').velocity(animationParams[0], animationParams[3], animationParams[4], function(){
                        animating = false;
                        // if( hijacking === 'off') $(window).on('scroll', scrollAnimation);
                    });

                    actual = actual +1;
                }
                resetScroll();
            }

            function unbindScroll(section, time) {
                //if clicking on navigation - unbind scroll and animate using custom velocity animation
                if( hijacking === 'off') {
                    // $(window).off('scroll', scrollAnimation);
                    ( animationType === 'catch') ? $('.main-body, html').scrollTop(section.offset().top) : section.velocity("scroll", { duration: time });
                }
            }

            function resetScroll() {
                delta = 0;
                checkNavigation();
            }

            function checkNavigation() {
                //update navigation arrows visibility
                if ( sectionsAvailable.filter('.visible').is(':first-of-type') ) {
                    
                    prevArrow.addClass('inactive');

                    
                }
                else {
                    prevArrow.removeClass('inactive');
                    
                }                                       
                ( sectionsAvailable.filter('.visible').is(':last-of-type')  ) ? nextArrow.addClass('inactive') : nextArrow.removeClass('inactive');
            }

            function selectAnimation(animationName, middleScroll, direction) {
                // select section animation - scrollhijacking
                var animationVisible = 'translateNone',
                    animationTop = 'translateUp',
                    animationBottom = 'translateDown',
                    easing = 'ease',
                    animDuration = 1500;

                    if( middleScroll ) {
                        animationTop = 'scaleDown.moveUp.scroll';
                        animationVisible = 'scaleUp.moveUp.scroll';
                        animationBottom = 'scaleDown.moveDown.scroll';
                    } else {
                        animationVisible = (direction === 'next') ? 'scaleUp.moveUp' : 'scaleUp.moveDown';
                        animationTop = 'scaleDown.moveUp';
                        animationBottom = 'scaleDown.moveDown';
                    }

                return [animationVisible, animationTop, animationBottom, animDuration, easing];
            }

        });
        
        /* Custom effects registration - feature available in the Velocity UI pack */
            //none
            $.Velocity
                .RegisterEffect("translateUp", {
                    defaultDuration: 1,
                    calls: [
                        [ { translateY: '-100%'}, 1]
                    ]
                });
            $.Velocity
                .RegisterEffect("translateDown", {
                    defaultDuration: 1,
                    calls: [
                        [ { translateY: '100%'}, 1]
                    ]
                });
            $.Velocity
                .RegisterEffect("translateNone", {
                    defaultDuration: 1,
                    calls: [
                        [ { translateY: '0', opacity: '1', scale: '1', rotateX: '0', boxShadowBlur: '0'}, 1]
                    ]
                });
    
            //gallery
            $.Velocity
                .RegisterEffect("scaleDown.moveUp", {
                    defaultDuration: 1,
                    calls: [
                        [ { translateY: '-10%', scale: '0.8', boxShadowBlur: '40px'}, 0.30 ],
                        [ { translateY: '-100%' }, 0.60 ],
                        [ { translateY: '-100%', scale: '1', boxShadowBlur: '0' }, 0.30 ]
                    ]
                });
            $.Velocity
                .RegisterEffect("scaleDown.moveUp.scroll", {
                    defaultDuration: 1,
                    calls: [
                        [ { translateY: '-100%', scale: '0.8', boxShadowBlur: '40px' }, 0.60 ],
                        [ { translateY: '-100%', scale: '1', boxShadowBlur: '0' }, 0.40 ]
                    ]
                });
            $.Velocity
                .RegisterEffect("scaleUp.moveUp", {
                    defaultDuration: 1,
                    calls: [
                        [ { translateY: '90%', scale: '0.8', boxShadowBlur: '40px' }, 0.30 ],
                        [ { translateY: '0%' }, 0.60 ],
                        [ { translateY: '0%', scale: '1', boxShadowBlur: '0'}, 0.30 ]
                    ]
                });
            $.Velocity
                .RegisterEffect("scaleUp.moveUp.scroll", {
                    defaultDuration: 1,
                    calls: [
                        [ { translateY: '0%', scale: '0.8' , boxShadowBlur: '40px' }, 0.60 ],
                        [ { translateY: '0%', scale: '1', boxShadowBlur: '0'}, 0.40 ]
                    ]
                });
            $.Velocity
                .RegisterEffect("scaleDown.moveDown", {
                    defaultDuration: 1,
                    calls: [
                        [ { translateY: '10%', scale: '0.8', boxShadowBlur: '40px'}, 0.30 ],
                        [ { translateY: '100%' }, 0.60 ],
                        [ { translateY: '100%', scale: '1', boxShadowBlur: '0'}, 0.30 ]
                    ]
                });
            $.Velocity
                .RegisterEffect("scaleDown.moveDown.scroll", {
                    defaultDuration: 1,
                    calls: [
                        [ { translateY: '100%', scale: '0.8', boxShadowBlur: '40px' }, 0.60 ],
                        [ { translateY: '100%', scale: '1', boxShadowBlur: '0' }, 0.40 ]
                    ]
                });
            $.Velocity
                .RegisterEffect("scaleUp.moveDown", {
                    defaultDuration: 1,
                    calls: [
                        [ { translateY: '-90%', scale: '0.8', boxShadowBlur: '40px' }, 0.30 ],
                        [ { translateY: '0%' }, 0.60 ],
                        [ { translateY: '0%', scale: '1', boxShadowBlur: '0'}, 0.30 ]
                    ]
                });

        if (this.state.loading) {
            return (
                <div className= 'loadContainer'>
                    <div className= 'Spinner'>
                        <Spinner  name="pacman" color="yellow"/>
                    </div>
                    
                </div>
            )            
        }

        return (
                <div className="main-body" data-hijacking="on" data-animation="gallery">
                    <Nav/>
                    <section data-index="1" className="cd-section visible">
                        <div>
                            {/* <h2>Page Scroll Effects</h2> */}
                            <img className="baloon-A" src={baloonAbout} alt="Baloon Man"/>
                            <img className="about-title" src={title} alt="Tille"/>
                            <div className="scroll">Scroll</div>
                        </div>
                    </section>

                    <section data-index="2" className="cd-section">
                        <div>
                            <h2>Section 2</h2>
                        </div>
                    </section>

                    <section data-index="3" className="cd-section">
                        <div>
                            <h2>Section 3</h2>
                        </div>
                    </section>

                    <section data-index="4" className="cd-section">
                        <div>
                            <h2>Section 4</h2>
                        </div>
                    </section>

                    <section data-index="5" className="cd-section">
                        <div>
                            <h2>Section 5</h2>
                        </div>
                    </section>


                        <div className="cd-vertical-nav">
                            <span><i href="#0" title="Previous Section" className="icon cd-prev material-icons inactive">keyboard_arrow_up</i></span>
                            <span><i href="#0" title="Next Section" className="icon cd-next material-icons">keyboard_arrow_down</i></span>                           
                        </div>

                </div>
        )
    }

    
}

export default connect(function (store) {
    return { isLoaded: store.loader }
})(About);
