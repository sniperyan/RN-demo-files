/**
 * RN 0.45.0 flatList demo
 */
const React = require('react');
const ReactNative = require('react-native');
const {
    Image,
    Platform,
    TouchableHighlight,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
    FlatList,
    Dimensions,
    RefreshControl
} = ReactNative;
class MyListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        console.log('MyListItem render')
        const {id, title, selected} = this.props
        return (
            <TouchableHighlight
                {...this.props}
                onPress={this._onPress}

            >
                <View>
                    <View
                        style={[{height: 100, justifyContent: 'center', alignItems: 'center',},
                            selected ? {backgroundColor: '#f00'} : {backgroundColor: '#ccc'}
                        ]}>
                        <Text style={{fontSize: 30, color: '#fff'}}>{title}</Text>
                        <Text>红色=选中</Text>
                    </View>
                    <Image style={{height: 100}} source={require('./WX.png')}/>
                </View>


            </TouchableHighlight>
        )
    }
}

function getMockData() {
    let result = [];
    for (let i = 0; i < 250; i++) {
        result.push({
            id: i,
            title: `我是title${i}`,
        });
    }
    return result;
}
class DemoFlatList extends React.PureComponent {

    state = {
        selected: new Map(),
        isRefreshing: false
    };

    componentDidMount() {

    }

    static defaultProps = {
        data: getMockData()
    }

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (id) => {
        // updater functions are preferred for transactional updates
        console.log(this.state.selected.get(id))
        this.setState((state) => {
            // copy the map rather than modifying state.
            const selected = new Map(state.selected);
            selected.set(id, !selected.get(id)); // toggle
            return {selected};
        });
    };

    _renderItem = ({item}) => (
        <MyListItem
            id={item.id}
            onPressItem={this._onPressItem}
            selected={!!this.state.selected.get(item.id)}
            title={item.title}
        />
    );
    onRefresh = () => {
        this.setState({
            isRefreshing: true
        })
        setTimeout(()=>{
            this.setState({
                isRefreshing: false
            })
        },2000)
    }

    render() {
        return (
            <FlatList
                ItemSeparatorComponent={SeparatorComponent}
                ListEmptyComponent={EmptyComponent}
                ListFooterComponent={ListFooterComponent}
                ListHeaderComponent={ListHeaderComponent}
                data={this.props.data}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                getItemLayout={(data, index) => ({length: 200, offset: 230 * index, index})}
                initialNumToRender={1}
                initialScrollIndex={10}
                //refreshing={this.state.isRefreshing}
                //onRefresh={this.onRefresh}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.onRefresh}
                        tintColor="#fff"
                        title="Loading..."
                        titleColor="#fff"
                        colors={['#fff']}
                        progressBackgroundColor="#204c09"
                    />
                }
            />
        );
    }
}

class SeparatorComponent extends React.Component {
    render() {
        return (
            <View style={{height: 30, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center'}}>
                <Text>我是分割线</Text>
            </View>
        )
    }
}
class EmptyComponent extends React.Component {
    /**
     * 设置 defaultProps data:[]
     */
    render() {
        return (
            <View style={{height: 600, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center'}}>
                <Text>列表为空</Text>
            </View>
        )
    }
}
class ListFooterComponent extends React.Component {
    render() {
        return (
            <TouchableHighlight onPress={() => alert('I am ListFooterComponent')}>
                <View style={{height: 80, backgroundColor: '#ec0', justifyContent: 'center', alignItems: 'center'}}>
                    <Text>ListFooterComponent</Text>
                </View>
            </TouchableHighlight>
        )
    }
}
class ListHeaderComponent extends React.Component {
    render() {
        return (
            <TouchableHighlight onPress={() => alert('I am ListHeaderComponent')}>
                <View style={{height: 80, backgroundColor: '#ec0', justifyContent: 'center', alignItems: 'center'}}>
                    <Text>ListHeaderComponent</Text>
                </View>
            </TouchableHighlight>
        )
    }
}


module.exports = DemoFlatList;

