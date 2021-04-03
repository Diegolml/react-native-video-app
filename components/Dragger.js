import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Animated,
  PanResponder,
  Dimensions
} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default class component extends Component {
  constructor(props) {
    super(props)
    // naming it initialX clearly indicates that the only purpose
    // of the passed down prop is to initialize something internally
    const initialUsedSpace = Math.abs(this.props.initialDrawerSize);
    const initialDrawerSize = (SCREEN_HEIGHT * (1 - initialUsedSpace));

    this.state = {
      touched: 'FALSE',
      position: new Animated.Value(initialDrawerSize),
      initialPosition: initialDrawerSize,
      minimumPosition: (SCREEN_HEIGHT * (1 - this.props.minimumDrawerSize)),
      finalPosition: this.props.finalDrawerHeight || 0,
      initialUsedSpace: initialUsedSpace
    };
  };

  isAValidMovement = (distanceX, distanceY) => {
    const moveTravelledFarEnough = Math.abs(distanceY) > Math.abs(distanceX) && Math.abs(distanceY) > 2;
    return moveTravelledFarEnough;
  }


  startAnimation = (velocityY, positionY, initialPosition, id, finalPosition) => {
    var isGoingToUp = (velocityY < 0) ? true : false;
    var endPosition = isGoingToUp ? finalPosition + 50 : initialPosition + 50;

    var position = new Animated.Value(positionY);
    position.removeAllListeners();

    Animated.timing(position, {
      toValue: endPosition,
      tension: 30,
      friction: 0,
      // easing:Easing.elastic,
      velocity: velocityY
    }).start();

    position.addListener((position) => {
      if (!this.center) return;
      this.onUpdatePosition(position.value);
    });
  }

  onUpdatePosition(position) {
    position = position - 50;
    this.state.position.setValue(position);
    this._previousTop = position;
    const { initialPosition } = this.state

    if (initialPosition === position) {
      this.props.onInitialPositionReached && this.props.onInitialPositionReached();
    }
  }

  componentWillMount() {
    this._panGesture = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return this.isAValidMovement(gestureState.dx, gestureState.dy) && this.state.touched == 'TRUE';
      },
      onPanResponderMove: (evt, gestureState) => {
        this.moveDrawerView(gestureState);
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.moveFinished(gestureState);
      },
    });
  }


  moveDrawerView(gestureState) {
    if (!this.center) return;
    //Here, I'm subtracting %5 of screen size from edge drawer position to be closer as possible to finger location when dragging the drawer view
    var position = gestureState.moveY - SCREEN_HEIGHT * 0.05;
    //Send to callback function the current drawer position when drag down the drawer view component
    //   if(!isGoingToUp) this.props.onDragDown(1-currentValue);
    this.onUpdatePosition(position);
  }

  moveFinished(gestureState) {
    const isGoingUp = (gestureState.vy < 0);
    if (!this.center) return;
    this.startAnimation(gestureState.vy, gestureState.moveY, isGoingUp ? this.state.finalPosition : this.state.minimumPosition, gestureState.stateId, this.state.finalPosition);
    this.props.onRelease && this.props.onRelease(isGoingUp);
  }

  render() {
    const containerView = this.props.renderContainerView ? this.props.renderContainerView() : null;
    const drawerView = this.props.renderDrawerView ? this.props.renderDrawerView() : null;
    const initDrawerView = this.props.renderInitDrawerView ? this.props.renderInitDrawerView() : null;
    const drawerPosition = {
      top: this.state.position
    };

    return (
      <View style={styles.viewport}>
        <View style={styles.container}>
          {containerView}
        </View>
        <Animated.View
          style={[drawerPosition, styles.drawer,
            { backgroundColor: this.props.drawerBg ? this.props.drawerBg : 'white' }]}
          ref={(center) => this.center = center}
          {...this._panGesture.panHandlers}
        >
          <TouchableWithoutFeedback
            onPressIn={() => {
              this.setState({ touched: 'TRUE' });
            }}
            onPressOut={() => {
              this.setState({ touched: 'FALSE' });
            }}>
            {initDrawerView}
          </TouchableWithoutFeedback>
          {drawerView}
        </Animated.View>

      </View >
    );
  }
};


var styles = StyleSheet.create({
  viewport: {
    flex: 1,
  },
  drawer: {
    flex: 1,
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
