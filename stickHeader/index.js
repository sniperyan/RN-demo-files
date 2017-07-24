/**
 * ScrollView stickyHeader
 */

import React, {Component,} from 'react'
import PropTypes from 'prop-types';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Animated,
} from 'react-native';

const ScrollViewStickyHeader = require('./ScrollViewStickyHeader');


class ScrollDemo extends Component {
    constructor(props, context) {
        super(props, context);
        this._scrollAnimatedValue = new Animated.Value(0);
        this._scrollAnimatedValueAttachment = null;
        this._stickyHeaderRefs = new Map();
        this._headerLayoutYs = new Map();
    }
    static defaultProps = {
        stickyHeaderIndices: [1, 3]
    }

    componentWillMount() {

    }

    componentDidMount() {
        this._updateAnimatedNodeAttachment();
    }

    componentDidUpdate() {
        this._updateAnimatedNodeAttachment();
    }

    componentWillUnmount() {
        if (this._scrollAnimatedValueAttachment) {
            this._scrollAnimatedValueAttachment.detach();
        }
    }


    _updateAnimatedNodeAttachment() {
        if (this.props.stickyHeaderIndices && this.props.stickyHeaderIndices.length > 0) {
            if (!this._scrollAnimatedValueAttachment) {
                this._scrollAnimatedValueAttachment = Animated.attachNativeEvent(
                    this._scrollViewRef,
                    'onScroll',
                    [{nativeEvent: {contentOffset: {y: this._scrollAnimatedValue}}}]
                );
            }
        } else {
            if (this._scrollAnimatedValueAttachment) {
                this._scrollAnimatedValueAttachment.detach();
            }
        }
    }

    _onScroll(e) {
        console.log(e.nativeEvent)
    }

    _setStickyHeaderRef(key, ref) {
        if (ref) {
            this._stickyHeaderRefs.set(key, ref);
        } else {
            this._stickyHeaderRefs.delete(key);
        }
    }

    _onStickyHeaderLayout(index, event, key) {
        if (!this.props.stickyHeaderIndices) {
            return;
        }
        //const childArray = React.Children.toArray(this.props.children);
        // if (key !== this._getKeyForIndex(index, childArray)) {
        //     // ignore stale layout update
        //     return;
        // }

        const layoutY = event.nativeEvent.layout.y;
        this._headerLayoutYs.set(key, layoutY);

        const indexOfIndex = this.props.stickyHeaderIndices.indexOf(index);
        const previousHeaderIndex = this.props.stickyHeaderIndices[indexOfIndex - 1];
        if (previousHeaderIndex != null) {
            const previousHeader = this._stickyHeaderRefs.get(3);
            previousHeader && previousHeader.setNextHeaderY(layoutY);
        }
    }

    render() {
        console.log('render')
        return (
            <View style={styles.wrapper}>
                <ScrollView
                    ref={(ref) => {
                        this._scrollViewRef = ref
                    }}
                    onScroll={(e) => this._onScroll(e)}
                    scrollEventThrottle={16}
                    stickyHeaderIndices={[1,3]}
                >
                    <View style={{height: 400, backgroundColor: '#f00'}}>
                        <Text>content1</Text>
                    </View>
                    <View style={{height: 40, backgroundColor: '#ccc'}}>
                        <Text>header1</Text>
                    </View>

                    <View style={{height: 400, backgroundColor: '#f00'}}>
                        <Text>content1</Text>
                    </View>

                    <View style={{height: 40, backgroundColor: '#ccc'}}>
                        <Text>header1</Text>
                    </View>

                    <View style={{height: 400, backgroundColor: '#f00'}}>
                        <Text>content1</Text>
                    </View>
                    <View style={{height: 400, backgroundColor: '#f00'}}>
                        <Text>content1</Text>
                    </View>
                    <View style={{height: 400, backgroundColor: '#f00'}}>
                        <Text>content1</Text>
                    </View>
                    <View style={{height: 400, backgroundColor: '#f00'}}>
                        <Text>content1</Text>
                    </View>
                    <View style={{height: 400, backgroundColor: '#f00'}}>
                        <Text>content1</Text>
                    </View>
                    <View style={{height: 400, backgroundColor: '#f00'}}>
                        <Text>content1</Text>
                    </View>

                </ScrollView>

            </View>



        )
    }
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,

    },
    content: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    textStyle: {
        fontSize: 20,
        color: '#ee394b'
    },
    whiteText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    }
});
module.exports = ScrollDemo