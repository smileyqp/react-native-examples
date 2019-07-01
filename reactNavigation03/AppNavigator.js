import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json



class LogoTitle extends React.Component {
    render() {
      return (
        <Image
          source={require('./logo.jpg')}
          style={{ width: 30, height: 30 }}
        />
      );
    }
  }


  class ModalScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 30 }}>This is a modal!</Text>
          <Button
            onPress={() => this.props.navigation.goBack()}
            title="Dismiss"
          />
        </View>
      );
    }
  }


class HomeScreen extends React.Component {
    
      static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
    
        return {
            title: 'Home',
          headerLeft: (
            <Button
              onPress={() => navigation.navigate('MyModal')}
              title="Info"
              color="#fff"
            />
          )
        };
      };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => {
            this.props.navigation.navigate('Details')
          }}
        />
        <Button   title="测试传参" onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Details', {
              itemId: 86,
              otherParam: 'anything you want here',
            });
          }}/>
      </View>
    );
  }  
}

class DetailsScreen extends React.Component {

    componentDidMount() {
        this.props.navigation.setParams({ increaseCount: this._increaseCount });
      }
    
      state = {
        count: 0,
      };
    
      _increaseCount = () => {
        this.setState({ count: this.state.count + 1 });
      };
    
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('otherParam', 'A Nested Details Screen'),
            headerRight: (
                <Button
                  onPress={navigation.getParam('increaseCount')}
                  title="+1"
                  color="#fff"
                />
              ),
        };
      };


  render() {



      /* 2. Get the param, provide a fallback value if not available */
      const { navigation } = this.props;
      const itemId = navigation.getParam('itemId', 'NO-ID');
      const otherParam = navigation.getParam('otherParam', 'some default value');
    //const {navigation} = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <Text>Count: {this.state.count}</Text>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push('Details')}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />




        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Button
            title="Update the title"
            onPress={() => this.props.navigation.setParams({otherParam: 'Updated!'})}
        />

      </View>
      
    );
  }  
}

const MainStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Details: {
    screen: DetailsScreen,
  }
},
{
    initialRouteName: 'Home',
    defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
}

);







const RootStack = createStackNavigator(
    {
      Main: {
        screen: MainStack,
      },
      MyModal: {
        screen: ModalScreen,
      },
    },
    {
      mode: 'modal',
      headerMode: 'none',
    }
  );

export default createAppContainer(RootStack);