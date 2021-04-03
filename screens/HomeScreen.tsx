import * as React from 'react';
import { StyleSheet } from 'react-native';

import ProfileHeader from '../components/ProfileHeader';
import { View } from '../components/Themed';
import VideosList from '../components/home/VideosList';
import VideosSuggestions from '../components/home/VideosSuggestions';
import Dragger from '../components/Dragger.js';
import DetailScreen from './DetailScreen';

export default class HomeScreen extends React.Component<{}, { topic: string, selectedVideo: Video | null, isExpanded: boolean }> {
  constructor(props: Object) {
    super(props);
    this.state = {
      topic: 'Videogames',
      selectedVideo: null,
      isExpanded: true
    };
  }

  setSuggestion = (topic: string) => {
    this.setState({ topic: topic });
  }

  setSelectedVideo = (video: Video) => {
    this.setState({ selectedVideo: null });
    setTimeout(() => {
      this.setState({ selectedVideo: video });
    }, 50);
  }

  handleDraggerRelease = (value: boolean) => {
    this.setState({ isExpanded: value })
  }

  render() {
    const Dashboard = <React.Fragment>
      <ProfileHeader />
      <VideosSuggestions selected={this.state.topic} setSuggestion={this.setSuggestion} />
      <View style={styles.dashboard}>
        <VideosList topic={this.state.topic} handleVideoSelection={this.setSelectedVideo} />
      </View>
    </React.Fragment>;

    return (
      <View style={styles.container}>
        {!this.state.selectedVideo ? Dashboard : (
          <Dragger
            initialDrawerSize={0.94}
            minimumDrawerSize={0.125}
            finalDrawerHeight={50}
            renderContainerView={() => Dashboard}
            onRelease={this.handleDraggerRelease}
            renderInitDrawerView={() => (
              <View style={styles.container}>
                {this.state.selectedVideo && <DetailScreen
                  video={this.state.selectedVideo}
                  handleVideoSelection={(video: Video) => this.setState({ selectedVideo: video })}
                  isExpanded={this.state.isExpanded}
                  closeVideo={() => { this.setState({ selectedVideo: null, isExpanded: true }) }} />}
              </View>
            )}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  dashboard: {
    height: 'calc(100% - 85px)'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
